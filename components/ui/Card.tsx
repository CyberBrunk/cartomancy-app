import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';

type CardProps = {
  value: string;
  suit: string;
  color?: string;
  size?: 'small' | 'medium' | 'large';
  locked?: boolean;
};

export const Card = ({ value, suit, color = '#000', size = 'medium', locked = false }: CardProps) => {
  // Determine card dimensions based on size
  const cardStyle = {
    small: {
      width: 44,
      height: 62,
      borderRadius: 12,
      fontSize: 16,
    },
    medium: {
      width: 68,
      height: 96,
      borderRadius: 16,
      fontSize: 24,
    },
    large: {
      width: 90,
      height: 126,
      borderRadius: 20,
      fontSize: 32,
    },
  };

  const selectedSize = cardStyle[size];

  return (
    <View
      style={[
        styles.card,
        {
          width: selectedSize.width,
          height: selectedSize.height,
          borderRadius: selectedSize.borderRadius,
          backgroundColor: locked ? 'rgba(224, 224, 224, 0.9)' : 'rgba(255, 255, 255, 0.95)',
        },
      ]}
    >
      <ThemedText
        style={[
          styles.cardText,
          { color, fontSize: selectedSize.fontSize },
        ]}
      >
        {value}
      </ThemedText>
      <ThemedText
        style={[
          styles.suitText,
          { color, fontSize: selectedSize.fontSize * 0.8 },
        ]}
      >
        {suit}
      </ThemedText>
      {locked && (
        <View style={styles.lockedOverlay}>
          <ThemedText style={styles.lockIcon}>🔒</ThemedText>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 4,
    margin: 6,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  cardText: {
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  suitText: {
    marginTop: 6,
    letterSpacing: 0.3,
  },
  lockedOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.08)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    backdropFilter: 'blur(2px)',
  },
  lockIcon: {
    fontSize: 22,
    opacity: 0.8,
  },
});
