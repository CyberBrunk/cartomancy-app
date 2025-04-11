import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { Link, router } from 'expo-router';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useAuth } from '@/contexts/AuthContext';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';

export default function RegisterScreen() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    birthDate: new Date(),
    birthTime: new Date(),
    birthLocation: '',
  });
  const [error, setError] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  
  const { signUp } = useAuth();

  const handleRegister = async () => {
    try {
      setError('');
      
      if (formData.password !== formData.confirmPassword) {
        throw new Error('Passwords do not match');
      }

      await signUp({
        email: formData.email,
        password: formData.password,
        fullName: formData.fullName,
        birthDate: formData.birthDate.toISOString(),
        birthTime: formData.birthTime.toISOString(),
        birthLocation: formData.birthLocation,
      });

      router.replace('/(auth)/verify-email');
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setFormData(prev => ({ ...prev, birthDate: selectedDate }));
    }
  };

  const handleTimeChange = (event: any, selectedTime?: Date) => {
    setShowTimePicker(false);
    if (selectedTime) {
      setFormData(prev => ({ ...prev, birthTime: selectedTime }));
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <ThemedText style={styles.title}>Create Account</ThemedText>
          <ThemedText style={styles.subtitle}>
            Begin your mystical journey with us
          </ThemedText>
        </View>

        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Full Name"
            placeholderTextColor={Colors.light.tabIconDefault}
            value={formData.fullName}
            onChangeText={(text) => setFormData(prev => ({ ...prev, fullName: text }))}
          />

          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor={Colors.light.tabIconDefault}
            value={formData.email}
            onChangeText={(text) => setFormData(prev => ({ ...prev, email: text }))}
            autoCapitalize="none"
            keyboardType="email-address"
          />

          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor={Colors.light.tabIconDefault}
            value={formData.password}
            onChangeText={(text) => setFormData(prev => ({ ...prev, password: text }))}
            secureTextEntry
          />

          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            placeholderTextColor={Colors.light.tabIconDefault}
            value={formData.confirmPassword}
            onChangeText={(text) => setFormData(prev => ({ ...prev, confirmPassword: text }))}
            secureTextEntry
          />

          <TouchableOpacity
            style={styles.input}
            onPress={() => setShowDatePicker(true)}>
            <ThemedText>
              Birth Date: {formData.birthDate.toLocaleDateString()}
            </ThemedText>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.input}
            onPress={() => setShowTimePicker(true)}>
            <ThemedText>
              Birth Time: {formData.birthTime.toLocaleTimeString()}
            </ThemedText>
          </TouchableOpacity>

          <TextInput
            style={styles.input}
            placeholder="Birth Location (optional)"
            placeholderTextColor={Colors.light.tabIconDefault}
            value={formData.birthLocation}
            onChangeText={(text) => setFormData(prev => ({ ...prev, birthLocation: text }))}
          />

          {error ? <ThemedText style={styles.error}>{error}</ThemedText> : null}

          <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <ThemedText style={styles.buttonText}>Sign Up</ThemedText>
          </TouchableOpacity>

          <View style={styles.footer}>
            <ThemedText>Already have an account? </ThemedText>
            <Link href="/(auth)/login" asChild>
              <TouchableOpacity>
                <ThemedText style={styles.link}>Sign In</ThemedText>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
      </ScrollView>

      {showDatePicker && (
        <DateTimePicker
          value={formData.birthDate}
          mode="date"
          onChange={handleDateChange}
        />
      )}

      {showTimePicker && (
        <DateTimePicker
          value={formData.birthTime}
          mode="time"
          onChange={handleTimeChange}
        />
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginVertical: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: Colors.light.tabIconDefault,
  },
  form: {
    width: '100%',
  },
  input: {
    backgroundColor: Colors.light.background,
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: Colors.light.tabIconDefault,
  },
  button: {
    backgroundColor: Colors.light.tint,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  error: {
    color: '#ff6b6b',
    marginBottom: 10,
    textAlign: 'center',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  link: {
    color: Colors.light.tint,
    fontWeight: 'bold',
  },
});