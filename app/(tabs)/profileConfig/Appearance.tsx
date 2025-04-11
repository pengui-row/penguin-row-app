import { StyleSheet, Switch, Text, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Header } from '@/components/Header'
import { router } from 'expo-router'

const Appearance = () => {
  const [enabled, setIsEnabled] = useState(false);
  const toggle = () => {
    //TODO: Cambiar el modo oscuro
    setIsEnabled(state => !state);
  };
  return (
    <SafeAreaView>
      <Header
      title='Perfil'
      onBack={()=>router.push("/(tabs)/profileConfig/EditProfile")}
      />
      <View style={styles.container}>
        <Text>Activar/Desactivar Modo Oscuro</Text>
        <Switch
        value={enabled}
        onValueChange={toggle}
        />
      </View>
    </SafeAreaView>
  )
}

export default Appearance

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginVertical: 10,
    borderBottomWidth: 1,
    borderColor: "#D4D6DD",
    height: 45,
  },
})