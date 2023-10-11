import { useQuery } from "react-query";
import { getBook, getBooks, GetBooksInputDto } from "../services/books";

export function useBooks(input: GetBooksInputDto) {
  return useQuery({
    queryFn: () => getBooks(input),
    queryKey: ['books', 'list', input]
  });
}

export function useBook(bookId: string) {
  return useQuery({
    queryFn: () => getBook(bookId),
    queryKey: ['books', 'one', bookId]
  });
}
