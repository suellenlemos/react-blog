import { FaComment } from 'react-icons/fa';
import { PostProps } from '../../../../../app/entities';

interface PostCardProps {
  post: PostProps;
  userName: string;
}

export const PostCard = ({ post, userName }: PostCardProps) => {
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

      <button className="flex flex-row items-center justify-center gap-2">
        <FaComment size="16px" color="#6b6b6bd9" />
        <p className="text-justify #6b6b6bd9 text-sm md:text-base">
          {post.comments?.length}
        </p>
      </button>
    </div>
  );
};
