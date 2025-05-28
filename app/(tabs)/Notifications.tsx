import React, { useEffect, useState } from 'react';
import { StyleSheet, View, SafeAreaView, StatusBar } from 'react-native';
import Notification from '@/components/Notification';
import { router } from 'expo-router';
import { Header } from '@/components/Header';
import { useAuth } from '../context/AuthContext';
interface NotificationResponse {
  id: string;
  description: string;
  time_stamp: Date;
  status: 'READ' | 'UNREAD';
  user: {
    id: string;
    profile: { name:string, lastName: string};
  };
  type: 'LIKE' | 'COMMENT';
  relatedEntityId: string;
}
interface ApiResponse {
  data: NotificationResponse[];
  total: number;
  currentPage: number;
  pageSize: number;
}

export default function Notifications() {
  const { token } = useAuth();
  const [userNotifications, setUserNotifications] = useState<NotificationResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalNotifications, setTotalNotifications] = useState<number>(0);
  const pageSize = 10;
  const handleNotificationPress = (notification: any) => {
      
    console.log('Ver notificacion:', notification);
      // Navegar a la publicación o realizar alguna acción
    };
    const handleBack = () => {
      router.back()
    }

    const getNotifications = async () => {
      if (loading || (totalNotifications > 0 && userNotifications.length >= totalNotifications) || error) {
      return;
      }
      try {
        const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/api/user/notification?page=${currentPage}&page_size=${pageSize}`, {
          method: 'GET',
          headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'api-secret': process.env.EXPO_PUBLIC_API_SECRET,
          'Authorization': `Bearer ${token}`
        } as HeadersInit,
        });
        const dataResponded: ApiResponse = await response.json();

        if (!response.ok) {
        throw new Error('Error al cargar las notificaciones');
        }

        const { data, total, currentPage: responseCurrentPage } = dataResponded;
        setTotalNotifications(total);
        setCurrentPage(responseCurrentPage + 1);
        const responseNotifications: NotificationResponse[] = [];

        data.forEach((notif:any) => {
          const { id, description, time_stamp, status, user, type, relatedEntityId } = notif;
          responseNotifications.push({
            id: id,
            description: description,
            time_stamp: time_stamp,
            status: status,
            user: user,
            type: type,
            relatedEntityId: relatedEntityId
          })
        });
        setUserNotifications((prev) => {
          const uniquePrev = new Set(prev.map((notification) => notification.id));
          const uniqueNew = responseNotifications.filter((newNotif) => !uniquePrev.has(newNotif.id))
          return [...prev, ...uniqueNew]
        });
      } catch (err) {
        if (typeof err === 'string') {
        setError(err);
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Ocurrió un error desconocido.');
      }
      console.log(err);
      } finally {
      setLoading(false);
      }
    }

    useEffect(()=> {
      getNotifications()
    },[getNotifications]);
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <Header title="Notificaciones" onBack={handleBack} />
      <Notification 
        notifications={userNotifications} 
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
