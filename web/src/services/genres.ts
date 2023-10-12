import { httpClient } from './http-client'

export interface GetGenresResultDto {
  items: GetGenresItemResultDto[]
  totalCount: number
}

export interface GetGenresItemResultDto {
  id: string
  name: string
  slug: string
}

export async function getGenres() {
  return httpClient.get<GetGenresResultDto>('/genres').then((res) => res.data)
}
