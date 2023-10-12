import { useNavigate } from 'react-router-dom'
import { Button } from '../../components/button'
import { Logo } from '../../components/logo'
import { TextInput } from '../../components/text-input'
import { useRegisterMutation } from '../../hooks/auth'
import { routes } from '../../router/routes'
import * as Yup from 'yup'
import styles from './styles.module.css'
import { useFormik } from 'formik'

const formSchema = Yup.object().shape({
  email: Yup.string().email('Email inválido').required('Campo obrigatório'),
  password: Yup.string().required('Campo obrigatório'),
  confirmPassword: Yup.string().oneOf([Yup.ref('password')], 'As senhas devem ser iguais')
})

type FormSchema = Yup.InferType<typeof formSchema>

export function RegisterPage() {
  const { mutateAsync: register } = useRegisterMutation()
  const navigate = useNavigate()

  const { errors, values, touched, setFieldValue, setFieldTouched, submitForm, resetForm, isValid } = useFormik<FormSchema>({
    initialValues: {} as FormSchema,
    validationSchema: formSchema,
    onSubmit: async (values) => {
      try {
        await register({
          email: values.email,
          password: values.password,
        })
        navigate(routes.HOME())
      } catch {}
    },
  })

  const goToLogin = () => {
    navigate(routes.LOGIN())
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
            <TextInput
              full
              type="password"
              placeholder="Confirme sua senha"
              value={values.confirmPassword}
              onChange={(value) => {
                setFieldTouched('confirmPassword', true)
                setFieldValue('confirmPassword', value)
              }}
              errorMessage={touched.confirmPassword ? errors.confirmPassword : undefined}
            />
          </div>
          <Button type='submit'>CADASTRAR</Button>
        </div>
        <div className={styles.hasAccount}>
          Já tem uma conta? <span onClick={goToLogin}>Entre</span>
        </div>
      </form>
    </div>
  )
}
