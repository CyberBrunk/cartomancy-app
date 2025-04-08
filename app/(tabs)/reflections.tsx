import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, FlatList, TextInput, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { format } from 'date-fns';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useColorScheme } from '@/hooks/useColorScheme';

// Type definition for a journal entry
type JournalEntry = {
  id: string;
  date: string;
  content: string;
  cards: string[];
  timestamp: number;
};

export default function ReflectionsScreen() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [newEntry, setNewEntry] = useState('');
  const [isAddingEntry, setIsAddingEntry] = useState(false);
  const [editingEntry, setEditingEntry] = useState<JournalEntry | null>(null);
  const [dailyCards, setDailyCards] = useState<string[]>([]);
  const colorScheme = useColorScheme();
  
  // Load journal entries and daily cards on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        // Load journal entries
        const storedEntries = await AsyncStorage.getItem('journalEntries');
        if (storedEntries) {
          setEntries(JSON.parse(storedEntries));
        }
        
        // Load daily cards
        const storedCards = await AsyncStorage.getItem('dailyCards');
        if (storedCards) {
          const { cards } = JSON.parse(storedCards);
          if (cards && cards.length > 0) {
            setDailyCards(cards.map((card: any) => card.name));
          }
        }
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };
    
    loadData();
  }, []);
  
  // Save entries to AsyncStorage whenever they change
  useEffect(() => {
    const saveEntries = async () => {
      try {
        await AsyncStorage.setItem('journalEntries', JSON.stringify(entries));
      } catch (error) {
        console.error('Error saving entries:', error);
      }
    };
    
    if (entries.length > 0) {
      saveEntries();
    }
  }, [entries]);
  
  const handleAddEntry = () => {
    setIsAddingEntry(true);
    setNewEntry('');
  };
  
  const handleSaveEntry = () => {
    if (newEntry.trim() === '') {
      Alert.alert('Empty Entry', 'Please write something in your reflection.');
      return;
    }
    
    if (editingEntry) {
      // Update existing entry
      const updatedEntries = entries.map(entry => 
        entry.id === editingEntry.id 
          ? { ...entry, content: newEntry, timestamp: Date.now() }
          : entry
      );
      setEntries(updatedEntries);
      setEditingEntry(null);
    } else {
      // Add new entry
      const newJournalEntry: JournalEntry = {
        id: Date.now().toString(),
        date: format(new Date(), 'yyyy-MM-dd'),
        content: newEntry,
        cards: dailyCards,
        timestamp: Date.now()
      };
      
      setEntries([newJournalEntry, ...entries]);
    }
    
    setNewEntry('');
    setIsAddingEntry(false);
  };
  
  const handleCancelEntry = () => {
    setNewEntry('');
    setIsAddingEntry(false);
    setEditingEntry(null);
  };
  
  const handleEditEntry = (entry: JournalEntry) => {
    setEditingEntry(entry);
    setNewEntry(entry.content);
    setIsAddingEntry(true);
  };
  
  const handleDeleteEntry = (entryId: string) => {
    Alert.alert(
      'Delete Entry',
      'Are you sure you want to delete this reflection?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: () => {
            const updatedEntries = entries.filter(entry => entry.id !== entryId);
            setEntries(updatedEntries);
          }
        }
      ]
    );
  };
  
  const renderEntryItem = ({ item }: { item: JournalEntry }) => (
    <ThemedView style={styles.entryItem}>
      <ThemedView style={styles.entryHeader}>
        <ThemedText type="subtitle">{format(new Date(item.date), 'MMMM d, yyyy')}</ThemedText>
        <ThemedView style={styles.entryActions}>
          <TouchableOpacity 
            onPress={() => handleEditEntry(item)}
            style={styles.actionButton}
          >
            <IconSymbol size={20} name="pencil" color="#666" />
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => handleDeleteEntry(item.id)}
            style={styles.actionButton}
          >
            <IconSymbol size={20} name="trash" color="#666" />
          </TouchableOpacity>
        </ThemedView>
      </ThemedView>
      
      <ThemedText style={styles.entryContent}>{item.content}</ThemedText>
      
      {item.cards && item.cards.length > 0 && (
        <ThemedView style={styles.cardTags}>
          {item.cards.map((card, index) => (
            <ThemedView key={index} style={styles.cardTag}>
              <ThemedText style={styles.cardTagText}>{card}</ThemedText>
            </ThemedView>
          ))}
        </ThemedView>
      )}
    </ThemedView>
  );
  
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#BBDEFB', dark: '#0D47A1' }}
      headerImage={
        <ThemedView style={styles.headerContent}>
          <ThemedText type="title">Reflections</ThemedText>
          <ThemedText>Your personal journal</ThemedText>
        </ThemedView>
      }>
      
      {!isAddingEntry ? (
        <TouchableOpacity 
          style={styles.addButton}
          onPress={handleAddEntry}
          activeOpacity={0.7}
        >
          <IconSymbol size={20} name="plus" color="#fff" />
          <ThemedText style={styles.addButtonText}>New Reflection</ThemedText>
        </TouchableOpacity>
      ) : (
        <ThemedView style={styles.entryForm}>
          <ThemedText type="subtitle">
            {editingEntry ? 'Edit Reflection' : 'New Reflection'}
          </ThemedText>
          
          <TextInput
            style={styles.textInput}
            multiline
            placeholder="Write your thoughts here..."
            placeholderTextColor="#999"
            value={newEntry}
            onChangeText={setNewEntry}
            autoFocus
          />
          
          {dailyCards.length > 0 && !editingEntry && (
            <ThemedView style={styles.cardTags}>
              <ThemedText type="defaultSemiBold">Today's Cards:</ThemedText>
              {dailyCards.map((card, index) => (
                <ThemedView key={index} style={styles.cardTag}>
                  <ThemedText style={styles.cardTagText}>{card}</ThemedText>
                </ThemedView>
              ))}
            </ThemedView>
          )}
          
          <ThemedView style={styles.formButtons}>
            <TouchableOpacity 
              style={[styles.formButton, styles.cancelButton]}
              onPress={handleCancelEntry}
            >
              <ThemedText style={styles.cancelButtonText}>Cancel</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.formButton, styles.saveButton]}
              onPress={handleSaveEntry}
            >
              <ThemedText style={styles.saveButtonText}>Save</ThemedText>
            </TouchableOpacity>
          </ThemedView>
        </ThemedView>
      )}
      
      <ThemedView style={styles.entriesContainer}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>Your Reflections</ThemedText>
        
        {entries.length === 0 ? (
          <ThemedView style={styles.emptyState}>
            <ThemedText>You haven't added any reflections yet.</ThemedText>
            <ThemedText>Tap "New Reflection" to start journaling.</ThemedText>
          </ThemedView>
        ) : (
          <FlatList
            data={entries}
            renderItem={renderEntryItem}
            keyExtractor={item => item.id}
            scrollEnabled={false}
            ItemSeparatorComponent={() => <ThemedView style={styles.separator} />}
          />
        )}
      </ThemedView>
      
      <ThemedView style={styles.infoContainer}>
        <ThemedText type="subtitle">About Reflections</ThemedText>
        <ThemedText>
          Your reflections are private and stored on your device. Each entry is automatically
          tagged with the date and your daily cards to help you track patterns and insights.
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
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2196F3',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    alignSelf: 'center',
    marginVertical: 16,
  },
  addButtonText: {
    color: '#fff',
    marginLeft: 8,
    fontWeight: '600',
  },
  entriesContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    marginBottom: 12,
  },
  entryItem: {
    padding: 16,
  },
  entryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  entryActions: {
    flexDirection: 'row',
  },
  actionButton: {
    padding: 4,
    marginLeft: 8,
  },
  entryContent: {
    marginBottom: 12,
  },
  cardTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  cardTag: {
    backgroundColor: 'rgba(33, 150, 243, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
    marginBottom: 8,
  },
  cardTagText: {
    fontSize: 12,
  },
  separator: {
    height: 1,
    backgroundColor: '#e0e0e0',
  },
  emptyState: {
    padding: 20,
    alignItems: 'center',
  },
  infoContainer: {
    padding: 16,
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  entryForm: {
    padding: 16,
    marginBottom: 16,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    padding: 12,
    marginTop: 12,
    marginBottom: 16,
    minHeight: 120,
    textAlignVertical: 'top',
  },
  formButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  formButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
    marginLeft: 8,
  },
  cancelButton: {
    backgroundColor: '#f5f5f5',
  },
  cancelButtonText: {
    color: '#666',
  },
  saveButton: {
    backgroundColor: '#2196F3',
  },
  saveButtonText: {
    color: '#fff',
  },
});
