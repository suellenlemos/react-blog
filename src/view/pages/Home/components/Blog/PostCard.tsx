import { FaComment, FaEdit, FaTrash } from 'react-icons/fa';
import { PostProps } from '../../../../../app/entities';
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipArrow,
} from '@radix-ui/react-tooltip';
import DeleteConfirmModal from '../DeleteConfirmModal';

interface PostCardProps {
  post: PostProps;
  userName: string;
  loggedInUserId?: number;
  onDelete: (postId: number) => Promise<void>;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const PostCard = ({
  post,
  userName,
  loggedInUserId,
  onDelete,
  isModalOpen,
  setIsModalOpen,
}: PostCardProps) => {
  const isPostAuthor = post.user_id === loggedInUserId;

  const truncateContent = (text: string) => {
    if (text.length > 300) {
      return text.slice(0, 300) + '...';
    }
    return text;
  };

  return (
    <div className="w-full max-w-4xl h-60 md:h-52 lg:h-56 mx-auto p-4 bg-white border-b border-gray-300">
      <p className="text-justify #6b6b6bd9 text-sm md:text-base">{userName}</p>
      <header className="mt-2 md:mt-3 text-gray-800 block text-lg md:text-2xl no-underline hover:text-teal-900 font-bold tracking-tight text-left">
        {post.title}
      </header>
      <p className="text-justify text-gray-600 text-sm md:text-base mt-2 mb-2">
        {truncateContent(post.content)}
      </p>

      <div className="flex flex-row items-center justify-between gap-2">
        <button className="flex flex-row items-center justify-center gap-2">
          <FaComment size="16px" color="#6b6b6bd9" />
          <p className="text-justify #6b6b6bd9 text-sm md:text-base">
            {post.comments?.length}
          </p>
        </button>
        {isPostAuthor && (
          <div className="flex gap-3">
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  // onClick={handleEdit}
                  className="text-blue-500 hover:text-blue-700">
                  <FaEdit size="18px" />
                </button>
              </TooltipTrigger>
              <TooltipContent
                side="top"
                align="center"
                className="bg-gray-700 text-white text-xs rounded py-1 px-2">
                <TooltipArrow className="fill-current text-gray-700" />
                Edit
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="text-red-500 hover:text-red-700">
                  <FaTrash size="16px" />
                </button>
              </TooltipTrigger>
              <TooltipContent
                side="top"
                align="center"
                className="bg-gray-700 text-white text-xs rounded py-1 px-2">
                <TooltipArrow className="fill-current text-gray-700" />
                Delete
              </TooltipContent>
            </Tooltip>
            <DeleteConfirmModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              onDelete={onDelete}
              post={post}
            />
          </div>
        )}
      </div>
    </div>
  );
};
