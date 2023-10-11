import { Navigate, useNavigate, useParams } from "react-router-dom";
import { Button } from "../../components/button";
import { Icon } from "../../components/icons";
import { useBookBySlug, useDeleteBook, useRentBook, useReturnBook } from "../../hooks/books";
import { routes } from "../../router/routes";
import styles from './styles.module.css';

export function BookPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { mutateAsync: rentBook } = useRentBook();
  const { mutateAsync: returnBook } = useReturnBook();
  const { mutateAsync: deleteBook } = useDeleteBook();
  if (!slug) return (
    <Navigate to={routes.BOOKS()} />
  )
  const { data: book, isLoading } = useBookBySlug(slug);
  
  const onBackClick = () => {
    navigate(-1);
  };

  const onBooksPageClick = () => {
    navigate(routes.BOOKS());
  };

  const onRentOrReturnClick = async () => {
    if (!book) return;
    try {
      if (book.rented) {
        await returnBook(book.id);
      } else {
        await rentBook(book.id);
      }
    } catch {}
  };

  const onDeleteClick = async () => {
    if (!book) return;
    try {
      if (!book.rented) {
        await deleteBook(book.id);
        navigate(routes.BOOKS());
      }
    } catch {}
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
        {!isLoading && (
          <img
            className={styles.imageCard}
            src={book?.bannerImageUrl ?? '/assets/images/book.svg'}
          />
        )}
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
            <Button className={styles.rentButton} onClick={onRentOrReturnClick}>
              {book?.rented ? 'DEVOLVER' : 'ALUGAR'}
            </Button>
          </div>
          <div className={styles.actionsCard}>
            <div className={styles.title}>
              Ações
            </div>
            <Button disabled={book?.rented} variant='secondary' className={styles.rentButton} onClick={onDeleteClick}>
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
