import React, { useState } from "react";
import { router } from "expo-router";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import Avatar from "./Avatar";
import { useAuth } from "@/app/context/AuthContext"; // Importar useAuth
import { Parser } from "@/utils/parser";

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

interface Comment {
  id: string;
  content: string;
  user: {name: string, lastName:string};
  createdAt: Date;
}

const PostCard = ({ post }: PostProps) => {
  const { token } = useAuth(); // Obtener el token
  const [likesCount, setLikesCount] = useState(parseInt(post.likes, 10) || 0);
  const [favorite, setFavorite] = useState<boolean>(!!post.favorite);
  const [isLiked, setIsLiked] = useState<boolean>(post.isLiked ? true : false);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState<Comment[]>([]);
  const [loadingComments, setLoadingComments] = useState(false);
  const [errorComments, setErrorComments] = useState<string | null>(null);

  const apiUrl = process.env.EXPO_PUBLIC_API_URL;
  const apiSecret = process.env.EXPO_PUBLIC_API_SECRET;
  const parser = new Parser();
  const handlePressLike = async () => {
    const originalIsLiked = isLiked;
    const originalLikesCount = likesCount;

    // Optimistic update
    setIsLiked(!originalIsLiked);
    setLikesCount(
      originalIsLiked ? originalLikesCount - 1 : originalLikesCount + 1
    );

    try {
      const url = `${apiUrl}/api/post/like`;
      const method = originalIsLiked ? "DELETE" : "POST";

      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          "api-secret": apiSecret,
          Authorization: `Bearer ${token}`,
        } as HeadersInit,
        body: JSON.stringify({ postId: post.id }),
      });

      if (!response.ok) {
        // Revert optimistic update on error
        setIsLiked(originalIsLiked);
        setLikesCount(originalLikesCount);
        console.error("Error al dar like:", await response.text());
        // Aquí podrías mostrar un toast de error
      }
      // Opcional: si el backend devuelve el nuevo estado/conteo, actualizarlo aquí.
      // const data = await response.json();
      // setIsLiked(data.isLiked);
      // setLikesCount(data.likesCount);
    } catch (error) {
      // Revert optimistic update on error
      setIsLiked(originalIsLiked);
      setLikesCount(originalLikesCount);
      console.error("Error en la petición de like:", error);
      // Aquí podrías mostrar un toast de error
    }
  };

  const handlePressFavorite = async () => {
    const originalFavorite = favorite;
    setFavorite(!originalFavorite); // Optimistic update
    const method = originalFavorite ? "DELETE" : "POST";
    try {
      const response = await fetch(`${apiUrl}/api/post/favorite`, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          "api-secret": apiSecret,
          Authorization: `Bearer ${token}`,
        } as HeadersInit,
        body: JSON.stringify({ postId: post.id }),
      });

      if (!response.ok) {
        setFavorite(originalFavorite); // Revert on error
        console.error("Error al marcar como favorito:", await response.text());
      }
    } catch (error) {
      setFavorite(originalFavorite); // Revert on error
      console.error("Error en la petición de favorito:", error);
    }
  };

  const fetchComments = async () => {
    if (loadingComments) return;
    setLoadingComments(true);
    setErrorComments(null);
    try {
      const response = await fetch(
        `${apiUrl}/api/post/comments?page=1&page_size=10`,
        {
          // Asumiendo esta ruta para obtener comentarios
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "api-secret": apiSecret,
            Authorization: `Bearer ${token}`,
          } as HeadersInit,
          body: JSON.stringify({ postId: post.id }),
        }
      );

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`Error al cargar comentarios: ${errorData}`);
      }

      const responseData = await response.json();
      const fetchedComments: Comment[] = responseData.data; // Acceder a la propiedad 'data'
      setComments(fetchedComments);
    } catch (error: any) {
      console.error("Error en fetchComments:", error);
      setErrorComments(
        error.message || "No se pudieron cargar los comentarios."
      );
      setComments([]); // Opcional: limpiar comentarios en caso de error
    } finally {
      setLoadingComments(false);
    }
  };

  const handlePressComment = async () => {
    if (!showComments && comments.length === 0) {
      // Cargar solo si se van a mostrar y no hay comentarios o son los de ejemplo
      await fetchComments();
    }
    setShowComments(!showComments);
  };

  const handleAddComment = async () => {
    if (newComment.trim() !== "") {
      // Idealmente, el backend debería devolver el comentario creado o la lista actualizada.
      // Por ahora, haremos un POST y luego recargaremos los comentarios.
      try {
        const response = await fetch(`${apiUrl}/api/post/comment`, {
          // Asumiendo esta ruta para crear un comentario
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "api-secret": apiSecret,
            Authorization: `Bearer ${token}`,
          } as HeadersInit,
          body: JSON.stringify({ postId: post.id, content: newComment }), // Enviar el texto del comentario
        });

        if (!response.ok) {
          const errorData = await response.text();
          console.error("Error al agregar comentario:", errorData);
          // Aquí podrías mostrar un toast de error al usuario
          return;
        }
        setNewComment("");
        await fetchComments(); // Recargar comentarios para mostrar el nuevo
      } catch (error) {
        console.error("Error en la petición de agregar comentario:", error);
        // Aquí podrías mostrar un toast de error al usuario
      }
    }
  };

  return (
    <View style={styles.postContainer}>
      <Avatar name={post.name} />

      <View style={styles.postContent}>
        <View style={styles.postHeader}>
          <Text style={styles.name}>{post.name}</Text>
          <Text style={styles.handle}>{post.handle}</Text>
          <Text style={styles.time}> · {post.time}</Text>
        </View>

        {/* Mostrar el texto con hashtags resaltados */}
        <View style={styles.postTextContainer}>
          <Text style={styles.postText}>{post.content}</Text>
          {post.tags &&
            post.tags.map((tag, index) => (
              <Text key={index} style={styles.hashtag}>
                {" " + tag}
              </Text>
            ))}
        </View>

        {post.hasImage && (
          <View style={styles.imageContainer}>
            <Image src={post.image} style={styles.imgPost} />
          </View>
        )}

        <View style={styles.postActions}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={handlePressLike}
          >
            <Feather
              name="heart"
              size={16}
              color={isLiked ? "red" : "#657786"}
            />
            <Text
              style={{
                ...styles.actionText,
                color: isLiked ? "red" : "#657786",
              }}
            >
              {likesCount}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handlePressComment}
            style={styles.actionButton}
          >
            <Feather name="message-circle" size={16} color="#657786" />
            <Text style={styles.actionText}>{post.comments}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={handlePressFavorite}
          >
            <Feather
              name="bookmark"
              size={16}
              color={favorite ? "#FFA726" : "#657786"}
            />
          </TouchableOpacity>
        </View>

        {/* Comments Section */}
        {showComments && (
          <View style={styles.commentsSection}>
            {loadingComments && <Text>Cargando comentarios...</Text>}
            {errorComments && (
              <Text style={{ color: "red" }}>{errorComments}</Text>
            )}
            {!loadingComments && !errorComments && comments.length === 0 && (
              <Text>No hay comentarios aún. ¡Sé el primero!</Text>
            )}
            {!loadingComments && !errorComments && comments.length > 0 && (
              comments.map((item) => (
                <View style={styles.commentContainer} key={item.id}>
                    <Text style={styles.commentAuthor}>{item.user.name + " " + item.user.lastName}:</Text>
                    <Text>{parser.timeFromTimeStamp(item.createdAt)}</Text>
                    <Text style={styles.commentText}>{item.content}</Text>
                </View>
              ))
            )}
            <View style={styles.addCommentContainer}>
              <TextInput
                style={styles.commentInput}
                placeholder="Agrega un Comentario..."
                value={newComment}
                onChangeText={setNewComment}
              />
              <TouchableOpacity
                onPress={handleAddComment}
                style={styles.postButton}
              >
                <Text style={styles.postButtonText}>Comentar</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
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
  commentsSection: {
    marginTop: 10,
  },
  commentContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#E1E8ED",
  },
  commentAuthor: {
    fontWeight: "bold",
    marginRight: 5,
  },
  commentText: {
    fontSize: 14,
  },
  addCommentContainer: {
    flexDirection: "row",
    padding: 10,
    alignItems: "center",
  },
  commentInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#E1E8ED",
    borderRadius: 5,
    padding: 8,
    marginRight: 10,
  },
  postButton: {
    backgroundColor: "#1DA1F2",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  postButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default PostCard;
