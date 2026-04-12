/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Test, TestingModule } from '@nestjs/testing';
import { progress_status } from '@prisma/client';
import { IgdbClient } from 'common/clients/igdb.client';
import { NotFoundError } from 'common/errors/http-status.error';
import { PrismaService } from 'prisma/prisma.service';
import { ReviewService } from './review.service';

jest.mock('common/builders/prisma-query.builder');
jest.mock('common/utils/paginate-normalize.util');
jest.mock('common/utils/query-normalize');
jest.mock('common/utils/cover-id-extract.util');
jest.mock('./review.mapper', () => ({
  ReviewMapper: { toResponse: jest.fn() },
}));
jest.mock(
  'src/game/game.mapper',
  () => ({
    GameMapper: { toResponse: jest.fn() },
  }),
  { virtual: true },
);
jest.mock(
  'src/game-status/game-status.mapper',
  () => ({
    GameStatusMapper: { toResponse: jest.fn() },
  }),
  { virtual: true },
);

import { buildPrismaQuery } from 'common/builders/prisma-query.builder';
import { extractCoverId } from 'common/utils/cover-id-extract.util';
import { normalizePaginate } from 'common/utils/paginate-normalize.util';
import { normalizeQuery } from 'common/utils/query-normalize';
import { GameStatusMapper } from 'src/game-status/game-status.mapper';
import { GameMapper } from 'src/game/game.mapper';
import { ReviewMapper } from './review.mapper';

const mockReviewToResponse = ReviewMapper.toResponse as jest.Mock;
const mockGameToResponse = GameMapper.toResponse as jest.Mock;
const mockStatusToResponse = GameStatusMapper.toResponse as jest.Mock;

const mockPrisma = {
  review: {
    count: jest.fn(),
    findMany: jest.fn(),
    upsert: jest.fn(),
    update: jest.fn(),
    deleteMany: jest.fn(),
  },
  game: {
    findFirst: jest.fn(),
    upsert: jest.fn(),
  },
  game_status: {
    upsert: jest.fn(),
  },
};

const mockIgdbClient = {
  getIgdbBySlug: jest.fn(),
};

const mockGameEntity = {
  id: 'game-id-1',
  igdb_id: 1942,
  title: 'The Witcher 3',
  slug: 'the-witcher-3',
  cover_id: 'abc',
  created_at: new Date('2024-01-01'),
  updated_at: null,
};

const mockGameStatusEntity = {
  id: 'status-id-1',
  user_id: 'user-id-1',
  game_id: 'game-id-1',
  progress: 100,
  status: progress_status.COMPLETED,
  best: null,
  is_favorite: false,
  rating: 4.5,
  last_played_at: null,
  created_at: new Date('2024-01-01'),
  updated_at: null,
};

const mockReviewEntity = {
  id: 'review-id-1',
  user_id: 'user-id-1',
  game_id: 'game-id-1',
  text: 'Amazing game!',
  created_at: new Date('2024-01-01'),
  updated_at: null,
};

const mockIgdbGame = {
  id: 1942,
  name: 'The Witcher 3',
  slug: 'the-witcher-3',
  cover: { url: '//images.igdb.com/igdb/image/upload/t_thumb/abc.jpg' },
};

const mockResponseReview = {
  id: 'review-id-1',
  userId: 'user-id-1',
  gameId: 'game-id-1',
  text: 'Amazing game!',
  createdAt: new Date('2024-01-01'),
  updatedAt: null,
};

const mockResponseGame = {
  id: 'game-id-1',
  igdbId: 1942,
  title: 'The Witcher 3',
  slug: 'the-witcher-3',
  coverUrl: null,
  createdAt: new Date('2024-01-01'),
  updatedAt: null,
};

const mockResponseStatus = {
  id: 'status-id-1',
  userId: 'user-id-1',
  gameId: 'game-id-1',
  status: progress_status.COMPLETED,
  isFavorite: false,
  rating: 4.5,
  createdAt: new Date('2024-01-01'),
  updatedAt: null,
};

const mockFilters = {
  where: {},
  orderBy: { created_at: 'desc' },
  skip: 0,
  take: 10,
};

const mockPaginate = { page: 1, limit: 10, pages: 1, count: 1 };

const mockReviewWithGame = {
  ...mockReviewEntity,
  game: { ...mockGameEntity, statuses: [mockGameStatusEntity] },
};

describe('ReviewService', () => {
  let service: ReviewService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        ReviewService,
        { provide: PrismaService, useValue: mockPrisma },
        { provide: IgdbClient, useValue: mockIgdbClient },
      ],
    }).compile();

    service = moduleRef.get<ReviewService>(ReviewService);

    jest.clearAllMocks();
    mockReviewToResponse.mockReturnValue(mockResponseReview);
    mockGameToResponse.mockReturnValue(mockResponseGame);
    mockStatusToResponse.mockReturnValue(mockResponseStatus);
    (normalizeQuery as jest.Mock).mockReturnValue({ page: 1, limit: 10 });
    (buildPrismaQuery as jest.Mock).mockReturnValue({ ...mockFilters });
    (normalizePaginate as jest.Mock).mockReturnValue(mockPaginate);
    (extractCoverId as jest.Mock).mockReturnValue('abc');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // findAll

  describe('findAll', () => {
    it('should return paginated reviews with game and status', async () => {
      mockPrisma.review.count.mockResolvedValue(1);
      mockPrisma.review.findMany.mockResolvedValue([mockReviewWithGame]);

      const result = await service.findAll();

      expect(normalizeQuery).toHaveBeenCalledWith(undefined);
      expect(buildPrismaQuery).toHaveBeenCalled();
      expect(mockPrisma.review.count).toHaveBeenCalledWith({
        where: mockFilters.where,
      });
      expect(mockReviewToResponse).toHaveBeenCalledTimes(1);
      expect(mockGameToResponse).toHaveBeenCalledWith(mockReviewWithGame.game);
      expect(mockStatusToResponse).toHaveBeenCalledWith(mockGameStatusEntity);
      expect(result).toEqual({
        data: [
          {
            ...mockResponseReview,
            game: mockResponseGame,
            status: mockResponseStatus,
          },
        ],
        paginate: mockPaginate,
      });
    });

    it('should return empty data when no reviews found', async () => {
      mockPrisma.review.count.mockResolvedValue(0);
      mockPrisma.review.findMany.mockResolvedValue([]);
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

    it('should apply rating filter to where clause', async () => {
      (normalizeQuery as jest.Mock).mockReturnValue({
        page: 1,
        limit: 10,
        rating: 4.5,
      });
      mockPrisma.review.count.mockResolvedValue(0);
      mockPrisma.review.findMany.mockResolvedValue([]);
      (normalizePaginate as jest.Mock).mockReturnValue({
        page: 1,
        limit: 10,
        pages: 1,
        count: 0,
      });

      await service.findAll({ rating: 4.5 });

      const countCall = mockPrisma.review.count.mock.calls[0][0] as {
        where: { game?: unknown };
      };
      expect(countCall.where.game).toBeDefined();
    });
  });

  // findByUserId

  describe('findByUserId', () => {
    it('should return paginated reviews filtered by user', async () => {
      mockPrisma.review.count.mockResolvedValue(1);
      mockPrisma.review.findMany.mockResolvedValue([mockReviewWithGame]);

      const result = await service.findByUserId('user-id-1');

      expect(normalizeQuery).toHaveBeenCalledWith(undefined);
      expect(result).toEqual({
        data: [
          {
            ...mockResponseReview,
            game: mockResponseGame,
            status: mockResponseStatus,
          },
        ],
        paginate: mockPaginate,
      });
    });

    it('should return empty data when user has no reviews', async () => {
      mockPrisma.review.count.mockResolvedValue(0);
      mockPrisma.review.findMany.mockResolvedValue([]);
      (normalizePaginate as jest.Mock).mockReturnValue({
        page: 1,
        limit: 10,
        pages: 1,
        count: 0,
      });

      const result = await service.findByUserId('user-id-1');

      expect(result.data).toEqual([]);
    });
  });

  // findBySlug

  describe('findBySlug', () => {
    it('should return paginated reviews for a game slug', async () => {
      mockPrisma.game.findFirst.mockResolvedValue(mockGameEntity);
      mockPrisma.review.count.mockResolvedValue(1);
      mockPrisma.review.findMany.mockResolvedValue([mockReviewWithGame]);

      const result = await service.findBySlug('the-witcher-3', {});

      expect(mockPrisma.game.findFirst).toHaveBeenCalledWith({
        where: { slug: 'the-witcher-3' },
      });
      expect(result).toEqual({
        data: [
          {
            ...mockResponseReview,
            game: mockResponseGame,
            status: mockResponseStatus,
          },
        ],
        paginate: mockPaginate,
      });
    });

    it('should throw NotFoundError when game does not exist', async () => {
      mockPrisma.game.findFirst.mockResolvedValue(null);

      await expect(service.findBySlug('nonexistent', {})).rejects.toThrow(
        NotFoundError,
      );
      expect(mockPrisma.review.findMany).not.toHaveBeenCalled();
    });
  });

  // upsert

  describe('upsert', () => {
    const dto = {
      slug: 'the-witcher-3',
      text: 'Amazing game!',
      status: progress_status.COMPLETED,
      rating: 4.5,
    };

    it('should upsert game, status, review and return response', async () => {
      mockIgdbClient.getIgdbBySlug.mockResolvedValue(mockIgdbGame);
      mockPrisma.game.upsert.mockResolvedValue({ id: 'game-id-1' });
      mockPrisma.game_status.upsert.mockResolvedValue(mockGameStatusEntity);
      mockPrisma.review.upsert.mockResolvedValue(mockReviewEntity);

      const result = await service.upsert('user-id-1', dto);

      expect(mockIgdbClient.getIgdbBySlug).toHaveBeenCalledWith(
        'the-witcher-3',
      );
      expect(mockPrisma.game.upsert).toHaveBeenCalledWith(
        expect.objectContaining<{ where: { igdb_id: number } }>({
          where: { igdb_id: 1942 },
        }),
      );
      expect(mockPrisma.game_status.upsert).toHaveBeenCalledWith(
        expect.objectContaining<{
          where: { user_id_game_id: { user_id: string; game_id: string } };
        }>({
          where: {
            user_id_game_id: { user_id: 'user-id-1', game_id: 'game-id-1' },
          },
        }),
      );
      expect(mockPrisma.review.upsert).toHaveBeenCalledWith(
        expect.objectContaining<{
          where: { user_id_game_id: { user_id: string; game_id: string } };
        }>({
          where: {
            user_id_game_id: { user_id: 'user-id-1', game_id: 'game-id-1' },
          },
        }),
      );
      expect(result).toEqual(mockResponseReview);
    });

    it('should throw NotFoundError when IGDB game does not exist', async () => {
      mockIgdbClient.getIgdbBySlug.mockResolvedValue(undefined);

      await expect(service.upsert('user-id-1', dto)).rejects.toThrow(
        NotFoundError,
      );
      expect(mockPrisma.game.upsert).not.toHaveBeenCalled();
    });
  });

  // update

  describe('update', () => {
    const dto = { text: 'Updated review text.' };

    it('should update review and return response', async () => {
      mockPrisma.game.findFirst.mockResolvedValue(mockGameEntity);
      mockPrisma.review.update.mockResolvedValue(mockReviewEntity);

      const result = await service.update('user-id-1', 'the-witcher-3', dto);

      expect(mockPrisma.game.findFirst).toHaveBeenCalledWith({
        where: { slug: 'the-witcher-3' },
      });
      expect(mockPrisma.review.update).toHaveBeenCalledWith(
        expect.objectContaining<{
          where: { user_id_game_id: { user_id: string; game_id: string } };
        }>({
          where: {
            user_id_game_id: { user_id: 'user-id-1', game_id: 'game-id-1' },
          },
        }),
      );
      expect(result).toEqual(mockResponseReview);
    });

    it('should throw NotFoundError when game does not exist', async () => {
      mockPrisma.game.findFirst.mockResolvedValue(null);

      await expect(
        service.update('user-id-1', 'nonexistent', dto),
      ).rejects.toThrow(NotFoundError);
      expect(mockPrisma.review.update).not.toHaveBeenCalled();
    });
  });

  // delete

  describe('delete', () => {
    it('should delete review and return deleted true', async () => {
      mockPrisma.review.deleteMany.mockResolvedValue({ count: 1 });

      const result = await service.delete('user-id-1', 'the-witcher-3');

      expect(mockPrisma.review.deleteMany).toHaveBeenCalledWith({
        where: { user_id: 'user-id-1', game: { slug: 'the-witcher-3' } },
      });
      expect(result).toEqual({ deleted: true });
    });

    it('should throw NotFoundError when no review was deleted', async () => {
      mockPrisma.review.deleteMany.mockResolvedValue({ count: 0 });

      await expect(service.delete('user-id-1', 'nonexistent')).rejects.toThrow(
        NotFoundError,
      );
    });
  });
});
