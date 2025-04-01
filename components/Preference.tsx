import { StyleSheet, Text, TouchableHighlight, View } from 'react-native'
import React, { useState } from 'react'
import { FontAwesome } from '@expo/vector-icons';
interface PreferenceProps {
    title: string;
    selected: boolean;
}
const Preference = ({title, selected}:PreferenceProps) => {
    const [selection, setSelection] = useState(selected);
    const handlePress = () => {
        setSelection(prev => !prev);
    };
  return (
    <TouchableHighlight onPress={handlePress}>
    <View style={{...styles.container, backgroundColor: selection ? "#B3C6E5" : "transparent",
        borderColor: selection ? "transparent" : "#C5C6CC"
    }}>
      <Text style={styles.text}>{title}</Text>
      {selection && <FontAwesome name='check' color={"#006FFD"} size={16}/>}
    </View>
    </TouchableHighlight>
    
  )
}

export default Preference

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "space-between",
        padding: 15,
        borderWidth: 1,
    },
    text: {
        fontSize: 14,
    },
})