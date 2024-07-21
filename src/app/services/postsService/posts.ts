import { httpClient } from '../httpClient';

export const getPosts = async (): Promise<any> => {
  const result = await httpClient.post('/posts', {});
  return result.data;
};
