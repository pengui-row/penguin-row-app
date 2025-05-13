import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, View, Image, ScrollView } from "react-native"
import PostCard from "@/components/PostCard";
import Logo from "@/components/Logo";
import { useAuth } from '../context/AuthContext';

// Declaramos el tipo para las props (aunque no tiene props por ahora).
interface HomeProps {}

interface UserPost {
  id: string;
  avatar: any;
  name: string;
  handle: string;
  time: string;
  content: string;
  comments: string;
  repost: string;
  likes: string;
  hasImage: boolean;
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
  
    //   lista de posts a mostrar en el feed
    const avatarPath = '@/assets/images/avatars/';
    const default_posts = [
        {
        id: "1",
        avatar: require("../../assets/images/avatars/avatar1.png"),
        name: "Martha Craig",
        handle: "@craig_love",
        time: "12h",
        content:
            "UX/UI/UX: You can only bring one item to a remote island to assist your research of native use of tools and usability. What do you bring? #TellMeAboutYou",
        comments: "28",
        reposts: "28",
        likes: "28",
        hasImage: true,
        },
        {
        id: "2",
        avatar: require("../../assets/images/avatars/avatar3.jpg"),
        name: "CrownList LLC",
        handle: "@crownlistllc",
        time: "1 mar.",
        content:
            "UX/UI/UX: You can only bring one item to a remote island to assist your research of native use of tools and usability. What do you bring? #TellMeAboutYou",
        comments: "0",
        reposts: "0",
        likes: "0",
        hasImage: false,
        },
    ];
    const { token } = useAuth();
    const [posts, setPost] = useState<UserPost[]>([]);

    const getPosts = async () => {
      try {
        const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/api/post/get`, {
          method: 'GET',
          headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'api-secret': process.env.EXPO_PUBLIC_API_SECRET,
          'Authorization': `Bearer ${token}`
        } as HeadersInit,
        }
        );
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    }

    useEffect(()=>{
      getPosts()
    },[])
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

      <ScrollView style={styles.content}>
        {/* muestra todos los posts en cards */}
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </ScrollView>
    </SafeAreaView>
  )
};


export default Home;
