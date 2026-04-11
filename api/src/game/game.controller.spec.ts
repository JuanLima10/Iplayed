import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundError } from 'common/errors/http-status.error';
import { GameQueryDto } from './dto/query-game.dto';
import { GameController } from './game.controller';
import { GameService } from './game.service';

jest.mock('common/decorators/swagger.decorator', () => ({
  Swagger: () => () => undefined,
}));

const mockGameService = {
  findAll: jest.fn(),
  findByIgdbId: jest.fn(),
  findBySlug: jest.fn(),
};

const mockResponseGame = {
  igdbId: 1,
  title: 'The Legend of Zelda',
  slug: 'the-legend-of-zelda',
  summary: 'An epic adventure.',
  coverUrl: null,
  releaseDate: new Date('2023-01-01'),
  rating: 90,
  aggregatedRating: 88,
  video: null,
  screenshots: [],
  developers: [],
  publishers: [],
  genres: ['Adventure'],
  themes: ['Fantasy'],
  similarGames: [],
};

const mockPaginate = { page: 1, limit: 10, pages: 1, count: 1 };

describe('GameController', () => {
  let controller: GameController;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [GameController],
      providers: [{ provide: GameService, useValue: mockGameService }],
    }).compile();

    controller = moduleRef.get<GameController>(GameController);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // findAll

  describe('findAll', () => {
    it('should return paginated games', async () => {
      const query: GameQueryDto = { page: 1, limit: 10 };
      const expected = { data: [mockResponseGame], paginate: mockPaginate };
      mockGameService.findAll.mockResolvedValue(expected);

      const result = await controller.findAll(query);

      expect(mockGameService.findAll).toHaveBeenCalledWith(query);
      expect(result).toEqual(expected);
    });
  });

  // findById

  describe('findById', () => {
    it('should return a game by IGDB id', async () => {
      mockGameService.findByIgdbId.mockResolvedValue(mockResponseGame);

      const result = await controller.findById(1);

      expect(mockGameService.findByIgdbId).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockResponseGame);
    });

    it('should throw NotFoundError when game does not exist', async () => {
      mockGameService.findByIgdbId.mockRejectedValue(
        new NotFoundError('Game not found'),
      );

      await expect(controller.findById(999)).rejects.toThrow(NotFoundError);
    });
  });

  // findBySlug

  describe('findBySlug', () => {
    it('should return a game by slug', async () => {
      mockGameService.findBySlug.mockResolvedValue(mockResponseGame);

      const result = await controller.findBySlug('the-legend-of-zelda');

      expect(mockGameService.findBySlug).toHaveBeenCalledWith(
        'the-legend-of-zelda',
      );
      expect(result).toEqual(mockResponseGame);
    });

    it('should throw NotFoundError when game does not exist', async () => {
      mockGameService.findBySlug.mockRejectedValue(
        new NotFoundError('Game not found'),
      );

      await expect(controller.findBySlug('nonexistent-slug')).rejects.toThrow(
        NotFoundError,
      );
    });
  });
});
