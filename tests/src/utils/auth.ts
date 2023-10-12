import { httpClient } from "./http-client";

export const loginAsTest = () => {
  return httpClient.post('/auth/login', {
    email: 'test@mail.com',
    password: 'password',
  }).then(res => ({ Authorization: `Bearer ${res.data.accessToken}` }));
}
