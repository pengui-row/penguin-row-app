import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface AvatarProps {
  name: string;
  size?: number;
  backgroundColor?: string;
  textColor?: string;
}

const generateColor = (name: string): string => {
  if (!name) {
    return '#999';
  }
  const nameParts = name.split(' ');
  const initials = (nameParts[0]?.[0] || '') + (nameParts.length > 1 ? nameParts[1]?.[0] || '' : '');
  if (!initials) {
    return '#999';
  }

  // Algoritmo para generar un color basado en el hash de las iniciales
  let hash = 0;
  for (let i = 0; i < initials.length; i++) {
    hash = initials.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xFF;
    color += ('00' + value.toString(16)).substr(-2);
  }
  return color;
};

const Avatar: React.FC<AvatarProps> = ({ name, size = 40, backgroundColor, textColor = 'white' }) => {
  const initials = name
    .split(' ')
    .slice(0, 2)
    .map((n) => n[0]?.toUpperCase())
    .join('');

  const avatarBackgroundColor = backgroundColor || generateColor(name);

  return (
    <View
      style={[
        styles.container,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: avatarBackgroundColor,
        },
      ]}
    >
      <Text style={[styles.text, { fontSize: size / 2, color: textColor }]}>
        {initials}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontWeight: 'bold',
  },
});

export default Avatar;