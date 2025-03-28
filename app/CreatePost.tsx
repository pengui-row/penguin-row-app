import React from "react"
import { useState } from "react"
import { View, StyleSheet, TouchableOpacity, Text, ScrollView,StatusBar } from "react-native"
import * as ImagePicker from "expo-image-picker"
import { Header } from "../components/Header"
import { TextInputField } from "../components/Text-input-field"
import { HashtagSelector } from "../components/Hashtag-selector"

import { ImageAttachment } from "../components/Image-attachment"
import { router } from "expo-router"
const CreatePost: React.FC = () => {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [selectedHashtag, setSelectedHashtag] = useState("#Privado")
  const [images, setImages] = useState<string[]>([])

  const handleBack = () => {
    router.back()
  }

    const handleAddImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync()

    if (permissionResult.granted === false) {
      alert("Se requiere permiso para acceder a la galería")
      return
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    })

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImages([...images, result.assets[0].uri])
    }
  }

  const handlePublish = () => {
    console.log({
      title,
      content,
      hashtag: selectedHashtag,
      images,
    })
    alert('funcion de publicar')
  }

  return (
    <View style={styles.container}>
      <Header title="Crear Post" onBack={handleBack} />

      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <TextInputField
            label="Título"
            placeholder="Inserte el título del post"
            value={title}
            onChangeText={setTitle}
          />

          <TextInputField
            label="Contenido"
            placeholder="Inserte el contenido del post"
            multiline
            height={150}
            value={content}
            onChangeText={setContent}
          />

          <HashtagSelector selectedHashtag={selectedHashtag} onSelect={setSelectedHashtag} />

          <ImageAttachment images={images.length > 0 ? images : []} onAddImage={handleAddImage} />
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.publishButton} onPress={handlePublish} activeOpacity={0.8}>
        <Text style={styles.publishButtonText}>PUBLICAR</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: StatusBar.currentHeight || 0,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  publishButton: {
    backgroundColor: "#FF9F40",
    borderRadius: 8,
    padding: 14,
    margin: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  publishButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
})

export default CreatePost;
