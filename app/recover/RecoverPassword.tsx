import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import Card from '@/components/Card'
import Title from '@/components/Title'
import Input from '@/components/Input'
import Button from '@/components/Button'
import Toast from '@/components/Toast'
import { FontAwesome } from '@expo/vector-icons'
import { router } from 'expo-router'
import { Validation } from '@/utils/validate'

const RecoverPassword = () => {
  const [email, setEmail] = useState("");
  const [toast, setToast] = useState(false);
  const validate = new Validation();
  const sendRecoverPassword = () =>{
    if (!validate.validEmail(email)) {
      setToast(true);
    }
    else {
      router.push("/recover/RecoverCode");
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
          <Title content={"Recuperar Contraseña"}/>
          <Input
          label='Correo'
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          placeholder="rafaelcarmona@gmail.com"
          />
          <Button
          onPress={sendRecoverPassword}
          title='Enviar Clave de Recuperación'
          />
          </View>
        </Card>
        <Toast
        visible={toast}
        title='Correo Invalido'
        message='Coloque un correo valido'
        type='failure'
        onClose={()=>{setToast(false)}}
        autoCloseDelay={5000}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default RecoverPassword

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
});