import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/button';
import { useGlobalSearch } from '../../contexts/global-search';
import { routes } from '../../router/routes';
import styles from './styles.module.css';

interface Props {
  name: string;
  slug: string;
  rented: boolean;
  bannerImageUrl?: string;
}

export function BookItem({ name, slug, rented, bannerImageUrl }: Props) {
  const { onSearchTextChange } = useGlobalSearch();
  const navigate = useNavigate();

  const onClick = () => {
    navigate(routes.BOOK_DETAILS(slug));
    onSearchTextChange();
  }

  return (
    <div className={styles.container}>
      <img src={bannerImageUrl} />
      <div>{name}</div>
      <Button
        variant='secondary'
        onClick={onClick}
      >
        {rented ? 'ALUGADO' : 'ALUGAR'}
      </Button>
    </div>
  );
}
