import { StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import React from 'react';
import { FontAwesome } from '@expo/vector-icons';

interface PreferenceProps {
  title: string;
  selected: boolean;
  onPress: (title: string) => void;
}

const Preference = ({ title, selected, onPress }: PreferenceProps) => {
  return (
    <TouchableHighlight onPress={() => onPress(title)}>
      <View style={{
        ...styles.container,
        backgroundColor: selected ? "#B3C6E5" : "transparent",
        borderColor: selected ? "transparent" : "#C5C6CC"
      }}>
        <Text style={styles.text}>{title}</Text>
        {selected && <FontAwesome name='check' color={"#006FFD"} size={16} />}
      </View>
    </TouchableHighlight>
  );
};

export default Preference;

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
});