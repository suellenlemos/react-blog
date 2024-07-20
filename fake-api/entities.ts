export interface ILogin {
  username: string;
  password: string;
}

export interface IRegister {
  name: string;
  username: string;
  password: string;
}

export interface IUser {
  id?: number;
  name: string;
  username: string;
  password: string;
}

export interface IComment {
  id?: number;
  user_id?: number;
  content: string;
}

export interface IPost {
  id?: number;
  user_id?: number;
  title: string;
  content: string;
  comments?: IComment[];
}

export interface ICreatePost {
  title: string;
  content: string;
}

export interface IUpdatePost {
  post_id: number;
  post: {
    title: string;
    content: string;
  };
  comments: IComment[];
}

export interface ICreateComment {
  post_id: number;
  comment: {
    content: string;
  };
}

export interface IViewComment {
  post_id: number;
  comment_id: number;
}

export interface IUpdateComment {
  post_id: number;
  comment_id: number;
  comment: { content: string };
}

export interface IRemoveComment {
  post_id: number;
  comment_id: number;
}
