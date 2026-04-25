import axios from 'axios'
import Cookies from 'js-cookie'
import { ProblemDetails } from '../interfaces/problem-details.interface'
import { ProblemError } from './error.lib'

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use((config) => {
  const token = Cookies.get('iplayed_session')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const problem: ProblemDetails | undefined = error.response?.data

    if (problem?.status === 401) {
      return Promise.resolve({ data: null })
    }

    if (problem?.status) {
      return Promise.reject(new ProblemError(problem))
    }

    return Promise.reject(error)
  }
)

export default api
