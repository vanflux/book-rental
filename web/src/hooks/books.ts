import { useQuery } from "react-query";
import { getBookBySlug, getBooks, GetBooksInputDto } from "../services/books";

export function useBooks(input: GetBooksInputDto) {
  return useQuery({
    queryFn: () => getBooks(input),
    queryKey: ['books', 'list', input]
  });
}

export function useBookBySlug(slug: string) {
  return useQuery({
    queryFn: () => getBookBySlug(slug),
    queryKey: ['books', 'one', slug]
  });
}
