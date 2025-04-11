import React from "react"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { Feather } from "@expo/vector-icons"

interface HeaderProps {
  title: string
  onBack: () => void
}

// TODO: Agregar icono flecha hacia arriba

export const Header: React.FC<HeaderProps> = ({ title, onBack }) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={onBack} style={styles.backButton}>
        <Feather name="arrow-left" size={24} color="#000" />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  backButton: {
    marginRight: 16,
    padding: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: '#000',
  },
})

