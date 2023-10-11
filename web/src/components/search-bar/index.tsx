import { ChangeEvent } from 'react';
import { matchRoutes, useLocation, useNavigate } from 'react-router-dom';
import { routes } from '../../router/routes';
import { Icon } from '../icons';
import styles from './styles.module.css';

interface Props {
  value?: string;
  onChange?: (value?: string) => void;
}

export function SearchBar({ value, onChange }: Props) {
  const navigate = useNavigate()
  const location = useLocation()
  const matchResult = matchRoutes([{ path: routes.BOOKS() }], location);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
    if (!matchResult?.[0]?.pathname) {
      navigate(routes.BOOKS());
    }
  };

  return (
    <div className={styles.container}>
      <input
        className={styles.input}
        placeholder='O que você está procurando?'
        value={value ?? ''}
        onChange={handleChange}
      />
      <Icon type='search' size={24} className={styles.icon} />
    </div>
  )
}
