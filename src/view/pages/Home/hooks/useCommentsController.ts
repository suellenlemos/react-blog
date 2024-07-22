import { useCallback, useState } from 'react';
import { toast } from 'react-hot-toast';
import { commentsService } from '../../../../app/services';
import { CommentProps, PostProps, User } from '../../../../app/entities';

export const useCommentsController = (users: User[], post: PostProps) => {
  const [comments, setComments] = useState(post.comments);

  const [isDeleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);

  const getCommentUserNameById = (userId: number) => {
    const userName = users.find((user) => user.id === userId);
    return userName ? userName.name : '';
  };

  const [commentToDelete, setCommentToDelete] = useState<
    CommentProps | undefined
  >(undefined);

  const closeDeleteModal = useCallback(() => {
    setDeleteModalOpen(false);
    setCommentToDelete(undefined);
  }, []);

  const onDeleteComment = useCallback(async () => {
    if (commentToDelete) {
      const params = {
        post_id: post.id,
        comment_id: commentToDelete.id,
      };
      try {
        await commentsService.deleteComment(params);
        setComments((prevComments) =>
          prevComments.filter((comment) => comment.id !== commentToDelete.id)
        );
        closeDeleteModal();
      } catch (error: any) {
        toast.error(error.message);
      }
    }
  }, [commentToDelete, post.id]);

  return {
    comments,
    setComments,
    isDeleteModalOpen,
    setDeleteModalOpen,
    getCommentUserNameById,
    commentToDelete,
    setCommentToDelete,
    closeDeleteModal,
    onDeleteComment,
  };
};
