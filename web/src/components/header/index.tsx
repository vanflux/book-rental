import { useAuth } from '../../contexts/auth'
import { useGlobalSearch } from '../../contexts/global-search'
import { Logo } from '../logo'
import { SearchBar } from '../search-bar'
import styles from './styles.module.css'

export function Header() {
  const { logout } = useAuth()
  const { searchText, onSearchTextChange } = useGlobalSearch()

  return (
    <div className={styles.container}>
      <Logo variant="inverted" />
      <SearchBar value={searchText} onChange={onSearchTextChange} />
      <div className={styles.texts}>
        <div className={styles.welcome}>Olá, bem vindo(a)!</div>
        <div className={styles.logout} onClick={logout}>Sair</div>
      </div>
    </div>
  )
}
