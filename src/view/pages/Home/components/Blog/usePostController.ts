import { useCallback, useMemo, useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { postsService } from '../../../../../app/services';
import { PostProps } from '../../../../../app/entities';

interface FormData {
  post_id: number;
  post: {
    title: string;
    content: string;
  };
}

export const usePostController = (post: PostProps, onClose: () => void) => {
  const [newTitle, setNewTitle] = useState<string>(post.title);

  const [newContent, setNewContent] = useState<string>(post.content);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const disableSubmit = !newTitle || !newContent || isSubmitting;

  const errorMessageMap = useMemo(() => {
    return [
      {
        backendErrorMessage: 'Post não encontrado',
        parsedErrorMessage:
          'Unable to process the request. No post with this id was found.',
      },
    ];
  }, []);

  const parseErrorMessage = useCallback(
    (attr: string) => {
      let errorMessage = attr;
      errorMessageMap.forEach((item) => {
        errorMessage = errorMessage.replace(
          item.backendErrorMessage,
          item.parsedErrorMessage
        );
      });
      return errorMessage;
    },
    [errorMessageMap]
  );

  const onSubmit: SubmitHandler<FormData> = useCallback(async () => {
    const params = {
      post_id: post.id,
      post: {
        title: newTitle,
        content: newContent,
      },
    };
    setIsSubmitting(true);
    try {
      await postsService.editPost(params);
      setIsSubmitting(false);
      onClose();
    } catch (error: any) {
      setIsSubmitting(false);
      const errorMessage = parseErrorMessage(error.message);
      toast.error(errorMessage);
    }
  }, [post.id, newTitle, newContent, onClose]);

  return {
    newTitle,
    setNewTitle,
    newContent,
    setNewContent,
    isSubmitting,
    setIsSubmitting,
    disableSubmit,
    onSubmit,
  };
};
