export async function token() {
  const igdb_token = await fetch(`https://id.twitch.tv/oauth2/token?client_id=${process.env.API_CLIENT_ID}&client_secret=${process.env.API_CLIENT_SECRET}&grant_type=client_credentials`, {
    method: 'POST',
    next: { revalidate: 5259600 },
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.API_CLIENT_ID}`,
    }
  })
  const token = igdb_token.json()
  return token
}

export async function fetchGame(body: string) {
  const { access_token } = await token()
  const response = await fetch(`https://api.igdb.com/v4/games`, {
    method: 'POST',
    body: body,
    headers: {
      'Accept': 'application/json',
      'Client-ID': `${process.env.API_CLIENT_ID}`,
      Authorization: `Bearer ${access_token}`,
    }
  }).then(res => res.json())
  const data = response[0]
  return data
}

export async function fetchGames(body: string) {
  const { access_token } = await token()
  const response = await fetch(`https://api.igdb.com/v4/games`, {
    method: 'POST',
    body: body,
    headers: {
      'Accept': 'application/json',
      'Client-ID': `${process.env.API_CLIENT_ID}`,
      Authorization: `Bearer ${access_token}`,
    }
  })
  const data = response.json()
  return data
}

export async function fetchPlatfotms(body: string) {
  const { access_token } = await token()
  const response = await fetch(`https://api.igdb.com/v4/platforms`, {
    method: 'POST',
    body: body,
    headers: {
      'Accept': 'application/json',
      'Client-ID': `${process.env.API_CLIENT_ID}`,
      Authorization: `Bearer ${access_token}`,
    }
  })
  const data = response.json()
  return data
}

export async function fetchSearch(search: string, offset: number, limit: number) {
  let count = 0
  const { access_token } = await token()
  const response = await fetch(`https://api.igdb.com/v4/games`, {
    method: 'POST',
    body: `fields name, slug, cover.url, first_release_date; 
    where version_parent = null & status = null & category != (1,2,3,5,10,13,14) 
    & platforms != (411, 377) & platforms != null;
    offset ${offset}; limit ${limit}; search "${search}";`,
    headers: {
      'Accept': 'application/json',
      'Client-ID': `${process.env.API_CLIENT_ID}`,
      Authorization: `Bearer ${access_token}`,
    }
  }).then(res => (count = Number(res.headers.get('x-count')), res.json()))
  return {
    data: response,
    count: count
  }
}

//Home
export const popularBody = `
  fields name, slug, cover.url; sort rating_count desc; 
  where rating_count != null; limit 12;
`

export const ratingBody = `
  fields name, slug, cover.url, category; sort total_rating desc; limit 12;
  where aggregated_rating != null & aggregated_rating_count > 8 & category = 0;
`

export const searchBody = (search: string, offset: number, limit: number) => `
  fields name, slug, cover.url, first_release_date; 
  where version_parent = null & status = null & category != (1,2,3,5,10,13,14) 
  & platforms != (411, 377) & platforms != null;
  offset ${offset}; limit ${limit}; search "${search}"; 
`

//Games Page
export const mostAticipatedBody = `
  fields slug, name, hypes, first_release_date, follows, cover.url, screenshots.url;
  where  first_release_date > ${Math.floor(new Date().getTime() / 1000)} & hypes > 8; 
  sort first_release_date asc; limit 14;
`
export const games = `
fields name, slug, cover.url, first_release_date; sort total_rating desc;
where version_parent = null & status = null & category != (1,2,3,5,10,13,14) &
aggregated_rating != null & aggregated_rating_count > 8
& platforms != (411, 377) & platforms != null; limit 100; 
`

//Game Page
export const gameBody = (slug: string) => `
  fields slug, name, cover.url, summary, rating, aggregated_rating, 
  first_release_date, involved_companies.publisher, 
  involved_companies.developer, involved_companies.company.name;
  where slug = "${slug}";
`

export const screenshotBody = (slug: string) => `
  fields screenshots.url; where slug = "${slug}";
`

export const galleryBody = (slug: string) => `
  fields screenshots.url, videos.video_id;
  where slug = "${slug}";
`

export const infoCardBody = (slug: string) => `
  fields platforms, genres.name, themes.name, 
  player_perspectives.name; where slug = "${slug}";
`

export const platformsBody = (id: number) => `
  fields name; where id = (${id});
`

export const similarGamesBody = (slug: string) => `
  fields similar_games.name, similar_games.slug, 
  similar_games.cover.url; where slug = "${slug}";
`

//Reviews
export const reviewsBody = (slug: string) => `
  fields name, slug, cover.url; 
  where slug === ${slug};
`
