import { httpClient } from '../httpClient';

export const deletePost = async (post_id: number): Promise<any> => {
  const result = await httpClient.delete('/posts/remove', { post_id });
  return result;
};
