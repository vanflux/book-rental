import { Navigate, useNavigate, useParams } from "react-router-dom";
import { Button } from "../../components/button";
import { Icon } from "../../components/icons";
import { useBookBySlug } from "../../hooks/books";
import { routes } from "../../router/routes";
import styles from './styles.module.css';

export function BookPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  if (!slug) return (
    <Navigate to={routes.BOOKS()} />
  )
  const { data: book } = useBookBySlug(slug);
  
  const onBackClick = () => {
    navigate(-1);
  };

  const onBooksPageClick = () => {
    navigate(routes.BOOKS());
  };
  
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.back} onClick={onBackClick}>
          <Icon size={24} type='chevronLeft' />
          Voltar
        </div>
        <div className={styles.breadcrumb}>
          <div className={styles.prev} onClick={onBooksPageClick}>
            Livros
          </div>
          <Icon size={24} type='chevronRight' />
          <div className={styles.current}>
            {book?.name}
          </div>
        </div>
      </div>
      <div className={styles.imageAndCards}>
        <img
          className={styles.imageCard}
          src={book?.bannerImageUrl}
        />
        <div className={styles.cards}>
          <div className={styles.infosCard}>
            <div className={styles.title}>
              {book?.name}
            </div>
            <div className={styles.available}>
              ({book?.rented ? 'Indisponível' : 'Disponível'} para aluguel)
            </div>
            <div className={styles.info}>
              {book?.authorName}
            </div>
            <div className={styles.info}>
              {book?.editorName}
            </div>
            <div className={styles.info}>
              Publicação: {book?.publishedYear}
            </div>
            <Button className={styles.rentButton}>
              ALUGAR
            </Button>
          </div>
          <div className={styles.actionsCard}>
            <div className={styles.title}>
              Ações
            </div>
            <Button variant='secondary' className={styles.rentButton}>
              DELETAR LIVRO
            </Button>
          </div>
        </div>
      </div>
      <div className={styles.detailsCard}>
        <div className={styles.title}>
          Detalhes
        </div>
        <div>
          Nome: {book?.name}
        </div>
        <div>
          Autor: {book?.authorName}
        </div>
        <div>
          Editora: {book?.editorName}
        </div>
        <div>
          Ano de publicação: {book?.publishedYear}
        </div>
        <div>
          Idioma: {book?.language?.name}
        </div>
        <div>
          Páginas: {book?.pageCount}
        </div>
        <div>
          Gêneros: {book?.genres.map(genre => genre.name).join(', ')}
        </div>
      </div>
    </div>
  );
}
