import axios from 'axios';
import { igdb_token } from './auth_api';

const access_token = async () => {
  const {access_token} = await igdb_token
  return access_token
}

export const api = axios.create({
  baseURL: 'https://api.igdb.com/v4',
  headers: {
    'Accept': 'application/json',
    'Client-ID': `${process.env.API_CLIENT_ID}`,
    'Authorization': `Bearer ${access_token()}`,
  }
})
