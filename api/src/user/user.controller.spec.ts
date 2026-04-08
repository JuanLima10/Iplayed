import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundError } from 'common/errors/http-status.error';
import { UserQueryDto } from './dto/query-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserController } from './user.controller';
import { UserService } from './user.service';

jest.mock('common/decorators/auth.decorator', () => ({
  Auth: () => () => undefined,
}));

jest.mock('common/decorators/current-user.decorator', () => ({
  CurrentUser: () => () => undefined,
}));

jest.mock('common/decorators/swagger.decorator', () => ({
  Swagger: () => () => undefined,
}));

const mockUserService = {
  findAll: jest.fn(),
  findById: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
  destroy: jest.fn(),
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

const mockPaginate = { page: 1, limit: 10, pages: 1, count: 1 };
const mockCurrentUser = { sub: 'user-id-1' };

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [{ provide: UserService, useValue: mockUserService }],
    }).compile();

    controller = moduleRef.get<UserController>(UserController);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return paginated users', async () => {
      const query: UserQueryDto = { page: 1, limit: 10 };
      const expected = { data: [mockResponseUser], paginate: mockPaginate };
      mockUserService.findAll.mockResolvedValue(expected);

      const result = await controller.findAll(query);

      expect(mockUserService.findAll).toHaveBeenCalledWith(query);
      expect(result).toEqual(expected);
    });
  });

  describe('me', () => {
    it('should return the current authenticated user', async () => {
      mockUserService.findById.mockResolvedValue(mockResponseUser);

      const result = await controller.me(mockCurrentUser);

      expect(mockUserService.findById).toHaveBeenCalledWith(
        mockCurrentUser.sub,
      );
      expect(result).toEqual(mockResponseUser);
    });

    it('should throw NotFoundError when user does not exist', async () => {
      mockUserService.findById.mockRejectedValue(
        new NotFoundError('User not found'),
      );

      await expect(controller.me(mockCurrentUser)).rejects.toThrow(
        NotFoundError,
      );
    });
  });

  describe('findById', () => {
    it('should return a user by id', async () => {
      mockUserService.findById.mockResolvedValue(mockResponseUser);

      const result = await controller.findById('user-id-1');

      expect(mockUserService.findById).toHaveBeenCalledWith('user-id-1');
      expect(result).toEqual(mockResponseUser);
    });

    it('should throw NotFoundError when user does not exist', async () => {
      mockUserService.findById.mockRejectedValue(
        new NotFoundError('User not found'),
      );

      await expect(controller.findById('nonexistent-id')).rejects.toThrow(
        NotFoundError,
      );
    });
  });

  describe('update', () => {
    const updateDto: UpdateUserDto = { username: 'updateduser' };

    it('should return the updated user', async () => {
      mockUserService.update.mockResolvedValue(mockResponseUser);

      const result = await controller.update(mockCurrentUser, updateDto);

      expect(mockUserService.update).toHaveBeenCalledWith(
        mockCurrentUser.sub,
        updateDto,
      );
      expect(result).toEqual(mockResponseUser);
    });

    it('should throw NotFoundError when user does not exist', async () => {
      mockUserService.update.mockRejectedValue(
        new NotFoundError('User not found'),
      );

      await expect(
        controller.update(mockCurrentUser, updateDto),
      ).rejects.toThrow(NotFoundError);
    });
  });

  describe('delete', () => {
    it('should soft-delete and return the user', async () => {
      mockUserService.delete.mockResolvedValue(mockResponseUser);

      const result = await controller.delete(mockCurrentUser);

      expect(mockUserService.delete).toHaveBeenCalledWith(mockCurrentUser.sub);
      expect(result).toEqual(mockResponseUser);
    });

    it('should throw NotFoundError when user does not exist', async () => {
      mockUserService.delete.mockRejectedValue(
        new NotFoundError('User not found'),
      );

      await expect(controller.delete(mockCurrentUser)).rejects.toThrow(
        NotFoundError,
      );
    });
  });

  describe('destroy', () => {
    it('should permanently delete the user and return undefined', async () => {
      mockUserService.destroy.mockResolvedValue(undefined);

      const result = await controller.destroy(mockCurrentUser);

      expect(mockUserService.destroy).toHaveBeenCalledWith(mockCurrentUser.sub);
      expect(result).toBeUndefined();
    });

    it('should throw NotFoundError when user does not exist', async () => {
      mockUserService.destroy.mockRejectedValue(
        new NotFoundError('User not found'),
      );

      await expect(controller.destroy(mockCurrentUser)).rejects.toThrow(
        NotFoundError,
      );
    });
  });
});
