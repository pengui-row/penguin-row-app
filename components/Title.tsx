import React from "react";
import { Text,StyleSheet} from "react-native";

interface TitleProps {
  content:String,
}

const Title: React.FC<TitleProps> = ({ content }) => {
  return <Text style={styles.title}>{content}</Text>
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 12,
  },
});

export default Title;
