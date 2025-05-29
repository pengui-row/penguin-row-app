import { ScrollView, StyleSheet, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Header } from '@/components/Header'
import { router } from 'expo-router'
import Input from '@/components/Input'
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
interface FormData {
    location?: string;
    professional_title?: string;
    talents?: string;
    experience?: string;
}
const EditProfessionalInfo = () => {
    const { token } = useAuth();
    const [professionalTitle, setProfessionalTitle] = useState("");
    const [location, setLocation] = useState("");
    const [talents, setTalents] = useState("");
    const [experience, setExperience] = useState("");
    const [toast, setToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("Información profesional guardada");
    const [toastDescription, setToastDescription] = useState("Se ha guardado la información profesional");
    const [toastType, setToastType] = useState<"failure" | "success">("failure");
    const handlePress = async () => {
        try {
            const formData: FormData = {};
            if (location) {
                formData.location = location;
            }
            if (professionalTitle) {
                formData.professional_title = professionalTitle;
            }
            if (talents) {
                formData.talents = talents;
            }
            if (experience) {
                formData.experience = experience
            }

            const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/api/auth/professionalinfo`, {
            method: 'PUT',
            headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'api-secret': process.env.EXPO_PUBLIC_API_SECRET,
            'Authorization': `Bearer ${token}`
            } as HeadersInit,
            body: JSON.stringify( formData )
            }
            );
            if (!response.ok) {
                throw new Error('Error al cargar la información del usuario');
            }
            setToastType("success");
        } catch (error) {
            setToastMessage("Error");
            setToastDescription("Hubo un error al guardar la información profesional");
            console.log(error)
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
            setExperience(dataResponded.experience);
            setLocation(dataResponded.location);
            setProfessionalTitle(dataResponded.professional_title);
            setTalents(dataResponded.talents);
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
        <Header title='Perfil' onBack={()=>{router.push("/(tabs)/profileConfig/EditProfile")}}/>
        <Text style={{fontWeight:"bold"}}>Información Profecional</Text>
        <Input
        label='Título profecional'
        value={professionalTitle}
        onChangeText={setProfessionalTitle}
        />
        <Input
        label='Ubicación'
        value={location}
        onChangeText={setLocation}
        />
        <Input
        label='Habilidades'
        value={talents}
        onChangeText={setTalents}
        multiline
        />
        <Input
        label='Experiencia laboral'
        value={experience}
        onChangeText={setExperience}
        multiline
        />
        <Button
        title='GUARDAR'
        onPress={handlePress}
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

export default EditProfessionalInfo

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 10,
    },
})