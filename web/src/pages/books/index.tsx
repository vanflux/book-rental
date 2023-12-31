import { useState } from 'react'
import { Button } from '../../components/button'
import { CreateBookModal } from '../../components/create-book-modal'
import { Pagination } from '../../components/pagination'
import { useGlobalSearch } from '../../contexts/global-search'
import { useBooks } from '../../hooks/books'
import { BookItem } from '../../components/book-item'
import { GenreFilter } from './components/genre-filter'
import styles from './styles.module.css'
import { PublishedYearFilter } from './components/published-year-filter'
import { AuthorNameFilter } from './components/author-name-filter'

export function BooksPage() {
  const { searchText } = useGlobalSearch()
  const [genreSlug, setGenreSlug] = useState<string>()
  const [containsAuthorName, setContainsAuthorName] = useState<string>()
  const [publishedYear, setPublishedYear] = useState<number>()
  const [createBookOpen, setCreateBookOpen] = useState(false)
  const [page, setPage] = useState(0)
  const [pageSize, setPageSize] = useState(25)
  const { data: books } = useBooks({
    genre: genreSlug,
    containsName: searchText,
    publishedYear,
    containsAuthorName,
    page,
    pageSize,
  })

  return (
    <div className={styles.container}>
      <CreateBookModal open={createBookOpen} onOpenChange={setCreateBookOpen} />
      <div className={styles.filtersContainer}>
        <GenreFilter slug={genreSlug} onChangeSlug={setGenreSlug} />
        <PublishedYearFilter publishedYear={publishedYear} onChangePublishedYear={setPublishedYear} />
        <AuthorNameFilter authorName={containsAuthorName} onChangeAuthorName={setContainsAuthorName} />
      </div>
      <div className={styles.headerAndBooksContainer}>
        <div className={styles.headerContainer}>
          <Pagination totalCount={books?.totalCount} page={page} pageSize={pageSize} onPageChange={setPage} onPageSizeChange={setPageSize} />
          <Button variant="secondary" onClick={() => setCreateBookOpen(true)}>
            ADICIONAR LIVRO
          </Button>
        </div>
        <div className={styles.booksContainer}>
          {books?.items.map((book, i) => (
            <BookItem key={i} slug={book.slug} name={book.name} bannerImageUrl={book.bannerImageUrl} rented={book.rented} />
          ))}
        </div>
      </div>
    </div>
  )
}
