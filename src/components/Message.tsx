import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { auth } from '../config/firebase';

interface MessageProps {
  text: string;
  senderId: string;
  timestamp: Date;
}

export default function Message({ text, senderId, timestamp }: MessageProps) {
  const isCurrentUser = auth.currentUser?.uid === senderId;

  return (
    <View style={[
      styles.container,
      isCurrentUser ? styles.currentUser : styles.otherUser
    ]}>
      <Text style={[
        styles.messageText,
        isCurrentUser ? styles.currentUserText : styles.otherUserText
      ]}>
        {text}
      </Text>
      <Text style={styles.timestamp}>
        {new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    maxWidth: '80%',
    marginVertical: 5,
    padding: 10,
    borderRadius: 15,
  },
  currentUser: {
    alignSelf: 'flex-end',
    backgroundColor: '#007AFF',
    marginLeft: '20%',
  },
  otherUser: {
    alignSelf: 'flex-start',
    backgroundColor: '#E5E5EA',
    marginRight: '20%',
  },
  messageText: {
    fontSize: 16,
  },
  currentUserText: {
    color: 'white',
  },
  otherUserText: {
    color: 'black',
  },
  timestamp: {
    fontSize: 12,
    color: '#8E8E93',
    marginTop: 4,
    alignSelf: 'flex-end',
  },
});