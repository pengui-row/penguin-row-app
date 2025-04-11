import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Header } from '@/components/Header'
import { router } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Feather } from '@expo/vector-icons'

const EditProfile = () => {
    const data = [
        {title: "Cambiar Contraseña", route: "/ChangePassword"},
        {title: "Editar Interes", route: "/EditPreferences"},
        {title: "Editar Información Profesional", route: "/EditProfessionalInfo"},
        {title: "Apariencia", route: "/Appearance"},
        {title: "Cerrar Sesión", route: "/"}
    ];
    const handlePress = (route:string) => {
        switch (route) {
            case "/ChangePassword":
                router.push("/(tabs)/profileConfig/ChangePassword");
                break;
            case "/EditPreferences":
                router.push("/(tabs)/profileConfig/EditPreferences");
                break;
            case "/EditProfessionalInfo":
                router.push("/(tabs)/profileConfig/EditProfessionalInfo");
                break;
            case "/Appearance":
                router.push("/(tabs)/profileConfig/Appearance");
                break;
            default:
                //TODO: Manejar como cerrar sesion adecuadamente
                router.dismissAll();
                break;
        }
        
    }
  return (
    <SafeAreaView>
        <Header title='Perfil' onBack={()=>{router.back()}}/>
        <FlatList
        data={data}
        renderItem={({item})=>{

        return (
        <TouchableOpacity onPress={()=>handlePress(item.route)}>
            <View style={styles.touchableStyle}>
            <Text>{item.title}</Text>
            <Feather name='chevron-right'/>
            </View>
        </TouchableOpacity>
    )}}
        />
    </SafeAreaView>
  )
}

export default EditProfile

const styles = StyleSheet.create({
    touchableStyle: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginHorizontal: 20,
        marginVertical: 10,
        borderBottomWidth: 1,
        borderColor: "#D4D6DD",
        height: 35
    },
})