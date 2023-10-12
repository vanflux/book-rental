import { AxiosError, HttpStatusCode } from 'axios'
import { useMutation } from 'react-query'
import { toast } from 'react-toastify'
import { useAuth } from '../contexts/auth'
import { login, register } from '../services/auth'

export function useRegisterMutation() {
  const { setAccessToken } = useAuth()
  return useMutation({
    mutationFn: register,
    onSuccess: (data) => {
      setAccessToken(data.accessToken)
    },
    onError: (e) => {
      if (e instanceof AxiosError) {
        const status = e.request.status
        switch (status) {
          case HttpStatusCode.Conflict:
            toast.error('Usuário já existe')
            break
          default:
            toast.error('Erro desconhecido')
            break
        }
      }
    },
  })
}

export function useLoginMutation() {
  const { setAccessToken } = useAuth()
  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      setAccessToken(data.accessToken)
    },
    onError: (e: unknown) => {
      if (e instanceof AxiosError) {
        const status = e.request.status
        switch (status) {
          case HttpStatusCode.Unauthorized:
            toast.error('Usuário ou senha inválidos')
            break
          default:
            toast.error('Erro desconhecido')
            break
        }
      }
    },
  })
}
