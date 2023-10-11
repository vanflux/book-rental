import { Layout } from "../../components/layout";
import { Pagination } from "../../components/pagination";
import { BookItem } from "./components/book-item";
import { GenreFilter } from "./components/genre-filter";
import styles from './styles.module.css';

export function BooksPage() {
  const books = new Array(16).fill(0).map((_, i) => ({
    bannerImageUrl: 'https://m.media-amazon.com/images/I/618iHJVMh4L.jpg',
    name: 'A revolução dos bichos',
    rented: false,
  }));

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.filtersContainer}>
          <GenreFilter />
        </div>
        <div className={styles.paginationAndBooks}>
          <div className={styles.paginationContainer}>
            <Pagination />
          </div>
          <div className={styles.booksContainer}>
            {books.map((book, i) => (
              <BookItem key={i} {...book} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
