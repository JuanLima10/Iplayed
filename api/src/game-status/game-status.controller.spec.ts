import { Test, TestingModule } from '@nestjs/testing';
import { progress_status } from '@prisma/client';
import { NotFoundError } from 'common/errors/http-status.error';
import { CreateGameStatusDto } from './dto/create-game-status.dto';
import { UpdateGameStatusDto } from './dto/update-game-status.dto';
import { GameStatusController } from './game-status.controller';
import { GameStatusService } from './game-status.service';

jest.mock('common/decorators/auth.decorator', () => ({
  Auth: () => () => undefined,
}));
jest.mock('common/decorators/current-user.decorator', () => ({
  CurrentUser: () => () => undefined,
}));
jest.mock('common/decorators/swagger.decorator', () => ({
  Swagger: () => () => undefined,
}));
jest.mock(
  'src/game/game.mapper',
  () => ({
    GameMapper: { toResponse: jest.fn() },
  }),
  { virtual: true },
);
jest.mock('common/builders/prisma-query.builder', () => ({
  buildPrismaQuery: jest.fn(),
}));
jest.mock('common/builders/game-status-count.builder', () => ({
  buildGameStatusCount: jest.fn(),
}));
jest.mock('common/utils/query-normalize', () => ({
  normalizeQuery: jest.fn(),
}));
jest.mock('common/utils/paginate-normalize.util', () => ({
  normalizePaginate: jest.fn(),
}));
jest.mock('common/utils/cover-id-extract.util', () => ({
  extractCoverId: jest.fn(),
}));

const mockGameStatusService = {
  findByUserId: jest.fn(),
  count: jest.fn(),
  upsert: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
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

const mockPaginate = { page: 1, limit: 10, pages: 1, count: 1 };
const mockCurrentUser = { sub: 'user-id-1' };

describe('GameStatusController', () => {
  let controller: GameStatusController;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [GameStatusController],
      providers: [
        { provide: GameStatusService, useValue: mockGameStatusService },
      ],
    }).compile();

    controller = moduleRef.get<GameStatusController>(GameStatusController);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // findByUserId

  describe('findByUserId', () => {
    it('should return paginated game statuses for a user', async () => {
      const query = { page: 1, limit: 10 };
      const expected = { data: [mockResponseStatus], paginate: mockPaginate };
      mockGameStatusService.findByUserId.mockResolvedValue(expected);

      const result = await controller.findByUserId('user-id-1', query);

      expect(mockGameStatusService.findByUserId).toHaveBeenCalledWith(
        'user-id-1',
        query,
      );
      expect(result).toEqual(expected);
    });
  });

  // count

  describe('count', () => {
    it('should return status counts for a param', async () => {
      const expected = {
        data: {
          played: 10,
          playing: 3,
          wantPlay: 5,
          abandoned: 1,
          favorites: 4,
          ratings: 7,
        },
      };
      mockGameStatusService.count.mockResolvedValue(expected);

      const result = await controller.count('user-id-1');

      expect(mockGameStatusService.count).toHaveBeenCalledWith('user-id-1');
      expect(result).toEqual(expected);
    });
  });

  // upsert

  describe('upsert', () => {
    const dto: CreateGameStatusDto = {
      igdbId: 1,
      status: progress_status.COMPLETED,
      rating: 4.5,
    };

    it('should upsert and return the game status', async () => {
      mockGameStatusService.upsert.mockResolvedValue(mockResponseStatus);

      const result = await controller.upsert(mockCurrentUser, dto);

      expect(mockGameStatusService.upsert).toHaveBeenCalledWith(
        mockCurrentUser.sub,
        dto,
      );
      expect(result).toEqual(mockResponseStatus);
    });

    it('should throw NotFoundError when game does not exist', async () => {
      mockGameStatusService.upsert.mockRejectedValue(
        new NotFoundError('Game not found'),
      );

      await expect(controller.upsert(mockCurrentUser, dto)).rejects.toThrow(
        NotFoundError,
      );
    });
  });

  // update

  describe('update', () => {
    const dto: UpdateGameStatusDto = { status: progress_status.PLAYING };

    it('should update and return the game status', async () => {
      mockGameStatusService.update.mockResolvedValue(mockResponseStatus);

      const result = await controller.update(
        mockCurrentUser,
        'the-witcher-3',
        dto,
      );

      expect(mockGameStatusService.update).toHaveBeenCalledWith(
        mockCurrentUser.sub,
        'the-witcher-3',
        dto,
      );
      expect(result).toEqual(mockResponseStatus);
    });

    it('should throw NotFoundError when game does not exist', async () => {
      mockGameStatusService.update.mockRejectedValue(
        new NotFoundError('Game not found'),
      );

      await expect(
        controller.update(mockCurrentUser, 'nonexistent', dto),
      ).rejects.toThrow(NotFoundError);
    });
  });

  // delete

  describe('delete', () => {
    it('should delete game status and return deleted true', async () => {
      mockGameStatusService.delete.mockResolvedValue({ deleted: true });

      const result = await controller.delete(mockCurrentUser, 'the-witcher-3');

      expect(mockGameStatusService.delete).toHaveBeenCalledWith(
        mockCurrentUser.sub,
        'the-witcher-3',
      );
      expect(result).toEqual({ deleted: true });
    });

    it('should throw NotFoundError when game status does not exist', async () => {
      mockGameStatusService.delete.mockRejectedValue(
        new NotFoundError('Game status not found'),
      );

      await expect(
        controller.delete(mockCurrentUser, 'nonexistent'),
      ).rejects.toThrow(NotFoundError);
    });
  });
});
