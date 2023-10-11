import { useState } from "react";
import { Button } from "../../components/button";
import { CreateBookModal } from "../../components/create-book-modal";
import { Pagination } from "../../components/pagination";
import { useGlobalSearch } from "../../contexts/global-search";
import { useBooks } from "../../hooks/books";
import { BookItem } from "../../components/book-item";
import { GenreFilter } from "./components/genre-filter";
import styles from './styles.module.css';

export function BooksPage() {
  const { searchText } = useGlobalSearch();
  const [genreSlug, setGenreSlug] = useState<string>();
  const [createBookOpen, setCreateBookOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(25);
  const { data: books } = useBooks({
    genre: genreSlug,
    containsName: searchText,
    page,
    pageSize
  });

  return (
    <div className={styles.container}>
      <CreateBookModal open={createBookOpen} onOpenChange={setCreateBookOpen} />
      <div className={styles.filtersContainer}>
        <GenreFilter
          slug={genreSlug}
          onChangeSlug={setGenreSlug}
        />
      </div>
      <div className={styles.headerAndBooksContainer}>
        <div className={styles.headerContainer}>
          <Pagination
            totalCount={books?.totalCount}
            page={page}
            pageSize={pageSize}
            onPageChange={setPage}
            onPageSizeChange={setPageSize}
          />
          <Button variant='secondary' onClick={() => setCreateBookOpen(true)}>ADICIONAR LIVRO</Button>
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
  );
}
