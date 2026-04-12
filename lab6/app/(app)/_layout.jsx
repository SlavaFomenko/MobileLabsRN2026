import { Redirect, Stack } from 'expo-router';
import { View, ActivityIndicator } from 'react-native';
import { useAuth } from '../../context/AuthContext';

export default function AppLayout() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#F1F5F9' }}>
        <ActivityIndicator size="large" color="#2563EB" />
      </View>
    );
  }

  if (!isAuthenticated) {
    return <Redirect href="/(auth)/login" />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="profile" />
    </Stack>
  );
}
