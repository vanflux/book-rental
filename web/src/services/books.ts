import { httpClient } from "./http-client";

export interface GetBooksInputDto {
  containsName?: string;
  containsAuthorName?: string;
  publishedYear?: number;
  genre?: string;
  pageSize?: number;
  page?: number;
  hideRented?: boolean;
}

export interface GetBooksResultDto {
  totalCount: number;
  items: GetBooksItemResultDto[];
}

export interface GetBooksItemResultDto {
  id: string;
  bannerImageUrl?: string;
  name: string;
  rented: boolean;
}

export interface GetBookGenreDto {
  id: string;
  name: string;
}

export interface GetBookLanguageDto {
  id: string;
  name: string;
}

export interface GetBookDto {
  id: string;
  name: string;
  authorName: string;
  publishedYear: number;
  genres: GetBookGenreDto[];
  editorName?: string;
  language?: GetBookLanguageDto;
  pageCount?: number;
  bannerImageUrl?: string;
  rented: boolean;
}

export async function getBooks(input: GetBooksInputDto) {
  return httpClient.get<GetBooksResultDto>('/books', {
    params: input
  }).then(res => res.data);
}

export async function getBook(bookId: string) {
  return httpClient.get<GetBookDto>(`/books/${bookId}`).then(res => res.data);
}
