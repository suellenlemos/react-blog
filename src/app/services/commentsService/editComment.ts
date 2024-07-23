import { httpClient } from '../httpClient';

export interface EditCommentProps {
  post_id: number;
  comment_id: number;
  comment: {
    content: string;
  };
}

export const editComment = async (params: EditCommentProps): Promise<any> => {
  const result = await httpClient.put('/comments/update', params);
  return result;
};
