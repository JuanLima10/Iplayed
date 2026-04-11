/* eslint-disable @typescript-eslint/unbound-method */
import { Test, TestingModule } from '@nestjs/testing';
import { IgdbClient } from 'common/clients/igdb.client';
import { NotFoundError } from 'common/errors/http-status.error';
import { PrismaService } from 'prisma/prisma.service';
import { GameService } from './game.service';

jest.mock('common/utils/paginate-normalize.util');
jest.mock('common/utils/query-normalize');
jest.mock('./game.mapper', () => ({
  IgdbMapper: {
    toResponse: jest.fn(),
  },
}));

import { normalizePaginate } from 'common/utils/paginate-normalize.util';
import { normalizeQuery } from 'common/utils/query-normalize';
import { IgdbMapper } from './game.mapper';

const mockToResponse = IgdbMapper.toResponse as jest.Mock;

const mockPrisma = {};

const mockIgdbClient = {
  getIgdb: jest.fn(),
  getIgdbById: jest.fn(),
  getIgdbBySlug: jest.fn(),
};

const mockIgdbGame = {
  id: 1,
  name: 'The Legend of Zelda',
  slug: 'the-legend-of-zelda',
  summary: 'An epic adventure.',
  cover: { url: '//images.igdb.com/igdb/image/upload/t_thumb/abc.jpg' },
  first_release_date: 1672531200,
  rating: 90,
  aggregated_rating: 88,
  videos: [{ video_id: 'dQw4w9WgXcQ' }],
  screenshots: [],
  involved_companies: [],
  genres: [{ name: 'Adventure' }],
  themes: [{ name: 'Fantasy' }],
  similar_games: [],
};

const mockResponseIgdb = {
  igdbId: 1,
  title: 'The Legend of Zelda',
  slug: 'the-legend-of-zelda',
  summary: 'An epic adventure.',
  coverUrl: 'https://images.igdb.com/igdb/image/upload/t_1080p/abc.jpg',
  releaseDate: new Date('2023-01-01'),
  rating: 90,
  aggregatedRating: 88,
  video: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  screenshots: [],
  developers: [],
  publishers: [],
  genres: ['Adventure'],
  themes: ['Fantasy'],
  similarGames: [],
};

const mockPaginate = { page: 1, limit: 10, pages: 1, count: 2 };

describe('GameService', () => {
  let service: GameService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        GameService,
        { provide: PrismaService, useValue: mockPrisma },
        { provide: IgdbClient, useValue: mockIgdbClient },
      ],
    }).compile();

    service = moduleRef.get<GameService>(GameService);

    jest.clearAllMocks();
    mockToResponse.mockReturnValue(mockResponseIgdb);
    (normalizeQuery as jest.Mock).mockReturnValue({ page: 1, limit: 10 });
    (normalizePaginate as jest.Mock).mockReturnValue(mockPaginate);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // findAll

  describe('findAll', () => {
    it('should return paginated games from IGDB', async () => {
      mockIgdbClient.getIgdb.mockResolvedValue({
        data: [mockIgdbGame, mockIgdbGame],
        count: 2,
      });

      const result = await service.findAll();

      expect(normalizeQuery).toHaveBeenCalledWith(undefined);
      expect(mockIgdbClient.getIgdb).toHaveBeenCalledWith({
        page: 1,
        limit: 10,
      });
      expect(mockToResponse).toHaveBeenCalledTimes(2);
      expect(normalizePaginate).toHaveBeenCalledWith({
        page: 1,
        limit: 10,
        count: 2,
      });
      expect(result).toEqual({
        data: [mockResponseIgdb, mockResponseIgdb],
        paginate: mockPaginate,
      });
    });

    it('should return empty data when IGDB returns no games', async () => {
      mockIgdbClient.getIgdb.mockResolvedValue({ data: [], count: 0 });
      (normalizePaginate as jest.Mock).mockReturnValue({
        page: 1,
        limit: 10,
        pages: 1,
        count: 0,
      });

      const result = await service.findAll();

      expect(result.data).toEqual([]);
      expect(result.paginate.count).toBe(0);
    });

    it('should forward filter to normalizeQuery', async () => {
      mockIgdbClient.getIgdb.mockResolvedValue({ data: [], count: 0 });
      (normalizePaginate as jest.Mock).mockReturnValue({
        page: 1,
        limit: 10,
        pages: 1,
        count: 0,
      });

      const filter = { search: 'zelda', page: 2, limit: 5 };
      await service.findAll(filter);

      expect(normalizeQuery).toHaveBeenCalledWith(filter);
    });
  });

  // findByIgdbId

  describe('findByIgdbId', () => {
    it('should return a game when found', async () => {
      mockIgdbClient.getIgdbById.mockResolvedValue(mockIgdbGame);

      const result = await service.findByIgdbId(1);

      expect(mockIgdbClient.getIgdbById).toHaveBeenCalledWith(1);
      expect(mockToResponse).toHaveBeenCalledWith(mockIgdbGame);
      expect(result).toEqual(mockResponseIgdb);
    });

    it('should throw NotFoundError when game does not exist', async () => {
      mockIgdbClient.getIgdbById.mockResolvedValue(undefined);

      await expect(service.findByIgdbId(999)).rejects.toThrow(NotFoundError);
      expect(mockToResponse).not.toHaveBeenCalled();
    });
  });

  // findBySlug

  describe('findBySlug', () => {
    it('should return a game when found', async () => {
      mockIgdbClient.getIgdbBySlug.mockResolvedValue(mockIgdbGame);

      const result = await service.findBySlug('the-legend-of-zelda');

      expect(mockIgdbClient.getIgdbBySlug).toHaveBeenCalledWith(
        'the-legend-of-zelda',
      );
      expect(mockToResponse).toHaveBeenCalledWith(mockIgdbGame);
      expect(result).toEqual(mockResponseIgdb);
    });

    it('should throw NotFoundError when game does not exist', async () => {
      mockIgdbClient.getIgdbBySlug.mockResolvedValue(undefined);

      await expect(service.findBySlug('nonexistent-slug')).rejects.toThrow(
        NotFoundError,
      );
      expect(mockToResponse).not.toHaveBeenCalled();
    });
  });
});
