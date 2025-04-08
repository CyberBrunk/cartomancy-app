import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { format } from 'date-fns';

const CARDS = [
  { suit: '♠️', values: ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'] },
  { suit: '♥️', values: ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'] },
  { suit: '♣️', values: ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'] },
  { suit: '♦️', values: ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'] },
];

export default function DailyCardsScreen() {
  const [dailyCards, setDailyCards] = useState([]);
  const [lastDrawDate, setLastDrawDate] = useState('');

  const drawCard = () => {
    const suit = CARDS[Math.floor(Math.random() * CARDS.length)];
    const value = suit.values[Math.floor(Math.random() * suit.values.length)];
    return `${value}${suit.suit}`;
  };

  const getCardMeaning = (card) => {
    // This would be expanded with actual card meanings
    return `This card represents new beginnings and opportunities in your path.`;
  };

  const drawDailyCards = async () => {
    const today = format(new Date(), 'yyyy-MM-dd');
    const storedDate = await AsyncStorage.getItem('lastDrawDate');
    const storedCards = await AsyncStorage.getItem('dailyCards');

    if (storedDate === today && storedCards) {
      setDailyCards(JSON.parse(storedCards));
      setLastDrawDate(storedDate);
      return;
    }

    const newCards = [drawCard(), drawCard(), drawCard()];
    await AsyncStorage.setItem('dailyCards', JSON.stringify(newCards));
    await AsyncStorage.setItem('lastDrawDate', today);
    
    setDailyCards(newCards);
    setLastDrawDate(today);
  };

  useEffect(() => {
    drawDailyCards();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Your Daily Cards</Text>
      <Text style={styles.date}>{format(new Date(), 'MMMM d, yyyy')}</Text>
      {dailyCards.map((card, index) => (
        <View key={index} style={styles.cardContainer}>
          <Text style={styles.card}>{card}</Text>
          <Text style={styles.meaning}>{getCardMeaning(card)}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  date: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  cardContainer: {
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  card: {
    fontSize: 32,
    marginBottom: 10,
    textAlign: 'center',
  },
  meaning: {
    fontSize: 16,
    color: '#444',
    lineHeight: 22,
  },
});
