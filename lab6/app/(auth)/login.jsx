import { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  SafeAreaView, KeyboardAvoidingView, Platform,
  Alert, ActivityIndicator,
} from 'react-native';
import { Link, router } from 'expo-router';
import { useAuth } from '../../context/AuthContext';

export default function LoginScreen() {
  const { login } = useAuth();
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading]   = useState(false);

  async function handleLogin() {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Помилка', 'Заповніть усі поля.');
      return;
    }
    setLoading(true);
    try {
      await login(email.trim(), password);
      router.replace('/(app)/profile');
    } catch (e) {
      Alert.alert('Помилка входу', friendlyError(e.code));
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={s.safe}>
      <KeyboardAvoidingView style={s.kav} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>

        <View style={s.logoWrap}>
          <View style={s.logoCircle}><Text style={s.logoIcon}>🔐</Text></View>
          <Text style={s.appName}>SecureApp</Text>
          <Text style={s.tagline}>Увійдіть до свого акаунту</Text>
        </View>

        <View style={s.card}>
          <Text style={s.cardTitle}>Вхід</Text>

          <Text style={s.label}>Email</Text>
          <TextInput
            style={s.input} placeholder="your@email.com" placeholderTextColor="#94A3B8"
            value={email} onChangeText={setEmail} keyboardType="email-address"
            autoCapitalize="none" autoCorrect={false}
          />

          <Text style={s.label}>Пароль</Text>
          <TextInput
            style={s.input} placeholder="••••••••" placeholderTextColor="#94A3B8"
            value={password} onChangeText={setPassword} secureTextEntry
          />

          <Link href="/(auth)/forgot-password" asChild>
            <TouchableOpacity style={s.forgotWrap}>
              <Text style={s.forgot}>Забули пароль?</Text>
            </TouchableOpacity>
          </Link>

          <TouchableOpacity style={[s.btn, loading && { opacity: 0.7 }]} onPress={handleLogin} disabled={loading}>
            {loading ? <ActivityIndicator color="#fff" /> : <Text style={s.btnText}>Увійти</Text>}
          </TouchableOpacity>

          <View style={s.linkRow}>
            <Text style={s.linkHint}>Немає акаунту? </Text>
            <Link href="/(auth)/register" asChild>
              <TouchableOpacity><Text style={s.link}>Зареєструватися</Text></TouchableOpacity>
            </Link>
          </View>
        </View>

      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

function friendlyError(code) {
  return ({
    'auth/invalid-email':        'Невірний формат email.',
    'auth/user-not-found':       'Користувача не знайдено.',
    'auth/wrong-password':       'Невірний пароль.',
    'auth/invalid-credential':   'Невірний email або пароль.',
    'auth/too-many-requests':    'Забагато спроб. Спробуйте пізніше.',
    'auth/network-request-failed': 'Помилка мережі.',
  })[code] ?? 'Сталася помилка. Спробуйте знову.';
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F1F5F9' },
  kav: { flex: 1, justifyContent: 'center', padding: 20 },
  logoWrap: { alignItems: 'center', marginBottom: 32 },
  logoCircle: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#2563EB', alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
  logoIcon: { fontSize: 36 },
  appName: { fontSize: 26, fontWeight: '700', color: '#0F172A' },
  tagline: { fontSize: 14, color: '#64748B', marginTop: 4 },
  card: { backgroundColor: '#fff', borderRadius: 20, padding: 24, borderWidth: 0.5, borderColor: '#E2E8F0' },
  cardTitle: { fontSize: 20, fontWeight: '700', color: '#0F172A', marginBottom: 20 },
  label: { fontSize: 13, fontWeight: '600', color: '#374151', marginBottom: 6 },
  input: { borderWidth: 1.5, borderColor: '#E2E8F0', borderRadius: 12, padding: 13, fontSize: 14, color: '#0F172A', backgroundColor: '#F8FAFC', marginBottom: 14 },
  forgotWrap: { alignSelf: 'flex-end', marginTop: -6, marginBottom: 14 },
  forgot: { fontSize: 13, color: '#2563EB', fontWeight: '600' },
  btn: { backgroundColor: '#2563EB', borderRadius: 12, padding: 15, alignItems: 'center' },
  btnText: { color: '#fff', fontSize: 15, fontWeight: '700' },
  linkRow: { flexDirection: 'row', justifyContent: 'center', marginTop: 18 },
  linkHint: { fontSize: 14, color: '#64748B' },
  link: { fontSize: 14, fontWeight: '700', color: '#2563EB' },
});
