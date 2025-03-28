import React from "react"
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native"
import { Plus } from "lucide-react-native"

interface ImageAttachmentProps {
  images: string[]
  onAddImage: () => void
}

export const ImageAttachment: React.FC<ImageAttachmentProps> = ({ images, onAddImage }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Adjuntar imágenes</Text>
      <View style={styles.imagesContainer}>
        {images.map((image, index) => (
          <View key={index} style={styles.imageBox}>
            <Image source={{ uri: image }} style={styles.image} />
          </View>
        ))}
        <TouchableOpacity style={styles.addButton} onPress={onAddImage}>
          <Plus size={24} color="#999" />
        </TouchableOpacity>
      </View>
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
  imagesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  imageBox: {
    width: 80,
    height: 80,
    backgroundColor: "#F0F0F0",
    borderRadius: 8,
    marginRight: 12,
    marginBottom: 12,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  addButton: {
    width: 80,
    height: 80,
    backgroundColor: "#F0F0F0",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
})

