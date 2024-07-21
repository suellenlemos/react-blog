import { useAuth, useFetchPosts } from '../../../app/hooks';
import { Spinner } from '../../components';
import { PostCard } from './components/Blog/PostCard';
import { FaExclamationTriangle } from 'react-icons/fa';

export const Home = () => {
  const { users } = useAuth();

  const { isLoadingPostList, hasPostListError, postList } = useFetchPosts();

  const sortedPosts = postList ? postList.sort((a, b) => b.id - a.id) : [];

  const getUserNameById = (userId: number) => {
    const user = users.find((user) => user.id === userId);
    return user ? user.name : 'Unknown User';
  };

  return (
    <div className="w-full h-full flex items-center justify-start flex-col">
      <div className="w-full">
        <div className="flex w-full items-center justify-start flex-col gap-10 pb-20 p-4">
          <h1 className="text-teal-900 font-semibold text-center text-4xl">
            BLOG POSTS
          </h1>

          {hasPostListError && (
            <div
              className="flex flex-row items-center justify-start bg-red-100 border-l-4 border-red-500 text-red-700 p-4 w-auto my-4 gap-3"
              role="alert">
              <FaExclamationTriangle className="text-red-500 size-16 md:size-6" />
              <p>
                An unknown error occurred trying to load post list. Please
                reload your page or try again later.
              </p>
            </div>
          )}
          {isLoadingPostList && <Spinner className="h-24 w-24 mt-48" />}

          {!hasPostListError && !isLoadingPostList && (
            <div className="flex flex-col w-full gap-3">
              {sortedPosts.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  userName={getUserNameById(post.user_id)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
