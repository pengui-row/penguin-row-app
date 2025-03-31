import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
type TProps = {
    onPress: ()=>void;
    name: string;
    selected: boolean;
}

const TagProfile = ({onPress, name, selected}:TProps) => {
  return (
    <TouchableOpacity
    onPress={onPress}
    style= {{
        ...styles.button,
        borderBottomColor:selected? "#FFA726" : "transparent"
    }}
    >
    <Text style={{color:"black", fontWeight:selected? "bold" : "normal"}}>{name}</Text>
    </TouchableOpacity>
  )
}

export default TagProfile

const styles = StyleSheet.create({
    button: {
        paddingHorizontal: 8,
        paddingVertical: 5,
        flexDirection: "row",
        alignItems: "center",
        borderBottomWidth: 2,
        
    },
})