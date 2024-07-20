import { httpClient } from '../httpClient';

export interface LoginParams {
  username: string;
  password: string;
}

export const login = async (params: LoginParams): Promise<any> => {
  const result = await httpClient.post('/login', params);
  return result;
};
