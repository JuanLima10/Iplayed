import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundError } from 'common/errors/http-status.error';
import { CreateListItemDto } from './dto/create-list-item.dto';
import { ReorderListItemsDto } from './dto/reorder-list-item.dto';
import { ListItemController } from './list-item.controller';
import { ListItemService } from './list-item.service';

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
  'src/game-list/dto/response-game-list.dto',
  () => ({ ResponseGameListDto: class {} }),
  { virtual: true },
);
jest.mock(
  'src/game-list/game-list.mapper',
  () => ({ GameListMapper: { toResponse: jest.fn() } }),
  { virtual: true },
);
jest.mock(
  'src/game/game.mapper',
  () => ({ GameMapper: { toResponse: jest.fn() } }),
  { virtual: true },
);
jest.mock(
  'src/game-list/game-list.service',
  () => ({
    GameListService: jest
      .fn()
      .mockImplementation(() => ({ findById: jest.fn() })),
  }),
  { virtual: true },
);

const mockListItemService = {
  create: jest.fn(),
  reorder: jest.fn(),
  delete: jest.fn(),
};

const mockResponseItem = {
  id: 'item-id-1',
  listId: 'list-id-1',
  gameId: 'game-id-1',
  position: 0,
  addedAt: new Date('2024-01-01'),
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

describe('ListItemController', () => {
  let controller: ListItemController;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [ListItemController],
      providers: [{ provide: ListItemService, useValue: mockListItemService }],
    }).compile();

    controller = moduleRef.get<ListItemController>(ListItemController);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // create

  describe('create', () => {
    const dto: CreateListItemDto = { slug: 'the-witcher-3' };

    it('should add game to list and return the item', async () => {
      const expected = { data: { ...mockResponseItem, game: {} } };
      mockListItemService.create.mockResolvedValue(expected);

      const result = await controller.create(mockCurrentUser, 'list-id-1', dto);

      expect(mockListItemService.create).toHaveBeenCalledWith(
        mockCurrentUser.sub,
        'list-id-1',
        dto,
      );
      expect(result).toEqual(expected);
    });

    it('should throw NotFoundError when list does not exist', async () => {
      mockListItemService.create.mockRejectedValue(
        new NotFoundError('List not found'),
      );

      await expect(
        controller.create(mockCurrentUser, 'nonexistent', dto),
      ).rejects.toThrow(NotFoundError);
    });

    it('should throw NotFoundError when game does not exist', async () => {
      mockListItemService.create.mockRejectedValue(
        new NotFoundError('Game not found'),
      );

      await expect(
        controller.create(mockCurrentUser, 'list-id-1', {
          slug: 'nonexistent',
        }),
      ).rejects.toThrow(NotFoundError);
    });
  });

  // reorder

  describe('reorder', () => {
    const dto: ReorderListItemsDto = {
      items: [{ itemId: 'item-id-1', position: 2 }],
    };

    it('should reorder items and return updated list', async () => {
      const expected = {
        data: { ...mockResponseList, items: [] },
        paginate: mockPaginate,
      };
      mockListItemService.reorder.mockResolvedValue(expected);

      const result = await controller.reorder(
        mockCurrentUser,
        'list-id-1',
        dto,
      );

      expect(mockListItemService.reorder).toHaveBeenCalledWith(
        mockCurrentUser.sub,
        'list-id-1',
        dto,
      );
      expect(result).toEqual(expected);
    });

    it('should throw NotFoundError when list does not exist', async () => {
      mockListItemService.reorder.mockRejectedValue(
        new NotFoundError('List not found'),
      );

      await expect(
        controller.reorder(mockCurrentUser, 'nonexistent', dto),
      ).rejects.toThrow(NotFoundError);
    });
  });

  // delete

  describe('delete', () => {
    it('should delete item and return deleted true', async () => {
      mockListItemService.delete.mockResolvedValue({ deleted: true });

      const result = await controller.delete(
        mockCurrentUser,
        'list-id-1',
        'item-id-1',
      );

      expect(mockListItemService.delete).toHaveBeenCalledWith(
        mockCurrentUser.sub,
        'list-id-1',
        'item-id-1',
      );
      expect(result).toEqual({ deleted: true });
    });

    it('should throw NotFoundError when list does not exist', async () => {
      mockListItemService.delete.mockRejectedValue(
        new NotFoundError('List not found'),
      );

      await expect(
        controller.delete(mockCurrentUser, 'nonexistent', 'item-id-1'),
      ).rejects.toThrow(NotFoundError);
    });

    it('should throw NotFoundError when item does not exist in list', async () => {
      mockListItemService.delete.mockRejectedValue(
        new NotFoundError('Item not found in list'),
      );

      await expect(
        controller.delete(mockCurrentUser, 'list-id-1', 'nonexistent'),
      ).rejects.toThrow(NotFoundError);
    });
  });
});
