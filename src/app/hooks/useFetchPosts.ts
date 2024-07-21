import { useCallback, useEffect, useState } from 'react';
import { PostProps } from '../entities';
import { getPosts } from '../services/postsService/posts';

export const useFetchPosts = () => {
  const [isLoadingPostList, setIsLoadingPostList] = useState<boolean>(true);

  const [hasPostListError, setHasPostListError] = useState<boolean>(false);

  const [postListLength, setPostListLength] = useState<number>(0);

  const [postList, setPostList] = useState<PostProps[]>([]);

  const fetchPostList = useCallback(async (): Promise<void> => {
    try {
      setIsLoadingPostList(true);
      const result = await getPosts();
      setHasPostListError(false);
      setPostList(result);
      setPostListLength(result.length);
    } catch (err) {
      setHasPostListError(true);
    } finally {
      setIsLoadingPostList(false);
    }
  }, []);

  useEffect(() => {
    fetchPostList();
  }, [fetchPostList]);

  return {
    isLoadingPostList,
    setIsLoadingPostList,
    hasPostListError,
    setHasPostListError,
    postListLength,
    setPostListLength,
    postList,
    setPostList,
    fetchPostList,
  };
};
