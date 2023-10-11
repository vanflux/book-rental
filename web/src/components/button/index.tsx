import { ReactNode } from 'react';
import styles from './styles.module.css';

interface Props {
  children?: ReactNode;
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
}

export function Button({ onClick, variant, children }: Props) {
  return (
    <button onClick={onClick} className={`${styles.container} ${variant === 'secondary' ? styles.secondary : ''}`}>
      {children}
    </button>
  )
}
