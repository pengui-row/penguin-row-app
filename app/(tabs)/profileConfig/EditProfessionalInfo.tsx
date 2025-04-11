import { ScrollView, StyleSheet, Text } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Header } from '@/components/Header'
import { router } from 'expo-router'
import Input from '@/components/Input'
import Button from '@/components/Button'
import Toast from '@/components/Toast'

const EditProfessionalInfo = () => {
    const [professionalTitle, setProfessionalTitle] = useState("Desarrollador de software");
    const [location, setLocation] = useState("Venezuela, Barquisimeto");
    const [talents, setTalents] = useState("Comunicación, Trabajo en equipo, Manejo de datos");
    const [experience, setExperience] = useState("1 año Desarrollador Web Banco Provincial\n6 meses Desarrollador Web Banesco");
    const [phone, setPhone] = useState("4247260592");
    const [toast, setToast] = useState(false);
    const handlePress = () => {
        setToast(true);
    }
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
        <Input
        label='Teléfono'
        value={phone}
        onChangeText={setPhone}
        keyboardType='phone-pad'
        />
        <Button
        title='GUARDAR'
        onPress={handlePress}
        />
        <Toast
        visible={toast}
        title='Información profecional guardada'
        message='Se ha guardado con éxito'
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