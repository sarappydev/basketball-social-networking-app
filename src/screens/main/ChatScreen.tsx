import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db, auth } from '../../config/firebase';
import UserCard from '../../components/UserCard';

interface ChatRoom {
  id: string;
  participants: string[];
  lastMessage: string;
  lastMessageTime: Date;
  otherUser: {
    id: string;
    name: string;
    userType: string;
    profileImage?: string;
  };
}

export default function ChatScreen({ navigation }: any) {
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);

  useEffect(() => {
    if (!auth.currentUser) return;

    const chatsRef = collection(db, 'chats');
    const q = query(
      chatsRef,
      where('participants', 'array-contains', auth.currentUser.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const rooms: ChatRoom[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        const otherUserId = data.participants.find(
          (id: string) => id !== auth.currentUser?.uid
        );
        rooms.push({
          id: doc.id,
          ...data,
          otherUser: data.users[otherUserId],
        });
      });
      setChatRooms(rooms);
    });

    return () => unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={chatRooms}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <UserCard
            name={item.otherUser.name}
            userType={item.otherUser.userType}
            onPress={() => navigation.navigate('ChatRoom', { roomId: item.id })}
            imageUrl={item.otherUser.profileImage}
          />
        )}
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
});