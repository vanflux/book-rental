import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { createBook, deleteBook, getBookBySlug, getBooks, GetBooksInputDto, rentBook, returnBook } from "../services/books";

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

export function useRentBook() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: rentBook,
    onSuccess: () => {
      queryClient.invalidateQueries(['books']);
      toast.success('Livro alugado com sucesso!');
    }
  });
}

export function useReturnBook() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: returnBook,
    onSuccess: () => {
      queryClient.invalidateQueries(['books']);
      toast.success('Livro devolvido com sucesso!');
    }
  });
}

export function useDeleteBook() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteBook,
    onSuccess: () => {
      queryClient.invalidateQueries(['books']);
      toast.success('Livro deletado com sucesso!');
    }
  });
}

export function useCreateBook() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createBook,
    onSuccess: () => {
      queryClient.invalidateQueries(['books']);
      toast.success('Livro criado com sucesso!');
    }
  });
}
