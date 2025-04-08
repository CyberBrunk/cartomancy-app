import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

export default function FriendsScreen() {
  const [friends, setFriends] = useState([]);
  const [newFriend, setNewFriend] = useState('');

  useEffect(() => {
    loadFriends();
  }, []);

  const loadFriends = async () => {
    try {
      const storedFriends = await AsyncStorage.getItem('friends');
      if (storedFriends) {
        setFriends(JSON.parse(storedFriends));
      }
    } catch (error) {
      console.error('Error loading friends:', error);
    }
  };

  const addFriend = async () => {
    if (newFriend.trim()) {
      const updatedFriends = [...friends, {
        id: Date.now().toString(),
        name: newFriend.trim(),
        dateAdded: new Date().toISOString(),
      }];
      
      try {
        await AsyncStorage.setItem('friends', JSON.stringify(updatedFriends));
        setFriends(updatedFriends);
        setNewFriend('');
      } catch (error) {
        console.error('Error saving friend:', error);
      }
    }
  };

  const removeFriend = async (id) => {
    const updatedFriends = friends.filter(friend => friend.id !== id);
    try {
      await AsyncStorage.setItem('friends', JSON.stringify(updatedFriends));
      setFriends(updatedFriends);
    } catch (error) {
      console.error('Error removing friend:', error);
    }
  };

  const renderFriend = ({ item }) => (
    <View style={styles.friendItem}>
      <Text style={styles.friendName}>{item.name}</Text>
      <TouchableOpacity
        onPress={() => removeFriend(item.id)}
        style={styles.removeButton}
      >
        <Ionicons name="close-circle" size={24} color="#ff4444" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={newFriend}
          onChangeText={setNewFriend}
          placeholder="Enter friend's name"
          placeholderTextColor="#999"
        />
        <TouchableOpacity onPress={addFriend} style={styles.addButton}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={friends}
        renderItem={renderFriend}
        keyExtractor={item => item.id}
        style={styles.list}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No friends added yet</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  addButton: {
    backgroundColor: '#6366f1',
    paddingHorizontal: 20,
    justifyContent: 'center',
    borderRadius: 8,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  list: {
    flex: 1,
  },
  friendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    marginBottom: 10,
  },
  friendName: {
    flex: 1,
    fontSize: 16,
  },
  removeButton: {
    padding: 5,
  },
  emptyText: {
    textAlign: 'center',
    color: '#999',
    marginTop: 20,
  },
});
