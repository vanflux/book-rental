import { ReactNode } from 'react';
import styles from './styles.module.css';

interface Props {
  children?: ReactNode;
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
  className?: string;
}

export function Button({ onClick, variant, children, className }: Props) {
  return (
    <button
      onClick={onClick}
      className={`${styles.container} ${variant === 'secondary' ? styles.secondary : ''} ${className ?? ''}`}
    >
      {children}
    </button>
  )
}
