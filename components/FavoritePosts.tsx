import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import PostCard from './PostCard'

const FavoritePosts = () => {
    const posts = [
        {
        id: "1",
        avatar: require("../assets/images/avatars/avatar1.png"),
        name: "Martha Craig",
        handle: "@craig_love",
        time: "12h",
        content:
            "UX/UI/UX: You can only bring one item to a remote island to assist your research of native use of tools and usability. What do you bring? #TellMeAboutYou",
        comments: "28",
        reposts: "28",
        likes: "28",
        hasImage: true,
        favorite: true,
        },
        {
        id: "2",
        avatar: require("../assets/images/avatars/avatar3.jpg"),
        name: "CrownList LLC",
        handle: "@crownlistllc",
        time: "1 mar.",
        content:
            "UX/UI/UX: You can only bring one item to a remote island to assist your research of native use of tools and usability. What do you bring? #TellMeAboutYou",
        comments: "0",
        reposts: "0",
        likes: "0",
        hasImage: false,
        favorite: true,
        },
    ]
  return (
    <ScrollView style={styles.content}>
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