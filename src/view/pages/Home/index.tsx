import { useCallback, useMemo, useState } from 'react';
import { useAuth, useFetchPosts } from '../../../app/hooks';
import { Spinner } from '../../components';
import { PostCard } from './components/Blog/PostCard';
import { FaExclamationTriangle } from 'react-icons/fa';
import { postsService } from '../../../app/services';
import toast from 'react-hot-toast';
import { PostProps } from '../../../app/entities';
import { EditPostDrawer } from './components/Blog/EditPostDrawer';
import { DeleteConfirmModal } from './components/Blog/DeleteConfirmModal';

export const Home = () => {
  const { user, users } = useAuth();

  const { isLoadingPostList, hasPostListError, postList, fetchPostList } =
    useFetchPosts();

  const sortedPosts = postList ? postList.sort((a, b) => b.id - a.id) : [];

  const [postToDelete, setPostToDelete] = useState<PostProps | undefined>(
    undefined
  );

  const [post, setPost] = useState<PostProps | undefined>(undefined);

  const openDeleteModal = useCallback((selectedPost: PostProps) => {
    setPostToDelete(selectedPost);
  }, []);

  const onDeleteModalClose = useCallback(async () => {
    setPostToDelete(undefined);
    await fetchPostList();
  }, [fetchPostList]);

  const openEditDrawer = useCallback((selectedPost: PostProps) => {
    setPost(selectedPost);
  }, []);

  const onEditDrawerClose = useCallback(async () => {
    setPost(undefined);
    await fetchPostList();
  }, [fetchPostList]);

  const getUserNameById = (userId: number) => {
    const user = users.find((user) => user.id === userId);
    return user ? user.name : '';
  };

  const loggedInUserId = user?.id;

  const errorMessageMap = useMemo(() => {
    return [
      {
        backendErrorMessage: 'Post não encontrado',
        parsedErrorMessage:
          'Unable to process the request. No post with this id was found.',
      },

      {
        backendErrorMessage: 'Você não tem permissão para deletar esse post',
        parsedErrorMessage: 'You do not have permission to delete this post',
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

  const onDelete = useCallback(async (postId: number) => {
    try {
      await postsService.deletePost(postId);
      setPostToDelete(undefined);
      await fetchPostList();
    } catch (error: any) {
      const errorMessage = parseErrorMessage(error.message);
      toast.error(errorMessage);
    }
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-start flex-col">
      <div className="w-full">
        <div className="flex w-full items-center justify-start flex-col gap-10 pb-20 p-4">
          <h1 className="text-teal-900 font-semibold text-center md:mb-10 lg:mb-10 text-4xl">
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

          {post && <EditPostDrawer onClose={onEditDrawerClose} post={post} />}

          {postToDelete && (
            <DeleteConfirmModal
              onClose={onDeleteModalClose}
              onDelete={onDelete}
              post={postToDelete}
            />
          )}

          {!hasPostListError && !isLoadingPostList && (
            <div className="flex flex-col w-full gap-3">
              {sortedPosts.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  userName={getUserNameById(post.user_id)}
                  loggedInUserId={loggedInUserId}
                  openDeleteModal={openDeleteModal}
                  openEditDrawer={openEditDrawer}
                  onEditDrawerClose={onEditDrawerClose}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
