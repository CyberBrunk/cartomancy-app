import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, View, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { format } from 'date-fns';
import { LinearGradient } from 'expo-linear-gradient';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useColorScheme } from '@/hooks/useColorScheme';

// Define card type
type Card = {
  id: string;
  name: string;
  meaning: string;
  image: any; // Using any for image require
};

const { width, height } = Dimensions.get('window');

// Card data
const CARDS: Card[] = [
  { id: '1', name: 'Ace of Hearts', meaning: 'New beginnings, love, happiness', image: require('@/assets/images/partial-react-logo.png') },
  { id: '2', name: '2 of Hearts', meaning: 'Partnership, mutual attraction', image: require('@/assets/images/partial-react-logo.png') },
  { id: '3', name: '3 of Hearts', meaning: 'Creativity, growth, expansion', image: require('@/assets/images/partial-react-logo.png') },
  { id: '4', name: '4 of Hearts', meaning: 'Stability, foundation, security', image: require('@/assets/images/partial-react-logo.png') },
  { id: '5', name: '5 of Hearts', meaning: 'Change, instability, conflict', image: require('@/assets/images/partial-react-logo.png') },
  { id: '6', name: '6 of Hearts', meaning: 'Harmony, healing, cooperation', image: require('@/assets/images/partial-react-logo.png') },
  { id: '7', name: '7 of Hearts', meaning: 'Reflection, assessment, insight', image: require('@/assets/images/partial-react-logo.png') },
  { id: '8', name: '8 of Hearts', meaning: 'Movement, progress, journey', image: require('@/assets/images/partial-react-logo.png') },
  { id: '9', name: '9 of Hearts', meaning: 'Wishes fulfilled, contentment', image: require('@/assets/images/partial-react-logo.png') },
  { id: '10', name: '10 of Hearts', meaning: 'Completion, wholeness, perfection', image: require('@/assets/images/partial-react-logo.png') },
  { id: '11', name: 'Jack of Hearts', meaning: 'Youth, enthusiasm, messenger', image: require('@/assets/images/partial-react-logo.png') },
  { id: '12', name: 'Queen of Hearts', meaning: 'Nurturing, intuition, compassion', image: require('@/assets/images/partial-react-logo.png') },
  { id: '13', name: 'King of Hearts', meaning: 'Mastery, leadership, wisdom', image: require('@/assets/images/partial-react-logo.png') },
  // Add more cards as needed
];

// Generate a personalized interpretation
const getPersonalInterpretation = (cardMeaning: string): string => {
  const prefixes = [
    'Today, this card suggests that you',
    'For you today, this means',
    "This card's energy invites you to",
    'Consider how you might',
    'Reflect on ways you can'
  ];
  
  const suffix = cardMeaning.toLowerCase()
    .replace('happiness', 'find joy in small moments')
    .replace('love', 'open your heart to new connections')
    .replace('security', 'build stronger foundations')
    .replace('conflict', 'navigate challenges with grace')
    .replace('insight', 'trust your inner wisdom');
    
  const randomPrefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  return `${randomPrefix} ${suffix}.`;
};

// Function to get today's date in a consistent format
const getTodayDateString = () => {
  return format(new Date(), 'yyyy-MM-dd');
};

// Function to draw random cards
const drawRandomCards = (count: number): Card[] => {
  const shuffled = [...CARDS].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export default function DailyCardsScreen() {
  const [dailyCards, setDailyCards] = useState<Card[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [greeting, setGreeting] = useState('Good Morning');
  const [moonPhase, setMoonPhase] = useState('Moon in Gemini');
  const [currentDate, setCurrentDate] = useState(format(new Date(), 'MMMM d'));
  const colorScheme = useColorScheme();
  
  useEffect(() => {
    // Set appropriate greeting based on time of day
    const setTimeBasedGreeting = () => {
      const hour = new Date().getHours();
      if (hour < 12) {
        setGreeting('Good Morning');
      } else if (hour < 18) {
        setGreeting('Good Afternoon');
      } else {
        setGreeting('Good Evening');
      }
    };
    
    const loadDailyCards = async () => {
      try {
        setIsLoading(true);
        const today = getTodayDateString();
        const storedData = await AsyncStorage.getItem('dailyCards');
        
        if (storedData) {
          const { date, cards } = JSON.parse(storedData);
          
          // If we have cards for today, use them
          if (date === today) {
            setDailyCards(cards);
          } else {
            // Otherwise draw new cards for today
            const newCards = drawRandomCards(3);
            await AsyncStorage.setItem('dailyCards', JSON.stringify({
              date: today,
              cards: newCards
            }));
            setDailyCards(newCards);
          }
        } else {
          // First time using the app, draw cards
          const newCards = drawRandomCards(3);
          await AsyncStorage.setItem('dailyCards', JSON.stringify({
            date: today,
            cards: newCards
          }));
          setDailyCards(newCards);
        }
      } catch (error) {
        console.error('Error loading daily cards:', error);
        // Fallback to random cards if there's an error
        setDailyCards(drawRandomCards(3));
      } finally {
        setIsLoading(false);
      }
    };
    
    setTimeBasedGreeting();
    setCurrentDate(format(new Date(), 'MMMM d'));
    loadDailyCards();
  }, []);
  
  // Render the main screen UI components
  return (
    <ScrollView style={styles.container} bounces={false}>
      <LinearGradient
        colors={['#002147', '#1A4C6E', '#3A6B8C']}
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
            <ThemedText style={styles.streakText}>2</ThemedText>
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
            <ThemedText style={styles.loadingText}>Drawing your cards...</ThemedText>
          ) : (
            <View style={styles.cardStackContainer}>
              <Image 
                source={require('@/assets/images/partial-react-logo.png')} 
                style={styles.cardStackImage} 
                resizeMode="contain"
              />
            </View>
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
  },
  gradientBackground: {
    flex: 1,
    minHeight: height,
    paddingTop: 40,
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
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
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
    backgroundColor: '#0D9488',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
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
    fontSize: 48,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    opacity: 0.8,
  },
  subtitleText: {
    fontSize: 18,
    color: '#fff',
    marginTop: 10,
  },
  cardSection: {
    alignItems: 'center',
    marginTop: 20,
  },
  loadingText: {
    color: '#fff',
    fontSize: 16,
  },
  cardStackContainer: {
    width: 220,
    height: 330,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardStackImage: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
  },
  dateSection: {
    alignItems: 'center',
    marginTop: 20,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E5E5E5',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  dateText: {
    fontSize: 16,
    marginLeft: 5,
    color: '#000',
  },
  reflectionsContainer: {
    marginTop: 30,
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  reflectionsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  reflectionsTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  emptyReflections: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  emptyText: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 16,
  },
  // Keeping these styles for backward compatibility
  headerContent: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 60,
    paddingBottom: 20,
  },
  cardsContainer: {
    gap: 20,
    marginBottom: 20,
  },
  cardContainer: {
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
  },
  cardImageContainer: {
    height: 200,
    position: 'relative',
  },
  cardImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  cardOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  cardContent: {
    padding: 16,
    gap: 8,
  },
  meaningText: {
    marginBottom: 12,
  },
  forYouTitle: {
    marginTop: 8,
  },
  interpretationText: {
    fontStyle: 'italic',
  },
  loadingContainer: {
    padding: 20,
    alignItems: 'center',
  },
  infoContainer: {
    padding: 16,
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
});
