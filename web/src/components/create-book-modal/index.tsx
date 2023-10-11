import { BookItem } from "../book-item";
import { Button } from "../button";
import { Modal } from "../modal";
import { Select } from "../select";
import { TextInput } from "../text-input";
import * as Yup from "yup";
import { useFormik } from "formik";
import styles from './styles.module.css';
import { NumberInput } from "../number-input";
import { useGenres } from "../../hooks/genres";
import { useEffect } from "react";
import { CreateBookDto } from "../../services/books";
import { useCreateBook } from "../../hooks/books";
import { useLanguages } from "../../hooks/languages";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const formSchema = Yup.object().shape({
  name: Yup.string().required('Campo obrigatório'),
  authorName: Yup.string().required('Campo obrigatório'),
  publishedYear: Yup.number().required('Campo obrigatório'),
  genres: Yup.array(Yup.object({ value: Yup.string().required(), label: Yup.string().required() })),
  bannerImageUrl: Yup.string(),
  editorName: Yup.string(),
  pageCount: Yup.number(),
  language: Yup.object({ value: Yup.string().required(), label: Yup.string().required() }),
});

type FormSchema = Yup.InferType<typeof formSchema>;

export function CreateBookModal({ open, onOpenChange }: Props) {
  const { data: genres } = useGenres();
  const { data: languages } = useLanguages();
  const { mutateAsync: createBook } = useCreateBook();

  const { errors, values, touched, setFieldValue, setFieldTouched, submitForm, resetForm, isValid } = useFormik<FormSchema>({
    initialValues: {} as FormSchema,
    validationSchema: formSchema,
    onSubmit: async (values) => {
      const createBookDto: CreateBookDto = {
        authorName: values.authorName,
        bannerImageUrl: values.bannerImageUrl,
        editorName: values.editorName,
        genresIds: values.genres?.map(genre => genre.value),
        languageId: values.language?.value,
        name: values.name,
        pageCount: values.pageCount,
        publishedYear: values.publishedYear,
      }
      try {
        await createBook(createBookDto);
        onOpenChange(false);
      } catch {}
    }
  });

  const genresOptions = genres?.items.map(genre => ({ value: genre.id, label: genre.name })) ?? [];
  const languagesOptions = languages?.items.map(language => ({ value: language.id, label: language.name })) ?? [];

  useEffect(() => {
    resetForm({});
  }, [open]);

  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      <div className={styles.container}>
        <div className={styles.title}>
          Cadastro de livro
        </div>
        <div className={styles.formAndPreview}>
          <form
            className={styles.form}
            onSubmit={e => {
              e.preventDefault();
              submitForm();
            }}
          >
            <TextInput
              placeholder='Nome*'
              value={values.name}
              onChange={value => {
                setFieldTouched('name', true);
                setFieldValue('name', value);
              }}
              errorMessage={touched.name ? errors.name : undefined}
            />
            <TextInput
              placeholder='Nome do autor*'
              value={values.authorName}
              onChange={value => {
                setFieldTouched('authorName', true);
                setFieldValue('authorName', value);
              }}
              errorMessage={touched.authorName ? errors.authorName : undefined}
            />
            <TextInput
              placeholder='Nome da editora'
              value={values.editorName}
              onChange={value => {
                setFieldTouched('editorName', true);
                setFieldValue('editorName', value);
              }}
              errorMessage={touched.editorName ? errors.editorName : undefined}
            />
            <TextInput
              placeholder='URL da imagem'
              value={values.bannerImageUrl}
              onChange={value => {
                setFieldTouched('bannerImageUrl', true);
                setFieldValue('bannerImageUrl', value);
              }}
              errorMessage={touched.bannerImageUrl ? errors.bannerImageUrl : undefined}
            />
            <NumberInput
              placeholder='Quantidade de páginas'
              value={values.pageCount}
              onChange={value => {
                setFieldTouched('pageCount', true);
                setFieldValue('pageCount', value);
              }}
              errorMessage={touched.pageCount ? errors.pageCount : undefined}
            />
            <NumberInput
              placeholder='Ano de publicação*'
              value={values.publishedYear}
              onChange={value => {
                setFieldTouched('publishedYear', true);
                setFieldValue('publishedYear', value);
              }}
              errorMessage={touched.publishedYear ? errors.publishedYear : undefined}
            />
            <Select
              placeholder='Linguagem'
              options={languagesOptions}
              value={[values.language]}
              onChange={value => {
                setFieldTouched('language', true);
                setFieldValue('language', value?.[0]);
              }}
              errorMessage={touched.language?.label ? errors.language?.label : undefined}
            />
            <Select
              multi
              placeholder='Gêneros'
              options={genresOptions}
              value={values.genres}
              onChange={value => {
                setFieldTouched('genres', true);
                setFieldValue('genres', value);
              }}
              errorMessage={touched.genres ? errors.genres : undefined}
            />
            <Button disabled={!isValid} type='submit'>
              CADASTRAR
            </Button>
          </form>
          <div className={styles.preview}>
            <BookItem
              name={values.name}
              slug=''
              rented={false}
              bannerImageUrl={values.bannerImageUrl}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
}
