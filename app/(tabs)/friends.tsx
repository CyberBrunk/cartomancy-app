import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, TouchableOpacity, FlatList, View, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { CardGroup } from '@/components/ui/CardGroup';
import { useColorScheme } from '@/hooks/useColorScheme';

// Mock friend data
const MOCK_FRIENDS = [
  { 
    id: '1', 
    name: 'Katie Kirk', 
    avatar: require('@/assets/images/partial-react-logo.png'), 
    dailyCard: 'Queen of Hearts',
    birthday: 'November 29'
  },
  { 
    id: '2', 
    name: 'Mira Stanton', 
    avatar: require('@/assets/images/partial-react-logo.png'), 
    dailyCard: '10 of Clubs',
    birthday: 'October 1',
    locked: true
  },
];

// Helper function to convert card names to our component format
const parseCardName = (cardName: string): { value: string; suit: string; color: string } => {
  if (!cardName) return { value: '', suit: '', color: '#000' };
  
  const parts = cardName.split(' of ');
  if (parts.length !== 2) return { value: cardName, suit: '', color: '#000' };
  
  const [value, suit] = parts;
  let color = '#000';
  
  if (suit === 'Hearts' || suit === 'Diamonds') {
    color = '#E53935'; // Red
  } else if (suit === 'Spades' || suit === 'Clubs') {
    color = '#212121'; // Black
  }
  
  // Convert suit to symbol
  let suitSymbol = '';
  switch (suit) {
    case 'Hearts': suitSymbol = '♥'; break;
    case 'Diamonds': suitSymbol = '♦'; break;
    case 'Clubs': suitSymbol = '♣'; break;
    case 'Spades': suitSymbol = '♠'; break;
    default: suitSymbol = suit;
  }
  
  // Abbreviate values
  let shortValue = value;
  switch (value) {
    case 'Queen': shortValue = 'Q'; break;
    case 'King': shortValue = 'K'; break;
    case 'Jack': shortValue = 'J'; break;
    case 'Ace': shortValue = 'A'; break;
    default: shortValue = value;
  }
  
  return { value: shortValue, suit: suitSymbol, color };
};

export default function FriendsScreen() {
  const [friends, setFriends] = useState(MOCK_FRIENDS);
  const [myDailyCard, setMyDailyCard] = useState('');
  const router = useRouter();
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
    router.push('/add-friend');
  };
  
  type Friend = {
    id: string;
    name: string;
    avatar: any;
    dailyCard: string;
    birthday?: string;
    locked?: boolean;
  };

  const handleFriendPress = (friend: Friend) => {
    router.push({
      pathname: '/friend-detail',
      params: {
        id: friend.id,
        name: friend.name,
        avatar: friend.avatar,
        dailyCard: friend.dailyCard,
        birthday: friend.birthday
      }
    });
  };
  
  type CardType = {
    value: string;
    suit: string;
    color: string;
    locked?: boolean;
  };

  const renderFriendItem = ({ item }: { item: Friend }) => {
    // Parse the daily card for display
    const parsedCard = parseCardName(item.dailyCard);
    
    // Create a set of three cards (in a real app, these would be fetched)
    const cards: CardType[] = [
      parsedCard,
      { value: 'A', suit: '♠', color: '#212121' },
      { value: '9', suit: '♥', color: '#E53935' },
    ];
    
    // For the locked friend, mark all cards as locked
    if (item.locked) {
      cards.forEach(card => card.locked = true);
    }
    
    return (
      <TouchableOpacity 
        style={styles.friendItem}
        onPress={() => handleFriendPress(item)}
        activeOpacity={0.7}
        accessibilityLabel={`View ${item.name}'s details`}
        accessibilityRole="button"
      >
        <View style={styles.friendProfile}>
          <Image source={item.avatar} style={styles.avatar} />
          <View style={styles.friendInfo}>
            <ThemedText style={styles.friendName}>{item.name}</ThemedText>
            <ThemedText style={styles.friendDate}>{item.birthday}</ThemedText>
          </View>
        </View>
        
        <View style={styles.cardsPreview}>
          <CardGroup cards={cards} size="small" />
          {item.locked && (
            <IconSymbol name="lock.fill" size={16} color="#666" style={styles.lockIcon} />
          )}
        </View>
      </TouchableOpacity>
    );
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <ThemedText style={styles.headerTitle}>Connections</ThemedText>
        <View style={styles.headerActions}>
          <TouchableOpacity 
            style={styles.searchButton}
            accessibilityLabel="Search friends"
            accessibilityRole="button"
          >
            <IconSymbol name="magnifyingglass" size={24} color="#333" />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.addButton}
            onPress={handleAddFriend}
            accessibilityLabel="Add a new friend"
            accessibilityRole="button"
          >
            <IconSymbol name="plus" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.tabs}>
        <TouchableOpacity 
          style={styles.tabActive}
          accessibilityLabel="Friends tab"
          accessibilityRole="tab"
          accessibilityState={{ selected: true }}
        >
          <ThemedText style={styles.tabTextActive}>Friends</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.tab}
          accessibilityLabel="Calendar tab"
          accessibilityRole="tab"
          accessibilityState={{ selected: false }}
        >
          <ThemedText style={styles.tabText}>Calendar</ThemedText>
        </TouchableOpacity>
      </View>
      
      <FlatList
        data={friends}
        renderItem={renderFriendItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.friendsList}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <ThemedText style={styles.emptyStateText}>You haven't added any friends yet.</ThemedText>
            <TouchableOpacity 
              style={styles.emptyStateButton}
              onPress={handleAddFriend}
            >
              <ThemedText style={styles.emptyStateButtonText}>Add Friends</ThemedText>
            </TouchableOpacity>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    letterSpacing: 0.3,
    color: '#1a2a3a',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchButton: {
    marginRight: 16,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(240, 240, 240, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  addButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#3a506b',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 4,
  },
  tabs: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  tab: {
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 100,
    marginRight: 12,
  },
  tabActive: {
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 100,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
    marginRight: 12,
    borderWidth: 1,
    borderColor: 'rgba(230, 230, 230, 0.5)',
  },
  tabText: {
    color: '#666',
    fontSize: 15,
    fontWeight: '500',
    letterSpacing: 0.3,
  },
  tabTextActive: {
    fontWeight: '600',
    color: '#1a2a3a',
    fontSize: 15,
    letterSpacing: 0.3,
  },
  friendsList: {
    paddingHorizontal: 20,
  },
  friendItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginBottom: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
    borderWidth: 1,
    borderColor: 'rgba(230, 230, 230, 0.5)',
  },
  friendProfile: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.8)',
  },
  friendInfo: {
    justifyContent: 'center',
  },
  friendName: {
    fontSize: 17,
    fontWeight: '600',
    marginBottom: 6,
    color: '#1a2a3a',
    letterSpacing: 0.3,
  },
  friendDate: {
    fontSize: 14,
    color: '#666',
    letterSpacing: 0.2,
  },
  cardsPreview: {
    position: 'relative',
    marginRight: 4,
  },
  lockIcon: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginLeft: -8,
    marginTop: -8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  separator: {
    height: 1,
    backgroundColor: 'rgba(224, 224, 224, 0.5)',
    marginVertical: 8,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 60,
  },
  emptyStateText: {
    textAlign: 'center',
    marginBottom: 24,
    color: '#666',
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.3,
  },
  emptyStateButton: {
    backgroundColor: '#3a506b',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 4,
  },
  emptyStateButtonText: {
    color: '#fff',
    fontWeight: '600',
    letterSpacing: 0.3,
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
  friendItemAlt: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  avatarAlt: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  friendInfoAlt: {
    flex: 1,
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
