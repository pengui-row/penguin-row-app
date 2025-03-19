import React from "react"
import { StyleSheet, TouchableOpacity, View } from "react-native"

interface CheckboxProps {
  checked: boolean
  onPress: () => void
}

export default function Checkbox({ checked, onPress }: CheckboxProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={[styles.checkbox, checked && styles.checked]}>{checked && <View style={styles.checkmark} />}</View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 4,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  checked: {
    borderColor: "#1e3a6e",
    backgroundColor: "#1e3a6e",
  },
  checkmark: {
    width: 12,
    height: 12,
    backgroundColor: "white",
    borderRadius: 2,
  },
})

