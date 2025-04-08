import { Redirect } from 'expo-router';
import React from 'react';

export default function Index() {
  // Redirect to the daily-cards tab when the app starts
  return <Redirect href="/(tabs)/daily-cards" />;
}
