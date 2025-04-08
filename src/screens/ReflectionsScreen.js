import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { format } from 'date-fns';
import { Ionicons } from '@expo/vector-icons';

export default function ReflectionsScreen() {
  const [reflections, setReflections] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newReflection, setNewReflection] = useState('');

  useEffect(() => {
    loadReflections();
  }, []);

  const loadReflections = async () => {
    try {
      const stored = await AsyncStorage.getItem('reflections');
      if (stored) {
        setReflections(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Error loading reflections:', error);
    }
  };

  const addReflection = async () => {
    if (newReflection.trim()) {
      const reflection = {
        id: Date.now().toString(),
        content: newReflection.trim(),
        date: new Date().toISOString(),
      };

      const updatedReflections = [reflection, ...reflections];
      try {
        await AsyncStorage.setItem('reflections', JSON.stringify(updatedReflections));
        setReflections(updatedReflections);
        setNewReflection('');
        setModalVisible(false);
      } catch (error) {
        console.error('Error saving reflection:', error);
      }
    }
  };

  const deleteReflection = async (id) => {
    const updatedReflections = reflections.filter(r => r.id !== id);
    try {
      await AsyncStorage.setItem('reflections', JSON.stringify(updatedReflections));
      setReflections(updatedReflections);
    } catch (error) {
      console.error('Error deleting reflection:', error);
    }
  };

  const renderReflection = ({ item }) => (
    <View style={styles.reflectionItem}>
      <View style={styles.reflectionHeader}>
        <Text style={styles.date}>{format(new Date(item.date), 'MMMM d, yyyy')}</Text>
        <TouchableOpacity onPress={() => deleteReflection(item.id)}>
          <Ionicons name="trash-outline" size={20} color="#ff4444" />
        </TouchableOpacity>
      </View>
      <Text style={styles.content}>{item.content}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.addButton}
        onPress={() => setModalVisible(true)}
      >
        <Ionicons name="add" size={24} color="#fff" />
        <Text style={styles.addButtonText}>New Reflection</Text>
      </TouchableOpacity>

      <FlatList
        data={reflections}
        renderItem={renderReflection}
        keyExtractor={item => item.id}
        style={styles.list}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No reflections yet</Text>
        }
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>New Reflection</Text>
            <TextInput
              style={styles.input}
              value={newReflection}
              onChangeText={setNewReflection}
              placeholder="Write your reflection..."
              multiline
              numberOfLines={4}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.modalButton, styles.saveButton]}
                onPress={addReflection}
              >
                <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#6366f1',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 10,
  },
  list: {
    flex: 1,
  },
  reflectionItem: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  reflectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  date: {
    color: '#666',
    fontSize: 14,
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
  },
  emptyText: {
    textAlign: 'center',
    color: '#999',
    marginTop: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    margin: 20,
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    height: 120,
    textAlignVertical: 'top',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 15,
  },
  modalButton: {
    padding: 10,
    borderRadius: 8,
    marginLeft: 10,
    minWidth: 80,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#999',
  },
  saveButton: {
    backgroundColor: '#6366f1',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
