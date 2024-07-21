export interface CommentProps {
  id?: number;
  user_id: number;
  content: string;
}

export interface PostProps {
  id: number;
  user_id: number;
  title: string;
  content: string;
  comments?: CommentProps[];
}
