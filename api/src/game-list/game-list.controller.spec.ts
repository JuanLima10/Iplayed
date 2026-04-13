import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundError } from 'common/errors/http-status.error';
import { CreateGameListDto } from './dto/create-game-list.dto';
import { UpdateGameListDto } from './dto/update-game-list.dto';
import { GameListController } from './game-list.controller';
import { GameListService } from './game-list.service';

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
  'src/list-item/dto/query-list-item.dto',
  () => ({
    ListItemQuery: {
      searchableFields: ['game.title', 'game.slug'],
      defaultOrderBy: { position: 'asc' },
    },
    QueryListItemDto: class {},
  }),
  { virtual: true },
);
jest.mock('./game-list.mapper', () => ({
  GameListMapper: { toResponse: jest.fn() },
}));
jest.mock(
  'src/list-item/list-item.mapper',
  () => ({ ListItemMapper: { toResponse: jest.fn() } }),
  { virtual: true },
);
jest.mock(
  'src/game/game.mapper',
  () => ({ GameMapper: { toResponse: jest.fn() } }),
  { virtual: true },
);

const mockGameListService = {
  findAll: jest.fn(),
  findById: jest.fn(),
  findByUserId: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

const mockResponseList = {
  id: 'list-id-1',
  userId: 'user-id-1',
  name: 'My Top RPGs',
  createdAt: new Date('2024-01-01'),
  updatedAt: null,
};

const mockPaginate = { page: 1, limit: 10, pages: 1, count: 1 };
const mockCurrentUser = { sub: 'user-id-1' };

describe('GameListController', () => {
  let controller: GameListController;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [GameListController],
      providers: [{ provide: GameListService, useValue: mockGameListService }],
    }).compile();

    controller = moduleRef.get<GameListController>(GameListController);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // findAll

  describe('findAll', () => {
    it('should return paginated lists', async () => {
      const query = { page: 1, limit: 10 };
      const expected = { data: [mockResponseList], paginate: mockPaginate };
      mockGameListService.findAll.mockResolvedValue(expected);

      const result = await controller.findAll(query);

      expect(mockGameListService.findAll).toHaveBeenCalledWith(query);
      expect(result).toEqual(expected);
    });
  });

  // findById

  describe('findById', () => {
    it('should return a list by id with paginated items', async () => {
      const query = { page: 1, limit: 10 };
      const expected = {
        data: { ...mockResponseList, items: [] },
        paginate: mockPaginate,
      };
      mockGameListService.findById.mockResolvedValue(expected);

      const result = await controller.findById('list-id-1', query);

      expect(mockGameListService.findById).toHaveBeenCalledWith(
        'list-id-1',
        query,
      );
      expect(result).toEqual(expected);
    });

    it('should throw NotFoundError when list does not exist', async () => {
      mockGameListService.findById.mockRejectedValue(
        new NotFoundError('List not found'),
      );

      await expect(controller.findById('nonexistent', {})).rejects.toThrow(
        NotFoundError,
      );
    });
  });

  // findByUser

  describe('findByUser', () => {
    it('should return paginated lists for a user', async () => {
      const query = { page: 1, limit: 10 };
      const expected = { data: [mockResponseList], paginate: mockPaginate };
      mockGameListService.findByUserId.mockResolvedValue(expected);

      const result = await controller.findByUser('user-id-1', query);

      expect(mockGameListService.findByUserId).toHaveBeenCalledWith(
        'user-id-1',
        query,
      );
      expect(result).toEqual(expected);
    });
  });

  // create

  describe('create', () => {
    const dto: CreateGameListDto = { name: 'My Top RPGs' };

    it('should create and return the list', async () => {
      mockGameListService.create.mockResolvedValue(mockResponseList);

      const result = await controller.create(mockCurrentUser, dto);

      expect(mockGameListService.create).toHaveBeenCalledWith(
        mockCurrentUser.sub,
        dto,
      );
      expect(result).toEqual(mockResponseList);
    });
  });

  // update

  describe('update', () => {
    const dto: UpdateGameListDto = { name: 'My Top JRPGs' };

    it('should update and return the list', async () => {
      const updated = { ...mockResponseList, name: 'My Top JRPGs' };
      mockGameListService.update.mockResolvedValue(updated);

      const result = await controller.update(mockCurrentUser, 'list-id-1', dto);

      expect(mockGameListService.update).toHaveBeenCalledWith(
        mockCurrentUser.sub,
        'list-id-1',
        dto,
      );
      expect(result).toEqual(updated);
    });

    it('should throw NotFoundError when list does not exist', async () => {
      mockGameListService.update.mockRejectedValue(
        new NotFoundError('List not found'),
      );

      await expect(
        controller.update(mockCurrentUser, 'nonexistent', dto),
      ).rejects.toThrow(NotFoundError);
    });
  });

  // delete

  describe('delete', () => {
    it('should delete list and return deleted true', async () => {
      mockGameListService.delete.mockResolvedValue({ deleted: true });

      const result = await controller.delete(mockCurrentUser, 'list-id-1');

      expect(mockGameListService.delete).toHaveBeenCalledWith(
        mockCurrentUser.sub,
        'list-id-1',
      );
      expect(result).toEqual({ deleted: true });
    });

    it('should throw NotFoundError when list does not exist', async () => {
      mockGameListService.delete.mockRejectedValue(
        new NotFoundError('List not found'),
      );

      await expect(
        controller.delete(mockCurrentUser, 'nonexistent'),
      ).rejects.toThrow(NotFoundError);
    });
  });
});
