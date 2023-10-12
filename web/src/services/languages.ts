import { httpClient } from './http-client'

export interface GetLanguagesResultDto {
  items: GetLanguagesItemResultDto[]
  totalCount: number
}

export interface GetLanguagesItemResultDto {
  id: string
  name: string
  slug: string
}

export async function getLanguages() {
  return httpClient.get<GetLanguagesResultDto>('/languages').then((res) => res.data)
}
