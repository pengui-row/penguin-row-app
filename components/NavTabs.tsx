import React from 'react'
import { router } from "expo-router";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native"
import { Ionicons } from "@expo/vector-icons"

const NavTabs = () => {

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

  return (
    <View style={styles.bottomNav}>
        <TouchableOpacity onPress={() => router.push("/Home")}style={styles.navItem}>
          <Ionicons name="home" size={24} color="#1DA1F2" />
          <Text style={styles.navTextActive}>Principal</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("/Search")} style={styles.navItem}>
          <Ionicons name="search-outline" size={24} color="#657786" />
          <Text style={styles.navText}>Buscar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("/CreatePost")} style={styles.navItemCenter}>
          <View style={styles.addButton}>
            <Ionicons name="add" size={24} color="white" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="notifications-outline" size={24} color="#657786" />
          <Text style={styles.navText}>Notificaciones</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="person-outline" size={24} color="#657786" />
          <Text style={styles.navText}>Perfil</Text>
        </TouchableOpacity>
      </View>
  )
}

export default NavTabs