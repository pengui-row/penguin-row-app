import React, { useState } from 'react';
import { StyleSheet, View, SafeAreaView, StatusBar } from 'react-native';
import Notification from '@/components/Notification';
import { router } from 'expo-router';
import { Header } from '@/components/Header';
// Datos de ejemplo
const notificationsData = [
  {
    id: '1',
    user: {
      name: 'Harold T',
      avatar: undefined,
    },
    action: 'like' as const,
    time: '1h',
    publicationId: 'pub1',
  },
  {
    id: '2',
    user: {
      name: 'Harold T',
      avatar: undefined,
    },
    action: 'comment' as const,
    time: '1h',
    publicationId: 'pub1',
  },
  {
    id: '3',
    user: {
      name: 'John D',
      avatar: undefined,
    },
    action: 'like' as const,
    time: '2h',
    publicationId: 'pub2',
  },
  {
    id: '4',
    user: {
      name: 'Fabio E',
      avatar: undefined,
    },
    action: 'like' as const,
    time: '2h',
    publicationId: 'pub3',
  },
  {
    id: '5',
    user: {
      name: 'Harold T',
      avatar: undefined,
    },
    action: 'like' as const,
    time: '3h',
    publicationId: 'pub4',
  },
  {
    id: '6',
    user: {
      name: 'Daniel G',
      avatar: undefined,
    },
    action: 'like' as const,
    time: '3h',
    publicationId: 'pub5',
  },
];

export default function Notifications() {
  const handleNotificationPress = (notification: any) => {
      
    console.log('Ver notificacion:', notification);
      // Navegar a la publicación o realizar alguna acción
    };
    const handleBack = () => {
      router.back()
    }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <Header title="Notificaciones" onBack={handleBack} />
      <Notification 
        notifications={notificationsData} 
        onNotificationPress={handleNotificationPress} 
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: StatusBar.currentHeight || 0,
  },
  });
