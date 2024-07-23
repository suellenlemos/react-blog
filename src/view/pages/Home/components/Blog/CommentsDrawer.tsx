import * as Dialog from '@radix-ui/react-dialog';
import { FaTimes, FaEdit, FaTrash } from 'react-icons/fa';
import { PostProps } from '../../../../../app/entities';
import { useAuth } from '../../../../../app/hooks';
import { DeleteCommentModal } from './DeleteCommentModal';
import { useCommentsController } from '../../hooks/useCommentsController';
import { useForm } from 'react-hook-form';
import { Button } from '../../../../components';

interface CommentsDrawerProps {
  onClose: () => void;
  post: PostProps;
  loggedInUserId?: number;
}

export interface FormData {
  post_id: number;
  comment_id: number;
  comment: {
    content: string;
  };
}

export const CommentsDrawer = ({
  onClose,
  post,
  loggedInUserId,
}: CommentsDrawerProps) => {
  const { users } = useAuth();

  const { handleSubmit } = useForm<FormData>();

  const {
    comments,
    isDeleteModalOpen,
    getCommentUserNameById,
    commentToDelete,
    openDeleteModal,
    closeDeleteModal,
    onDeleteComment,
    isOnEditMode,
    commentToEdit,
    onEditModeHandler,
    newComment,
    setNewComment,
    isSubmitting,
    disableSubmit,
    onSubmitUpdatedComment,
    onCancelEditMode,
  } = useCommentsController(users, post);

  return (
    <Dialog.Root open={!!post} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/30" />
        <Dialog.Content
          className="fixed top-0 right-0 w-full md:w-[32rem] h-full bg-white shadow-lg p-6 pb-14 overflow-y-auto"
          aria-describedby={undefined}>
          <div className="flex justify-between items-center mb-8">
            <Dialog.Title className="text-xl font-semibold">
              Comments ({comments?.length})
            </Dialog.Title>
            <Dialog.Close className="text-gray-500 hover:text-gray-700">
              <FaTimes size={20} />
            </Dialog.Close>
          </div>

          <div className="flex flex-col gap-6">
            {comments.map((comment) => (
              <div key={comment.id} className="p-4 bg-gray-100 rounded shadow">
                <>
                  <p className="text-gray-800 text-sm">
                    {getCommentUserNameById(comment.user_id)}
                  </p>
                  {isOnEditMode && comment.id === commentToEdit?.id ? (
                    <form
                      onSubmit={handleSubmit(onSubmitUpdatedComment)}
                      id="edit-form"
                      className="flex flex-col gap-3">
                      <textarea
                        id="comment"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        className="p-2 border border-gray-300 rounded h-[30em] md:h-80 w-full"
                        placeholder=""
                      />
                      <div className="flex justify-end gap-2 mt-2 mb-2">
                        <button
                          onClick={onCancelEditMode}
                          className="text-white mt-2 bg-gray-500 hover:bg-gray-600 p-4 h-8 w-18
                rounded-2xl text-sm flex items-center justify-center">
                          Cancel
                        </button>
                        <Button
                          type="submit"
                          className="mt-2 h-8 w-18 text-sm"
                          aria-label="Save"
                          isLoading={isSubmitting}
                          disabled={disableSubmit}>
                          Save
                        </Button>
                      </div>
                    </form>
                  ) : (
                    <>
                      <p className="text-justify text-gray-600 text-sm md:text-sm mt-2 mb-2">
                        {comment.content}
                      </p>
                      {post.user_id === loggedInUserId &&
                        comment.user_id === loggedInUserId && (
                          <div className="flex justify-end gap-2 mt-2">
                            <button
                              onClick={() => {
                                onEditModeHandler(comment);
                              }}
                              className="text-blue-500 hover:text-blue-700">
                              <FaEdit size="18px" />
                            </button>

                            <button
                              onClick={() => {
                                openDeleteModal(comment);
                              }}
                              className="text-red-500 hover:text-red-700">
                              <FaTrash />
                            </button>
                          </div>
                        )}
                    </>
                  )}
                </>
              </div>
            ))}
          </div>
        </Dialog.Content>
      </Dialog.Portal>

      {isDeleteModalOpen && commentToDelete && (
        <DeleteCommentModal
          isDeleteModalOpen={isDeleteModalOpen}
          onClose={closeDeleteModal}
          onDelete={onDeleteComment}
        />
      )}
    </Dialog.Root>
  );
};
