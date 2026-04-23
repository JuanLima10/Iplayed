import { IGameIgdbVideo } from 'common/interfaces/igdb.client.interface';

export function extractVideoId(videos?: IGameIgdbVideo[]): string | undefined {
  if (!videos || videos.length === 0) return undefined;

  for (let i = videos.length - 1; i >= 0; i--) {
    const name = videos[i].name?.toLowerCase();
    if (name?.includes('trailer')) {
      return videos[i].video_id;
    }
  }

  return videos[videos.length - 1].video_id;
}
