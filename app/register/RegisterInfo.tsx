import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import Card from '@/components/Card'
import Title from '@/components/Title';
import Preference from '@/components/Preference';
import Button from '@/components/Button';
import Input from '@/components/Input';
import Toast from '@/components/Toast';
import { router } from 'expo-router';

const RegisterInfo = () => {
  const [stage, setStage] = useState<1 | 2>(1);
  const Preferences = () => {
    const preferences = [
      {title:"Entretenimiento", selected:false}, 
      {title:"Educación", selected:false}, 
      {title:"Música", selected:false},
      {title:"Deportes", selected:false}, 
      {title:"Películas", selected:false},
      {title:"Senderismo", selected:false}
    ];
    const handlePress = () => {
      setStage(2);
    }
    return (
      <View>
        <View style={styles.progressBar}>
          <View style={[styles.progressBarSegment, styles.progressBarSegmentActive]} />
          <View style={[styles.progressBarSegment, styles.progressBarSegmentInactive]} />
        </View>
        <Title content={"Personaliza tu experiencia"}/>
        <Text>Elige tus intereses</Text>
        <View>
          {
            preferences.map(({title, selected}) => (
              <View key={title} style={{padding:5}}>
                <Preference title={title} selected={selected}/>
              </View>
            ))
          }
        </View>
        <Button title='Siguiente' onPress={handlePress}/>
      </View>
    )
  }
  const Professional = () => {
    const [professionalTitle, setProfessionalTitle] = useState("");
    const [location, setLocation] = useState("");
    const [talents, setTalents] = useState("");
    const [experience, setExperience] = useState("");
    const [toast, setToast] = useState(false);
    const [titleToast, setTitleToast] = useState("");
    const [message, setMessage] = useState("");
    const [type, setType] = useState<"failure" | "success">("failure");
    const [loading, setLoading] = useState(false);
    const showToast = (title:string, message:string, type: "success" | "failure") => {
      setTitleToast(title);
      setMessage(message);
      setType(type)
      setToast(true);
    };
    const handlePress = () => {
      if (!professionalTitle || !location || !talents || !experience){
        showToast("Rellene todos los campos", "Faltan campos por rellenar", "failure");
      }
      else {
        showToast("Registro completado", "Se ha registrado exitosamente", "success");
        setTimeout(() => {
          setLoading(false);
          router.dismissAll();
        }, 1000);
      }
    };
    
    return (
      <View>
        <View style={styles.progressBar}>
          <Pressable onPress={()=>{setStage(1)}} style={[styles.progressBarSegment, styles.progressBarSegmentActiveFull]}/>
        </View>
        <Title content={"Crea tu perfil Profesional"}/>
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
        <Button title='Enviar' onPress={handlePress} disabled={loading}/>
        <Toast
        visible={toast}
        title={titleToast}
        message={message}
        type={type}
        onClose={()=>{setToast(false)}}
        autoCloseDelay={5000}
        />
      </View>
    )
  }
  return (
    <KeyboardAvoidingView
    behavior={Platform.OS === "ios" ? "padding" : "height"}
    style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <Card >
                {stage === 1 && <Preferences/>}
                {stage === 2 && <Professional/>}
            </Card>
        </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default RegisterInfo

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
      progressBarSegment: {
        flex: 1,
      },
      progressBar: {
        flexDirection: 'row',
        height: 10,
        marginBottom: 10,
        borderRadius: 5,
        overflow: 'hidden',
      },
      progressBarSegmentActive: {
        backgroundColor: 'skyblue',
      },
      progressBarSegmentInactive: {
        backgroundColor: 'lightgray',
      },
      progressBarSegmentActiveFull: {
        backgroundColor: 'skyblue',
        flex: 2,
      },
})