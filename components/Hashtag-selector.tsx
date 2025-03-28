import React from "react"
import { useState } from "react"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { ChevronDown } from "lucide-react-native"

interface HashtagSelectorProps {
  selectedHashtag: string
  onSelect: (hashtag: string) => void
}

export const HashtagSelector: React.FC<HashtagSelectorProps> = ({ selectedHashtag, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Hashtags</Text>
      <TouchableOpacity style={styles.selector} onPress={toggleDropdown} activeOpacity={0.7}>
        <View style={styles.hashtag}>
          <Text style={styles.hashtagText}>{selectedHashtag}</Text>
        </View>
        <ChevronDown size={20} color="#666" />
      </TouchableOpacity>
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
  selector: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    padding: 12,
  },
  hashtag: {
    backgroundColor: "#EFEFEF",
    borderRadius: 20,
    paddingVertical: 4,
    paddingHorizontal: 12,
  },
  hashtagText: {
    color: "#666",
    fontSize: 14,
  },
})

