import { StyleSheet, Text, View, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { MaterialIcons } from '@expo/vector-icons';
import { useAuth } from '@/app/context/AuthContext';
import Avatar from './Avatar';
interface WhoAmI {
  id: string;
  profile: {
    id: string;
    email: string;
    phone: string;
    name: string;
    lastName: string;
    birthDate: string;
  };
}
const ProfileInfo = () => {
    const [baseInfo, setBaseInfo] = useState<WhoAmI>();
    const { token } = useAuth();

    const getUserBaseInfo = async () => {
        try {
            const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/api/user/whoami`, {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'api-secret': process.env.EXPO_PUBLIC_API_SECRET,
            'Authorization': `Bearer ${token}`
            } as HeadersInit,
            }
            );

            if (!response.ok) {
            throw new Error('Error al cargar la información del usuario');
            }

            const dataResponded: WhoAmI = await response.json();
            setBaseInfo(dataResponded);
            //todo obtener cantidad de post seguidores y seguidos
        } catch (error) {
          console.log(error)  
        }
    }
    useEffect(()=> {
      getUserBaseInfo()
    },[])
  return (
    <View style={styles.container}>
      <View>
        <Avatar name={baseInfo?.profile.name + " " + baseInfo?.profile.lastName} size={55}/>
      </View>
      <Text style={{fontWeight:"bold", fontSize:20}}>{baseInfo?.profile.name + " " + baseInfo?.profile.lastName}</Text>
      <Text>{`@${baseInfo?.profile.name}${baseInfo?.profile.lastName}`}</Text>
      <View style={styles.rowContainer}>
        <View style={styles.textContainer}>
            <Text style={styles.boldText}>{0}</Text>
            <Text>Publicaciones</Text>
        </View>
        <View style={styles.textContainer}>
            <Text style={styles.boldText}>{0}</Text>
            <Text>Seguidores</Text>
        </View>
        <View style={styles.textContainer}>
            <Text style={styles.boldText}>{0}</Text>
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