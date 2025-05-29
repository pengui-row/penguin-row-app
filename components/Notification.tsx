import React, { use } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Parser } from '@/utils/parser';
import Avatar from './Avatar';
import { useAuth } from '@/app/context/AuthContext';

// Definición de tipos para las notificaciones
interface Notification {
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

interface NotificationsProps {
  notifications: Notification[];
  onNotificationPress: (notification: Notification) => void;
}

const NotificationItem: React.FC<{ notification: Notification; onPress: () => void }> = ({ 
  notification, 
  onPress 
}) => {
  const { token } = useAuth();
  const { user, type, time_stamp } = notification;
  const parser = new Parser();
  const actionText = type === 'LIKE' 
    ? 'ha dado like a tu publicación' 
    : 'ha comentado tu publicación';

  const handlePress = async() => {
    onPress();
    if (notification.status === 'READ') {
      return
    }
    try {
      const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/api/user/notification`, {
          method: 'PUT',
          headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'api-secret': process.env.EXPO_PUBLIC_API_SECRET,
          'Authorization': `Bearer ${token}`
        } as HeadersInit,
          body: JSON.stringify({ id: notification.id })
        });

        if (!response.ok) {
          throw new Error('Error al leer la notificación');
        }

        notification.status = 'READ';
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <TouchableOpacity style={notification.status === 'UNREAD' ? styles.notificationItem : styles.readNotificationItem} onPress={handlePress}>
      <View style={styles.avatarContainer}>
        {false ? (
          <Image source={{ uri: "user.avatar" }} style={styles.avatar} />
        ) : (
          <Avatar
          name={user.profile.name + " " + user.profile.lastName}
          />
        )}
      </View>
      
      <View style={styles.contentContainer}>
        <Text style={styles.notificationText}>
          <Text style={styles.userName}>{user.profile.name + " " + user.profile.lastName}</Text> {actionText}
        </Text>
        <Text style={styles.timeText}>{parser.timeFromTimeStamp(time_stamp)}</Text>
      </View>
      
      <Ionicons name="chevron-forward" size={20} color="#CCCCCC" style={styles.chevron} />
    </TouchableOpacity>
  );
};

const Notification: React.FC<NotificationsProps> = ({ notifications, onNotificationPress }) => {
  return (
    <View style={styles.container}>
      
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <NotificationItem 
            notification={item} 
            onPress={() => onNotificationPress(item)} 
          />
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 15,
    marginHorizontal: 15,
    marginVertical: 6,
    backgroundColor: '#F8F9FE',
    borderRadius: 8,
    borderBottomWidth: 0,
  },
  readNotificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 15,
    marginHorizontal: 15,
    marginVertical: 6,
    backgroundColor: '#F2F3F5',
    borderRadius: 8,
    borderBottomWidth: 0,
  },
  avatarContainer: {
    marginRight: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E1EFFF',
  },
  defaultAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E1EFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#3498db',
    fontWeight: 'bold',
  },
  contentContainer: {
    flex: 1,
  },
  notificationText: {
    fontSize: 14,
    color: '#333333',
  },
  userName: {
    fontWeight: 'bold',
  },
  timeText: {
    fontSize: 12,
    color: '#999999',
    marginTop: 2,
  },
  chevron: {
    marginLeft: 10,
  },
});

export default Notification;