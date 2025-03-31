import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ProfileDescription = () => {
    const interest = [
        "Entretenimiento",
        "Música",
        "Software"
    ];
    const professionalInfo = {
        title: "Desarrollador Web Full Stack",
        location: "Venezuela, Barquisimeto",
        abilities: "Comunicación, Trabajo en equipo, Manejo de datos",
        experience: "1 año Desarrollador Web Banco Provincial",
        phone_number: "+584247260592"
    }
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.textBold}>Intereses</Text>
      <View style={styles.rowContainer}>
      {
        interest.map((index) => (
            <View key={index} style={styles.tagContainer}>
              <Text style={{color:"#0D2538"}}>{index}</Text>
            </View>
        ))
      }
      <Text style={styles.textBold}>Información Profesional</Text>
      <Text style={styles.text}>{`•Título Profesional: ${professionalInfo.title}`}</Text>
      <Text style={styles.text}>{`•Ubicación: ${professionalInfo.location}`}</Text>
      <Text style={styles.text}>{`•Habilidades: ${professionalInfo.abilities}`}</Text>
      <Text style={styles.text}>{`•Experiencia Laboral: ${professionalInfo.experience}`}</Text>
      <Text style={styles.text}>{`•Telefono: ${professionalInfo.phone_number}`}</Text>
      </View>
    </ScrollView>
  )
}

export default ProfileDescription

const styles = StyleSheet.create({
    container: {
        paddingHorizontal:20,
    },
    textBold: {
        fontWeight: "bold",
        fontSize: 16,
    },
    rowContainer: {
        flexWrap: "wrap",
        flexDirection: "row",
    },
    tagContainer: {
        borderWidth: 1,
        borderColor: "#0D2538",
        margin: 5,
        borderRadius: 40,
        padding: 2,
    },
    text: {
        color: "#0D2538",
        paddingVertical: 2,
    }
})