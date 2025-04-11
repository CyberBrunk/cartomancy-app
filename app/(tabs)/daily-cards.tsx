import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, View, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { format } from 'date-fns';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Haptics from 'expo-haptics';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Card, generateDeck, getPersonalizedMeaning, cardBack } from '@/utils/cardManager';
import { getMoonPhaseWithSign } from '@/utils/moonPhase';
import { updateStreak } from '@/utils/streakTracker';

// Import types
const { width, height } = Dimensions.get('window');

// Animation timing constants
const CARD_FLIP_DURATION = 600; // ms
const CARD_DEAL_DELAY = 200; // ms between cards


const getTodayDateString = () => {
  return format(new Date(), 'yyyy-MM-dd');
};

// Function to draw random cards
const drawRandomCards = (count: number): Card[] => {
  const shuffled = [...generateDeck()].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export default function DailyCardsScreen() {
  const [dailyCards, setDailyCards] = useState<Card[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [greeting, setGreeting] = useState('Good Morning');
  const [moonPhase, setMoonPhase] = useState('');
  const [currentDate, setCurrentDate] = useState(format(new Date(), 'MMMM d'));
  const [streak, setStreak] = useState({ currentStreak: 0, highestStreak: 0 });
  const [isFlipped, setIsFlipped] = useState(false);
  const colorScheme = useColorScheme();
  
  useEffect(() => {
    const initializeData = async () => {
      try {
        // Update streak
        const streakData = await updateStreak();
        setStreak(streakData);
        
        // Set moon phase
        setMoonPhase(getMoonPhaseWithSign());
        
        // Set greeting based on time of day
        const hour = new Date().getHours();
        if (hour < 12) setGreeting('Good Morning');
        else if (hour < 18) setGreeting('Good Afternoon');
        else setGreeting('Good Evening');
        
        // Load or generate daily cards
        const today = getTodayDateString();
        const storedData = await AsyncStorage.getItem('dailyCards');
        
        if (storedData) {
          const { date, cards } = JSON.parse(storedData);
          if (date === today) {
            setDailyCards(cards);
          } else {
            await generateNewCards();
          }
        } else {
          await generateNewCards();
        }
        
        setIsLoading(false);
      } catch (error) {
        console.error('Error initializing data:', error);
        setIsLoading(false);
      }
    };

    initializeData();
  }, []);

  const generateNewCards = async () => {
    try {
      const deck = generateDeck();
      const shuffled = [...deck].sort(() => 0.5 - Math.random());
      const newCards = shuffled.slice(0, 3);
      
      await AsyncStorage.setItem('dailyCards', JSON.stringify({
        date: getTodayDateString(),
        cards: newCards
      }));
      
      setDailyCards(newCards);
      
      // Trigger haptic feedback for new cards
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } catch (error) {
      console.error('Error generating new cards:', error);
    }
  };

  const handleCardPress = (card: Card) => {
    setIsFlipped(!isFlipped);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  };

  return (
    <ScrollView style={styles.container} bounces={false}>
      <LinearGradient
        colors={['#1a2a3a', '#2c3e50', '#3a506b']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradientBackground}
      >
        {/* Top section with moon phase and streak counter */}
        <View style={styles.topSection}>
          <View style={styles.moonPhaseContainer}>
            <View style={styles.moonIcon}>
              <IconSymbol name="moon.stars" size={16} color="#fff" />
            </View>
            <ThemedText style={styles.moonPhaseText}>{moonPhase}</ThemedText>
          </View>
          
          <View style={styles.streakContainer}>
            <IconSymbol name="flame.fill" size={20} color="#fff" />
            <ThemedText style={styles.streakText}>{streak.currentStreak}</ThemedText>
          </View>
        </View>
        
        {/* Greeting section */}
        <View style={styles.greetingSection}>
          <ThemedText style={styles.greetingText}>{greeting}</ThemedText>
          <ThemedText style={styles.subtitleText}>Here's today's cards</ThemedText>
        </View>
        
        {/* Card display section */}
        <View style={styles.cardSection}>
          {isLoading ? (
            <View style={styles.loadingContainer}>
              <ThemedText style={styles.loadingText}>Drawing your cards...</ThemedText>
            </View>
          ) : (
            <ScrollView
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              style={styles.cardCarousel}
            >
              {dailyCards.map((card, index) => (
                <TouchableOpacity
                  key={card.id}
                  style={styles.cardContainer}
                  onPress={() => handleCardPress(card)}
                  activeOpacity={0.9}
                >
                  <Image
                    source={isFlipped ? card.image : cardBack}
                    style={styles.cardImage}
                    resizeMode="contain"
                  />
                  {isFlipped && (
                    <View style={styles.cardDetails}>
                      <ThemedText style={styles.cardName}>{card.name}</ThemedText>
                      <ThemedText style={styles.cardMeaning}>{card.meaning}</ThemedText>
                      <ThemedText style={styles.personalMeaning}>
                        {getPersonalizedMeaning(card)}
                      </ThemedText>
                    </View>
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}
        </View>
        
        {/* Date display */}
        <View style={styles.dateSection}>
          <View style={styles.dateContainer}>
            <IconSymbol name="calendar" size={16} color="#000" />
            <ThemedText style={styles.dateText}>{currentDate}</ThemedText>
          </View>
        </View>
        
        {/* Recent reflections section */}
        <View style={styles.reflectionsContainer}>
          <View style={styles.reflectionsHeader}>
            <ThemedText style={styles.reflectionsTitle}>Recent Reflections</ThemedText>
            <TouchableOpacity>
              <IconSymbol name="gear" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
          
          {/* This would be populated with actual reflection entries */}
          <View style={styles.emptyReflections}>
            <ThemedText style={styles.emptyText}>No reflections yet</ThemedText>
          </View>
        </View>
      </LinearGradient>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  gradientBackground: {
    flex: 1,
    minHeight: height,
    paddingTop: 60,
  },
  topSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 10,
  },
  moonPhaseContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  moonIcon: {
    marginRight: 5,
  },
  moonPhaseText: {
    color: '#fff',
    fontSize: 14,
  },
  streakContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(13, 148, 136, 0.85)',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  streakText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  greetingSection: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 20,
  },
  greetingText: {
    fontSize: 42,
    fontWeight: '700',
    color: '#fff',
    textAlign: 'center',
    opacity: 0.9,
    letterSpacing: 0.5,
    textShadowColor: 'rgba(0, 0, 0, 0.15)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 10,
  },
  subtitleText: {
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.9)',
    marginTop: 12,
    fontWeight: '400',
    letterSpacing: 0.3,
  },
  cardSection: {
    alignItems: 'center',
    marginTop: 20,
  },
  loadingContainer: {
    padding: 20,
    alignItems: 'center',
  },
  loadingText: {
    color: '#fff',
    fontSize: 16,
  },
  cardCarousel: {
    height: 480,
    width: width,
  },
  cardContainer: {
    width: width - 40,
    height: 480,
    marginHorizontal: 20,
    borderRadius: 24,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 10,
  },
  cardImage: {
    width: '100%',
    height: '100%',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  cardDetails: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  cardName: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  cardMeaning: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 12,
  },
  personalMeaning: {
    color: '#fff',
    fontSize: 14,
    fontStyle: 'italic',
    opacity: 0.9,
  },
  dateSection: {
    alignItems: 'center',
    marginTop: 20,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  dateText: {
    fontSize: 16,
    marginLeft: 8,
    color: '#333',
    fontWeight: '500',
    letterSpacing: 0.3,
  },
  reflectionsContainer: {
    marginTop: 40,
    paddingHorizontal: 24,
    paddingBottom: 120,
  },
  reflectionsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  reflectionsTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
    letterSpacing: 0.3,
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  emptyReflections: {
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    padding: 32,
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 3,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  emptyText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 16,
    fontWeight: '400',
    letterSpacing: 0.3,
  },
});
