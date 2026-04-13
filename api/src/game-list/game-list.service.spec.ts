import { Test, TestingModule } from '@nestjs/testing';
import { IgdbClient } from 'common/clients/igdb.client';
import { ConflictError, NotFoundError } from 'common/errors/http-status.error';
import { PrismaService } from 'prisma/prisma.service';
import { GameListService } from './game-list.service';

jest.mock('common/builders/prisma-query.builder');
jest.mock('common/utils/paginate-normalize.util');
jest.mock('common/utils/query-normalize');
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

import { buildPrismaQuery } from 'common/builders/prisma-query.builder';
import { normalizePaginate } from 'common/utils/paginate-normalize.util';
import { normalizeQuery } from 'common/utils/query-normalize';
import { GameMapper } from 'src/game/game.mapper';
import { ListItemMapper } from 'src/list-item/list-item.mapper';
import { GameListMapper } from './game-list.mapper';

const mockListToResponse = GameListMapper.toResponse as jest.Mock;
const mockItemToResponse = ListItemMapper.toResponse as jest.Mock;
const mockGameToResponse = GameMapper.toResponse as jest.Mock;

const mockPrisma = {
  game_list: {
    count: jest.fn(),
    findMany: jest.fn(),
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
  list_item: {
    count: jest.fn(),
    findMany: jest.fn(),
  },
};

const mockIgdbClient = { getIgdbBySlug: jest.fn() };

const mockGameEntity = {
  id: 'game-id-1',
  igdb_id: 1942,
  title: 'The Witcher 3',
  slug: 'the-witcher-3',
  cover_id: 'abc',
  created_at: new Date('2024-01-01'),
  updated_at: null,
};

const mockListEntity = {
  id: 'list-id-1',
  user_id: 'user-id-1',
  name: 'My Top RPGs',
  created_at: new Date('2024-01-01'),
  updated_at: null,
};

const mockItemEntity = {
  id: 'item-id-1',
  list_id: 'list-id-1',
  game_id: 'game-id-1',
  position: 0,
  added_at: new Date('2024-01-01'),
};

const mockResponseList = {
  id: 'list-id-1',
  userId: 'user-id-1',
  name: 'My Top RPGs',
  createdAt: new Date('2024-01-01'),
  updatedAt: null,
};

const mockResponseItem = {
  id: 'item-id-1',
  listId: 'list-id-1',
  gameId: 'game-id-1',
  position: 0,
  addedAt: new Date('2024-01-01'),
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

const mockFilters = {
  where: {},
  orderBy: { position: 'asc' },
  skip: 0,
  take: 10,
};
const mockPaginate = { page: 1, limit: 10, pages: 1, count: 1 };
const mockListWithItems = {
  ...mockListEntity,
  items: [{ ...mockItemEntity, game: mockGameEntity }],
};

describe('GameListService', () => {
  let service: GameListService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        GameListService,
        { provide: PrismaService, useValue: mockPrisma },
        { provide: IgdbClient, useValue: mockIgdbClient },
      ],
    }).compile();

    service = moduleRef.get<GameListService>(GameListService);

    jest.clearAllMocks();
    mockListToResponse.mockReturnValue(mockResponseList);
    mockItemToResponse.mockReturnValue(mockResponseItem);
    mockGameToResponse.mockReturnValue(mockResponseGame);
    (normalizeQuery as jest.Mock).mockReturnValue({ page: 1, limit: 10 });
    (buildPrismaQuery as jest.Mock).mockReturnValue({ ...mockFilters });
    (normalizePaginate as jest.Mock).mockReturnValue(mockPaginate);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // findAll

  describe('findAll', () => {
    it('should return paginated lists with items and games', async () => {
      mockPrisma.game_list.count.mockResolvedValue(1);
      mockPrisma.game_list.findMany.mockResolvedValue([mockListWithItems]);

      const result = await service.findAll();

      expect(normalizeQuery).toHaveBeenCalledWith(undefined);
      expect(buildPrismaQuery).toHaveBeenCalled();
      expect(mockListToResponse).toHaveBeenCalledTimes(1);
      expect(mockGameToResponse).toHaveBeenCalledWith(mockGameEntity);
      expect(result).toEqual({
        data: [
          {
            ...mockResponseList,
            items: [{ ...mockResponseItem, game: mockResponseGame }],
          },
        ],
        paginate: mockPaginate,
      });
    });

    it('should return empty data when no lists found', async () => {
      mockPrisma.game_list.count.mockResolvedValue(0);
      mockPrisma.game_list.findMany.mockResolvedValue([]);
      (normalizePaginate as jest.Mock).mockReturnValue({
        ...mockPaginate,
        count: 0,
      });

      const result = await service.findAll();

      expect(result.data).toEqual([]);
      expect(result.paginate.count).toBe(0);
    });
  });

  // findByUserId

  describe('findByUserId', () => {
    it('should return paginated lists filtered by user', async () => {
      mockPrisma.game_list.count.mockResolvedValue(1);
      mockPrisma.game_list.findMany.mockResolvedValue([mockListWithItems]);

      const result = await service.findByUserId('user-id-1');

      expect(normalizeQuery).toHaveBeenCalledWith(undefined);
      expect(result).toEqual({
        data: [
          {
            ...mockResponseList,
            items: [{ ...mockResponseItem, game: mockResponseGame }],
          },
        ],
        paginate: mockPaginate,
      });
    });

    it('should return empty data when user has no lists', async () => {
      mockPrisma.game_list.count.mockResolvedValue(0);
      mockPrisma.game_list.findMany.mockResolvedValue([]);
      (normalizePaginate as jest.Mock).mockReturnValue({
        ...mockPaginate,
        count: 0,
      });

      const result = await service.findByUserId('user-id-1');

      expect(result.data).toEqual([]);
    });
  });

  // findById

  describe('findById', () => {
    it('should return list with paginated items', async () => {
      mockPrisma.game_list.findUnique.mockResolvedValue(mockListEntity);
      mockPrisma.list_item.count.mockResolvedValue(1);
      mockPrisma.list_item.findMany.mockResolvedValue([
        { ...mockItemEntity, game: mockGameEntity },
      ]);

      const result = await service.findById('list-id-1');

      expect(mockPrisma.game_list.findUnique).toHaveBeenCalledWith({
        where: { id: 'list-id-1' },
      });
      expect(result).toEqual({
        data: {
          ...mockResponseList,
          items: [{ ...mockResponseItem, game: mockResponseGame }],
        },
        paginate: mockPaginate,
      });
    });

    it('should throw NotFoundError when list does not exist', async () => {
      mockPrisma.game_list.findUnique.mockResolvedValue(null);

      await expect(service.findById('nonexistent')).rejects.toThrow(
        NotFoundError,
      );
      expect(mockPrisma.list_item.findMany).not.toHaveBeenCalled();
    });
  });

  // create

  describe('create', () => {
    it('should create and return the list', async () => {
      mockPrisma.game_list.findUnique.mockResolvedValue(null);
      mockPrisma.game_list.create.mockResolvedValue(mockListEntity);

      const result = await service.create('user-id-1', { name: 'My Top RPGs' });

      expect(mockPrisma.game_list.findUnique).toHaveBeenCalledWith({
        where: { user_id_name: { user_id: 'user-id-1', name: 'My Top RPGs' } },
      });
      expect(mockPrisma.game_list.create).toHaveBeenCalledWith({
        data: { user_id: 'user-id-1', name: 'My Top RPGs' },
      });
      expect(result).toEqual(mockResponseList);
    });

    it('should throw ConflictError when list name already exists', async () => {
      mockPrisma.game_list.findUnique.mockResolvedValue(mockListEntity);

      await expect(
        service.create('user-id-1', { name: 'My Top RPGs' }),
      ).rejects.toThrow(ConflictError);
      expect(mockPrisma.game_list.create).not.toHaveBeenCalled();
    });
  });

  // update

  describe('update', () => {
    it('should update and return the list', async () => {
      mockPrisma.game_list.findUnique
        .mockResolvedValueOnce(mockListEntity)
        .mockResolvedValueOnce(null);
      mockPrisma.game_list.update.mockResolvedValue({
        ...mockListEntity,
        name: 'My Top JRPGs',
      });
      mockListToResponse.mockReturnValue({
        ...mockResponseList,
        name: 'My Top JRPGs',
      });

      const result = await service.update('user-id-1', 'list-id-1', {
        name: 'My Top JRPGs',
      });

      expect(mockPrisma.game_list.update).toHaveBeenCalledWith({
        where: { id: 'list-id-1' },
        data: { name: 'My Top JRPGs' },
      });
      expect(result.name).toBe('My Top JRPGs');
    });

    it('should throw NotFoundError when list does not belong to user', async () => {
      mockPrisma.game_list.findUnique.mockResolvedValue(null);

      await expect(
        service.update('user-id-1', 'list-id-1', { name: 'New Name' }),
      ).rejects.toThrow(NotFoundError);
      expect(mockPrisma.game_list.update).not.toHaveBeenCalled();
    });

    it('should throw ConflictError when new name already exists', async () => {
      mockPrisma.game_list.findUnique
        .mockResolvedValueOnce(mockListEntity)
        .mockResolvedValueOnce({ ...mockListEntity, id: 'other-list-id' });

      await expect(
        service.update('user-id-1', 'list-id-1', {
          name: 'Other Existing List',
        }),
      ).rejects.toThrow(ConflictError);
      expect(mockPrisma.game_list.update).not.toHaveBeenCalled();
    });
  });

  // delete

  describe('delete', () => {
    it('should delete list and return deleted true', async () => {
      mockPrisma.game_list.findUnique.mockResolvedValue(mockListEntity);
      mockPrisma.game_list.delete.mockResolvedValue(mockListEntity);

      const result = await service.delete('user-id-1', 'list-id-1');

      expect(mockPrisma.game_list.delete).toHaveBeenCalledWith({
        where: { id: 'list-id-1' },
      });
      expect(result).toEqual({ deleted: true });
    });

    it('should throw NotFoundError when list does not belong to user', async () => {
      mockPrisma.game_list.findUnique.mockResolvedValue(null);

      await expect(service.delete('user-id-1', 'nonexistent')).rejects.toThrow(
        NotFoundError,
      );
      expect(mockPrisma.game_list.delete).not.toHaveBeenCalled();
    });
  });
});
