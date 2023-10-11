import { ReactNode } from 'react';
import { Header } from '../header';
import styles from './styles.module.css';

interface Props {
  children?: ReactNode;
}

export function Layout({ children }: Props) {
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.content}>
        {children}
      </div>
    </div>
  )
}
