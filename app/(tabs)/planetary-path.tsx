import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { format, addDays } from 'date-fns';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useColorScheme } from '@/hooks/useColorScheme';

// Planetary information
const PLANETS = [
  {
    name: 'Sun',
    day: 'Sunday',
    color: '#FFB900',
    theme: 'Identity & Purpose',
    challenge: 'Reflect on your life purpose and authentic self-expression.',
    symbol: 'sun.max.fill',
    image: require('@/assets/images/partial-react-logo.png'),
  },
  {
    name: 'Moon',
    day: 'Monday',
    color: '#C0C0C0',
    theme: 'Emotions & Intuition',
    challenge: 'Connect with your feelings and inner wisdom.',
    symbol: 'moon.fill',
    image: require('@/assets/images/partial-react-logo.png'),
  },
  {
    name: 'Mars',
    day: 'Tuesday',
    color: '#FF4500',
    theme: 'Action & Courage',
    challenge: 'Take bold action toward your goals.',
    symbol: 'flame.fill',
    image: require('@/assets/images/partial-react-logo.png'),
  },
  {
    name: 'Mercury',
    day: 'Wednesday',
    color: '#9370DB',
    theme: 'Communication & Learning',
    challenge: 'Express yourself clearly and absorb new knowledge.',
    symbol: 'message.fill',
    image: require('@/assets/images/partial-react-logo.png'),
  },
  {
    name: 'Jupiter',
    day: 'Thursday',
    color: '#4169E1',
    theme: 'Growth & Abundance',
    challenge: 'Expand your horizons and embrace opportunities.',
    symbol: 'star.fill',
    image: require('@/assets/images/partial-react-logo.png'),
  },
  {
    name: 'Venus',
    day: 'Friday',
    color: '#32CD32',
    theme: 'Love & Harmony',
    challenge: 'Nurture relationships and find beauty in your surroundings.',
    symbol: 'heart.fill',
    image: require('@/assets/images/partial-react-logo.png'),
  },
  {
    name: 'Saturn',
    day: 'Saturday',
    color: '#696969',
    theme: 'Structure & Discipline',
    challenge: 'Build foundations and establish healthy boundaries.',
    symbol: 'circle.grid.3x3.fill',
    image: require('@/assets/images/partial-react-logo.png'),
  },
];

// Get the current day's planet
const getTodayPlanet = () => {
  const dayOfWeek = format(new Date(), 'EEEE');
  return PLANETS.find(planet => planet.day === dayOfWeek) || PLANETS[0];
};

// Get the next 7 days with their corresponding planets
const getWeekPlanets = () => {
  const today = new Date();
  return Array.from({ length: 7 }, (_, i) => {
    const date = addDays(today, i);
    const dayOfWeek = format(date, 'EEEE');
    const planet = PLANETS.find(p => p.day === dayOfWeek) || PLANETS[0];
    return {
      date: format(date, 'yyyy-MM-dd'),
      displayDate: format(date, 'MMM d'),
      dayOfWeek,
      planet,
      isToday: i === 0,
    };
  });
};

// Type for progress tracking
type PlanetaryProgress = {
  [date: string]: {
    completed: boolean;
    notes: string;
  };
};

export default function PlanetaryPathScreen() {
  const [todayPlanet, setTodayPlanet] = useState(getTodayPlanet());
  const [weekPlanets, setWeekPlanets] = useState(getWeekPlanets());
  const [progress, setProgress] = useState<PlanetaryProgress>({});
  const [selectedDay, setSelectedDay] = useState<string>(format(new Date(), 'yyyy-MM-dd'));
  const colorScheme = useColorScheme();
  
  // Load progress data on component mount
  useEffect(() => {
    const loadProgress = async () => {
      try {
        const storedProgress = await AsyncStorage.getItem('planetaryProgress');
        if (storedProgress) {
          setProgress(JSON.parse(storedProgress));
        }
      } catch (error) {
        console.error('Error loading planetary progress:', error);
      }
    };
    
    loadProgress();
  }, []);
  
  // Save progress to AsyncStorage whenever it changes
  useEffect(() => {
    const saveProgress = async () => {
      try {
        await AsyncStorage.setItem('planetaryProgress', JSON.stringify(progress));
      } catch (error) {
        console.error('Error saving planetary progress:', error);
      }
    };
    
    if (Object.keys(progress).length > 0) {
      saveProgress();
    }
  }, [progress]);
  
  const handleToggleComplete = (date: string) => {
    setProgress(prev => {
      const dateProgress = prev[date] || { completed: false, notes: '' };
      return {
        ...prev,
        [date]: {
          ...dateProgress,
          completed: !dateProgress.completed,
        },
      };
    });
  };
  
  const handleDaySelect = (date: string) => {
    setSelectedDay(date);
  };
  
  const renderDayItem = ({ item }: { item: any }) => {
    const isSelected = item.date === selectedDay;
    const isCompleted = progress[item.date]?.completed;
    
    return (
      <TouchableOpacity 
        style={[
          styles.dayItem,
          isSelected && styles.selectedDayItem,
          { borderColor: item.planet.color }
        ]}
        onPress={() => handleDaySelect(item.date)}
        activeOpacity={0.7}
      >
        <ThemedText style={styles.dayOfWeek}>{item.dayOfWeek.substring(0, 3)}</ThemedText>
        <ThemedText style={styles.dayDate}>{item.displayDate}</ThemedText>
        <IconSymbol size={24} name={item.planet.symbol} color={item.planet.color} />
        {isCompleted && (
          <ThemedView style={styles.completedBadge}>
            <IconSymbol size={12} name="checkmark" color="#fff" />
          </ThemedView>
        )}
      </TouchableOpacity>
    );
  };
  
  // Get the selected day's planet
  const selectedPlanet = weekPlanets.find(day => day.date === selectedDay)?.planet || todayPlanet;
  const isSelectedToday = selectedDay === format(new Date(), 'yyyy-MM-dd');
  const selectedDayProgress = progress[selectedDay] || { completed: false, notes: '' };
  
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#FFE0B2', dark: '#E65100' }}
      headerImage={
        <ThemedView style={styles.headerContent}>
          <ThemedText type="title">Planetary Path</ThemedText>
          <ThemedText>Your cosmic journey</ThemedText>
        </ThemedView>
      }>
      
      <FlatList
        data={weekPlanets}
        renderItem={renderDayItem}
        keyExtractor={item => item.date}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.daysContainer}
      />
      
      <ThemedView style={[styles.planetCard, { borderColor: selectedPlanet.color }]}>
        <ThemedView style={styles.planetHeader}>
          <ThemedView>
            <ThemedText type="title">{selectedPlanet.name}</ThemedText>
            <ThemedText>{isSelectedToday ? 'Today' : selectedPlanet.day}</ThemedText>
          </ThemedView>
          
          <Image source={selectedPlanet.image} style={styles.planetImage} />
        </ThemedView>
        
        <ThemedView style={styles.planetContent}>
          <ThemedText type="subtitle">Theme: {selectedPlanet.theme}</ThemedText>
          <ThemedText style={styles.challengeText}>{selectedPlanet.challenge}</ThemedText>
          
          <TouchableOpacity
            style={[
              styles.completeButton,
              selectedDayProgress.completed && styles.completedButton
            ]}
            onPress={() => handleToggleComplete(selectedDay)}
            activeOpacity={0.7}
          >
            <IconSymbol 
              size={20} 
              name={selectedDayProgress.completed ? "checkmark.circle.fill" : "circle"} 
              color={selectedDayProgress.completed ? "#fff" : "#666"} 
            />
            <ThemedText style={selectedDayProgress.completed ? styles.completedButtonText : styles.completeButtonText}>
              {selectedDayProgress.completed ? "Completed" : "Mark as Complete"}
            </ThemedText>
          </TouchableOpacity>
        </ThemedView>
      </ThemedView>
      
      <ThemedView style={styles.weeklyProgressContainer}>
        <ThemedText type="subtitle">Weekly Progress</ThemedText>
        <ThemedView style={styles.progressBar}>
          {weekPlanets.map((day, index) => {
            const isCompleted = progress[day.date]?.completed;
            return (
              <ThemedView 
                key={day.date}
                style={[
                  styles.progressSegment,
                  { backgroundColor: isCompleted ? day.planet.color : '#e0e0e0' }
                ]}
              />
            );
          })}
        </ThemedView>
        <ThemedText style={styles.progressText}>
          {Object.values(progress).filter(p => p.completed).length} of 7 days completed
        </ThemedText>
      </ThemedView>
      
      <ThemedView style={styles.infoContainer}>
        <ThemedText type="subtitle">About Planetary Path</ThemedText>
        <ThemedText>
          Each day of the week is ruled by a different planet, bringing unique energies and themes.
          Follow the daily challenges to create balance and growth in your spiritual journey.
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerContent: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 60,
    paddingBottom: 20,
  },
  daysContainer: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  dayItem: {
    width: 80,
    height: 100,
    borderRadius: 12,
    borderWidth: 2,
    padding: 8,
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  selectedDayItem: {
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  dayOfWeek: {
    fontSize: 12,
    fontWeight: '600',
  },
  dayDate: {
    fontSize: 14,
  },
  completedBadge: {
    position: 'absolute',
    top: -8,
    right: -8,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#4CAF50',
    alignItems: 'center',
    justifyContent: 'center',
  },
  planetCard: {
    marginHorizontal: 16,
    borderRadius: 16,
    borderWidth: 2,
    overflow: 'hidden',
    marginBottom: 24,
  },
  planetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  planetImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  planetContent: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  challengeText: {
    marginTop: 8,
    marginBottom: 16,
  },
  completeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
    paddingVertical: 10,
    borderRadius: 20,
    marginTop: 8,
  },
  completedButton: {
    backgroundColor: '#4CAF50',
  },
  completeButtonText: {
    marginLeft: 8,
    color: '#666',
  },
  completedButtonText: {
    marginLeft: 8,
    color: '#fff',
  },
  weeklyProgressContainer: {
    marginHorizontal: 16,
    marginBottom: 24,
  },
  progressBar: {
    flexDirection: 'row',
    height: 8,
    borderRadius: 4,
    marginTop: 12,
    marginBottom: 8,
    overflow: 'hidden',
  },
  progressSegment: {
    flex: 1,
    marginHorizontal: 1,
  },
  progressText: {
    textAlign: 'center',
    fontSize: 12,
    color: '#666',
  },
  infoContainer: {
    padding: 16,
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
});
