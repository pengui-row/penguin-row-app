import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";

interface HashtagSelectorProps {
  selectedHashtag: string;
  onSelect: (hashtag: string) => void;
}

export const HashtagSelector: React.FC<HashtagSelectorProps> = ({ selectedHashtag, onSelect }) => {
  const [hashtag, setHashtag] = useState(selectedHashtag);

  const handleEndEditing = () => {
    if (hashtag.trim()) {
      onSelect(hashtag); // Al terminar la edición, actualiza el hashtag seleccionado
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Hashtags</Text>
      <View style={styles.selector}>
        <TextInput
          style={styles.input}
          value={hashtag}
          onChangeText={setHashtag}
          onEndEditing={handleEndEditing} // Maneja el evento de finalizar la edición
          placeholder="Escribe tu hashtag..."
          placeholderTextColor="#999"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: "500",
  },
  selector: {
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    padding: 12,
  },
  input: {
    backgroundColor: "#EFEFEF",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    color: "#333",
    fontSize: 14,
  },
});
