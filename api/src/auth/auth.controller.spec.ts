import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

jest.mock('express', () => ({}), { virtual: true });

const mockAuthService = {
  getDiscordAuthUrl: jest.fn(),
  handleDiscordCallback: jest.fn(),
};

interface MockResponse {
  redirect: jest.Mock;
}

const mockRes: MockResponse = {
  redirect: jest.fn(),
};

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: AuthService, useValue: mockAuthService }],
    }).compile();

    controller = moduleRef.get<AuthController>(AuthController);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('redirectToDiscord', () => {
    it('should redirect to the Discord OAuth URL', () => {
      const discordUrl = 'https://discord.com/oauth2/authorize?client_id=123';
      mockAuthService.getDiscordAuthUrl.mockReturnValue(discordUrl);

      controller.redirectToDiscord(mockRes as never);

      expect(mockAuthService.getDiscordAuthUrl).toHaveBeenCalledTimes(1);
      expect(mockRes.redirect).toHaveBeenCalledWith(discordUrl);
    });
  });

  describe('discordCallback', () => {
    beforeEach(() => {
      process.env.FRONTEND_URL = 'http://localhost:3000';
    });

    it('should redirect to frontend with token on success', async () => {
      mockAuthService.handleDiscordCallback.mockResolvedValue(
        'mocked.jwt.token',
      );

      await controller.discordCallback(mockRes as never, 'valid-code');

      expect(mockAuthService.handleDiscordCallback).toHaveBeenCalledWith(
        'valid-code',
      );
      expect(mockRes.redirect).toHaveBeenCalledWith(
        'http://localhost:3000/auth/callback?token=mocked.jwt.token',
      );
    });

    it('should propagate errors thrown by handleDiscordCallback', async () => {
      mockAuthService.handleDiscordCallback.mockRejectedValue(
        new Error('Auth failed'),
      );

      await expect(
        controller.discordCallback(mockRes as never, 'bad-code'),
      ).rejects.toThrow('Auth failed');
    });
  });
});
