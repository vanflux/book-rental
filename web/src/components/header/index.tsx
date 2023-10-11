import { Logo } from '../logo';
import { SearchBar } from '../search-bar';
import styles from './styles.module.css';

export function Header() {
  return (
    <div className={styles.container}>
      <Logo variant='inverted' />
      <SearchBar />
      <div className={styles.welcome}>
        Olá, bem vindo(a)!
      </div>
    </div>
  )
}
