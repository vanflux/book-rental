export const routes = {
  HOME: () => `/`,
  BOOKS: () => `/livros`,
  BOOK_DETAILS: (slug?: string) => `/livro/${slug ?? ':slug'}`,
  REGISTER: () => `/cadastro`,
  LOGIN: () => `/entrar`,
}
