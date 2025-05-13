import React, { useState } from 'react';
import { router } from "expo-router";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import Avatar from './Avatar';

interface PostProps {
  post: {
    id: string;
    image?: any;
    name: string;
    handle: string;
    time: string;
    content: string;
    comments: string;
    likes: string;
    hasImage: boolean;
    favorite?: boolean;
    isLiked?: boolean;
    tags?: string[];
  };
}

const PostCard = ({ post }: PostProps) => {
  const [likes, setLikes] = useState(post.likes);
  const [favorite, setFavorite] = useState<boolean>(
    post.favorite ? true : false
  );
  const [isLiked, setIsLiked] = useState<boolean>(
    post.isLiked ? true : false
  );
  
  const handlePressLike = () => {
    if (isLiked){
      setLikes(`${parseInt(likes) - 1}`);
      setIsLiked(false);
    }
    else {
      setLikes(`${parseInt(likes) + 1}`);
      setIsLiked(true);
    }
  };
  const handlePressFavorite = () => {
    setFavorite(!favorite)
  }

  const handlePressComment = () => {
    router.navigate('/(post)')
  }
  return (
    <View style={styles.postContainer}>
      <Avatar name={post.name}/>

      <View style={styles.postContent}>
        <View style={styles.postHeader}>
          <Text style={styles.name}>{post.name}</Text>
          <Text style={styles.handle}>{post.handle}</Text>
          <Text style={styles.time}> · {post.time}</Text>
        </View>

        {/* Mostrar el texto con hashtags resaltados */}
        <View style={styles.postTextContainer}>
          <Text style={styles.postText}>
            {post.content}
          </Text>
          {
            post.tags && 
            post.tags.map((tag, index) => (
              <Text key={index} style={styles.hashtag}>
                {" " + tag}
              </Text>
            ))
          }
        </View>

        {post.hasImage && (
          <View style={styles.imageContainer}>
            <Image src={post.image} style={styles.imgPost}/>
          </View>
        )}

        <View style={styles.postActions}>
          <TouchableOpacity style={styles.actionButton} onPress={handlePressLike}>
            <Feather name="heart" size={16} color={isLiked ? "red" : "#657786"} />
            <Text style={{...styles.actionText, color: isLiked ? "red" : "#657786"}}>{likes}</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handlePressComment} style={styles.actionButton}>
            <Feather name="message-circle" size={16} color="#657786" />
            <Text style={styles.actionText}>{post.comments}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton} onPress={handlePressFavorite}>
            <Feather name="bookmark" size={16} color={favorite ? "#FFA726" : "#657786"} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  imgPost: {
    flex: 1,
    backgroundColor: "#EAF2FE",
    justifyContent: "center",
    alignItems: "center",
    margin: 0,
    height: 100,
  },
  postContainer: {
    flexDirection: "row",
    padding: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: "#E1E8ED",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  postContent: {
    flex: 1,
  },
  postHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  name: {
    fontWeight: "bold",
    marginRight: 5,
  },
  handle: {
    color: "#657786",
  },
  time: {
    color: "#657786",
  },
  postTextContainer: {
    flexDirection: "row", // Para texto inline
    flexWrap: "wrap", // Para que el texto no se salga del contenedor
    marginBottom: 10,
  },
  postText: {
    lineHeight: 20,
  },
  hashtag: {
    color: "#1DA1F2", // Color azul para hashtags
    fontWeight: "bold", // Opcional: negrita para resaltar
  },
  imageContainer: {
    marginBottom: 10,
    borderRadius: 15,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#E1E8ED",
  },
  postImage: {
    width: "100%",
    height: 200,
    backgroundColor: "#E1E8ED",
  },
  postActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginRight: 40,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  actionText: {
    marginLeft: 5,
    color: "#657786",
    fontSize: 12,
  },
});

export default PostCard;
