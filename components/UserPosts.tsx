import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import PostCard from './PostCard'

const UserPosts = () => {
    const avatar = require("../assets/images/avatars/avatar2.png");
    const posts = [
        {
        id: "1",
        avatar: avatar,
        name: "Lucas Scott",
        handle: "@lucasscott3",
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
        avatar: avatar,
        name: "Lucas Scott",
        handle: "@lucasscott3",
        time: "1 mar.",
        content:
            "UX/UI/UX: You can only bring one item to a remote island to assist your research of native use of tools and usability. What do you bring? #TellMeAboutYou",
        comments: "0",
        reposts: "0",
        likes: "0",
        hasImage: false,
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

export default UserPosts

const styles = StyleSheet.create({
    content: {
        flex: 1,
    },
})