import { useNavigate } from 'react-router-dom';
import { Button } from '../../../../components/button';
import { routes } from '../../../../router/routes';
import styles from './styles.module.css';

interface Props {
  name: string;
  slug: string;
  rented: boolean;
  bannerImageUrl?: string;
}

export function BookItem({ name, slug, rented, bannerImageUrl }: Props) {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <img src={bannerImageUrl} />
      <div>{name}</div>
      <Button
        variant='secondary'
        onClick={() => (navigate(routes.BOOK_DETAILS(slug)))}
      >
        {rented ? 'ALUGADO' : 'ALUGAR'}
      </Button>
    </div>
  );
}
