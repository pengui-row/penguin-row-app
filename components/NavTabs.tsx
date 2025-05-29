import React from 'react'
import { router, useNavigation, usePathname } from "expo-router";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native"
import { Ionicons } from "@expo/vector-icons"

const NavTabs = ({props}:any) => {
    const pathname = usePathname();
    const navigatation = useNavigation();
    const isActive = (path: string) => {
        return pathname === path;
    };

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
            <TouchableOpacity onPress={() => router.navigate('/(tabs)/Home')} style={styles.navItem}>
                <Ionicons 
                    name="home" 
                    size={24} 
                    color={isActive("/Home") ? "#1DA1F2" : "#657786"} 
                />
                <Text style={isActive("/Home") ? styles.navTextActive : styles.navText}>
                    Principal
                </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.navigate("/(tabs)/Search")} style={styles.navItem}>
                <Ionicons 
                    name="search-outline" 
                    size={24} 
                    color={isActive("/Search") ? "#1DA1F2" : "#657786"} 
                />
                <Text style={isActive("/Search") ? styles.navTextActive : styles.navText}>
                    Buscar
                </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.navigate("/(tabs)/CreatePost")} style={styles.navItemCenter}>
                <View style={styles.addButton}>
                    <Ionicons name="add" size={24} color="white" />
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.navigate("/(tabs)/Notifications")} style={styles.navItem}>
                <Ionicons 
                    name="notifications-outline" 
                    size={24} 
                    color={isActive("/Notifications") ? "#1DA1F2" : "#657786"} 
                />
                <Text style={isActive("/Notifications") ? styles.navTextActive : styles.navText}>
                    Notificaciones
                </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.navigate("/(tabs)/Profile")} style={styles.navItem}>
                <Ionicons 
                    name="person-outline" 
                    size={24} 
                    color={isActive("/Profile") ? "#1DA1F2" : "#657786"} 
                />
                <Text style={isActive("/Profile") ? styles.navTextActive : styles.navText}>
                    Perfil
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default NavTabs