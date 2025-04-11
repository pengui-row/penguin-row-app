import { FlatList, Keyboard, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Header } from '@/components/Header'
import { router } from 'expo-router'
import Preference from '@/components/Preference'
import Input from '@/components/Input'
import { Feather, FontAwesome } from '@expo/vector-icons'
import Button from '@/components/Button'
import Toast from '@/components/Toast'

const EditPreferences = () => {
    const interestData = [
        {title: "Entretenimiento", selected:true},
        {title: "Educación", selected:false},
        {title: "Música", selected:true},
        {title: "Deportes", selected:false},
        {title: "Películas", selected:false},
        {title: "Senderismo", selected:false},
        {title: "Software", selected:true},
    ];
    const [toast, setToast] = useState(false);
    const [data, setData] = useState(interestData);
    const [newPreference, setNewPreference] = useState("");
    const handlePress = () => {
        setData([...data, {title:newPreference, selected:true}]);
        setNewPreference("");
    };
    const handleSave = () => {
        setToast(true);
    }
  return (
    <SafeAreaView>
        <ScrollView style={styles.container}>
        <Header title='Perfil' onBack={()=>router.push("/(tabs)/profileConfig/EditProfile")}/>
        <Text style={{fontWeight:"bold"}}>Intereses</Text>
        {
            data.map(({title, selected}) => (
                <View key={title}>
                <Preference title={title} selected={selected}/>
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
        title='Intereses guardados'
        message='Se ha guardado los intereses'
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