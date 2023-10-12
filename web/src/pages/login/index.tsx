import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Button } from '../../components/button'
import { Logo } from '../../components/logo'
import { TextInput } from '../../components/text-input'
import { useLoginMutation } from '../../hooks/auth'
import { routes } from '../../router/routes'
import styles from './styles.module.css'

export function LoginPage() {
  const [email, setEmail] = useState<string>()
  const [emailError, setEmailError] = useState<string>()
  const [password, setPassword] = useState<string>()
  const [passwordError, setPasswordError] = useState<string>()
  const { mutateAsync: login } = useLoginMutation()
  const navigate = useNavigate()

  const goToRegister = () => {
    navigate(routes.REGISTER())
  }

  const loginClick = async () => {
    let error = false
    if (!email) {
      error = true
      setEmailError('Campo obrigatório')
    }
    if (!password) {
      error = true
      setPasswordError('Campo obrigatório')
    }
    if (error) return
    try {
      await login({
        email: email!,
        password: password!,
      })
      navigate(routes.HOME())
    } catch {}
  }

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <Logo />
        <div className={styles.inputsButton}>
          <div className={styles.inputs}>
            <TextInput full type="email" placeholder="E-mail" value={email} onChange={setEmail} errorMessage={emailError} />
            <TextInput full type="password" placeholder="Senha" value={password} onChange={setPassword} errorMessage={passwordError} />
          </div>
          <Button onClick={loginClick}>LOGIN</Button>
        </div>
        <div className={styles.hasNoAccount}>
          Não tem uma conta? <span onClick={goToRegister}>Registre-se</span>
        </div>
      </div>
    </div>
  )
}
