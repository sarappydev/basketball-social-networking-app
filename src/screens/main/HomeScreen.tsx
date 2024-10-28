import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useAuth } from '../../contexts/AuthContext';

export default function HomeScreen({ navigation }: any) {
  const { user } = useAuth();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Basketball Social</Text>
      </View>
      
      <View style={styles.menuGrid}>
        <TouchableOpacity 
          style={styles.menuItem}
          onPress={() => navigation.navigate('Profile')}
        >
          <Text style={styles.menuText}>My Profile</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.menuItem}
          onPress={() => navigation.navigate('Explore')}
        >
          <Text style={styles.menuText}>Find Players</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.menuItem}
          onPress={() => navigation.navigate('Chat')}
        >
          <Text style={styles.menuText}>Messages</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.menuItem}
          onPress={() => navigation.navigate('Marketplace')}
        >
          <Text style={styles.menuText}>Marketplace</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    backgroundColor: '#007AFF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  menuGrid: {
    padding: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  menuItem: {
    width: '48%',
    backgroundColor: '#fff',
    padding: 20,
    margin: '1%',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  menuText: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
});