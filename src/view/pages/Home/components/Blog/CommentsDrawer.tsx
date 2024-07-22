import * as Dialog from '@radix-ui/react-dialog';
import { FaTimes, FaEdit, FaTrash } from 'react-icons/fa';
import { PostProps } from '../../../../../app/entities';
import { useAuth } from '../../../../../app/hooks';
import { DeleteCommentModal } from './DeleteCommentModal';
import { useCommentsController } from '../../hooks/useCommentsController';

interface CommentsDrawerProps {
  onClose: () => void;
  post: PostProps;
  loggedInUserId?: number;
}

export const CommentsDrawer = ({
  onClose,
  post,
  loggedInUserId,
}: CommentsDrawerProps) => {
  const { users } = useAuth();

  const {
    comments,
    isDeleteModalOpen,
    setDeleteModalOpen,
    getCommentUserNameById,
    commentToDelete,
    setCommentToDelete,
    closeDeleteModal,
    onDeleteComment,
  } = useCommentsController(users, post);

  return (
    <Dialog.Root open={!!post} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/30" />
        <Dialog.Content
          className="fixed top-0 right-0 w-full md:w-[32rem] h-full bg-white shadow-lg p-6"
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
                  <p className="text-justify text-gray-600 text-sm md:text-sm mt-2 mb-2">
                    {comment.content}
                  </p>
                  {post.user_id === loggedInUserId &&
                    comment.user_id === loggedInUserId && (
                      <div className="flex justify-end gap-2 mt-2">
                        <button className="text-blue-500 hover:text-blue-700">
                          <FaEdit size="18px" />
                        </button>
                        <button
                          onClick={() => {
                            setCommentToDelete(comment);
                            setDeleteModalOpen(true);
                          }}
                          className="text-red-500 hover:text-red-700">
                          <FaTrash />
                        </button>
                      </div>
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
