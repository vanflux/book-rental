import styles from './styles.module.css';

interface Props {
  value?: string;
  onChange?: (value?: string) => void;
  placeholder?: string;
  type?: 'text' | 'email' | 'password';
  full?: boolean;
  errorMessage?: string;
}

export function TextInput({ value, onChange, placeholder, type, full, errorMessage }: Props) {
  return (
    <div className={`${styles.container} ${full ? styles.full : ''}`}>
      <input
        className={styles.input}
        placeholder={placeholder}
        value={value ?? ''}
        onChange={e => onChange?.(e.target.value)}
        type={type}
      />
      {errorMessage && (
        <div className={styles.error}>{errorMessage}</div>
      )}
    </div>
  )
}
