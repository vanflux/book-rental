import styles from './styles.module.css';

export function GenreFilter() {
  const genres = [
    {
      name: 'Gastronomia',
    },
    {
      name: 'Mitologia',
    },
    {
      name: 'Ficção Científica',
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        Gêneros
      </div>
      <div className={styles.itemList}>
        {genres.map((genre, i) => (
          <div key={i} className={styles.item}>
            {genre.name}
          </div>
        ))}
      </div>
    </div>
  );
}
