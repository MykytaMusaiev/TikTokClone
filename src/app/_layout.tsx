import { DarkTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';

export default function RootLayout() {
  const [error, setError] = useState<string | null>(null);
  const [queryClient] = useState(() => new QueryClient());

  const myTheme = {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      primary: 'white',
    },
  };

  useEffect(() => {
    // Check environment variables at startup
    if (
      !process.env.EXPO_PUBLIC_SUPABASE_URL ||
      !process.env.EXPO_PUBLIC_SUPABASE_KEY
    ) {
      const missing = [];
      if (!process.env.EXPO_PUBLIC_SUPABASE_URL)
        missing.push('EXPO_PUBLIC_SUPABASE_URL');
      if (!process.env.EXPO_PUBLIC_SUPABASE_KEY)
        missing.push('EXPO_PUBLIC_SUPABASE_KEY');
      setError(`Missing env: ${missing.join(', ')}`);
    }
  }, []);

  if (error) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          padding: 20,
          backgroundColor: '#000',
        }}
      >
        <Text
          style={{ color: '#fff', fontSize: 16, textAlign: 'center' }}
        >
          ⚠️ Configuration Error{'\n\n'}
          {error}
          {'\n\n'}
          Please check your .env file and rebuild.
        </Text>
      </View>
    );
  }

  return (
    <ThemeProvider value={myTheme}>
      <QueryClientProvider client={queryClient}>
        <Stack screenOptions={{ headerShown: false }} />
      </QueryClientProvider>
    </ThemeProvider>
  );
}
