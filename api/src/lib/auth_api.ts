export const igdb_token: any =
  fetch(`https://id.twitch.tv/oauth2/token?client_id=${process.env.API_CLIENT_ID}&client_secret=${process.env.API_CLIENT_SECRET}&grant_type=client_credentials`, {
    method: 'POST',
    cache: 'force-cache',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.API_CLIENT_ID}`,
    }
  }).then(res => res.json())