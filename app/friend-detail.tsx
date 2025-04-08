import React from 'react';
import { StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useLocalSearchParams, Stack, useRouter } from 'expo-router';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { CardGroup } from '@/components/ui/CardGroup';

// Define card type
type Card = {
  value: string;
  suit: string;
  color: string;
};

// Helper function to convert card names to our component format
const parseCardName = (cardName: string): Card => {
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
  
  return { value, suit: suitSymbol, color };
};

export default function FriendDetailScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { id, name, avatar, dailyCard, birthday } = params;
  
  // In a real app, we would fetch the friend's data from a database
  // For now, we'll use the passed parameters
  
  // Parse the daily card
  const parsedCard = parseCardName(dailyCard as string);
  
  // Create a set of three cards (in a real app, these would be fetched)
  const cards: Card[] = [
    parsedCard,
    { value: 'A', suit: '♠', color: '#212121' },
    { value: '10', suit: '♥', color: '#E53935' },
  ];
  
  return (
    <>
      <Stack.Screen 
        options={{
          title: name as string,
          headerShadowVisible: false,
          headerStyle: { backgroundColor: '#f8f8f8' },
        }} 
      />
      
      <ScrollView style={styles.container}>
        <ThemedView style={styles.header}>
          <Image 
            source={typeof avatar === 'string' ? { uri: avatar } : require('@/assets/images/partial-react-logo.png')} 
            style={styles.avatar} 
          />
          <ThemedText type="title">{name}</ThemedText>
          {birthday && (
            <ThemedText style={styles.birthday}>
              {birthday}
            </ThemedText>
          )}
        </ThemedView>
        
        <ThemedView style={styles.cardsSection}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            Today's Cards
          </ThemedText>
          
          <ThemedView style={styles.cardsContainer}>
            <CardGroup cards={cards} size="medium" />
          </ThemedView>
          
          <ThemedText style={styles.cardDescription}>
            These cards represent {name}'s energy for today. The combination suggests 
            {cards[0].suit === '♥' || cards[0].suit === '♦' 
              ? ' emotional intensity and creative potential.' 
              : ' practical thinking and strategic decision-making.'}
          </ThemedText>
        </ThemedView>
        
        <ThemedView style={styles.compatibilitySection}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            Compatibility
          </ThemedText>
          
          <ThemedView style={styles.compatibilityContent}>
            <ThemedText>
              Your cards and {name}'s cards show a strong compatibility today.
              This is an excellent time for meaningful conversations and shared activities.
            </ThemedText>
          </ThemedView>
        </ThemedView>
        
        <ThemedView style={styles.actionsSection}>
          <TouchableOpacity style={styles.actionButton}>
            <IconSymbol name="message.fill" size={20} color="#fff" />
            <ThemedText style={styles.actionButtonText}>Send Message</ThemedText>
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.actionButton, styles.secondaryButton]}>
            <IconSymbol name="calendar" size={20} color="#6200EE" />
            <ThemedText style={styles.secondaryButtonText}>Schedule Reading</ThemedText>
          </TouchableOpacity>
        </ThemedView>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  header: {
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#fff',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  birthday: {
    marginTop: 8,
    color: '#666',
  },
  cardsSection: {
    margin: 16,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  sectionTitle: {
    marginBottom: 16,
  },
  cardsContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  cardDescription: {
    textAlign: 'center',
    color: '#666',
    lineHeight: 22,
  },
  compatibilitySection: {
    margin: 16,
    marginTop: 0,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  compatibilityContent: {
    padding: 8,
  },
  actionsSection: {
    margin: 16,
    marginTop: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#6200EE',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    flex: 1,
    marginRight: 8,
    shadowColor: '#6200EE',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },
  actionButtonText: {
    color: '#fff',
    fontWeight: '600',
    marginLeft: 8,
  },
  secondaryButton: {
    backgroundColor: '#f0e6ff',
    marginRight: 0,
    marginLeft: 8,
    shadowColor: '#6200EE',
    shadowOpacity: 0.1,
  },
  secondaryButtonText: {
    color: '#6200EE',
    fontWeight: '600',
    marginLeft: 8,
  },
});
