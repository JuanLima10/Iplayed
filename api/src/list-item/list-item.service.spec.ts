/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Test, TestingModule } from '@nestjs/testing';
import { IgdbClient } from 'common/clients/igdb.client';
import { ConflictError, NotFoundError } from 'common/errors/http-status.error';
import { PrismaService } from 'prisma/prisma.service';
import { ListItemService } from './list-item.service';

jest.mock('common/utils/cover-id-extract.util');
jest.mock('./list-item.mapper', () => ({
  ListItemMapper: { toResponse: jest.fn() },
}));
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

import { extractCoverId } from 'common/utils/cover-id-extract.util';
import { GameListMapper } from 'src/game-list/game-list.mapper';
import { GameMapper } from 'src/game/game.mapper';
import { ListItemMapper } from './list-item.mapper';

const mockItemToResponse = ListItemMapper.toResponse as jest.Mock;
const mockListToResponse = GameListMapper.toResponse as jest.Mock;
const mockGameToResponse = GameMapper.toResponse as jest.Mock;

const mockPrisma = {
  game_list: {
    findUnique: jest.fn(),
  },
  game: {
    upsert: jest.fn(),
  },
  list_item: {
    findUnique: jest.fn(),
    aggregate: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    deleteMany: jest.fn(),
  },
  $transaction: jest.fn(),
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

const mockIgdbGame = {
  id: 1942,
  name: 'The Witcher 3',
  slug: 'the-witcher-3',
  cover: { url: '//images.igdb.com/igdb/image/upload/t_thumb/abc.jpg' },
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

describe('ListItemService', () => {
  let service: ListItemService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        ListItemService,
        { provide: PrismaService, useValue: mockPrisma },
        { provide: IgdbClient, useValue: mockIgdbClient },
      ],
    }).compile();

    service = moduleRef.get<ListItemService>(ListItemService);

    jest.clearAllMocks();
    mockItemToResponse.mockReturnValue(mockResponseItem);
    mockListToResponse.mockReturnValue(mockResponseList);
    mockGameToResponse.mockReturnValue(mockResponseGame);
    (extractCoverId as jest.Mock).mockReturnValue('abc');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // create

  describe('create', () => {
    it('should add a game to the list and return the item', async () => {
      mockPrisma.game_list.findUnique.mockResolvedValue(mockListEntity);
      mockIgdbClient.getIgdbBySlug.mockResolvedValue(mockIgdbGame);
      mockPrisma.game.upsert.mockResolvedValue({ id: 'game-id-1' });
      mockPrisma.list_item.findUnique.mockResolvedValue(null);
      mockPrisma.list_item.aggregate.mockResolvedValue({
        _max: { position: -1 },
      });
      mockPrisma.list_item.create.mockResolvedValue({
        ...mockItemEntity,
        game: mockGameEntity,
      });

      const result = await service.create('user-id-1', 'list-id-1', {
        slug: 'the-witcher-3',
      });

      expect(mockPrisma.game_list.findUnique).toHaveBeenCalledWith({
        where: { id: 'list-id-1', user_id: 'user-id-1' },
      });
      expect(mockIgdbClient.getIgdbBySlug).toHaveBeenCalledWith(
        'the-witcher-3',
      );
      expect(mockPrisma.list_item.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: { list_id: 'list-id-1', game_id: 'game-id-1', position: 0 },
        }),
      );
      expect(result).toEqual({
        data: { ...mockResponseItem, game: mockResponseGame },
      });
    });

    it('should throw NotFoundError when list does not belong to user', async () => {
      mockPrisma.game_list.findUnique.mockResolvedValue(null);

      await expect(
        service.create('user-id-1', 'list-id-1', { slug: 'the-witcher-3' }),
      ).rejects.toThrow(NotFoundError);
      expect(mockIgdbClient.getIgdbBySlug).not.toHaveBeenCalled();
    });

    it('should throw NotFoundError when IGDB game does not exist', async () => {
      mockPrisma.game_list.findUnique.mockResolvedValue(mockListEntity);
      mockIgdbClient.getIgdbBySlug.mockResolvedValue(undefined);

      await expect(
        service.create('user-id-1', 'list-id-1', { slug: 'nonexistent' }),
      ).rejects.toThrow(NotFoundError);
      expect(mockPrisma.list_item.create).not.toHaveBeenCalled();
    });

    it('should throw ConflictError when game is already in the list', async () => {
      mockPrisma.game_list.findUnique.mockResolvedValue(mockListEntity);
      mockIgdbClient.getIgdbBySlug.mockResolvedValue(mockIgdbGame);
      mockPrisma.game.upsert.mockResolvedValue({ id: 'game-id-1' });
      mockPrisma.list_item.findUnique.mockResolvedValue(mockItemEntity);

      await expect(
        service.create('user-id-1', 'list-id-1', { slug: 'the-witcher-3' }),
      ).rejects.toThrow(ConflictError);
      expect(mockPrisma.list_item.create).not.toHaveBeenCalled();
    });

    it('should respect custom position when provided', async () => {
      mockPrisma.game_list.findUnique.mockResolvedValue(mockListEntity);
      mockIgdbClient.getIgdbBySlug.mockResolvedValue(mockIgdbGame);
      mockPrisma.game.upsert.mockResolvedValue({ id: 'game-id-1' });
      mockPrisma.list_item.findUnique.mockResolvedValue(null);
      mockPrisma.list_item.create.mockResolvedValue({
        ...mockItemEntity,
        position: 3,
        game: mockGameEntity,
      });

      await service.create('user-id-1', 'list-id-1', {
        slug: 'the-witcher-3',
        position: 3,
      });

      expect(mockPrisma.list_item.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({ position: 3 }),
        }),
      );
    });
  });

  // reorder

  describe('reorder', () => {
    it('should reorder items and return updated list', async () => {
      mockPrisma.game_list.findUnique
        .mockResolvedValueOnce(mockListEntity)
        .mockResolvedValueOnce(mockListEntity);
      mockPrisma.$transaction.mockResolvedValue([]);

      await service.reorder('user-id-1', 'list-id-1', {
        items: [{ itemId: 'item-id-1', position: 2 }],
      });

      expect(mockPrisma.game_list.findUnique).toHaveBeenCalledWith({
        where: { id: 'list-id-1', user_id: 'user-id-1' },
      });
      expect(mockPrisma.$transaction).toHaveBeenCalled();
    });

    it('should throw NotFoundError when list does not belong to user', async () => {
      mockPrisma.game_list.findUnique.mockResolvedValue(null);

      await expect(
        service.reorder('user-id-1', 'list-id-1', {
          items: [{ itemId: 'item-id-1', position: 0 }],
        }),
      ).rejects.toThrow(NotFoundError);
      expect(mockPrisma.$transaction).not.toHaveBeenCalled();
    });
  });

  // delete

  describe('delete', () => {
    it('should delete item and return deleted true', async () => {
      mockPrisma.game_list.findUnique.mockResolvedValue(mockListEntity);
      mockPrisma.list_item.deleteMany.mockResolvedValue({ count: 1 });

      const result = await service.delete(
        'user-id-1',
        'list-id-1',
        'item-id-1',
      );

      expect(mockPrisma.list_item.deleteMany).toHaveBeenCalledWith({
        where: { id: 'item-id-1', list_id: 'list-id-1' },
      });
      expect(result).toEqual({ deleted: true });
    });

    it('should throw NotFoundError when list does not belong to user', async () => {
      mockPrisma.game_list.findUnique.mockResolvedValue(null);

      await expect(
        service.delete('user-id-1', 'list-id-1', 'item-id-1'),
      ).rejects.toThrow(NotFoundError);
      expect(mockPrisma.list_item.deleteMany).not.toHaveBeenCalled();
    });

    it('should throw NotFoundError when item is not in the list', async () => {
      mockPrisma.game_list.findUnique.mockResolvedValue(mockListEntity);
      mockPrisma.list_item.deleteMany.mockResolvedValue({ count: 0 });

      await expect(
        service.delete('user-id-1', 'list-id-1', 'nonexistent'),
      ).rejects.toThrow(NotFoundError);
    });
  });
});
