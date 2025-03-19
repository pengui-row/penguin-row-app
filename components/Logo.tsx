import React from "react";
import { View,StyleSheet, Image } from "react-native";

interface LogoProps {
  displayText:boolean;
}

const Logo: React.FC<LogoProps> = ({ displayText}) => {
  const path = `../assets/images/`
  const pathLogo = displayText ? require(`${path}penguin-logo-text.png`) : require(`${path}penguin-logo.png`)
  return <View style={styles.logoContainer} ><Image style={styles.logo} source={pathLogo} /></View>
};

const styles = StyleSheet.create({
  logoContainer: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  logo: {
    width: 104,
    height: 100,
  },
});

export default Logo;
