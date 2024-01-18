import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://api.igdb.com/v4',
  headers: {
    'Accept': 'application/json',
    'Client-ID': `${process.env.API_CLIENT_ID}`,
    'Authorization': `Bearer ${process.env.API_TOKEN}`,
  }
})
