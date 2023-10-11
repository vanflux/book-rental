import { randomUUID } from "crypto";
import { QueryInterface, Sequelize } from "sequelize";

export const up = async (queryInterface: QueryInterface, sequelize: typeof Sequelize) => {
  queryInterface.bulkDelete('books_genres', {});
  queryInterface.bulkDelete('rentals', {});
  queryInterface.bulkDelete('books', {});
  queryInterface.bulkDelete('languages', {});
  queryInterface.bulkDelete('genres', {});
  queryInterface.bulkDelete('users', {});

  // Password: password for jwtSecret: secret
  const mainUser = { id: randomUUID(), email: 'test@mail.com', password: '$2b$10$CyaUlxwv6dYHTKfja/VRKOgtlbgQImyBaS7uzlIpjjl29CH2N0JgC' };
  const users = [mainUser];

  const languagePt = { id: randomUUID(), name: 'Português' };
  const languages = [languagePt];

  const genreGastronomia = { id: randomUUID(), name: 'Gastronomia', slug: 'gastronomia' };
  const genreRomance = { id: randomUUID(), name: 'Romance', slug: 'romance' };
  const genreAcaoEAven = { id: randomUUID(), name: 'Ação e aventura', slug: 'acao-e-aventura' };
  const genreBiografia = { id: randomUUID(), name: 'Biografia', slug: 'biografia' };
  const genreHumor = { id: randomUUID(), name: 'Humor', slug: 'humor' };
  const genreHistoria = { id: randomUUID(), name: 'História', slug: 'historia' };
  const genreSuspense = { id: randomUUID(), name: 'Suspense', slug: 'suspense' };
  const genreFiccao = { id: randomUUID(), name: 'Ficção', slug: 'ficcao' };
  const genreThriller = { id: randomUUID(), name: 'Thriller', slug: 'thriller' };
  const genreThrillerPsi = { id: randomUUID(), name: 'Thriller psicológico', slug: 'thriller-psicologico' };
  const genreDrama = { id: randomUUID(), name: 'Drama', slug: 'drama' };
  const genreSaga = { id: randomUUID(), name: 'Saga', slug: 'saga' };
  const genreMisterio = { id: randomUUID(), name: 'Mistério', slug: 'misterio' };
  const genreNaoFiccao = { id: randomUUID(), name: 'Não ficção', slug: 'nao-ficcao' };

  const genres = [
    genreGastronomia,
    genreRomance,
    genreAcaoEAven,
    genreBiografia,
    genreHumor,
    genreHistoria,
    genreSuspense,
    genreFiccao,
    genreThriller,
    genreThrillerPsi,
    genreDrama,
    genreSaga,
    genreMisterio,
    genreNaoFiccao
  ];

  const books = [];
  const booksGenres = [];

  const book1 = {
    id: randomUUID(),
    name: 'A revolução dos bichos',
    slug: 'a-revolucao-dos-bichos',
    authorName: 'George Orwell',
    publishedYear: 2007,
    bannerImageUrl: 'https://m.media-amazon.com/images/I/618iHJVMh4L.jpg',
    editorName: 'Companhia das Letras',
    languageId: languagePt.id,
    pageCount: 152,
  };
  books.push(book1);
  booksGenres.push({ id: randomUUID(), bookId: book1.id, genreId: genreHumor.id });

  const book2 = {
    id: randomUUID(),
    name: 'A empregada: Bem-vinda à família',
    slug: 'a-empregada-bem-vinda-a-familia',
    authorName: 'Freida McFadden',
    publishedYear: 2023,
    bannerImageUrl:
    'https://m.media-amazon.com/images/I/81BdpMhm3iL._SY425_.jpg',
    editorName: 'Editora Arqueiro',
    languageId: languagePt.id,
    pageCount: 304,
  };
  books.push(book2);
  booksGenres.push({ id: randomUUID(), bookId: book2.id, genreId: genreSuspense.id });
  booksGenres.push({ id: randomUUID(), bookId: book2.id, genreId: genreFiccao.id });
  booksGenres.push({ id: randomUUID(), bookId: book2.id, genreId: genreThrillerPsi.id });
  booksGenres.push({ id: randomUUID(), bookId: book2.id, genreId: genreDrama.id });
  booksGenres.push({ id: randomUUID(), bookId: book2.id, genreId: genreSaga.id });
  booksGenres.push({ id: randomUUID(), bookId: book2.id, genreId: genreMisterio.id });

  const book3 = {
    id: randomUUID(),
    name: 'A garota do lago',
    slug: 'a-garota-do-lago',
    authorName: 'Charlie Donlea',
    publishedYear: 2017,
    bannerImageUrl: 'https://m.media-amazon.com/images/I/81LRk6+p1HL._SY425_.jpg',
    editorName: 'Faro Editorial',
    languageId: languagePt.id,
    pageCount: 296
  };
  books.push(book3);
  booksGenres.push({ id: randomUUID(), bookId: book3.id, genreId: genreThriller.id });
  booksGenres.push({ id: randomUUID(), bookId: book3.id, genreId: genreMisterio.id });
  booksGenres.push({ id: randomUUID(), bookId: book3.id, genreId: genreThrillerPsi.id });
  booksGenres.push({ id: randomUUID(), bookId: book3.id, genreId: genreFiccao.id });
  booksGenres.push({ id: randomUUID(), bookId: book3.id, genreId: genreSuspense.id });

  const book4 = {
    id: randomUUID(),
    name: 'O Príncipe Maquiavel - Edição de Luxo',
    slug: 'o-principe-maquiavel-edicao-de-luxo',
    authorName: 'Nicolau Maquiavel',
    publishedYear: 2023,
    bannerImageUrl: 'https://m.media-amazon.com/images/I/81E9scx1JBL._SY425_.jpg',
    editorName: 'Editora Garnier',
    languageId: languagePt.id,
    pageCount: 96
  };
  books.push(book4);
  booksGenres.push({ id: randomUUID(), bookId: book4.id, genreId: genreNaoFiccao.id });

  const book5 = {
    id: randomUUID(),
    name: 'Imperfeitos',
    slug: 'imperfeitos',
    authorName: 'Christina Lauren',
    publishedYear: 2022,
    bannerImageUrl: 'https://m.media-amazon.com/images/I/616U6mSP3lL._SY425_.jpg',
    editorName: 'Faro Editorial',
    languageId: languagePt.id,
    pageCount: 256
  };
  books.push(book5);
  booksGenres.push({ id: randomUUID(), bookId: book5.id, genreId: genreRomance.id });
  booksGenres.push({ id: randomUUID(), bookId: book5.id, genreId: genreFiccao.id });

  const book6 = {
    id: randomUUID(),
    name: 'Mentirosos - Sucesso no TikTok',
    slug: 'mentirosos-sucesso-no-tiktok',
    authorName: 'E. Lockhart',
    publishedYear: 2014,
    bannerImageUrl: 'https://m.media-amazon.com/images/I/71bJYZfcrKL._SY425_.jpg',
    editorName: 'Seguinte',
    languageId: languagePt.id,
    pageCount: 272
  };
  books.push(book6);;
  booksGenres.push({ id: randomUUID(), bookId: book6.id, genreId: genreThrillerPsi.id });

  const book7 = {
    id: randomUUID(),
    name: 'A vida invisível de Addie LaRue',
    slug: 'a-vida-invisivel-de-addie-larue',
    authorName: 'V.E. Schwab',
    publishedYear: 2021,
    bannerImageUrl: 'https://m.media-amazon.com/images/I/71X245OYRBL._SY425_.jpg',
    editorName: 'Galera',
    languageId: languagePt.id,
    pageCount: 504
  };
  books.push(book7);
  booksGenres.push({ id: randomUUID(), bookId: book7.id, genreId: genreFiccao.id });

  const book8 = {
    id: randomUUID(),
    name: 'As cinco linguagens do amor - 3 edição: Como expressar um compromisso de amor a seu cônjuge',
    slug: 'as-cinco-linguagens-do-amor-3-edicao-como-expressar-um-compromisso-de-amor-a-seu-conjuge',
    authorName: 'Gary Chapman',
    publishedYear: 2013,
    bannerImageUrl: 'https://m.media-amazon.com/images/I/71da0pEmHoL._SY425_.jpg',
    editorName: 'Mundo Cristão',
    languageId: languagePt.id,
    pageCount: 208
  };
  books.push(book8);
  booksGenres.push({ id: randomUUID(), bookId: book8.id, genreId: genreRomance.id });
  booksGenres.push({ id: randomUUID(), bookId: book8.id, genreId: genreMisterio.id });

  const book9 = {
    id: randomUUID(),
    name: 'Acolhendo sua criança interior: Uma abordagem inovadora para curar as feridas da infância',
    slug: 'acolhendo-sua-crianca-interior-uma-abordagem-inovadora-para-curar-as-feridas-da-infancia',
    authorName: 'Stefanie Stahl',
    publishedYear: 2022,
    bannerImageUrl: 'https://m.media-amazon.com/images/I/81fyJqqSEIL._SY425_.jpg',
    editorName: 'Editora Sextante',
    languageId: languagePt.id,
    pageCount: 240
  };
  books.push(book9);
  booksGenres.push({ id: randomUUID(), bookId: book9.id, genreId: genreSaga.id });
  booksGenres.push({ id: randomUUID(), bookId: book9.id, genreId: genreHistoria.id });
  booksGenres.push({ id: randomUUID(), bookId: book9.id, genreId: genreBiografia.id });

  const book10 = {
    id: randomUUID(),
    name: '',
    slug: '',
    authorName: '',
    publishedYear: 0,
    bannerImageUrl: '',
    editorName: '',
    languageId: languagePt.id,
    pageCount: 0
  };

  await queryInterface.bulkInsert('users', users);
  await queryInterface.bulkInsert('languages', languages);
  await queryInterface.bulkInsert('genres', genres);
  await queryInterface.bulkInsert('books', books);
  await queryInterface.bulkInsert('books_genres', booksGenres);
};

export const down = async (queryInterface: QueryInterface, sequelize: typeof Sequelize) => {

};
