import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";

interface PostProps {
  post: {
    id: string;
    avatar: any;
    name: string;
    handle: string;
    time: string;
    content: string;
    comments: string;
    likes: string;
    hasImage: boolean;
  };
}

const PostCard = ({ post }: PostProps) => {
  // Función para resaltar hashtags
  const renderTextWithHashtags = (text: string) => {
    const parts = text.split(/(#\w+)/g); // Dividir el texto en partes
    return parts.map((part, index) => {
      if (part.startsWith("#")) {
        return (
          <Text key={index} style={styles.hashtag}>
            {part}
          </Text>
        );
      } else {
        return (
          <Text key={index} style={styles.postText}>
            {part}
          </Text>
        );
      }
    });
  };

  return (
    <View style={styles.postContainer}>
      <Image source={post.avatar} style={styles.avatar} />

      <View style={styles.postContent}>
        <View style={styles.postHeader}>
          <Text style={styles.name}>{post.name}</Text>
          <Text style={styles.handle}>{post.handle}</Text>
          <Text style={styles.time}> · {post.time}</Text>
        </View>

        {/* Mostrar el texto con hashtags resaltados */}
        <View style={styles.postTextContainer}>
          {renderTextWithHashtags(post.content)}
        </View>

        {post.hasImage && (
          <View style={styles.imageContainer}>
            {/* Simulación de imagen genérica */}
            <View style={styles.imgPost}>
              <Feather name="image" size={48} color="#B6DBFD" />
            </View>
          </View>
        )}

        <View style={styles.postActions}>
          <TouchableOpacity style={styles.actionButton}>
            <Feather name="heart" size={16} color="#657786" />
            <Text style={styles.actionText}>{post.likes}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <Feather name="message-circle" size={16} color="#657786" />
            <Text style={styles.actionText}>{post.comments}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <Feather name="bookmark" size={16} color="#657786" />
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
