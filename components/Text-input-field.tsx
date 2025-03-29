import React from "react"
import { View, Text, TextInput, StyleSheet, type TextInputProps } from "react-native"

interface TextInputFieldProps extends TextInputProps {
  label: string
  multiline?: boolean
  height?: number
}

export const TextInputField: React.FC<TextInputFieldProps> = ({ label, multiline = false, height = 50, ...props }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, multiline && styles.multiline, { height: height }]}
        multiline={multiline}
        placeholderTextColor="#999"
        {...props}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: "500",
  },
  input: {
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  multiline: {
    textAlignVertical: "top",
  },
})

