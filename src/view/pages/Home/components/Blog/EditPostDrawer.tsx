import * as Dialog from '@radix-ui/react-dialog';
import { PostProps } from '../../../../../app/entities';
import { useForm } from 'react-hook-form';
import { Button } from '../../../../components';
import { useEditPostController } from '../../hooks/useEditPostController';

interface FormData {
  post_id: number;
  post: {
    title: string;
    content: string;
  };
}

interface EditPostDrawerProps {
  onClose: () => void;
  post: PostProps;
}

export const EditPostDrawer = ({ onClose, post }: EditPostDrawerProps) => {
  const { handleSubmit } = useForm<FormData>();

  const {
    newTitle,
    setNewTitle,
    newContent,
    setNewContent,
    isSubmitting,
    disableSubmit,
    onSubmit,
  } = useEditPostController(post, onClose);

  return (
    <Dialog.Root open={!!post} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/30" />
        <Dialog.Content
          className="fixed top-0 right-0 w-full md:w-[32rem] h-full bg-white shadow-lg p-6 overflow-y-auto"
          aria-describedby={undefined}>
          <Dialog.Title className="text-xl font-semibold mb-4">
            Edit Post
          </Dialog.Title>
          <form
            onSubmit={handleSubmit(onSubmit)}
            id="edit-form"
            className="flex flex-col gap-4">
            <input
              type="text"
              id="title"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="p-2 border border-gray-300 rounded"
              placeholder="Title"
            />
            <textarea
              id="content"
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              className="p-2 border border-gray-300 rounded h-[30em] md:h-80"
              placeholder="Post Content"
            />
            <div className="flex justify-end gap-4 mt-6 mb-10">
              <button
                onClick={onClose}
                className="text-white mt-2 bg-gray-500 hover:bg-gray-600 p-4 h-10 w-24
                rounded-2xl font-medium flex items-center justify-center">
                Cancel
              </button>
              <Button
                type="submit"
                className="mt-2 h-10 w-24"
                aria-label="Save"
                isLoading={isSubmitting}
                disabled={disableSubmit}>
                Save
              </Button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
