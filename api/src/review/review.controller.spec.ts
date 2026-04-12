import { Test, TestingModule } from '@nestjs/testing';
import { progress_status } from '@prisma/client';
import { NotFoundError } from 'common/errors/http-status.error';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';

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
jest.mock(
  'src/game-status/game-status.mapper',
  () => ({
    GameStatusMapper: { toResponse: jest.fn() },
  }),
  { virtual: true },
);
jest.mock('common/builders/prisma-query.builder', () => ({
  buildPrismaQuery: jest.fn(),
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

const mockReviewService = {
  findAll: jest.fn(),
  findBySlug: jest.fn(),
  findByUserId: jest.fn(),
  upsert: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

const mockResponseReview = {
  id: 'review-id-1',
  userId: 'user-id-1',
  gameId: 'game-id-1',
  text: 'Amazing game!',
  createdAt: new Date('2024-01-01'),
  updatedAt: null,
};

const mockPaginate = { page: 1, limit: 10, pages: 1, count: 1 };
const mockCurrentUser = { sub: 'user-id-1' };

describe('ReviewController', () => {
  let controller: ReviewController;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [ReviewController],
      providers: [{ provide: ReviewService, useValue: mockReviewService }],
    }).compile();

    controller = moduleRef.get<ReviewController>(ReviewController);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // findAll

  describe('findAll', () => {
    it('should return paginated reviews', async () => {
      const query = { page: 1, limit: 10 };
      const expected = { data: [mockResponseReview], paginate: mockPaginate };
      mockReviewService.findAll.mockResolvedValue(expected);

      const result = await controller.findAll(query);

      expect(mockReviewService.findAll).toHaveBeenCalledWith(query);
      expect(result).toEqual(expected);
    });
  });

  // findBySlug

  describe('findBySlug', () => {
    it('should return paginated reviews for a game slug', async () => {
      const query = { page: 1, limit: 10 };
      const expected = { data: [mockResponseReview], paginate: mockPaginate };
      mockReviewService.findBySlug.mockResolvedValue(expected);

      const result = await controller.findBySlug('the-witcher-3', query);

      expect(mockReviewService.findBySlug).toHaveBeenCalledWith(
        'the-witcher-3',
        query,
      );
      expect(result).toEqual(expected);
    });

    it('should throw NotFoundError when game does not exist', async () => {
      mockReviewService.findBySlug.mockRejectedValue(
        new NotFoundError('Game not found'),
      );

      await expect(controller.findBySlug('nonexistent', {})).rejects.toThrow(
        NotFoundError,
      );
    });
  });

  // findByUser

  describe('findByUser', () => {
    it('should return paginated reviews for a user', async () => {
      const query = { page: 1, limit: 10 };
      const expected = { data: [mockResponseReview], paginate: mockPaginate };
      mockReviewService.findByUserId.mockResolvedValue(expected);

      const result = await controller.findByUser('user-id-1', query);

      expect(mockReviewService.findByUserId).toHaveBeenCalledWith(
        'user-id-1',
        query,
      );
      expect(result).toEqual(expected);
    });
  });

  // upsert

  describe('upsert', () => {
    const dto: CreateReviewDto = {
      slug: 'the-witcher-3',
      text: 'Amazing game!',
      status: progress_status.COMPLETED,
      rating: 4.5,
    };

    it('should upsert and return the review', async () => {
      mockReviewService.upsert.mockResolvedValue(mockResponseReview);

      const result = await controller.upsert(mockCurrentUser, dto);

      expect(mockReviewService.upsert).toHaveBeenCalledWith(
        mockCurrentUser.sub,
        dto,
      );
      expect(result).toEqual(mockResponseReview);
    });

    it('should throw NotFoundError when game does not exist', async () => {
      mockReviewService.upsert.mockRejectedValue(
        new NotFoundError('Game not found'),
      );

      await expect(controller.upsert(mockCurrentUser, dto)).rejects.toThrow(
        NotFoundError,
      );
    });
  });

  // update

  describe('update', () => {
    const dto: UpdateReviewDto = { text: 'Updated review.' };

    it('should update and return the review', async () => {
      mockReviewService.update.mockResolvedValue(mockResponseReview);

      const result = await controller.update(
        mockCurrentUser,
        'the-witcher-3',
        dto,
      );

      expect(mockReviewService.update).toHaveBeenCalledWith(
        mockCurrentUser.sub,
        'the-witcher-3',
        dto,
      );
      expect(result).toEqual(mockResponseReview);
    });

    it('should throw NotFoundError when game does not exist', async () => {
      mockReviewService.update.mockRejectedValue(
        new NotFoundError('Game not found'),
      );

      await expect(
        controller.update(mockCurrentUser, 'nonexistent', dto),
      ).rejects.toThrow(NotFoundError);
    });
  });

  // delete

  describe('delete', () => {
    it('should delete review and return deleted true', async () => {
      mockReviewService.delete.mockResolvedValue({ deleted: true });

      const result = await controller.delete(mockCurrentUser, 'the-witcher-3');

      expect(mockReviewService.delete).toHaveBeenCalledWith(
        mockCurrentUser.sub,
        'the-witcher-3',
      );
      expect(result).toEqual({ deleted: true });
    });

    it('should throw NotFoundError when review does not exist', async () => {
      mockReviewService.delete.mockRejectedValue(
        new NotFoundError('Review not found'),
      );

      await expect(
        controller.delete(mockCurrentUser, 'nonexistent'),
      ).rejects.toThrow(NotFoundError);
    });
  });
});
