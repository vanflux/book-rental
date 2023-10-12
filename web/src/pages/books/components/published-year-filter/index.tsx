import { NumberInput } from '../../../../components/number-input'
import styles from './styles.module.css'

interface Props {
  publishedYear?: number
  onChangePublishedYear: (publishedYear?: number) => void
}

export function PublishedYearFilter({ publishedYear, onChangePublishedYear }: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.title}>Ano de publicação</div>
      <NumberInput value={publishedYear} onChange={onChangePublishedYear} />
    </div>
  )
}
