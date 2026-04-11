
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { router } from 'expo-router';

export default function NotFoundScreen() {
  return (
    <SafeAreaView style={s.safe}>
      <View style={s.wrap}>
        <Text style={s.emoji}>🗺️</Text>
        <Text style={s.code}>404</Text>
        <Text style={s.title}>Екран не знайдено</Text>
        <Text style={s.sub}>Схоже, такої сторінки не існує або вона була переміщена.</Text>
        <TouchableOpacity style={s.btn} onPress={() => router.replace('/')}>
          <Text style={s.btnT}>🏠  На головну</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F1F5F9' },
  wrap: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 32 },
  emoji: { fontSize: 64, marginBottom: 12 },
  code: { fontSize: 72, fontWeight: '800', color: '#E2E8F0', lineHeight: 80 },
  title: { fontSize: 22, fontWeight: '700', color: '#0F172A', marginTop: 4 },
  sub: { fontSize: 14, color: '#64748B', textAlign: 'center', marginTop: 10, lineHeight: 21 },
  btn: { backgroundColor: '#2563EB', borderRadius: 14, paddingHorizontal: 28, paddingVertical: 14, marginTop: 28 },
  btnT: { color: '#fff', fontSize: 15, fontWeight: '700' },
});
