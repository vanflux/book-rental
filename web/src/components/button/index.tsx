import { ReactNode } from 'react';
import styles from './styles.module.css';

interface Props {
  children?: ReactNode;
  type?: 'submit';
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
}

export function Button({ onClick, type, variant, disabled, children, className }: Props) {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={`
        ${styles.container}
        ${variant === 'secondary' ? styles.secondary : ''}
        ${disabled ? styles.disabled : ''}
        ${className ?? ''}
      `}
    >
      {children}
    </button>
  )
}
