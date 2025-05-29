import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View, SafeAreaView, StatusBar, NativeSyntheticEvent, TextInputSubmitEditingEventData, ScrollView, Text } from 'react-native';
import SearchBar from '../../components/SearchBar';
import RecentSearches from '../../components/RecentSearches';
import PostCard from '@/components/PostCard';
import { useAuth } from '../context/AuthContext';
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
export default function Search() {
  const [searchQuery, setSearchQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState([
    'Programación',
    'Medicina',
    'Salsa Casino',
  ]);
  const [searched, setSearched] = useState<boolean>(false);
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleRemoveSearch = (index: number) => {
    const updatedSearches = [...recentSearches];
    updatedSearches.splice(index, 1);
    setRecentSearches(updatedSearches);
  };
  const handleSubmit = () => {
    setSearched(true);
  };

  const handleFocus = () => {
    setSearched(false);
  };

  const handleSearchPress = (searchText: string) => {
    setSearchQuery(searchText.replace(" ", ""));
    setSearched(true);
  };
  const SearchedPost = () => {
    const { token } = useAuth();
    const [posts, setPost] = useState<UserPost[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPosts, setTotalPosts] = useState<number>(0);
    const pageSize = 10;
    const parser = new Parser();
    const getPosts = useCallback(async () => {
      if (loading || (totalPosts > 0 && posts.length >= totalPosts) || error) {
      return;
      }
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/api/post/search-post?page=${currentPage}&page_size=${pageSize}`, {
          method: 'POST',
          headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'api-secret': process.env.EXPO_PUBLIC_API_SECRET,
          'Authorization': `Bearer ${token}`
        } as HeadersInit,
          body: JSON.stringify({ search: searchQuery })
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
            userId: userId
          })
          
        })
        setPost((prev) => {
          const uniquePrev = new Set(prev.map((post) => post.id));
          const uniqueNew = responsePost.filter((newPost) => !uniquePrev.has(newPost.id));
          return [...prev, ...uniqueNew];
        })
        const currentSearches = recentSearches;
        currentSearches.push(searchQuery);
        setRecentSearches(currentSearches);
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
      }
    }, [searchQuery]);

    useEffect(() => {
    getPosts();
    }, [getPosts]);
    const handleScrollToEnd = ({ nativeEvent }: { nativeEvent: { contentOffset: { y: number }; contentSize: { height: number }; layoutMeasurement: { height: number } } }) => {
      const { contentOffset, contentSize, layoutMeasurement } = nativeEvent;
      const isCloseToBottom = contentOffset.y + layoutMeasurement.height >= contentSize.height - 20;
      if (isCloseToBottom) {
        getPosts();
      }
    };
    return (
      <ScrollView style={styles.postContent} onScroll={handleScrollToEnd} scrollEventThrottle={40}>
        {
          posts.length ? posts.map((post) => (
            <PostCard key={post.id} post={post}/>
          ))
          : null
        }
        {
          posts.length === 0 ?
          <View>
            <Text>No se han encontrado los post</Text>
          </View>
          : null
        }
      </ScrollView>
    )
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.content}>
        <SearchBar value={searchQuery} onChangeText={handleSearch} onSubmit={handleSubmit} onFocus={handleFocus}/>
        {!searched && <RecentSearches 
          searches={recentSearches} 
          onRemoveSearch={handleRemoveSearch}
          onSearchPress={handleSearchPress}
        />
        }
        {
          searched && <SearchedPost/>
        }
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight || 0,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  postContent: {
    flex: 1,
  },
});