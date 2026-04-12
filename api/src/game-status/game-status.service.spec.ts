/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Test, TestingModule } from '@nestjs/testing';
import { progress_status } from '@prisma/client';
import { IgdbClient } from 'common/clients/igdb.client';
import {
  BadRequestError,
  NotFoundError,
} from 'common/errors/http-status.error';
import { PrismaService } from 'prisma/prisma.service';
import { GameStatusService } from './game-status.service';

jest.mock('common/builders/prisma-query.builder');
jest.mock('common/builders/game-status-count.builder');
jest.mock('common/utils/paginate-normalize.util');
jest.mock('common/utils/query-normalize');
jest.mock('common/utils/cover-id-extract.util');
jest.mock('./game-status.mapper', () => ({
  GameStatusMapper: { toResponse: jest.fn() },
}));
jest.mock(
  'src/game/game.mapper',
  () => ({
    GameMapper: { toResponse: jest.fn() },
  }),
  { virtual: true },
);

import { buildGameStatusCount } from 'common/builders/game-status-count.builder';
import { buildPrismaQuery } from 'common/builders/prisma-query.builder';
import { extractCoverId } from 'common/utils/cover-id-extract.util';
import { normalizePaginate } from 'common/utils/paginate-normalize.util';
import { normalizeQuery } from 'common/utils/query-normalize';
import { GameMapper } from 'src/game/game.mapper';
import { GameStatusMapper } from './game-status.mapper';

const mockToResponse = GameStatusMapper.toResponse as jest.Mock;
const mockGameToResponse = GameMapper.toResponse as jest.Mock;

const mockPrisma = {
  game_status: {
    count: jest.fn(),
    findMany: jest.fn(),
    upsert: jest.fn(),
    update: jest.fn(),
    deleteMany: jest.fn(),
  },
  game: {
    upsert: jest.fn(),
    findFirst: jest.fn(),
  },
};

const mockIgdbClient = {
  getIgdbById: jest.fn(),
};

const mockIgdbGame = {
  id: 1,
  name: 'The Witcher 3',
  slug: 'the-witcher-3',
  cover: { url: '//images.igdb.com/igdb/image/upload/t_thumb/abc.jpg' },
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

const mockGameEntity = {
  id: 'game-id-1',
  igdb_id: 1,
  title: 'The Witcher 3',
  slug: 'the-witcher-3',
  cover_id: 'abc',
  created_at: new Date('2024-01-01'),
  updated_at: null,
};

const mockResponseStatus = {
  id: 'status-id-1',
  userId: 'user-id-1',
  gameId: 'game-id-1',
  progress: 100,
  status: progress_status.COMPLETED,
  best: null,
  isFavorite: false,
  rating: 4.5,
  lastPlayedAt: null,
  createdAt: new Date('2024-01-01'),
  updatedAt: null,
};

const mockResponseGame = {
  id: 'game-id-1',
  igdbId: 1,
  title: 'The Witcher 3',
  slug: 'the-witcher-3',
  coverUrl: null,
  createdAt: new Date('2024-01-01'),
  updatedAt: null,
};

const mockFilters = {
  where: { user_id: 'user-id-1' },
  orderBy: { created_at: 'desc' },
  skip: 0,
  take: 10,
};

const mockPaginate = { page: 1, limit: 10, pages: 1, count: 1 };

describe('GameStatusService', () => {
  let service: GameStatusService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        GameStatusService,
        { provide: PrismaService, useValue: mockPrisma },
        { provide: IgdbClient, useValue: mockIgdbClient },
      ],
    }).compile();

    service = moduleRef.get<GameStatusService>(GameStatusService);

    jest.clearAllMocks();
    mockToResponse.mockReturnValue(mockResponseStatus);
    mockGameToResponse.mockReturnValue(mockResponseGame);
    (normalizeQuery as jest.Mock).mockReturnValue({ page: 1, limit: 10 });
    (buildPrismaQuery as jest.Mock).mockReturnValue(mockFilters);
    (normalizePaginate as jest.Mock).mockReturnValue(mockPaginate);
    (extractCoverId as jest.Mock).mockReturnValue('abc');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // findByUserId

  describe('findByUserId', () => {
    it('should return paginated game statuses with game data', async () => {
      const gameStatusWithGame = {
        ...mockGameStatusEntity,
        game: mockGameEntity,
      };
      mockPrisma.game_status.count.mockResolvedValue(1);
      mockPrisma.game_status.findMany.mockResolvedValue([gameStatusWithGame]);

      const result = await service.findByUserId('user-id-1');

      expect(normalizeQuery).toHaveBeenCalledWith(undefined);
      expect(buildPrismaQuery).toHaveBeenCalled();
      expect(mockPrisma.game_status.count).toHaveBeenCalledWith({
        where: mockFilters.where,
      });
      expect(mockToResponse).toHaveBeenCalledTimes(1);
      expect(mockGameToResponse).toHaveBeenCalledWith(mockGameEntity);
      expect(result).toEqual({
        data: [{ ...mockResponseStatus, game: mockResponseGame }],
        paginate: mockPaginate,
      });
    });

    it('should return empty data when no statuses found', async () => {
      mockPrisma.game_status.count.mockResolvedValue(0);
      mockPrisma.game_status.findMany.mockResolvedValue([]);
      (normalizePaginate as jest.Mock).mockReturnValue({
        page: 1,
        limit: 10,
        pages: 1,
        count: 0,
      });

      const result = await service.findByUserId('user-id-1');

      expect(result.data).toEqual([]);
      expect(result.paginate.count).toBe(0);
    });

    it('should forward filter to normalizeQuery', async () => {
      mockPrisma.game_status.count.mockResolvedValue(0);
      mockPrisma.game_status.findMany.mockResolvedValue([]);
      (normalizePaginate as jest.Mock).mockReturnValue({
        page: 1,
        limit: 10,
        pages: 1,
        count: 0,
      });

      const filter = { status: progress_status.PLAYING, page: 2 };
      await service.findByUserId('user-id-1', filter);

      expect(normalizeQuery).toHaveBeenCalledWith(filter);
    });
  });

  // upsert

  describe('upsert', () => {
    const dto = {
      igdbId: 1,
      status: progress_status.COMPLETED,
      progress: 100,
      isFavorite: false,
      rating: 4.5,
    };

    it('should upsert game and status and return response', async () => {
      mockIgdbClient.getIgdbById.mockResolvedValue(mockIgdbGame);
      mockPrisma.game.upsert.mockResolvedValue({ id: 'game-id-1' });
      mockPrisma.game_status.upsert.mockResolvedValue(mockGameStatusEntity);

      const result = await service.upsert('user-id-1', dto);

      expect(mockIgdbClient.getIgdbById).toHaveBeenCalledWith(1);
      expect(mockPrisma.game.upsert).toHaveBeenCalledWith(
        expect.objectContaining<{ where: { igdb_id: number } }>({
          where: { igdb_id: 1 },
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
      expect(result).toEqual(mockResponseStatus);
    });

    it('should throw NotFoundError when IGDB game does not exist', async () => {
      mockIgdbClient.getIgdbById.mockResolvedValue(undefined);

      await expect(service.upsert('user-id-1', dto)).rejects.toThrow(
        NotFoundError,
      );
      expect(mockPrisma.game.upsert).not.toHaveBeenCalled();
    });

    it('should call countBest when dto.best is set', async () => {
      mockIgdbClient.getIgdbById.mockResolvedValue(mockIgdbGame);
      mockPrisma.game.upsert.mockResolvedValue({ id: 'game-id-1' });
      mockPrisma.game_status.upsert.mockResolvedValue(mockGameStatusEntity);
      mockPrisma.game_status.count.mockResolvedValue(0);

      await service.upsert('user-id-1', { ...dto, best: 1 });

      expect(mockPrisma.game_status.count).toHaveBeenCalledWith(
        expect.objectContaining<{ where: { user_id: string } }>({
          where: expect.objectContaining<{ user_id: string }>({
            user_id: 'user-id-1',
          }),
        }),
      );
    });
  });

  // update

  describe('update', () => {
    const dto = { status: progress_status.PLAYING, isFavorite: true };

    it('should update game status and return response', async () => {
      mockPrisma.game.findFirst.mockResolvedValue(mockGameEntity);
      mockPrisma.game_status.update.mockResolvedValue(mockGameStatusEntity);

      const result = await service.update('user-id-1', 'the-witcher-3', dto);

      expect(mockPrisma.game.findFirst).toHaveBeenCalledWith({
        where: { slug: 'the-witcher-3' },
      });
      expect(mockPrisma.game_status.update).toHaveBeenCalledWith(
        expect.objectContaining<{
          where: { user_id_game_id: { user_id: string; game_id: string } };
        }>({
          where: {
            user_id_game_id: { user_id: 'user-id-1', game_id: 'game-id-1' },
          },
        }),
      );
      expect(result).toEqual(mockResponseStatus);
    });

    it('should throw NotFoundError when game does not exist', async () => {
      mockPrisma.game.findFirst.mockResolvedValue(null);

      await expect(
        service.update('user-id-1', 'nonexistent', dto),
      ).rejects.toThrow(NotFoundError);
      expect(mockPrisma.game_status.update).not.toHaveBeenCalled();
    });
  });

  // count

  describe('count', () => {
    it('should return status counts for a user', async () => {
      (buildGameStatusCount as jest.Mock).mockReturnValue({
        user_id: 'user-id-1',
      });
      mockPrisma.game_status.count
        .mockResolvedValueOnce(10) // played
        .mockResolvedValueOnce(3) // playing
        .mockResolvedValueOnce(5) // wantPlay
        .mockResolvedValueOnce(1) // abandoned
        .mockResolvedValueOnce(4) // favorites
        .mockResolvedValueOnce(7); // ratings

      const result = await service.count('user-id-1');

      expect(buildGameStatusCount).toHaveBeenCalledWith('user-id-1');
      expect(result).toEqual({
        data: {
          played: 10,
          playing: 3,
          wantPlay: 5,
          abandoned: 1,
          favorites: 4,
          ratings: 7,
        },
      });
    });
  });

  // countBest

  describe('countBest', () => {
    it('should not throw when best count is 5 or less', async () => {
      mockPrisma.game_status.count.mockResolvedValue(5);

      await expect(service.countBest('user-id-1')).resolves.not.toThrow();
    });

    it('should throw BadRequestError when best count exceeds 5', async () => {
      mockPrisma.game_status.count.mockResolvedValue(6);

      await expect(service.countBest('user-id-1')).rejects.toThrow(
        BadRequestError,
      );
    });
  });

  // delete

  describe('delete', () => {
    it('should delete game status and return deleted true', async () => {
      mockPrisma.game_status.deleteMany.mockResolvedValue({ count: 1 });

      const result = await service.delete('user-id-1', 'the-witcher-3');

      expect(mockPrisma.game_status.deleteMany).toHaveBeenCalledWith({
        where: { user_id: 'user-id-1', game: { slug: 'the-witcher-3' } },
      });
      expect(result).toEqual({ deleted: true });
    });

    it('should throw NotFoundError when no status was deleted', async () => {
      mockPrisma.game_status.deleteMany.mockResolvedValue({ count: 0 });

      await expect(service.delete('user-id-1', 'nonexistent')).rejects.toThrow(
        NotFoundError,
      );
    });
  });
});
