import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card } from './Card';

type CardGroupProps = {
  cards: Array<{
    value: string;
    suit: string;
    color: string;
    locked?: boolean;
  }>;
  size?: 'small' | 'medium' | 'large';
};

export const CardGroup = ({ cards, size = 'small' }: CardGroupProps) => {
  // Default to three empty cards if none provided
  const displayCards = cards.length > 0 
    ? cards 
    : [
        { value: '', suit: '', color: '#000' },
        { value: '', suit: '', color: '#000' },
        { value: '', suit: '', color: '#000' }
      ];

  return (
    <View style={styles.container}>
      {displayCards.map((card, index) => (
        <View 
          key={index} 
          style={[styles.cardWrapper, { zIndex: displayCards.length - index }]}
        >
          <Card
            value={card.value}
            suit={card.suit}
            color={card.color}
            size={size}
            locked={card.locked}
          />
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
  },
  cardWrapper: {
    marginHorizontal: -8, // Overlap cards slightly
    transform: [{ rotate: '-2deg' }], // Slightly rotate each card for a more natural look
  },
});
