import { httpClient } from '../httpClient';

export interface DeleteCommentProps {
  post_id: number;
  comment_id: number;
}

export const deleteComment = async (
  params: DeleteCommentProps
): Promise<any> => {
  const result = await httpClient.delete('/comments/remove', params);
  return result;
};
