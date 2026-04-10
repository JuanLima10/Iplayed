import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundError } from 'common/errors/http-status.error';
import { PrismaService } from 'prisma/prisma.service';
import { UserMapper } from './user.mapper';
import { UserService } from './user.service';

jest.mock('common/utils/paginate-normalize.util');
jest.mock('common/utils/query-normalize');
jest.mock('common/builders/prisma-query.builder');

import { buildPrismaQuery } from 'common/builders/prisma-query.builder';
import { normalizePaginate } from 'common/utils/paginate-normalize.util';
import { normalizeQuery } from 'common/utils/query-normalize';

const mockPrisma = {
  user: {
    count: jest.fn(),
    findMany: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
};

const mockPrismaUser = {
  id: 'user-id-1',
  provider: 'discord',
  provider_id: '123456789',
  username: 'testuser',
  name: 'Test User',
  email: 'test@example.com',
  avatar_url: null,
  active: true,
  created_at: new Date('2024-01-01'),
  updated_at: new Date('2024-01-01'),
};

const mockResponseUser = {
  id: 'user-id-1',
  provider: 'discord',
  providerId: '123456789',
  username: 'testuser',
  name: 'Test User',
  email: 'test@example.com',
  avatarUrl: null,
  createdAt: new Date('2024-01-01'),
  updatedAt: new Date('2024-01-01'),
};

const mockFilters = {
  where: { active: true },
  orderBy: { created_at: 'desc' },
  skip: 0,
  take: 10,
};

const mockPaginate = { page: 1, limit: 10, pages: 1, count: 1 };

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    service = moduleRef.get<UserService>(UserService);

    jest.clearAllMocks();
    jest.spyOn(UserMapper, 'toResponse').mockReturnValue(mockResponseUser);
    (normalizeQuery as jest.Mock).mockReturnValue({ page: 1, limit: 10 });
    (buildPrismaQuery as jest.Mock).mockReturnValue(mockFilters);
    (normalizePaginate as jest.Mock).mockReturnValue(mockPaginate);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // findAll

  describe('findAll', () => {
    it('should return paginated users', async () => {
      mockPrisma.user.count.mockResolvedValue(1);
      mockPrisma.user.findMany.mockResolvedValue([mockPrismaUser]);

      const result = await service.findAll();

      expect(normalizeQuery).toHaveBeenCalledWith(undefined);
      expect(buildPrismaQuery).toHaveBeenCalled();
      expect(mockPrisma.user.count).toHaveBeenCalledWith({
        where: mockFilters.where,
      });
      expect(mockPrisma.user.findMany).toHaveBeenCalledWith(mockFilters);
      expect(result).toEqual({
        data: [mockResponseUser],
        paginate: mockPaginate,
      });
    });

    it('should return empty data when no users found', async () => {
      mockPrisma.user.count.mockResolvedValue(0);
      mockPrisma.user.findMany.mockResolvedValue([]);
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
      mockPrisma.user.count.mockResolvedValue(0);
      mockPrisma.user.findMany.mockResolvedValue([]);
      (normalizePaginate as jest.Mock).mockReturnValue({
        page: 1,
        limit: 10,
        pages: 1,
        count: 0,
      });

      const filter = { search: 'test', page: 2, limit: 5 };
      await service.findAll(filter);

      expect(normalizeQuery).toHaveBeenCalledWith(filter);
    });
  });

  // findById

  describe('findById', () => {
    it('should return a user when found', async () => {
      mockPrisma.user.findUnique.mockResolvedValue(mockPrismaUser);

      const result = await service.findById('user-id-1');

      expect(mockPrisma.user.findUnique).toHaveBeenCalledWith({
        where: { id: 'user-id-1', active: true },
      });
      expect(result).toEqual(mockResponseUser);
    });

    it('should throw NotFoundError when user does not exist', async () => {
      mockPrisma.user.findUnique.mockResolvedValue(null);

      await expect(service.findById('nonexistent-id')).rejects.toThrow(
        NotFoundError,
      );
    });
  });

  // update

  describe('update', () => {
    const updateDto = { username: 'updateduser' };

    it('should return updated user on success', async () => {
      mockPrisma.user.update.mockResolvedValue(mockPrismaUser);

      const result = await service.update('user-id-1', updateDto);

      expect(mockPrisma.user.update).toHaveBeenCalledWith({
        where: { id: 'user-id-1', active: true },
        data: updateDto,
      });
      expect(result).toEqual(mockResponseUser);
    });

    it('should throw NotFoundError when user does not exist', async () => {
      mockPrisma.user.update.mockRejectedValue(
        new NotFoundError('User not found'),
      );

      await expect(service.update('nonexistent-id', updateDto)).rejects.toThrow(
        NotFoundError,
      );
    });
  });

  // delete

  describe('delete', () => {
    it('should soft-delete user by setting active to false', async () => {
      mockPrisma.user.update.mockResolvedValue({
        ...mockPrismaUser,
        active: false,
      });

      const result = await service.delete('user-id-1');

      expect(mockPrisma.user.update).toHaveBeenCalledWith({
        where: { id: 'user-id-1', active: true },
        data: { active: false },
      });
      expect(result).toEqual(mockResponseUser);
    });

    it('should throw NotFoundError when user does not exist', async () => {
      mockPrisma.user.update.mockRejectedValue(
        new NotFoundError('User not found'),
      );

      await expect(service.delete('nonexistent-id')).rejects.toThrow(
        NotFoundError,
      );
    });
  });

  // destroy

  describe('destroy', () => {
    it('should permanently delete user when found', async () => {
      mockPrisma.user.findUnique.mockResolvedValue(mockPrismaUser);
      mockPrisma.user.delete.mockResolvedValue(mockPrismaUser);

      await service.destroy('user-id-1');

      expect(mockPrisma.user.findUnique).toHaveBeenCalledWith({
        where: { id: 'user-id-1' },
      });
      expect(mockPrisma.user.delete).toHaveBeenCalledWith({
        where: { id: 'user-id-1' },
      });
    });

    it('should throw NotFoundError when user does not exist', async () => {
      mockPrisma.user.findUnique.mockResolvedValue(null);

      await expect(service.destroy('nonexistent-id')).rejects.toThrow(
        NotFoundError,
      );
      expect(mockPrisma.user.delete).not.toHaveBeenCalled();
    });
  });
});
