import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';

export default function VerifyEmailScreen() {
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const { user, resendVerificationEmail } = useAuth();

  const handleResendEmail = async () => {
    try {
      setError('');
      setMessage('');
      await resendVerificationEmail();
      setMessage('Verification email sent successfully!');
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleContinue = () => {
    if (user?.emailVerified) {
      router.replace('/(tabs)/daily-cards');
    } else {
      setError('Please verify your email before continuing');
    }
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.content}>
        <ThemedText style={styles.title}>Verify Your Email</ThemedText>
        
        <ThemedText style={styles.description}>
          We've sent a verification email to:
        </ThemedText>
        
        <ThemedText style={styles.email}>{user?.email}</ThemedText>
        
        <ThemedText style={styles.description}>
          Please check your email and click the verification link to continue.
        </ThemedText>

        {error ? <ThemedText style={styles.error}>{error}</ThemedText> : null}
        {message ? <ThemedText style={styles.message}>{message}</ThemedText> : null}

        <TouchableOpacity style={styles.button} onPress={handleResendEmail}>
          <ThemedText style={styles.buttonText}>Resend Email</ThemedText>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.button, styles.continueButton]} 
          onPress={handleContinue}
        >
          <ThemedText style={styles.buttonText}>Continue</ThemedText>
        </TouchableOpacity>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  content: {
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 15,
    color: Colors.light.tabIconDefault,
  },
  email: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
    textAlign: 'center',
  },
  error: {
    color: '#ff6b6b',
    marginBottom: 15,
    textAlign: 'center',
  },
  message: {
    color: '#51cf66',
    marginBottom: 15,
    textAlign: 'center',
  },
  button: {
    backgroundColor: Colors.light.tint,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
    marginTop: 10,
  },
  continueButton: {
    marginTop: 20,
    backgroundColor: Colors.light.tabIconSelected,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});