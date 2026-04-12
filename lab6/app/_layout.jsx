
import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';
import { AuthProvider } from '../context/AuthContext';

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={s.root}>
      <AuthProvider>
        <Stack screenOptions={{ headerShown: false }} />
      </AuthProvider>
    </GestureHandlerRootView>
  );
}

const s = StyleSheet.create({ root: { flex: 1 } });
