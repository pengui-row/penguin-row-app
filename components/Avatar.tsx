import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface AvatarProps {
  name: string;
  size?: number;
  backgroundColor?: string;
  textColor?: string;
}
const colorPalette = [
  '#E57373',
  '#FFB74D',
  '#FFEE58',
  '#81C784',
  '#4FC3F7',
  '#64B5F6',
  '#9575CD',
  '#F06292',
  '#4DB6AC',
  '#A1887F',
];


const generateColor = (name: string): string => {
  if (!name) {
    return '#999';
  }
  const nameParts = name.split(' ');
  const initials = (nameParts[0]?.[0] || '') + (nameParts.length > 1 ? nameParts[1]?.[0] || '' : '');
  if (!initials) {
    return '#999';
  }

  const index = initials.charCodeAt(0) % colorPalette.length;
  return colorPalette[index];
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
    margin: 5,
  },
  text: {
    fontWeight: 'bold',
  },
});

export default Avatar;