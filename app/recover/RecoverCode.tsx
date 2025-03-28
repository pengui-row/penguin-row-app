import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import Card from '@/components/Card'
import { FontAwesome } from '@expo/vector-icons'
import { router } from 'expo-router'
import Title from '@/components/Title'
import Input from '@/components/Input'
import Button from '@/components/Button'
import Toast from '@/components/Toast'

const RecoverCode = () => {
  const [code, setCode] = useState("");
  const [toast, setToast] = useState(false);
  
  const sendValidateCode = () => {
    if (!code) {
      setToast(true);
    }
    else {
      router.push("/recover/NewPassword");
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
            value={code}
            onChangeText={setCode}
            label='Introduzca clave de recuperación'
            keyboardType='numeric'
            secureTextEntry={true}
            placeholder='****'
            />
            <Button
            title='Enviar'
            onPress={sendValidateCode}
            />
          </View>
        </Card>
        <Toast
        visible={toast}
        title='Clave Invalida'
        message='Introduzca una clave valida'
        type='failure'
        onClose={()=>{setToast(false)}}
        autoCloseDelay={5000}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default RecoverCode

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