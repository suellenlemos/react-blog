import * as Dialog from '@radix-ui/react-dialog';

interface DeleteConfirmModalProps {
  isDeleteModalOpen: boolean;
  onClose: () => void;
  onDelete: () => Promise<void>;
}

export const DeleteCommentModal = ({
  onClose,
  onDelete,
  isDeleteModalOpen,
}: DeleteConfirmModalProps) => {
  return (
    <Dialog.Root open={isDeleteModalOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/30" />
        <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg w-80">
          <Dialog.Title className="text-xl font-semibold mb-4">
            Delete Comment
          </Dialog.Title>
          <Dialog.Description className="mb-6">
            Are you sure? You can't undo this action afterwards.
          </Dialog.Description>
          <div className="flex justify-end gap-4">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">
              Cancel
            </button>
            <button
              onClick={onDelete}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
              Delete
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
