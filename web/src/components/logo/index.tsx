import styles from './styles.module.css';

interface Props {
  variant?: 'normal' | 'inverted';
}

export function Logo({ variant }: Props) {
  return (
    <div
      className={`${styles.container} ${variant == 'inverted' ? styles.inverted : ''}`}
    >
      Book Rental
    </div>
  );
}
