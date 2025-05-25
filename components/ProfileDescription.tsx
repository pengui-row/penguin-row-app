import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { useAuth } from '@/app/context/AuthContext';

interface UserInfo {
  id: string;
  interests: string[];
  location: string;
  professional_title: string;
  talents: string;
  experience: string;
  user: { id: string };
}
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
const ProfileDescription = () => {
    const [userInfo, setUserInfo] = useState<UserInfo>();
    const [userPhone, setUserPhone] = useState<WhoAmI>()
    const { token } = useAuth();
    
    const getUserInfo = async () => {
      try {
        const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/api/user/user-info`, {
          method: 'GET',
          headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'api-secret': process.env.EXPO_PUBLIC_API_SECRET,
          'Authorization': `Bearer ${token}`
        } as HeadersInit,
        }
        );
      
        const dataResponded: UserInfo = await response.json();
        if (!response.ok) {
        throw new Error('Error al cargar la información del usuario');
        }

        setUserInfo(dataResponded);

        const response2 = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/api/user/whoami`, {
          method: 'GET',
          headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'api-secret': process.env.EXPO_PUBLIC_API_SECRET,
          'Authorization': `Bearer ${token}`
        } as HeadersInit,
        }
        );

        if (!response2.ok) {
        throw new Error('Error al cargar la información del usuario');
        }

        const dataResponded2: WhoAmI = await response2.json();

        setUserPhone(dataResponded2);
      } catch (error) {
        console.log(error)
      }
    }

    useEffect(() => {
      getUserInfo()
    },[]);
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.textBold}>Intereses</Text>
      <View style={styles.rowContainer}>
      {
        userInfo?.interests.map((index) => (
            <View key={index} style={styles.tagContainer}>
              <Text style={{color:"#0D2538"}}>{index}</Text>
            </View>
        ))
      }
      </View>
      <Text style={styles.textBold}>Información Profesional</Text>
      <Text style={styles.text}>{`•Título Profesional: ${userInfo?.professional_title}`}</Text>
      <Text style={styles.text}>{`•Ubicación: ${userInfo?.location}`}</Text>
      <Text style={styles.text}>{`•Habilidades: ${userInfo?.talents}`}</Text>
      <Text style={styles.text}>{`•Experiencia Laboral: ${userInfo?.experience}`}</Text>
      <Text style={styles.text}>{`•Telefono: ${userPhone?.profile.phone}`}</Text>
    </ScrollView>
  )
}

export default ProfileDescription

const styles = StyleSheet.create({
    container: {
        paddingHorizontal:20,
    },
    textBold: {
        fontWeight: "bold",
        fontSize: 16,
    },
    rowContainer: {
        flexWrap: "wrap",
        flexDirection: "row",
    },
    tagContainer: {
        borderWidth: 1,
        borderColor: "#0D2538",
        margin: 5,
        borderRadius: 40,
        padding: 2,
    },
    text: {
        color: "#0D2538",
        paddingVertical: 2,
    }
})