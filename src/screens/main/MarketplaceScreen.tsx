import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import { db } from '../../config/firebase';

interface ListingItem {
  id: string;
  title: string;
  price: number;
  description: string;
  imageUrl?: string;
  sellerId: string;
  createdAt: Date;
}

export default function MarketplaceScreen({ navigation }: any) {
  const [listings, setListings] = useState<ListingItem[]>([]);

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    try {
      const listingsRef = collection(db, 'listings');
      const q = query(listingsRef, orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const listingsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as ListingItem[];
      setListings(listingsData);
    } catch (error) {
      console.error('Error fetching listings:', error);
    }
  };

  const renderItem = ({ item }: { item: ListingItem }) => (
    <TouchableOpacity 
      style={styles.listingCard}
      onPress={() => navigation.navigate('ListingDetails', { listingId: item.id })}
    >
      <Image
        source={item.imageUrl ? { uri: item.imageUrl } : require('../../../assets/default-item.png')}
        style={styles.listingImage}
      />
      <View style={styles.listingInfo}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.price}>${item.price}</Text>
        <Text style={styles.description} numberOfLines={2}>
          {item.description}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.addButton}
        onPress={() => navigation.navigate('CreateListing')}
      >
        <Text style={styles.addButtonText}>+ Add New Listing</Text>
      </TouchableOpacity>
      <FlatList
        data={listings}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 15,
  },
  addButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
  },
  addButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  list: {
    flex: 1,
  },
  listingCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  listingImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  listingInfo: {
    padding: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 16,
    color: '#007AFF',
    marginTop: 5,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
});