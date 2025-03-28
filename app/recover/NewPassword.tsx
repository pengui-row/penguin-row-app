import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import Card from '@/components/Card'
import { FontAwesome } from '@expo/vector-icons'
import { router } from 'expo-router'
import Title from '@/components/Title'
import Input from '@/components/Input'
import Button from '@/components/Button'
import Toast from '@/components/Toast'

const NewPassword = () => {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [toast, setToast] = useState(false);

  const sendNewPassword = () => {
    if (!password || !confirm) {
      alert("Introduzca los datos requeridos");
    }
    else if (password !== confirm) {
      alert("Los dos campos deben ser iguales");
    }
    else {
      setToast(true);
    }
  }
  return (
    <KeyboardAvoidingView
    behavior={Platform.OS === "ios" ? "padding" : "height"}
    style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Card>
        <FontAwesome.Button
          name='arrow-left'
          backgroundColor={"transparent"}
          onPress={()=>{router.push("/")}}
          color={"black"}
          />
          <View style={{marginBlock:30}}>
            <Title
            content={"Recuperar Contraseña"}
            />
            <Input
            value={password}
            onChangeText={setPassword}
            label='Introduzca nueva contraseña'
            secureTextEntry={true}
            placeholder='***********'
            />
            <Input
            value={confirm}
            onChangeText={setConfirm}
            label='Repetir contraseña'
            secureTextEntry={true}
            placeholder='***********'
            />
            <Button
            title='Enviar'
            onPress={sendNewPassword}
            />
          </View>
        </Card>
        <Toast
        visible={toast}
        title='Contraseña Recuperada'
        message='Nueva contraseña creada'
        type='success'
        onClose={()=>{setToast(false)}}
        autoCloseDelay={5000}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default NewPassword

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1e3a6e",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
  },
})