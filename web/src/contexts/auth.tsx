import { createContext, PropsWithChildren, useContext, useMemo, useState } from 'react'
import { AuthDto, decodeToken, getAccessToken, setAccessToken } from '../services/auth'

export interface AuthContext {
  auth?: AuthDto & { iat?: number }
  setAccessToken: (accessToken?: string) => void
  logout: () => void
}

const context = createContext<AuthContext>({
  setAccessToken() {},
  logout() {},
})

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [authDto, setAuthDto] = useState<AuthDto | undefined>(() => {
    const accessToken = getAccessToken()
    if (accessToken) return decodeToken(accessToken)
  })
  const value = useMemo<AuthContext>(() => ({
    auth: authDto,
    setAccessToken: (accessToken) => {
      setAccessToken(accessToken)
      if (accessToken) {
        setAuthDto(decodeToken(accessToken))
      } else {
        setAuthDto(undefined)
      }
    },
    logout: () => {
      setAccessToken(undefined)
      setAuthDto(undefined)
    }
  }), [authDto]);
  return (
    <context.Provider
      value={value}
    >
      {children}
    </context.Provider>
  )
}

export const useAuth = () => useContext(context)
