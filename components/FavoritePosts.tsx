import { RefreshControl, ScrollView, StyleSheet } from 'react-native'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import PostCard from './PostCard'
import { useAuth } from '@/app/context/AuthContext';
import { Parser } from '@/utils/parser';
interface UserPost {
  id: string;
  image?: any;
  name: string;
  handle: string;
  time: string;
  content: string;
  comments: string;
  repost: string;
  likes: string;
  hasImage: boolean;
  tags?: string[];
  favorite?: boolean;
  isLiked?: boolean;
  userId?: string;
}
interface ApiResponse {
  data: any[];
  total: number;
  currentPage: number;
  pageSize: number;
}
const FavoritePosts = () => {
    const { token } = useAuth();
    const [posts, setPost] = useState<UserPost[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPosts, setTotalPosts] = useState<number>(0);
    const [refreshing, setRefreshing] = useState<boolean>(false);
    const pageSize = 10;
    const parser = useMemo(() => new Parser(), []);
    const getPosts = useCallback(async (pageToFetch?: number) => {
      const targetPage = pageToFetch !== undefined ? pageToFetch : currentPage;
      if (pageToFetch === undefined) {
        if (loading || (totalPosts > 0 && posts.length >= totalPosts) || error) {
          if (refreshing && !loading) {
            setRefreshing(false);
          }
      return;
      }
      }
      setLoading(true);
      if (targetPage === 1) {
        setError(null);
      }
      try {
        const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/api/post/favorite-post?page=${targetPage}&page_size=${pageSize}`, {
          method: 'GET',
          headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'api-secret': process.env.EXPO_PUBLIC_API_SECRET,
          'Authorization': `Bearer ${token}`
        } as HeadersInit,
        }
        );
      
        const dataResponded: ApiResponse = await response.json();

        if (!response.ok) {
        throw new Error('Error al cargar los posts');
        }

        const { data, total, currentPage: responseCurrentPage  } = dataResponded;
        setTotalPosts(total);
        const responsePost: UserPost[] = [];
        data.forEach((post: any) => {
          const { commentsCount, content, id, image_url, user, time_stamp, likesCount, tags, isLiked, isFavorite, userId } = post;
          responsePost.push({
            id: id,
            image: image_url,
            name: `${user.name} ${user.lastName}`,
            handle: `@${user.name}${user.lastName}`,
            time: parser.timeFromTimeStamp(time_stamp),
            content: content,
            comments: commentsCount,
            repost: "0",
            likes: likesCount?.toString() || "0",
            hasImage: image_url ? true : false,
            tags: tags,
            favorite: isFavorite,
            isLiked: isLiked,
            userId: userId,
          })
          
        })
        if (targetPage === 1) {
        setPost(responsePost);
        } else {
        setPost((prevPosts) => {
          const existingPostIds = new Set(prevPosts.map(p => p.id));
          const newUniquePosts = responsePost.filter(p => !existingPostIds.has(p.id));
          return [...prevPosts, ...newUniquePosts];
        });
      }
        setCurrentPage(responseCurrentPage + 1);
        setError(null);
      } catch (err: any) {
        if (typeof err === 'string') {
        setError(err);
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Ocurrió un error desconocido.');
      }
      console.log(err);
      } finally {
      setLoading(false);
      if (pageToFetch === 1 || refreshing) {
        setRefreshing(false);
      }
      }
    }, [currentPage, loading, totalPosts, posts.length, error, loading, refreshing]);

    useEffect(() => {
    if (currentPage === 1 && posts.length === 0 && !loading && !refreshing && !error) {
        getPosts(1);
    }
    }, [currentPage, posts.length, loading, refreshing, getPosts, error]);
    const handleScrollToEnd = ({ nativeEvent }: { nativeEvent: { contentOffset: { y: number }; contentSize: { height: number }; layoutMeasurement: { height: number } } }) => {
      const { contentOffset, contentSize, layoutMeasurement } = nativeEvent;
      const isCloseToBottom = contentOffset.y + layoutMeasurement.height >= contentSize.height - 20;
      if (isCloseToBottom && !loading && !refreshing && !error && (posts.length < totalPosts || totalPosts === 0) ) {
        getPosts();
      }
    };
    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setCurrentPage(1);
        setError(null);
        setPost([]);
        getPosts(1);
      }, [getPosts]);
  return (
    <ScrollView style={styles.content} onScroll={handleScrollToEnd} scrollEventThrottle={40}
    refreshControl={
      <RefreshControl
      refreshing={refreshing} 
      onRefresh={onRefresh} 
      colors={['#007AFF']}
      tintColor={'#007AFF'}
      />
    }
    >
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
        ))}
    </ScrollView>
  )
}

export default FavoritePosts

const styles = StyleSheet.create({
    content: {
        flex: 1,
    },
})