import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { format } from 'date-fns';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SCREEN_WIDTH = Dimensions.get('window').width;

export default function HomeScreen() {
  const [cards, setCards] = useState([]);
  const [reflections, setReflections] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const storedReflections = await AsyncStorage.getItem('reflections');
      if (storedReflections) {
        setReflections(JSON.parse(storedReflections).slice(0, 3));
      }
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.moonPhase}>🌒 Moon in Gemini</Text>
          <View style={styles.dayCounter}>
            <Text style={styles.dayNumber}>2</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.profileButton}>
          <Image
            source={{ uri: 'https://i.pravatar.cc/100' }}
            style={styles.profileImage}
          />
        </TouchableOpacity>
      </View>

      {/* Good Morning Section */}
      <Text style={styles.greeting}>Good Morning</Text>
      <Text style={styles.subtitle}>Here's today's cards</Text>

      {/* Cards Section */}
      <View style={styles.cardsContainer}>
        <Image
          source={require('../assets/card-back.png')}
          style={styles.cardImage}
        />
      </View>

      {/* Date Section */}
      <View style={styles.dateContainer}>
        <Ionicons name="calendar-outline" size={20} color="#666" />
        <Text style={styles.dateText}>{format(new Date(), 'MMMM d')}</Text>
      </View>

      {/* Recent Reflections Section */}
      <View style={styles.reflectionsSection}>
        <Text style={styles.sectionTitle}>Recent Reflections</Text>
        <TouchableOpacity style={styles.settingsButton}>
          <Ionicons name="settings-outline" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Reflection Cards */}
      {reflections.map((reflection, index) => (
        <View key={index} style={styles.reflectionCard}>
          <View style={styles.reflectionHeader}>
            <View style={styles.userInfo}>
              <Image
                source={{ uri: 'https://i.pravatar.cc/100' }}
                style={styles.userAvatar}
              />
              <Text style={styles.userName}>Sam Guy</Text>
              <Text style={styles.userHandle}>@samguy</Text>
            </View>
            <TouchableOpacity>
              <Ionicons name="ellipsis-horizontal" size={20} color="#666" />
            </TouchableOpacity>
          </View>
          <Text style={styles.reflectionText}>{reflection.content}</Text>
          <View style={styles.reflectionActions}>
            <TouchableOpacity style={styles.actionButton}>
              <Ionicons name="heart-outline" size={20} color="#666" />
              <Text style={styles.actionText}>110</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Ionicons name="chatbubble-outline" size={20} color="#666" />
              <Text style={styles.actionText}>32</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 40,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  moonPhase: {
    fontSize: 16,
    marginRight: 10,
  },
  dayCounter: {
    backgroundColor: '#6366f1',
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayNumber: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  profileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  greeting: {
    fontSize: 32,
    fontWeight: 'bold',
    marginHorizontal: 20,
    marginTop: 20,
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    marginHorizontal: 20,
    marginTop: 5,
  },
  cardsContainer: {
    alignItems: 'center',
    marginVertical: 30,
  },
  cardImage: {
    width: SCREEN_WIDTH * 0.6,
    height: SCREEN_WIDTH * 0.9,
    resizeMode: 'contain',
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 20,
  },
  dateText: {
    fontSize: 16,
    marginLeft: 5,
    color: '#666',
  },
  reflectionsSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  settingsButton: {
    padding: 5,
  },
  reflectionCard: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 15,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  reflectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userAvatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
  },
  userName: {
    fontWeight: 'bold',
    marginRight: 5,
  },
  userHandle: {
    color: '#666',
  },
  reflectionText: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 10,
  },
  reflectionActions: {
    flexDirection: 'row',
    marginTop: 10,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  actionText: {
    marginLeft: 5,
    color: '#666',
  },
});
