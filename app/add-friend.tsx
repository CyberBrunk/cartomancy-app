import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, Image, ScrollView, Platform } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { TextInput } from 'react-native';

export default function AddFriendScreen() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [birthday, setBirthday] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [image, setImage] = useState<string | null>(null);

  const handleSave = () => {
    // In a real app, we would save the friend to a database
    // For now, we'll just go back to the friends screen
    router.back();
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const onDateChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || birthday;
    setShowDatePicker(Platform.OS === 'ios');
    setBirthday(currentDate);
  };

  const onTimeChange = (event: any, selectedTime?: Date) => {
    const currentTime = selectedTime || birthday;
    setShowTimePicker(Platform.OS === 'ios');
    setBirthday(currentTime);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Add Friend',
          headerShadowVisible: false,
          headerStyle: { backgroundColor: '#f8f8f8' },
        }}
      />

      <ScrollView style={styles.container}>
        <ThemedView style={styles.formContainer}>
          <ThemedView style={styles.imageContainer}>
            <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
              {image ? (
                <Image source={{ uri: image }} style={styles.profileImage} />
              ) : (
                <>
                  <IconSymbol name="person.crop.circle.fill" size={60} color="#ccc" />
                  <ThemedText style={styles.addPhotoText}>Add Photo</ThemedText>
                </>
              )}
            </TouchableOpacity>
          </ThemedView>

          <ThemedView style={styles.inputGroup}>
            <ThemedText style={styles.label}>Name</ThemedText>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Enter friend's name"
              placeholderTextColor="#999"
            />
          </ThemedView>

          <ThemedView style={styles.inputGroup}>
            <ThemedText style={styles.label}>Description (Optional)</ThemedText>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={description}
              onChangeText={setDescription}
              placeholder="How do you know this person?"
              placeholderTextColor="#999"
              multiline
              numberOfLines={3}
            />
          </ThemedView>

          <ThemedView style={styles.inputGroup}>
            <ThemedText style={styles.label}>Birthday (Optional)</ThemedText>
            <TouchableOpacity
              style={styles.datePickerButton}
              onPress={() => setShowDatePicker(true)}
            >
              <ThemedText>{formatDate(birthday)}</ThemedText>
              <IconSymbol name="calendar" size={20} color="#6200EE" />
            </TouchableOpacity>

            {showDatePicker && (
              <DateTimePicker
                value={birthday}
                mode="date"
                display="default"
                onChange={onDateChange}
              />
            )}
          </ThemedView>

          <ThemedView style={styles.inputGroup}>
            <ThemedText style={styles.label}>Birth Time (Optional)</ThemedText>
            <TouchableOpacity
              style={styles.datePickerButton}
              onPress={() => setShowTimePicker(true)}
            >
              <ThemedText>{formatTime(birthday)}</ThemedText>
              <IconSymbol name="clock" size={20} color="#6200EE" />
            </TouchableOpacity>

            {showTimePicker && (
              <DateTimePicker
                value={birthday}
                mode="time"
                display="default"
                onChange={onTimeChange}
              />
            )}
          </ThemedView>

          <ThemedText style={styles.infoText}>
            Birth date and time help create more accurate card readings and compatibility insights.
          </ThemedText>
        </ThemedView>

        <ThemedView style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, !name ? styles.buttonDisabled : null]}
            onPress={handleSave}
            disabled={!name}
          >
            <ThemedText style={styles.buttonText}>Add Friend</ThemedText>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.secondaryButton]}
            onPress={() => router.back()}
          >
            <ThemedText style={styles.secondaryButtonText}>Cancel</ThemedText>
          </TouchableOpacity>
        </ThemedView>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  formContainer: {
    margin: 16,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  imagePicker: {
    alignItems: 'center',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  addPhotoText: {
    marginTop: 8,
    color: '#6200EE',
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  datePickerButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    padding: 12,
  },
  infoText: {
    color: '#666',
    fontSize: 14,
    marginTop: 8,
    fontStyle: 'italic',
  },
  buttonContainer: {
    margin: 16,
    marginTop: 8,
  },
  button: {
    backgroundColor: '#6200EE',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#6200EE',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  buttonDisabled: {
    backgroundColor: '#d1c4e9',
    shadowOpacity: 0,
  },
  secondaryButton: {
    backgroundColor: '#f0e6ff',
    shadowColor: '#6200EE',
    shadowOpacity: 0.1,
  },
  secondaryButtonText: {
    color: '#6200EE',
    fontWeight: '600',
    fontSize: 16,
  },
});
