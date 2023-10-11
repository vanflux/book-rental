import { ReactNode } from 'react';
import styles from './styles.module.css';

interface Props {
  children?: ReactNode;
  onClick?: () => void;
}

export function Button({ onClick, children }: Props) {
  return (
    <button onClick={onClick} className={styles.container}>
      {children}
    </button>
  )
}
