import { useMemo } from 'react';
import { Icon } from '../icons';
import styles from './styles.module.css';

interface Props {
  totalCount?: number;
  pageSize?: number;
  page?: number;
  onPageSizeChange?: (pageSize: number) => void;
  onPageChange?: (page: number) => void;
}

const pageSizes = [4, 25, 50, 75, 100];
let pagesOptionsCount = 5;

export function Pagination({ totalCount = 0, pageSize = pageSizes[1], page = 0, onPageSizeChange, onPageChange }: Props) {
  const maxPages = useMemo(() => Math.ceil(totalCount / pageSize), [totalCount, pageSize]);

  const showingPages = useMemo<number[]>(() => {
    const pages = [];
    let i = Math.max(0, page - 2);
    while(pages.length < pagesOptionsCount && i < maxPages) {
      pages.push(i);
      i++;
    }
    return pages;
  }, [page, maxPages]);

  const prevClick = () => onPageChange?.(Math.max(0, page - 1));

  const nextClick = () => onPageChange?.(Math.min(maxPages - 1, page + 1));

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
      <div className={styles.pages}>
        <Icon size={24} type='chevronLeft' className={styles.arrows} onClick={prevClick} />
        <div className={styles.buttons}>
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
        <Icon size={24} type='chevronRight' className={styles.arrows} onClick={nextClick} />
      </div>
    </div>
  );
}
