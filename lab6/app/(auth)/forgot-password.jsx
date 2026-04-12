import { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  SafeAreaView, KeyboardAvoidingView, Platform, Alert, ActivityIndicator,
} from 'react-native';
import { router } from 'expo-router';
import { useAuth } from '../../context/AuthContext';

export default function ForgotPasswordScreen() {
  const { resetPassword } = useAuth();
  const [email, setEmail]   = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent]     = useState(false);

  async function handleReset() {
    if (!email.trim()) { Alert.alert('Помилка', 'Введіть email.'); return; }
    setLoading(true);
    try {
      await resetPassword(email.trim());
      setSent(true);
    } catch (e) {
      Alert.alert('Помилка', ({
        'auth/user-not-found': 'Користувача з таким email не знайдено.',
        'auth/invalid-email':  'Невірний формат email.',
      })[e.code] ?? 'Сталася помилка.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={s.safe}>
      <KeyboardAvoidingView style={s.kav} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>

        <TouchableOpacity style={s.backBtn} onPress={() => router.back()}>
          <Text style={s.backT}>← Назад</Text>
        </TouchableOpacity>

        <View style={s.iconWrap}><Text style={{ fontSize: 56 }}>📧</Text></View>

        {sent ? (
          <View style={s.card}>
            <Text style={s.successTitle}>Лист надіслано!</Text>
            <Text style={s.successDesc}>
              Перевірте пошту {email} та перейдіть за посиланням для скидання паролю.
            </Text>
            <TouchableOpacity style={s.btn} onPress={() => router.replace('/(auth)/login')}>
              <Text style={s.btnText}>Повернутися до входу</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={s.card}>
            <Text style={s.cardTitle}>Відновлення паролю</Text>
            <Text style={s.desc}>
              Введіть email вашого акаунту. Ми надішлемо посилання для скидання паролю.
            </Text>
            <Text style={s.label}>Email</Text>
            <TextInput
              style={s.input} placeholder="your@email.com" placeholderTextColor="#94A3B8"
              value={email} onChangeText={setEmail} keyboardType="email-address"
              autoCapitalize="none" autoFocus
            />
            <TouchableOpacity style={[s.btn, loading && { opacity: 0.7 }]} onPress={handleReset} disabled={loading}>
              {loading ? <ActivityIndicator color="#fff" /> : <Text style={s.btnText}>Надіслати лист</Text>}
            </TouchableOpacity>
          </View>
        )}

      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F1F5F9' },
  kav: { flex: 1, padding: 20, justifyContent: 'center' },
  backBtn: { position: 'absolute', top: 20, left: 20 },
  backT: { fontSize: 15, color: '#2563EB', fontWeight: '600' },
  iconWrap: { alignItems: 'center', marginBottom: 24 },
  card: { backgroundColor: '#fff', borderRadius: 20, padding: 24, borderWidth: 0.5, borderColor: '#E2E8F0' },
  cardTitle: { fontSize: 20, fontWeight: '700', color: '#0F172A', marginBottom: 10 },
  desc: { fontSize: 14, color: '#64748B', lineHeight: 21, marginBottom: 20 },
  label: { fontSize: 13, fontWeight: '600', color: '#374151', marginBottom: 6 },
  input: { borderWidth: 1.5, borderColor: '#E2E8F0', borderRadius: 12, padding: 13, fontSize: 14, color: '#0F172A', backgroundColor: '#F8FAFC', marginBottom: 14 },
  btn: { backgroundColor: '#2563EB', borderRadius: 12, padding: 15, alignItems: 'center' },
  btnText: { color: '#fff', fontSize: 15, fontWeight: '700' },
  successTitle: { fontSize: 20, fontWeight: '700', color: '#16A34A', marginBottom: 10 },
  successDesc: { fontSize: 14, color: '#64748B', lineHeight: 21, marginBottom: 20 },
});
