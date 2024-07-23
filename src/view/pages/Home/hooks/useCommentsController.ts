import { useCallback, useState } from 'react';
import { toast } from 'react-hot-toast';
import { commentsService } from '../../../../app/services';
import { CommentProps, PostProps, User } from '../../../../app/entities';
import { SubmitHandler } from 'react-hook-form';

export interface FormData {
  post_id: number;
  comment_id: number;
  comment: {
    content: string;
  };
}

export const useCommentsController = (users: User[], post: PostProps) => {
  const [comments, setComments] = useState(post.comments);

  const [isDeleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);

  const [isOnEditMode, setIsOnEditMode] = useState<boolean>(false);

  const [commentToDelete, setCommentToDelete] = useState<
    CommentProps | undefined
  >(undefined);

  const [commentToEdit, setCommentToEdit] = useState<CommentProps | undefined>(
    undefined
  );

  const [newComment, setNewComment] = useState<string>('');

  const [isSubmitting, setIsSubmitting] = useState(false);

  const disableSubmit = !newComment || isSubmitting;

  const openDeleteModal = useCallback((selectedComment: CommentProps) => {
    setCommentToDelete(selectedComment);
    setDeleteModalOpen(true);
  }, []);

  const onEditModeHandler = useCallback((selectedComment: CommentProps) => {
    setIsOnEditMode(true);
    setCommentToEdit(selectedComment);
    setNewComment(selectedComment.content);
  }, []);

  const getCommentUserNameById = (userId: number) => {
    const userName = users.find((user) => user.id === userId);
    return userName ? userName.name : '';
  };

  const closeDeleteModal = useCallback(() => {
    setDeleteModalOpen(false);
    setCommentToDelete(undefined);
  }, []);

  const onCancelEditMode = useCallback(() => {
    setIsOnEditMode(false);
    setCommentToEdit(undefined);
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

  const onSubmitUpdatedComment: SubmitHandler<FormData> =
    useCallback(async () => {
      if (commentToEdit) {
        const params = {
          post_id: post.id,
          comment_id: commentToEdit.id,
          comment: {
            content: newComment,
          },
        };
        setIsSubmitting(true);
        try {
          await commentsService.editComment(params);
          setComments((prevComments) =>
            prevComments.map((comment) =>
              comment.id === commentToEdit.id
                ? { ...comment, content: newComment }
                : comment
            )
          );
          setIsSubmitting(false);
          onCancelEditMode();
        } catch (error: any) {
          setIsSubmitting(false);
          toast.error(error.message);
        }
      }
    }, [post.id, newComment, commentToEdit?.id, onCancelEditMode]);

  return {
    comments,
    setComments,
    isDeleteModalOpen,
    setDeleteModalOpen,
    getCommentUserNameById,
    commentToDelete,
    setCommentToDelete,
    openDeleteModal,
    closeDeleteModal,
    onDeleteComment,
    isOnEditMode,
    setIsOnEditMode,
    commentToEdit,
    setCommentToEdit,
    onEditModeHandler,
    newComment,
    setNewComment,
    isSubmitting,
    setIsSubmitting,
    disableSubmit,
    onSubmitUpdatedComment,
    onCancelEditMode,
  };
};
