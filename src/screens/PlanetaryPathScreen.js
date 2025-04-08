import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const PLANETARY_INFLUENCES = [
  {
    planet: 'Sun',
    symbol: '☉',
    influence: 'Vitality and self-expression',
    cards: ['King of Hearts', 'Ace of Hearts'],
  },
  {
    planet: 'Moon',
    symbol: '☽',
    influence: 'Emotions and intuition',
    cards: ['Queen of Hearts', 'Eight of Hearts'],
  },
  {
    planet: 'Mercury',
    symbol: '☿',
    influence: 'Communication and intellect',
    cards: ['Jack of Diamonds', 'Eight of Diamonds'],
  },
  {
    planet: 'Venus',
    symbol: '♀',
    influence: 'Love and harmony',
    cards: ['Queen of Clubs', 'Seven of Hearts'],
  },
  {
    planet: 'Mars',
    symbol: '♂',
    influence: 'Action and energy',
    cards: ['King of Spades', 'Ten of Diamonds'],
  },
  {
    planet: 'Jupiter',
    symbol: '♃',
    influence: 'Growth and abundance',
    cards: ['King of Clubs', 'Three of Hearts'],
  },
  {
    planet: 'Saturn',
    symbol: '♄',
    influence: 'Structure and responsibility',
    cards: ['King of Diamonds', 'Ten of Spades'],
  },
];

export default function PlanetaryPathScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Your Planetary Path</Text>
      <Text style={styles.subtitle}>
        Understanding the planetary influences in cartomancy
      </Text>

      {PLANETARY_INFLUENCES.map((planet, index) => (
        <View key={index} style={styles.planetCard}>
          <View style={styles.planetHeader}>
            <Text style={styles.planetSymbol}>{planet.symbol}</Text>
            <Text style={styles.planetName}>{planet.planet}</Text>
          </View>
          
          <Text style={styles.influence}>{planet.influence}</Text>
          
          <View style={styles.cardsContainer}>
            <Ionicons name="cards-outline" size={20} color="#666" />
            <Text style={styles.cards}>
              Associated Cards: {planet.cards.join(', ')}
            </Text>
          </View>
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
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  planetCard: {
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  planetHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  planetSymbol: {
    fontSize: 24,
    marginRight: 10,
  },
  planetName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  influence: {
    fontSize: 16,
    color: '#444',
    marginBottom: 10,
    fontStyle: 'italic',
  },
  cardsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cards: {
    fontSize: 14,
    color: '#666',
    marginLeft: 5,
  },
});
