import { FontAwesome, Ionicons } from '@expo/vector-icons';
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';

interface ToastProps {
    visible: boolean;
    title: string;
    message?: string;
    onClose: () => void;
    type?: "success" | "failure";
    autoCloseDelay?: number;
  }
  

const Toast: React.FC<ToastProps> = ({ visible, title, message="", onClose, type="success", autoCloseDelay }) => {
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    if (visible) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();

      if (autoCloseDelay) {
        const timer = setTimeout(() => {
          onClose();
        }, autoCloseDelay);

        return () => clearTimeout(timer);
      }
    } else {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible, autoCloseDelay, onClose]);

  return (
    <Animated.View
      style={[
        styles.container,
        { opacity: fadeAnim, display: visible ? 'flex' : 'none', backgroundColor: type === "success" ? "#E7F4E8" : "white" },
      ]}
    >
      <View style={styles.content}>
        <Ionicons
        name={type=== "success" ? 'checkmark-circle' : 'close-circle'}
        size={32}
        color={type=== "success" ? "#3AC0A0" : "red"}
        style={{flex:1 , marginLeft: 10}}
        />
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>
        </View>
        <View>
        <FontAwesome.Button
        name='close'
        onPress={onClose}
        backgroundColor={"transparent"}
        color={"#71727A"}
        />
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    borderRadius: 16,
    elevation: 5, // Sombra para Android
    shadowColor: '#000', // Sombra para iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  message: {
    fontSize: 16,
  },
  textContainer: {
    flex: 2,
    padding: 4,
  }
});

export default Toast;