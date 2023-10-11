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
  slug: string;
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

export interface BookDto {
  id: string;
  name: string;
  slug: string;
  authorName: string;
  publishedYear: number;
  genres: GetBookGenreDto[];
  editorName?: string;
  language?: GetBookLanguageDto;
  pageCount?: number;
  bannerImageUrl?: string;
  rented: boolean;
}

export interface RentalDto {
  id: string;
  userId: string;
  bookId: string;
  startedAt: string;
  endedAt?: string;
}

export interface CreateBookDto {
  name: string;
  authorName: string;
  publishedYear: number;
  genresIds?: string[];
  editorName?: string;
  languageId?: string;
  pageCount?: number;
  bannerImageUrl?: string;
}

export async function getBooks(input: GetBooksInputDto) {
  return httpClient.get<GetBooksResultDto>('/books', {
    params: input
  }).then(res => res.data);
}

export async function getBookBySlug(slug: string) {
  return httpClient.get<BookDto>(`/books/slug/${slug}`).then(res => res.data);
}

export async function rentBook(bookId: string) {
  return httpClient.post<RentalDto>(`/books/${bookId}/rent`).then(res => res.data);
}

export async function returnBook(bookId: string) {
  return httpClient.post<RentalDto>(`/books/${bookId}/return`).then(res => res.data);
}

export async function deleteBook(bookId: string) {
  return httpClient.delete<void>(`/books/${bookId}`).then(res => res.data);
}

export async function createBook(createBookDto: CreateBookDto) {
  return httpClient.post<BookDto>('/books', createBookDto).then(res => res.data);
}
