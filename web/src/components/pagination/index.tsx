import { useMemo } from 'react';
import styles from './styles.module.css';

interface Props {
  totalCount?: number;
  pageSize?: number;
  page?: number;
  onPageSizeChange?: (pageSize: number) => void;
  onPageChange?: (page: number) => void;
}

const pageSizes = [4, 25, 50, 75, 100];

export function Pagination({ totalCount = 0, pageSize = pageSizes[1], page = 0, onPageSizeChange, onPageChange }: Props) {
  const showingPages = useMemo<number[]>(() => {
    const pages = [0, 1, 2, 3, 4];
    return pages;
  }, [page]);

  return (
    <div className={styles.container}>
      <div className={styles.itemsPerPage}>
        Items por página:
        <div className={styles.buttons}>
          {pageSizes.map((item, i) => (
            <button
              key={i}
              className={pageSize === item ? styles.selected : ''}
              onClick={() => onPageSizeChange?.(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
      <div className={`${styles.pages} ${styles.buttons}`}>
        {showingPages.map((item, i) => (
          <button
            key={i}
            className={page === item ? styles.selected : ''}
            onClick={() => onPageChange?.(item)}
          >
            {item + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
