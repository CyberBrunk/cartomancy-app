import { Stack } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';
import { useEffect } from 'react';
import { router } from 'expo-router';

export default function AuthLayout() {
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading) {
      // If user is authenticated and email is verified, redirect to main app
      if (user?.emailVerified) {
        router.replace('/(tabs)/daily-cards');
      }
    }
  }, [user, loading]);

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'fade',
      }}>
      <Stack.Screen name="login" />
      <Stack.Screen name="register" />
      <Stack.Screen 
        name="verify-email" 
        options={{
          gestureEnabled: false,
        }}
      />
    </Stack>
  );
}