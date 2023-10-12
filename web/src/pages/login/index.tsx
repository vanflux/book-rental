import { useNavigate } from 'react-router-dom'
import { Button } from '../../components/button'
import { Logo } from '../../components/logo'
import { TextInput } from '../../components/text-input'
import { useLoginMutation } from '../../hooks/auth'
import { routes } from '../../router/routes'
import * as Yup from 'yup'
import styles from './styles.module.css'
import { useFormik } from 'formik'

export const loginFormSchema = Yup.object().shape({
  email: Yup.string().email('Email inválido').required('Campo obrigatório'),
  password: Yup.string().required('Campo obrigatório'),
})

type FormSchema = Yup.InferType<typeof loginFormSchema>

export function LoginPage() {
  const { mutateAsync: login } = useLoginMutation()
  const navigate = useNavigate()

  const { errors, values, touched, setFieldValue, setFieldTouched, submitForm } = useFormik<FormSchema>({
    initialValues: {} as FormSchema,
    validationSchema: loginFormSchema,
    onSubmit: async (values) => {
      try {
        await login({
          email: values.email,
          password: values.password,
        })
        navigate(routes.HOME())
      } catch {}
    },
  })

  const goToRegister = () => {
    navigate(routes.REGISTER())
  }

  return (
    <div className={styles.container}>
      <form
        className={styles.form}
        onSubmit={(e) => {
          e.preventDefault()
          submitForm()
        }}
      >
        <Logo />
        <div className={styles.inputsButton}>
          <div className={styles.inputs}>
            <TextInput
              full
              type="email"
              placeholder="E-mail"
              value={values.email}
              onChange={(value) => {
                setFieldTouched('email', true)
                setFieldValue('email', value)
              }}
              errorMessage={touched.email ? errors.email : undefined}
            />
            <TextInput
              full
              type="password"
              placeholder="Senha"
              value={values.password}
              onChange={(value) => {
                setFieldTouched('password', true)
                setFieldValue('password', value)
              }}
              errorMessage={touched.password ? errors.password : undefined}
            />
          </div>
          <Button type='submit'>LOGIN</Button>
        </div>
        <div className={styles.hasNoAccount}>
          Não tem uma conta? <span onClick={goToRegister}>Registre-se</span>
        </div>
      </form>
    </div>
  )
}
