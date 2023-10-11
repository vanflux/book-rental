import { useMemo } from 'react';
import styles from './styles.module.css';

interface Props {
  pageSize?: number;
  page?: number;
  onPageSizeChange?: (pageSize: number) => void;
  onPageChange?: (page: number) => void;
}

const pageSizes = [16, 25, 50, 75, 100];

export function Pagination({ pageSize, page, onPageSizeChange, onPageChange }: Props) {
  const showingPages = useMemo<number[]>(() => {
    return [1,2,3,4,5];
  }, [page]);

  return (
    <div className={styles.container}>
      <div className={styles.itemsPerPage}>
        Items por página:
        <div className={styles.buttons}>
          {pageSizes.map(item => (
            <button key={item} className={pageSize === item ? styles.selected : ''}>{item}</button>
          ))}
        </div>
      </div>
      <div className={`${styles.pages} ${styles.buttons}`}>
        {showingPages.map(item => (
          <button key={item} className={pageSize === item ? styles.selected : ''}>{item}</button>
        ))}
      </div>
    </div>
  );
}
