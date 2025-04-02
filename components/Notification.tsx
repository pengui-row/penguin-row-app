import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Definición de tipos para las notificaciones
interface Notification {
  id: string;
  user: {
    name: string;
    avatar?: string;
  };
  action: 'like' | 'comment';
  time: string;
  publicationId: string;
}

interface NotificationsProps {
  notifications: Notification[];
  onNotificationPress: (notification: Notification) => void;
}

const NotificationItem: React.FC<{ notification: Notification; onPress: () => void }> = ({ 
  notification, 
  onPress 
}) => {
  const { user, action, time } = notification;
  
  const actionText = action === 'like' 
    ? 'ha dado like a tu publicación' 
    : 'ha comentado tu publicación';

  return (
    <TouchableOpacity style={styles.notificationItem} onPress={onPress}>
      <View style={styles.avatarContainer}>
        {user.avatar ? (
          <Image source={{ uri: user.avatar }} style={styles.avatar} />
        ) : (
          <View style={styles.defaultAvatar}>
            <Ionicons name="person" size={24} color="#3498db" />
          </View>
        )}
      </View>
      
      <View style={styles.contentContainer}>
        <Text style={styles.notificationText}>
          <Text style={styles.userName}>{user.name}</Text> {actionText}
        </Text>
        <Text style={styles.timeText}>{time}</Text>
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