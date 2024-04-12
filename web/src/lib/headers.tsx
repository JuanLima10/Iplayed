import { parseCookies } from 'nookies'

export const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
  Authorization: `Bearer ${parseCookies().iplayed_session}`,
}
