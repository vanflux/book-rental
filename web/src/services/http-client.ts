import axios from 'axios'
import { getAccessToken } from './auth'
const port = 3000
const baseURL = `${location.protocol}//${location.hostname}:${port}`

export const httpClient = axios.create({
  baseURL,
})

httpClient.interceptors.request.use((request) => {
  const accessToken = getAccessToken()
  if (accessToken) {
    request.headers.Authorization = `Bearer ${accessToken}`
  }
  return request
})
