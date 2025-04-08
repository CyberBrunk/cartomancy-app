import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, TouchableOpacity, FlatList, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useColorScheme } from '@/hooks/useColorScheme';

// Mock friend data
const MOCK_FRIENDS = [
  { id: '1', name: 'Sarah', avatar: require('@/assets/images/partial-react-logo.png'), dailyCard: 'Queen of Hearts' },
  { id: '2', name: 'Michael', avatar: require('@/assets/images/partial-react-logo.png'), dailyCard: '7 of Spades' },
  { id: '3', name: 'Emma', avatar: require('@/assets/images/partial-react-logo.png'), dailyCard: 'Ace of Diamonds' },
];

// Compatibility readings
const getCompatibilityReading = (myCard, friendCard) => {
  // This would be more sophisticated in a real app
  const readings = [
    "Your energies complement each other today. A good day for collaboration.",
    "There's some tension between your cards. Take time to listen and understand.",
    "A powerful combination! Creative projects will flourish if you work together.",
    "Your cards suggest a need for space and independence today.",
    "A harmonious match. Your connection feels especially strong right now."
  ];
  
  return readings[Math.floor(Math.random() * readings.length)];
};

export default function FriendsScreen() {
  const [friends, setFriends] = useState(MOCK_FRIENDS);
  const [myDailyCard, setMyDailyCard] = useState('');
  const [selectedFriend, setSelectedFriend] = useState(null);
  const colorScheme = useColorScheme();
  
  useEffect(() => {
    // Load the user's daily card
    const loadMyCard = async () => {
      try {
        const storedData = await AsyncStorage.getItem('dailyCards');
        if (storedData) {
          const { cards } = JSON.parse(storedData);
          if (cards && cards.length > 0) {
            setMyDailyCard(cards[0].name);
          }
        }
      } catch (error) {
        console.error('Error loading daily card:', error);
      }
    };
    
    loadMyCard();
    
    // In a real app, we would load friends from a backend
    // For now, we'll use the mock data
  }, []);
  
  const handleAddFriend = () => {
    Alert.alert(
      "Add Friend",
      "In the full app, this would open a screen to add friends by username or QR code.",
      [{ text: "OK" }]
    );
  };
  
  const handleFriendPress = (friend) => {
    setSelectedFriend(friend);
  };
  
  const handleCloseCompatibility = () => {
    setSelectedFriend(null);
  };
  
  const renderFriendItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.friendItem}
      onPress={() => handleFriendPress(item)}
      activeOpacity={0.7}
    >
      <Image source={item.avatar} style={styles.avatar} />
      <ThemedView style={styles.friendInfo}>
        <ThemedText type="subtitle">{item.name}</ThemedText>
        <ThemedText>Today's Card: {item.dailyCard}</ThemedText>
      </ThemedView>
      <IconSymbol size={24} name="chevron.right" color="#999" />
    </TouchableOpacity>
  );
  
  return (
    <>
      <ParallaxScrollView
        headerBackgroundColor={{ light: '#D1C4E9', dark: '#311B92' }}
        headerContent={
          <ThemedView style={styles.headerContent}>
            <ThemedText type="title">Friends</ThemedText>
            {myDailyCard ? (
              <ThemedText>Your card today: {myDailyCard}</ThemedText>
            ) : null}
          </ThemedView>
        }>
        
        <ThemedView style={styles.addFriendContainer}>
          <TouchableOpacity 
            style={styles.addFriendButton}
            onPress={handleAddFriend}
            activeOpacity={0.7}
          >
            <IconSymbol size={24} name="person.badge.plus" color="#fff" />
            <ThemedText style={styles.addFriendText}>Add Friend</ThemedText>
          </TouchableOpacity>
        </ThemedView>
        
        <ThemedView style={styles.friendsContainer}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>Your Friends</ThemedText>
          
          {friends.length === 0 ? (
            <ThemedView style={styles.emptyState}>
              <ThemedText>You haven't added any friends yet.</ThemedText>
              <ThemedText>Add friends to see their daily cards and compatibility readings.</ThemedText>
            </ThemedView>
          ) : (
            <FlatList
              data={friends}
              renderItem={renderFriendItem}
              keyExtractor={item => item.id}
              scrollEnabled={false}
              ItemSeparatorComponent={() => <ThemedView style={styles.separator} />}
            />
          )}
        </ThemedView>
        
        <ThemedView style={styles.infoContainer}>
          <ThemedText type="subtitle">About Friend Readings</ThemedText>
          <ThemedText>
            Compare your daily card with your friends' cards to see compatibility readings and insights.
            You can also view your friends' public journal entries if they've chosen to share them.
          </ThemedText>
        </ThemedView>
      </ParallaxScrollView>
      
      {/* Compatibility Reading Modal */}
      {selectedFriend && (
        <ThemedView style={styles.modalOverlay}>
          <ThemedView style={styles.modalContent}>
            <TouchableOpacity 
              style={styles.closeButton}
              onPress={handleCloseCompatibility}
            >
              <IconSymbol size={24} name="xmark.circle.fill" color="#999" />
            </TouchableOpacity>
            
            <ThemedText type="title" style={styles.modalTitle}>Compatibility Reading</ThemedText>
            
            <ThemedView style={styles.cardsComparison}>
              <ThemedView style={styles.cardCompare}>
                <ThemedText type="subtitle">Your Card</ThemedText>
                <ThemedText>{myDailyCard || "No card drawn"}</ThemedText>
              </ThemedView>
              
              <IconSymbol size={32} name="arrow.left.and.right" color="#999" />
              
              <ThemedView style={styles.cardCompare}>
                <ThemedText type="subtitle">{selectedFriend.name}'s Card</ThemedText>
                <ThemedText>{selectedFriend.dailyCard}</ThemedText>
              </ThemedView>
            </ThemedView>
            
            <ThemedView style={styles.readingContainer}>
              <ThemedText type="subtitle">Today's Reading</ThemedText>
              <ThemedText style={styles.readingText}>
                {getCompatibilityReading(myDailyCard, selectedFriend.dailyCard)}
              </ThemedText>
            </ThemedView>
          </ThemedView>
        </ThemedView>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  headerContent: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 60,
    paddingBottom: 20,
  },
  addFriendContainer: {
    alignItems: 'center',
    marginVertical: 16,
  },
  addFriendButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#6200EE',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
  },
  addFriendText: {
    color: '#fff',
    marginLeft: 8,
    fontWeight: '600',
  },
  friendsContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    marginBottom: 12,
  },
  friendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  friendInfo: {
    flex: 1,
  },
  separator: {
    height: 1,
    backgroundColor: '#e0e0e0',
  },
  emptyState: {
    padding: 20,
    alignItems: 'center',
  },
  infoContainer: {
    padding: 16,
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modalContent: {
    width: '85%',
    borderRadius: 16,
    padding: 20,
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    zIndex: 1,
  },
  modalTitle: {
    textAlign: 'center',
    marginBottom: 20,
  },
  cardsComparison: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  cardCompare: {
    alignItems: 'center',
    flex: 1,
  },
  readingContainer: {
    alignItems: 'center',
  },
  readingText: {
    textAlign: 'center',
    fontStyle: 'italic',
    marginTop: 8,
  },
});
