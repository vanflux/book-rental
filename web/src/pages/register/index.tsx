import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/button';
import { Logo } from '../../components/logo';
import { TextInput } from '../../components/text-input';
import { useRegisterMutation } from '../../hooks/auth';
import { routes } from '../../router/routes';
import styles from './styles.module.css';

export function RegisterPage() {
  const [email, setEmail] = useState<string>();
  const [emailError, setEmailError] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [passwordError, setPasswordError] = useState<string>();
  const [confirmPassword, setConfirmPassword] = useState<string>();
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>();
  const { mutate: register, isLoading } = useRegisterMutation();
  const navigate = useNavigate();

  const goToLogin = () => {
    navigate(routes.LOGIN());
  };

  const registerClick = async () => {
    let error = false;
    if (!email) {
      error = true;
      setEmailError('Campo obrigatório');
    }
    if (!password) {
      error = true;
      setPasswordError('Campo obrigatório');
    } else if (password.length < 8) {
      error = true;
      setPasswordError('Mínimo 8 caracteres');
    }
    if (password !== confirmPassword) {
      error = true;
      setConfirmPasswordError('As senhas não são iguais');
    }
    if (error) return;
    try {
      await register({
        email: email!,
        password: password!,
      });
      navigate(routes.HOME());
    } catch {}
  };

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <Logo />
        <div className={styles.inputsButton}>
          <div className={styles.inputs}>
            <TextInput
              full
              type='email'
              placeholder='E-mail'
              value={email}
              onChange={setEmail}
              errorMessage={emailError}
            />
            <TextInput
              full
              type='password'
              placeholder='Senha'
              value={password}
              onChange={setPassword}
              errorMessage={passwordError}
            />
            <TextInput
              full
              type='password'
              placeholder='Confirme sua senha'
              value={confirmPassword}
              onChange={setConfirmPassword}
              errorMessage={confirmPasswordError}
            />
          </div>
          <Button onClick={registerClick}>CADASTRAR</Button>
        </div>
        <div className={styles.hasAccount}>Já tem uma conta? <span onClick={goToLogin}>Entre</span></div>
      </div>
    </div>
  );
}
