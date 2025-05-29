import { KeyboardAvoidingView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Header } from '@/components/Header'
import { router } from 'expo-router'
import Input from '@/components/Input'
import Button from '@/components/Button'
import Toast from '@/components/Toast'
import { useAuth } from '@/app/context/AuthContext'

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [toast, setToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("Contraseña Cambiada");
  const [toastDescription, setToastDescription] = useState("Nueva contraseña creada");
  const [toastType, setToastType] = useState<"failure" | "success">("failure");
  const { token } = useAuth();
  const sendNewPassword = async () => {
    if (!oldPassword || !newPassword || !confirm) {
      setToastMessage("Introduzca los datos requeridos");
      setToastDescription("Faltan datos");
    }
    else if (newPassword !== confirm) {
      setToastMessage("Los dos campos deben ser iguales");
      setToastDescription("La nueva contraseña y su confirmación deben ser iguales");
    }
    else {
      try {
        const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/api/auth/password`,{
          method: 'PUT',
          headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'api-secret': process.env.EXPO_PUBLIC_API_SECRET,
          'Authorization': `Bearer ${token}`
          } as HeadersInit,
          body: JSON.stringify({ old_password:oldPassword, password:newPassword })
        }
        );
        if (!response.ok) {
          setToastMessage("Error");
          setToastDescription("Error al cambiar la contraseña");
        }

        setOldPassword("");
        setNewPassword("");
        setConfirm("");
      } catch (error) {
        setToastMessage("Error");
        setToastDescription("Error al cambiar la contraseña");
      }
      setToastMessage("Contraseña Cambiada");
      setToastDescription("Nueva contraseña creada");
      setToastType("success");
    }
    setToast(true);
  }
  return (
    <ScrollView>
    <SafeAreaView>
      <Header title='Perfil' onBack={()=>router.push("/(tabs)/profileConfig/EditProfile")}/>
      <View style={styles.container}>
        <Input
        label='Introduzca contraseña actual'
        value={oldPassword}
        onChangeText={setOldPassword}
        secureTextEntry={true}
        placeholder='***********'
        />
        <Input
        label='Introduzca la nueva contraseña'
        value={newPassword}
        onChangeText={setNewPassword}
        secureTextEntry={true}
        placeholder='***********'
        />
        <Input
        label='Repetir contraseña'
        value={confirm}
        onChangeText={setConfirm}
        secureTextEntry={true}
        placeholder='***********'
        />
      </View>
      <Button
      title='Enviar'
      onPress={sendNewPassword}
      style={styles.button}
      />
      <Toast
      visible={toast}
      title={toastMessage}
      message={toastDescription}
      type={toastType}
      onClose={()=>{setToast(false)}}
      autoCloseDelay={5000}
      />
    </SafeAreaView>
    </ScrollView>
  )
}

export default ChangePassword

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    backgroundColor: "#FAFAFA"
  },
  button: {
    marginHorizontal: 20,
    marginTop: 10,
  },
})