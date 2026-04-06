import axios from 'axios';
import { UnauthorizedError } from 'common/errors/http-status.error';
import { getDiscordUser } from 'services/discord-oauth.service';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const mockTokenResponse = { data: { access_token: 'valid-access-token' } };

const mockDiscordUser = {
  data: {
    id: '123456789',
    username: 'testuser',
    global_name: 'Test User',
    email: 'test@example.com',
    avatar: null,
  },
};

const mockDiscordUserWithAvatar = {
  data: {
    ...mockDiscordUser.data,
    avatar: 'abc123hash',
  },
};

describe('getDiscordUser', () => {
  beforeEach(() => {
    process.env.DISCORD_CLIENT_ID = 'client-id';
    process.env.DISCORD_CLIENT_SECRET = 'client-secret';
    process.env.DISCORD_REDIRECT_URI = 'http://localhost/callback';
    jest.clearAllMocks();
  });

  it('should throw UnauthorizedError when code is empty', async () => {
    await expect(getDiscordUser('')).rejects.toThrow(UnauthorizedError);
  });

  it('should throw UnauthorizedError when Discord returns no access_token', async () => {
    mockedAxios.post.mockResolvedValueOnce({ data: {} });

    await expect(getDiscordUser('some-code')).rejects.toThrow(
      UnauthorizedError,
    );
  });

  it('should call Discord token endpoint with correct params', async () => {
    mockedAxios.post.mockResolvedValueOnce(mockTokenResponse);
    mockedAxios.get.mockResolvedValueOnce(mockDiscordUser);

    await getDiscordUser('my-code');

    expect(mockedAxios.post.mock.calls[0]).toEqual([
      'https://discord.com/api/oauth2/token',
      expect.any(URLSearchParams),
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } },
    ]);

    const sentParams = mockedAxios.post.mock.calls[0][1];
    expect(sentParams).toBeInstanceOf(URLSearchParams);

    if (!(sentParams instanceof URLSearchParams)) {
      throw new Error('Expected axios.post payload to be URLSearchParams');
    }

    expect(sentParams.get('client_id')).toBe('client-id');
    expect(sentParams.get('client_secret')).toBe('client-secret');
    expect(sentParams.get('grant_type')).toBe('authorization_code');
    expect(sentParams.get('code')).toBe('my-code');
    expect(sentParams.get('redirect_uri')).toBe('http://localhost/callback');
  });

  it('should call Discord user endpoint with Bearer token', async () => {
    mockedAxios.post.mockResolvedValueOnce(mockTokenResponse);
    mockedAxios.get.mockResolvedValueOnce(mockDiscordUser);

    await getDiscordUser('my-code');

    expect(mockedAxios.get.mock.calls[0]).toEqual([
      'https://discord.com/api/users/@me',
      { headers: { Authorization: 'Bearer valid-access-token' } },
    ]);
  });

  it('should return correct UserData without avatar', async () => {
    mockedAxios.post.mockResolvedValueOnce(mockTokenResponse);
    mockedAxios.get.mockResolvedValueOnce(mockDiscordUser);

    const result = await getDiscordUser('my-code');

    expect(result).toEqual({
      provider: 'discord',
      provider_id: '123456789',
      username: 'testuser',
      name: 'Test User',
      email: 'test@example.com',
      avatar_url: null,
    });
  });

  it('should return correct avatar_url when user has avatar', async () => {
    mockedAxios.post.mockResolvedValueOnce(mockTokenResponse);
    mockedAxios.get.mockResolvedValueOnce(mockDiscordUserWithAvatar);

    const result = await getDiscordUser('my-code');

    expect(result.avatar_url).toBe(
      'https://cdn.discordapp.com/avatars/123456789/abc123hash.png',
    );
  });

  it('should propagate errors thrown by axios.post', async () => {
    mockedAxios.post.mockRejectedValueOnce(new Error('Network error'));

    await expect(getDiscordUser('my-code')).rejects.toThrow('Network error');
  });

  it('should propagate errors thrown by axios.get', async () => {
    mockedAxios.post.mockResolvedValueOnce(mockTokenResponse);
    mockedAxios.get.mockRejectedValueOnce(new Error('Discord API down'));

    await expect(getDiscordUser('my-code')).rejects.toThrow('Discord API down');
  });
});
