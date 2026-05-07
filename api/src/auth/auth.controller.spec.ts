/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

jest.mock('express', () => ({}), { virtual: true });

const mockAuthService = {
  getDiscordAuthUrl: jest.fn(),
  handleDiscordCallback: jest.fn(),
};

interface MockResponse {
  clearCookie: jest.Mock<void, [string, Record<string, unknown>?]>;
  cookie: jest.Mock<void, [string, string, Record<string, unknown>?]>;
  redirect: jest.Mock<void, [string]>;
}

const mockRes: MockResponse = {
  clearCookie: jest.fn<void, [string, Record<string, unknown>?]>(),
  cookie: jest.fn<void, [string, string, Record<string, unknown>?]>(),
  redirect: jest.fn<void, [string]>(),
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
      expect(mockRes.cookie).toHaveBeenCalledWith(
        'iplayed_session',
        'mocked.jwt.token',
        expect.objectContaining({
          httpOnly: true,
          path: '/',
        }),
      );

      const [[redirectUrl]] = mockRes.redirect.mock.calls;
      expect(redirectUrl).toContain(process.env.FRONTEND_URL);
      expect(redirectUrl).toContain('token=mocked.jwt.token');
    });

    it('should propagate errors thrown by handleDiscordCallback', async () => {
      mockAuthService.handleDiscordCallback.mockRejectedValue(
        new Error('Auth failed'),
      );

      await controller.discordCallback(mockRes as never, 'bad-code');

      const [[redirectUrl]] = mockRes.redirect.mock.calls;
      expect(redirectUrl).toContain(process.env.FRONTEND_URL);
      expect(redirectUrl).toContain('error=auth_failed');
    });
  });

  describe('signOut', () => {
    it('should clear the session cookie', () => {
      controller.signOut(mockRes as never);

      expect(mockRes.clearCookie).toHaveBeenCalledWith(
        'iplayed_session',
        expect.objectContaining({
          path: '/',
        }),
      );
    });
  });
});
