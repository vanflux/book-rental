import jwtDecode from "jwt-decode";
import { httpClient } from "./http-client";

export interface AuthDto {
  userId?: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface LoginResultDto {
  accessToken: string;
}

export interface RegisterDto extends LoginDto {}
export interface RegisterResultDto extends LoginResultDto {}

const ACCESS_TOKEN_KEY = 'token';

export function getAccessToken() {
  return localStorage.getItem(ACCESS_TOKEN_KEY) || undefined;
}

export function setAccessToken(accessToken?: string) {
  if (accessToken) {
    return localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  } else {
    return localStorage.removeItem(ACCESS_TOKEN_KEY);
  }
}

export function decodeToken(accessToken: string): AuthDto | undefined {
  try {
    return jwtDecode(accessToken);
  } catch (exc: unknown) {
    console.log('decodeToken failed:', exc);
  }
}

export async function login(loginDto: LoginDto) {
  return httpClient.post<LoginResultDto>('/auth/login', loginDto).then(res => res.data);
}

export async function register(registerDto: RegisterDto) {
  return httpClient.post<RegisterResultDto>('/auth/register', registerDto).then(res => res.data);
}
