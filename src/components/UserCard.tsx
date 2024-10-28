import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

interface UserCardProps {
  name: string;
  userType: string;
  location?: string;
  onPress: () => void;
  imageUrl?: string;
}

export default function UserCard({ name, userType, location, onPress, imageUrl }: UserCardProps) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image
        source={imageUrl ? { uri: imageUrl } : require('../../assets/default-avatar.png')}
        style={styles.avatar}
      />
      <View style={styles.info}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.type}>{userType}</Text>
        {location && <Text style={styles.location}>{location}</Text>}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  info: {
    marginLeft: 15,
    justifyContent: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  type: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  location: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
  },
});