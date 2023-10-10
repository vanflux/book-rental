import { randomUUID } from "crypto";
import { QueryInterface, Sequelize } from "sequelize";

export const up = async (queryInterface: QueryInterface, sequelize: typeof Sequelize) => {
  queryInterface.bulkDelete('books_genres', {});
  queryInterface.bulkDelete('rentals', {});
  queryInterface.bulkDelete('books', {});
  queryInterface.bulkDelete('languages', {});
  queryInterface.bulkDelete('genres', {});
  queryInterface.bulkDelete('users', {});

  const mainUser = { id: randomUUID(), email: 'lucas@mail.com', password: '...' };
  const users = [mainUser];

  const languagePt = { id: randomUUID(), name: 'Português' };
  const languages = [languagePt];

  const genre1 = { id: randomUUID(), name: 'Gastronomia', slug: 'gastronomia' };
  const genre2 = { id: randomUUID(), name: 'Romance', slug: 'romance' };
  const genre3 = { id: randomUUID(), name: 'Ação e aventura', slug: 'acao-e-aventura' };
  const genre4 = { id: randomUUID(), name: 'Biografia', slug: 'biografia' };
  const genre5 = { id: randomUUID(), name: 'Humor', slug: 'humor' };
  const genre6 = { id: randomUUID(), name: 'História', slug: 'historia' };
  const genres = [genre1, genre2, genre3, genre4, genre5, genre6];

  const book1 = { id: randomUUID(), name: 'Livro teste', slug: 'livro-teste', authorName: 'Autor Teste', publishedYear: 2020, bannerImageUrl: null, editorName: 'Editora Teste', languageId: languagePt.id, pageCount: 150 }
  const books = [book1];

  const bookGenre1_1 = { id: randomUUID(), bookId: book1.id, genreId: genre1.id };
  const bookGenre1_2 = { id: randomUUID(), bookId: book1.id, genreId: genre5.id };
  const booksGenres = [bookGenre1_1, bookGenre1_2];

  await queryInterface.bulkInsert('users', users);
  await queryInterface.bulkInsert('languages', languages);
  await queryInterface.bulkInsert('genres', genres);
  await queryInterface.bulkInsert('books', books);
  await queryInterface.bulkInsert('books_genres', booksGenres);
};

export const down = async (queryInterface: QueryInterface, sequelize: typeof Sequelize) => {
  
};
