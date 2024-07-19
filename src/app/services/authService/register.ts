import { httpClient } from '../httpClient';

export interface RegisterParams {
  name: string;
  username: string;
  password: string;
}

export const register = async (params: RegisterParams) => {
  const result = await httpClient.post('/register', params);
  return result;
};
