import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { MaterialIcons } from '@expo/vector-icons';

const ProfileInfo = () => {
    const avatarPath = '@/assets/images/avatars/';
    const baseInfo = {
        name: "Lucas Scott",
        userName: "lucasscott3",
        post: 12,
        followers: 520,
        followed: 16
    }
  return (
    <View style={styles.container}>
      <View>
        <Image source={require(`${avatarPath}avatar2.png`)} style={styles.profilePic}/>
        <MaterialIcons name='edit' color={"white"} style={styles.editIcon}/>
      </View>
      <Text style={{fontWeight:"bold", fontSize:20}}>{baseInfo.name}</Text>
      <Text>{`@${baseInfo.userName}`}</Text>
      <View style={styles.rowContainer}>
        <View style={styles.textContainer}>
            <Text style={styles.boldText}>{baseInfo.post}</Text>
            <Text>Publicaciones</Text>
        </View>
        <View style={styles.textContainer}>
            <Text style={styles.boldText}>{baseInfo.followers}</Text>
            <Text>Seguidores</Text>
        </View>
        <View style={styles.textContainer}>
            <Text style={styles.boldText}>{baseInfo.followed}</Text>
            <Text>Seguidos</Text>
        </View>
      </View>
    </View>
  )
}

export default ProfileInfo

const styles = StyleSheet.create({
    profilePic: {
        width: 60,
        height: 60,
        borderRadius: 28,
    },
    container: {
        alignItems: "center",
        marginHorizontal: "auto",
    },
    rowContainer: {
        flexDirection: "row",
    },
    textContainer: {
        alignItems: "center",
        padding: 4,
    },
    boldText: {
        fontWeight: "bold",
        fontSize: 28
    },
    editIcon: {
        backgroundColor: "blue",
        borderRadius: 60,
        alignSelf: "flex-end",
        width: 14,
        height: 14,
        marginTop: -10
    },
})