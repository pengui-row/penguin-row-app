import React, { useCallback, useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, View, Image, ScrollView } from "react-native"
import PostCard from "@/components/PostCard";
import Logo from "@/components/Logo";
import { useAuth } from '../context/AuthContext';
import { Parser } from '@/utils/parser';

// Declaramos el tipo para las props (aunque no tiene props por ahora).
interface HomeProps {}

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

const Home: React.FC<HomeProps> = () => {

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: 15,
      paddingVertical: 10,
      borderBottomWidth: 0.5,
      borderBottomColor: "#E1E8ED",
    },
    profilePic: {
      width: 48,
      height: 48,
      borderRadius: 28,
    },
    placeholder: {
      width: 32,
    },
    content: {
      flex: 1,
    },
  })
  
    const avatarPath = '@/assets/images/avatars/';
    
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
        const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/api/post/get?page=${currentPage}&page_size=${pageSize}`, {
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
        setCurrentPage(responseCurrentPage + 1);
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
    }, [currentPage, loading, totalPosts, posts.length]);

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
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require(`${avatarPath}avatar2.png`)} //foto de perfil
          style={styles.profilePic}
        />
        <Logo displayText={false}/>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} 
      onScroll={handleScrollToEnd}
      scrollEventThrottle={40}
      >
        {/* muestra todos los posts en cards */}
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </ScrollView>
    </SafeAreaView>
  )
};


export default Home;
