import { useState } from "react";
import { Layout } from "../../components/layout";
import { Pagination } from "../../components/pagination";
import { useGlobalSearch } from "../../contexts/global-search";
import { useBooks } from "../../hooks/books";
import { BookItem } from "./components/book-item";
import { GenreFilter } from "./components/genre-filter";
import styles from './styles.module.css';

export function BooksPage() {
  const { searchText, onSearchTextChange } = useGlobalSearch();
  const [genreSlug, setGenreSlug] = useState<string>();
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(25);
  const { data: books } = useBooks({
    genre: genreSlug,
    containsName: searchText,
    page,
    pageSize
  });

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.filtersContainer}>
          <GenreFilter
            slug={genreSlug}
            onChangeSlug={setGenreSlug}
          />
        </div>
        <div className={styles.paginationAndBooks}>
          <div className={styles.paginationContainer}>
            <Pagination
              totalCount={books?.totalCount}
              page={page}
              pageSize={pageSize}
              onPageChange={setPage}
              onPageSizeChange={setPageSize}
            />
          </div>
          <div className={styles.booksContainer}>
            {books?.items.map((book, i) => (
              <BookItem
                key={i}
                slug={book.slug}
                name={book.name}
                bannerImageUrl={book.bannerImageUrl}
                rented={book.rented}
              />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
