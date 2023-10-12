import { useGenres } from '../../../../hooks/genres'
import styles from './styles.module.css'

interface Props {
  slug?: string
  onChangeSlug: (slug?: string) => void
}

export function GenreFilter({ slug, onChangeSlug }: Props) {
  const { data: genres } = useGenres()

  return (
    <div className={styles.container}>
      <div className={styles.title}>Gêneros</div>
      <div className={styles.itemList}>
        {genres?.items?.map((genre, i) => (
          <div key={i} className={styles.item}>
            <label>
              <input checked={genre.slug === slug} onChange={() => onChangeSlug(genre.slug === slug ? undefined : genre.slug)} type="checkbox" />
              {genre.name}
            </label>
          </div>
        ))}
      </div>
    </div>
  )
}
