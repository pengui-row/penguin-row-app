import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Header } from '@/components/Header'
import { router } from 'expo-router'
import Preference from '@/components/Preference'
import Input from '@/components/Input'
import { FontAwesome } from '@expo/vector-icons'
import Button from '@/components/Button'
import Toast from '@/components/Toast'
import { useAuth } from '@/app/context/AuthContext'
interface UserInfo {
  id: string;
  interests: string[];
  location: string;
  professional_title: string;
  talents: string;
  experience: string;
  user: { id: string };
}
const EditPreferences = () => {
    const { token } = useAuth();
    const interestData = [
        {title: "Entretenimiento", selected:false},
        {title: "Educación", selected:false},
        {title: "Música", selected:false},
        {title: "Deportes", selected:false},
        {title: "Películas", selected:false},
        {title: "Senderismo", selected:false},
        {title: "Software", selected:false},
    ];
    const [toast, setToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("Intereses guardados");
    const [toastDescription, setToastDescription] = useState("Se ha guardado los intereses");
    const [toastType, setToastType] = useState<"failure" | "success">("failure");
    const [data, setData] = useState(interestData);
    const [newPreference, setNewPreference] = useState("");
    
    const handlePress = () => {
        setData([...data, {title:newPreference, selected:true}]);
        setNewPreference("");
    };
    const handleSave = async () => {
        const selectedInterest = data.filter(item => item.selected).map(item => item.title)
        try {
            const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/api/auth/personalinfo`, {
            method: 'PUT',
            headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'api-secret': process.env.EXPO_PUBLIC_API_SECRET,
            'Authorization': `Bearer ${token}`
            } as HeadersInit,
            body: JSON.stringify({ interests: selectedInterest })
            }
            );

            if (!response.ok) {
                throw new Error('Error al cargar la información del usuario');
            }
            setToastType("success");
        } catch (error) {
            setToastMessage("Error");
            setToastDescription("Hubo un error al guardar los intereses")
        }
        setToast(true);
    }
    const getUserBaseInfo = async () => {
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
            const userInteres = dataResponded.interests
            const updatedData = [...data];
            userInteres.forEach(title => {
                const lowerCaseTitle = title.toLocaleLowerCase();
                const existingTitle = updatedData.find(item => item.title.toLocaleLowerCase() === lowerCaseTitle)
                if (existingTitle) {
                    existingTitle.selected = true;
                }
                else {
                    updatedData.push({title: title, selected: true})
                }
            })
            setData(updatedData);
            } catch (error) {
                console.log(error)  
            }
            }
    useEffect(()=> {
        getUserBaseInfo()
    },[])
  return (
    <SafeAreaView>
        <ScrollView style={styles.container}>
        <Header title='Perfil' onBack={()=>router.push("/(tabs)/profileConfig/EditProfile")}/>
        <Text style={{fontWeight:"bold"}}>Intereses</Text>
        {
            data.map(({title, selected}) => (
                <View key={title}>
                <Preference title={title} selected={selected} onPress={(title)=>{
                    const preference = data.find((item) => item.title === title) || {title:"",selected:false};
                    const updatedData = [...data];
                    updatedData.forEach(item => {
                        if (item.title === preference.title) {
                            item.selected = !item.selected
                        }
                    })
                    setData(updatedData);
                }}/>
                </View>
                
            ))
        }
        <View style={styles.rowContainer}>
            <Input
            placeholder='Inserte otro interes'
            value={newPreference}
            onChangeText={setNewPreference}
            style={{width:"85%"}}
            />
            <FontAwesome.Button name='plus' backgroundColor={"transparent"} color={"#FFA726"} style={{height:45}}
            onPress={handlePress}/>
        </View>
        <Button
        title='GUARDAR'
        onPress={handleSave}
        />
        <Toast
        visible={toast}
        title={toastMessage}
        message={toastDescription}
        type={toastType}
        onClose={()=>{setToast(false)}}
        autoCloseDelay={5000}
        />
    </ScrollView>
    </SafeAreaView>
  )
}

export default EditPreferences

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 10,
    },
    rowContainer: {
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "space-between",
    },
})