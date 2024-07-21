import { httpClient } from '../httpClient';

export interface EditPostProps {
  post_id: number;
  post: {
    title: string;
    content: string;
  };
}

export const editPost = async (params: EditPostProps): Promise<any> => {
  const result = await httpClient.put('/posts/update', params);
  return result;
};
