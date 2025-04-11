import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import Card from '@/components/Card'
import { router } from 'expo-router'
import Title from '@/components/Title'
import { FontAwesome } from '@expo/vector-icons'
import Button from '@/components/Button'
import Input from '@/components/Input'
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import Toast from '@/components/Toast'
import { Validation } from '@/utils/validate'

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [birthdate, setBirthdate] = useState<Date>(new Date());
    const [showPicker, setShowPicker] = useState(false);
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [toast, setToast] = useState(false);
    const [titleToast, setTitleToast] = useState("");
    const [message, setMessage] = useState("");
    const [type, setType] = useState<"failure" | "success">("failure");
    const validate = new Validation();
    const togglePicker = () => {
        setShowPicker(!showPicker);
    };
    const onChangePicker = (event:DateTimePickerEvent, selectedDate?:Date) => {
        if (event.type == "set") {
            const currentDate = selectedDate || new Date();
            setBirthdate(currentDate);
            if (Platform.OS === "android") {
                togglePicker();
            }
        }
        else {
            togglePicker();
        }
    };
    const showToast = (title:string, message:string, type:"failure" | "success") => {
        setTitleToast(title);
        setMessage(message);
        setType(type);
        setToast(true);
    }
    const sendRegister = () => {
        if (!name || !email || !birthdate || !phone || !password || !confirm) {
            showToast("Rellene todos los campos", "Faltan campos por rellenar", "failure");
        }
        else if (password != confirm) {
            showToast("La contraseña y la confirmación no son iguales", "Los dos campos deben ser iguales", "failure");
        }
        else if (!validate.validEmail(email)) {
            showToast("Correo invalido", "Coloque un correo valido", "failure");
        }
        else if (!validate.validPhone(phone)) {
            showToast("Teléfono invalido", "El numero de teléfono solo contiene 10 digitos", "failure");
        }
        else {
            router.push("/register/RegisterInfo");
        }
    };
  return (
    <KeyboardAvoidingView 
    behavior={Platform.OS === "ios" ? "padding" : "height"}
    style={styles.container}
    >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <Card>
            <FontAwesome.Button
            name='arrow-left'
            backgroundColor={"transparent"}
            onPress={()=>{router.push("/")}}
            color={"black"}
            />
                <Title content={"Registrarse"}/>
                <View style={styles.loginContainer}>
                    <Text style={styles.loginText}>¿Tienes una cuenta? </Text>
                    <Button
                    onPress={()=>{router.push("/")}}
                    title="Inicia Sesión"
                    style={styles.loginButton}
                    textStyle={styles.loginLink}
                    />
                </View>
                <Input
                label='Nombre Completo'
                value={name}
                onChangeText={setName}
                />
                <Input
                label='Correo'
                value={email}
                onChangeText={setEmail}
                keyboardType='email-address'
                />
                {showPicker && <DateTimePicker
                mode='date'
                display='spinner'
                value={birthdate}
                onChange={onChangePicker}
                />}
                <Pressable onPress={togglePicker}>
                    <Text style={styles.label}>Fecha de Nacimiento</Text>
                    <TextInput
                    editable={false}
                    value={birthdate.toLocaleDateString()}
                    style={styles.input}
                    onPressIn={togglePicker}
                    />
                </Pressable>
                <Input
                label='Teléfono'
                value={phone}
                onChangeText={setPhone}
                keyboardType='phone-pad'
                />
                <Input
                label='Crear contraseña'
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                />
                <Input
                label='Confirmar contraseña'
                value={confirm}
                onChangeText={setConfirm}
                secureTextEntry
                />
                <Button title='Registrar' onPress={sendRegister}/>
            </Card>
            <Toast
            visible={toast}
            title={titleToast}
            message={message}
            type={type}
            onClose={()=>{setToast(false)}}
            autoCloseDelay={5000}
            />
        </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default Register

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
      loginContainer: {
        flexDirection: "row",
        justifyContent: "center",
        marginBottom: 24,
      },
      loginText: {
        color: "#666",
        fontSize: 14,
      },
      loginLink: {
        color: "#1e3a6e",
        fontSize: 14,
        fontWeight: "bold",
      },
      loginButton: {
        backgroundColor: "transparent",
        padding: 0,
      },
      input: {
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        color: "#333",
      },
      label: {
        fontSize: 14,
        color: "#666",
        marginBottom: 8,
      },
})