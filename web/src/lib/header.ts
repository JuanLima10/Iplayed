import { parseCookies } from 'nookies'

export const headers = {
  headers: {
    Authorization: `Bearer ${parseCookies().iplayed_session}`,
  }
}