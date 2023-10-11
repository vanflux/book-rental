import { createContext, PropsWithChildren, useContext, useState } from "react";
import { AuthDto, decodeToken, getAccessToken, setAccessToken } from "../services/auth";

export interface AuthContext {
  auth?: AuthDto & { iat?: number };
  setAccessToken: (accessToken?: string) => void;
}

const context = createContext<AuthContext>({
  setAccessToken() {}
});

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [authDto, setAuthDto] = useState<AuthDto | undefined>(() => {
    const accessToken = getAccessToken();
    if (accessToken) return decodeToken(accessToken);
  });
  return (
    <context.Provider
      value={{
        auth: authDto,
        setAccessToken: accessToken => {
          setAccessToken(accessToken);
          if (accessToken) {
            setAuthDto(decodeToken(accessToken));
          } else {
            setAuthDto(undefined);
          }
        }
      }}
    >
      {children}
    </context.Provider>
  )
};

export const useAuth = () => useContext(context);
