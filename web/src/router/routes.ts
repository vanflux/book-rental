export const routes = {
  HOME: () => `/`,
  BOOKS: () => `/livros`,
  BOOK_DETAILS: (bookId?: string) => `/livro/${bookId ?? ':bookId'}`,
};
