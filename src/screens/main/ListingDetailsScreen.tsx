import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Alert 
} from 'react-native';
import { doc, getDoc } from 'firebase/firestore';
import { db, auth } from '../../config/firebase';
import ImageCarousel from '../../components/ImageCarousel';

export default function ListingDetailsScreen({ route, navigation }: any) {
  const { listingId } = route.params;
  const [listing, setListing] = useState<any>(null);
  const [seller, setSeller] = useState<any>(null);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const listingDoc = await getDoc(doc(db, 'listings', listingId));
        if (listingDoc.exists()) {
          const listingData = listingDoc.data();
          setListing(listingData);
          
          // Fetch seller information
          const sellerDoc = await getDoc(doc(db, 'users', listingData.sellerId));
          if (sellerDoc.exists()) {
            setSeller(sellerDoc.data());
          }
        }
      } catch (error) {
        console.error('Error fetching listing:', error);
        Alert.alert('Error', 'Failed to load listing details');
      }
    };

    fetchListing();
  }, [listingId]);

  const handleContact = () => {
    if (!auth.currentUser) {
      Alert.alert('Error', 'You must be logged in to contact the seller');
      return;
    }

    // Navigate to chat with the seller
    navigation.navigate('Chat', {
      screen: 'ChatRoom',
      params: { 
        roomId: `${auth.currentUser.uid}_${listing.sellerId}`,
        otherUserId: listing.sellerId
      }
    });
  };

  if (!listing || !seller) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <ImageCarousel images={listing.images || [listing.imageUrl]} />
      
      <View style={styles.content}>
        <Text style={styles.title}>{listing.title}</Text>
        <Text style={styles.price}>${listing.price}</Text>
        
        <View style={styles.sellerInfo}>
          <Text style={styles.sellerName}>Seller: {seller.name}</Text>
          <Text style={styles.sellerType}>{seller.userType}</Text>
        </View>

        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.description}>{listing.description}</Text>

        <TouchableOpacity 
          style={styles.contactButton}
          onPress={handleContact}
        >
          <Text style={styles.contactButtonText}>Contact Seller</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  price: {
    fontSize: 20,
    color: '#007AFF',
    fontWeight: '600',
    marginBottom: 15,
  },
  sellerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#F2F2F7',
    borderRadius: 8,
  },
  sellerName: {
    fontSize: 16,
    fontWeight: '500',
    marginRight: 10,
  },
  sellerType: {
    fontSize: 14,
    color: '#666',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
    marginBottom: 20,
  },
  contactButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  contactButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});