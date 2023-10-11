import { SearchIcon } from '../icons/search-icon';
import styles from './styles.module.css';

interface Props {
  value?: string;
  onChange?: (value?: string) => void;
}

export function SearchBar({ value, onChange }: Props) {
  return (
    <div className={styles.container}>
      <input
        className={styles.input}
        placeholder='O que você está procurando?'
        value={value ?? ''}
        onChange={e => onChange?.(e.target.value)}
      />
      <SearchIcon />
    </div>
  )
}
