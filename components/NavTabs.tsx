import React from 'react'
import { router, useSegments } from "expo-router";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
interface NavTabsProps extends BottomTabBarProps {
}
const NavTabs: React.FC<NavTabsProps>  = ({navigation, state}) => {

    const styles = StyleSheet.create({
        addButton: {
            backgroundColor: "#D48D2F",
            width: 50,
            height: 50,
            borderRadius: 25,
            alignItems: "center",
            justifyContent: "center",
          },
          navText: {
            fontSize: 10,
            color: "#657786",
          },
          navTextActive: {
            fontSize: 10,
            color: "#1DA1F2",
          },
        bottomNav: {
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
            borderTopWidth: 0.5,
            borderTopColor: "#E1E8ED",
            paddingVertical: 10,
            backgroundColor: "white",
          },
          navItem: {
            alignItems: "center",
            justifyContent: "center",
          },
          navItemCenter: {
            alignItems: "center",
            justifyContent: "center",
          },
    });
    const segments = useSegments();
    const isActiveRoute = (routeName: string): boolean => {
      const currentRoute = segments.join('/');
      return currentRoute.startsWith(routeName.toLowerCase());
    };
  return (
    <View style={styles.bottomNav}>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}style={styles.navItem}>
          <Ionicons name="home" size={24} color={isActiveRoute("Home") ? "#1DA1F2" : "#657786"} />
          <Text style={isActiveRoute("Home") ? styles.navTextActive : styles.navText}>Principal</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Search")} style={styles.navItem}>
          <Ionicons name="search-outline" size={24} color={isActiveRoute("Home") ? "#1DA1F2" : "#657786"} />
          <Text style={isActiveRoute("Home") ? styles.navTextActive : styles.navText}>Buscar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("CreatePost")} style={styles.navItemCenter}>
          <View style={styles.addButton}>
            <Ionicons name="add" size={24} color="white" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="notifications-outline" size={24} color={isActiveRoute("Home") ? "#1DA1F2" : "#657786"} />
          <Text style={isActiveRoute("Home") ? styles.navTextActive : styles.navText}>Notificaciones</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Profile")} style={styles.navItem}>
          <Ionicons name="person-outline" size={24} color={isActiveRoute("Home") ? "#1DA1F2" : "#657786"} />
          <Text style={isActiveRoute("Home") ? styles.navTextActive : styles.navText}>Perfil</Text>
        </TouchableOpacity>
      </View>
  )
}

export default NavTabs