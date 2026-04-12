import { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  SafeAreaView, KeyboardAvoidingView, Platform,
  Alert, ActivityIndicator, ScrollView,
} from 'react-native';
import { Link, router } from 'expo-router';
import { useAuth } from '../../context/AuthContext';

export default function RegisterScreen() {
  const { register } = useAuth();
  const [email, setEmail]     = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleRegister() {
    if (!email.trim() || !password || !confirm) {
      Alert.alert('Помилка', 'Заповніть усі поля.');
      return;
    }
    if (password !== confirm) {
      Alert.alert('Помилка', 'Паролі не збігаються.');
      return;
    }
    if (password.length < 6) {
      Alert.alert('Помилка', 'Пароль має містити не менше 6 символів.');
      return;
    }
    setLoading(true);
    try {
      await register(email.trim(), password);
      router.replace('/(app)/profile');
    } catch (e) {
      Alert.alert('Помилка реєстрації', friendlyError(e.code));
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={s.safe}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={s.scroll} keyboardShouldPersistTaps="handled">

          <View style={s.logoWrap}>
            <View style={s.logoCircle}><Text style={s.logoIcon}>🔐</Text></View>
            <Text style={s.appName}>SecureApp</Text>
            <Text style={s.tagline}>Створіть акаунт</Text>
          </View>

          <View style={s.card}>
            <Text style={s.cardTitle}>Реєстрація</Text>

            <Text style={s.label}>Email</Text>
            <TextInput
              style={s.input} placeholder="your@email.com" placeholderTextColor="#94A3B8"
              value={email} onChangeText={setEmail} keyboardType="email-address"
              autoCapitalize="none" autoCorrect={false}
            />

            <Text style={s.label}>Пароль</Text>
            <TextInput
              style={s.input} placeholder="Мінімум 6 символів" placeholderTextColor="#94A3B8"
              value={password} onChangeText={setPassword} secureTextEntry
            />

            <Text style={s.label}>Підтвердження паролю</Text>
            <TextInput
              style={[s.input, confirm && password !== confirm && { borderColor: '#DC2626' }]}
              placeholder="Повторіть пароль" placeholderTextColor="#94A3B8"
              value={confirm} onChangeText={setConfirm} secureTextEntry
            />
            {confirm !== '' && password !== confirm && (
              <Text style={s.errorText}>Паролі не збігаються</Text>
            )}

            <TouchableOpacity style={[s.btn, loading && { opacity: 0.7 }]} onPress={handleRegister} disabled={loading}>
              {loading ? <ActivityIndicator color="#fff" /> : <Text style={s.btnText}>Зареєструватися</Text>}
            </TouchableOpacity>

            <View style={s.linkRow}>
              <Text style={s.linkHint}>Вже є акаунт? </Text>
              <Link href="/(auth)/login" asChild>
                <TouchableOpacity><Text style={s.link}>Увійти</Text></TouchableOpacity>
              </Link>
            </View>
          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

function friendlyError(code) {
  return ({
    'auth/email-already-in-use': 'Цей email вже зареєстровано.',
    'auth/invalid-email':        'Невірний формат email.',
    'auth/weak-password':        'Пароль занадто слабкий.',
    'auth/network-request-failed': 'Помилка мережі.',
  })[code] ?? 'Сталася помилка. Спробуйте знову.';
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F1F5F9' },
  scroll: { padding: 20, paddingBottom: 40 },
  logoWrap: { alignItems: 'center', marginBottom: 28, marginTop: 16 },
  logoCircle: { width: 72, height: 72, borderRadius: 36, backgroundColor: '#2563EB', alignItems: 'center', justifyContent: 'center', marginBottom: 10 },
  logoIcon: { fontSize: 32 },
  appName: { fontSize: 24, fontWeight: '700', color: '#0F172A' },
  tagline: { fontSize: 13, color: '#64748B', marginTop: 4 },
  card: { backgroundColor: '#fff', borderRadius: 20, padding: 24, borderWidth: 0.5, borderColor: '#E2E8F0' },
  cardTitle: { fontSize: 20, fontWeight: '700', color: '#0F172A', marginBottom: 20 },
  label: { fontSize: 13, fontWeight: '600', color: '#374151', marginBottom: 6 },
  input: { borderWidth: 1.5, borderColor: '#E2E8F0', borderRadius: 12, padding: 13, fontSize: 14, color: '#0F172A', backgroundColor: '#F8FAFC', marginBottom: 14 },
  errorText: { fontSize: 12, color: '#DC2626', marginTop: -10, marginBottom: 10 },
  btn: { backgroundColor: '#2563EB', borderRadius: 12, padding: 15, alignItems: 'center', marginTop: 4 },
  btnText: { color: '#fff', fontSize: 15, fontWeight: '700' },
  linkRow: { flexDirection: 'row', justifyContent: 'center', marginTop: 18 },
  linkHint: { fontSize: 14, color: '#64748B' },
  link: { fontSize: 14, fontWeight: '700', color: '#2563EB' },
});
