import { useGenres } from '../../../../hooks/genres';
import styles from './styles.module.css';

export function GenreFilter() {
  const { data: genres } = useGenres();

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        Gêneros
      </div>
      <div className={styles.itemList}>
        {genres?.items?.map((genre, i) => (
          <div key={i} className={styles.item}>
            {genre.name}
          </div>
        ))}
      </div>
    </div>
  );
}
