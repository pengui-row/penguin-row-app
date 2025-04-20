import Button from '@/components/Button';
import Input from '@/components/Input';
import PostCard from '@/components/PostCard';
import { Feather } from "@expo/vector-icons";
import { router } from 'expo-router';
import React, { FC, useState } from 'react'
import { SafeAreaView, StyleSheet, View, Image, ScrollView, useColorScheme, Text, StatusBar, TouchableOpacity } from "react-native"
import { Header } from '@/components/Header'

export const PostDetail: FC = () => {

    const post = {
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
        hasImage: false,
        isLiked: true,
        favorite: true,
    }

    const avatarPath = '@/assets/images/avatars/';


    const [likes, setLikes] = useState(post.likes);
    const [favorite, setFavorite] = useState<boolean>(
        post.favorite ? true : false
    );
    const [isLiked, setIsLiked] = useState<boolean>(
        post.isLiked ? true : false
    );

    const comments = [
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
    ]


    const handlePressLike = () => {
        if (isLiked) {
            setLikes(`${parseInt(likes) - 1}`);
            setIsLiked(false);
        }
        else {
            setLikes(`${parseInt(likes) + 1}`);
            setIsLiked(true);
        }
    };

    const handlePressComment = () => {
        router.navigate('/(post)')
    }

    const renderTextWithSigns = (text: string) => {
        const parts = text.split(/([@#]\w+)/g);
        return (
            <Text style={styles.postText}>
                {parts.map((part, index) => {
                    if (part.startsWith("@") || part.startsWith("#")) {
                        return (
                            <Text key={index} style={styles.hashtag}>
                                {part}
                            </Text>
                        );
                    } else {
                        return part;
                    }
                })}
            </Text>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <Header title='Perfil' onBack={() => { router.back() }} />

            {/* Post */}
            <View style={styles.viewBody}>
                <View style={styles.postHeader}>
                    <Image source={post.avatar} style={styles.avatar} />
                    <View>
                        <Text style={styles.name}>{post.name}</Text>
                        <Text style={styles.handle}>{post.handle}</Text>
                    </View>
                    <Button style={styles.followButton} title='Seguir' onPress={() => { }} />
                </View>

                {/* Mostrar el texto con hashtags resaltados */}
                <View style={styles.postTextContainer}>
                    {renderTextWithSigns(post.content)}
                </View>

                {post.hasImage && (
                    <View style={styles.imageContainer}>
                        <View style={styles.imgPost}>
                            <Feather name="image" size={48} color="#B6DBFD" />
                        </View>
                    </View>
                )}

                <Text style={styles.time}>{post.time}</Text>

                <View style={styles.postActions}>
                    <TouchableOpacity style={styles.actionButton} onPress={handlePressLike}>
                        <Feather name="heart" size={16} color={isLiked ? "red" : "#657786"} />
                        <Text style={{ ...styles.actionText, color: isLiked ? "red" : "#657786" }}>{likes}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={handlePressComment} style={styles.actionButton}>
                        <Feather name="message-circle" size={16} color="#657786" />
                        <Text style={styles.actionText}>{post.comments}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.actionButton}>
                        <Feather name="bookmark" size={16} color={favorite ? "#FFA726" : "#657786"} />
                    </TouchableOpacity>
                </View>


                {/* Comment input */}
                <View style={styles.commentContent}>
                    <View style={styles.commentInputHeader}>
                        {renderTextWithSigns(`Responder a ${post.handle}`)}
                    </View>
                    <View style={styles.commentInputContainer}>
                        <Image source={require(`${avatarPath}avatar2.png`)} style={styles.avatar} />
                        <Input inputStyle={styles.commentInput} style={{ width: '84%' }} placeholder='Postea tu respuesta' onChangeText={() => { }} value='' />
                    </View>

                    <Button style={styles.sendButton} title='Responder' onPress={() => { }} />
                </View>

                {/* Comments */}

                <ScrollView>
                    {comments.map((comment) => (
                        <PostCard post={post} />
                    ))}
                </ScrollView>
            </View>


        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        marginTop: StatusBar.currentHeight || 0,
    },
    header: {
        flex: 1,
        flexDirection: 'row',
        gap: 4,
    },
    viewBody: {
        paddingVertical: 10,
        paddingHorizontal: 12,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
    },
    postHeader: {
        flexDirection: "row",
        alignItems: "center",
    },
    name: {
        fontWeight: "bold",
        marginRight: 5,
    },
    handle: {
        color: "#657786",
    },
    followButton: {
        marginLeft: 'auto',
        backgroundColor: '#4A90E2',
        paddingVertical: 8,
        paddingHorizontal: 30,
        borderRadius: 20,
    },

    sendButton: {
        marginLeft: 'auto',
        backgroundColor: '#1E3A5F',
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 24,
        marginBottom: 10,
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
    time: {
        color: "#657786",
    },
    hashtag: {
        color: "#1DA1F2",
        fontWeight: "bold",
    },
    postTextContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginBottom: 10,
        marginTop: 16,
    },
    postText: {
        lineHeight: 20,
    },
    imageContainer: {
        marginBottom: 10,
        borderRadius: 15,
        overflow: "hidden",
        borderWidth: 1,
        borderColor: "#E1E8ED",
    },
    imgPost: {
        flex: 1,
        backgroundColor: "#EAF2FE",
        justifyContent: "center",
        alignItems: "center",
        margin: 0,
        height: 100,
    },
    commentContent: {
        flexDirection: "column",
        gap: 4,
        marginBottom: 10,
        borderTopWidth: 0.2,
        borderBottomWidth: 0.2,
        borderColor: "#E1E8ED",
        marginVertical: 16,
    },
    commentInputContainer: {
        flexDirection: 'row',

    },
    commentInput: {
        width: '100%',
        borderWidth: 0,
        color: '#687684',
    },
    commentInputHeader: {
        marginLeft: '18%',
        marginBottom: 4,
        marginTop: 8,
    }

})