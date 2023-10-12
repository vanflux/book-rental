import { assert } from 'chai';
import { before, describe, it } from 'mocha';
import { loginAsTest } from '../utils/auth';
import { httpClient } from '../utils/http-client';

describe('Test /books/* api', function () {
  let authHeaders: any = {};

  before(async () => {
    await httpClient.post('/dev/db/recreate');
    authHeaders = await loginAsTest();
  });

  it('should get all books', async () => {
    const books = await httpClient.get('/books', { headers: authHeaders }).then(res => res.data);
    assert.isArray(books.items);
    assert.isNumber(books.totalCount);
    assert.equal(books.totalCount, 9);
    assert.exists(books.items.find(book => book.name === 'A revolução dos bichos'));
    assert.exists(books.items.find(book => book.name === 'A empregada: Bem-vinda à família'));
  });

  it('should get all books with name containing "bicho"', async () => {
    const books = await httpClient.get('/books', { params: { containsName: 'bicho' }, headers: authHeaders }).then(res => res.data);
    assert.isArray(books.items);
    assert.isNumber(books.totalCount);
    assert.equal(books.totalCount, 1);
    assert.exists(books.items.find(book => book.name === 'A revolução dos bichos'));
  });

  it('should get all books with published year "2021"', async () => {
    const books = await httpClient.get('/books', { params: { publishedYear: 2021 }, headers: authHeaders }).then(res => res.data);
    assert.isArray(books.items);
    assert.isNumber(books.totalCount);
    assert.equal(books.totalCount, 1);
    assert.exists(books.items.find(book => book.name === 'A vida invisível de Addie LaRue'));
  });

  it('should get all books with author name "charlie"', async () => {
    const books = await httpClient.get('/books', { params: { containsAuthorName: 'charlie' }, headers: authHeaders }).then(res => res.data);
    assert.isArray(books.items);
    assert.isNumber(books.totalCount);
    assert.equal(books.totalCount, 1);
    assert.exists(books.items.find(book => book.name === 'A garota do lago'));
  });

  it('should rent "A garota do lago"', async () => {
    const book = await httpClient.get('/books/slug/a-garota-do-lago', { headers: authHeaders }).then(res => res.data);
    const rental = await httpClient.post(`/books/${book.id}/rent`, {}, { headers: authHeaders }).then(res => res.data);
    assert.equal(rental.bookId, book.id);
    assert.isNull(rental.endedAt);
    assert.exists(rental.id);
  });

  it('should have "A garota do lago" rented', async () => {
    const book = await httpClient.get('/books/slug/a-garota-do-lago', { headers: authHeaders }).then(res => res.data);
    assert.isTrue(book.rented);
  });

  it('should return "A garota do lago"', async () => {
    const book = await httpClient.get('/books/slug/a-garota-do-lago', { headers: authHeaders }).then(res => res.data);
    const rental = await httpClient.post(`/books/${book.id}/return`, {}, { headers: authHeaders }).then(res => res.data);
    assert.equal(rental.bookId, book.id);
    assert.exists(rental.endedAt);
    assert.exists(rental.id);
  });

  it('should have "A garota do lago" not rented', async () => {
    const book = await httpClient.get('/books/slug/a-garota-do-lago', { headers: authHeaders }).then(res => res.data);
    assert.isFalse(book.rented);
  });
});
