import { TextInput } from '../../../../components/text-input';
import styles from './styles.module.css';

interface Props {
  authorName?: string;
  onChangeAuthorName: (authorName?: string) => void;
}

export function AuthorNameFilter({ authorName, onChangeAuthorName }: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        Nome do autor
      </div>
      <TextInput value={authorName} onChange={onChangeAuthorName} />
    </div>
  );
}
