import { Button } from '../../../../components/button';
import styles from './styles.module.css';

interface Props {
  id: string;
  name: string;
  rented: boolean;
  bannerImageUrl?: string;
}

export function BookItem({ id, name, rented, bannerImageUrl }: Props) {
  return (
    <div className={styles.container}>
      <img src={bannerImageUrl} />
      <div>{name}</div>
      <Button variant='secondary'>{rented ? 'ALUGADO' : 'ALUGAR'}</Button>
    </div>
  );
}
