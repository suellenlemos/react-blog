import { httpClient } from '../httpClient';

export const logout = async () => {
  const result = httpClient.post('/logout', {});
  return result;
};
