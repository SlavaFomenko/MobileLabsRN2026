import { useState, useEffect } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  SafeAreaView, ScrollView, Alert, ActivityIndicator,
  Modal, KeyboardAvoidingView, Platform,
} from 'react-native';
import { router } from 'expo-router';
import { useAuth } from '../../context/AuthContext';

export default function ProfileScreen() {
  const { user, profile, updateProfile, logout, deleteAccount } = useAuth();

  const [name, setName]   = useState('');
  const [age, setAge]     = useState('');
  const [city, setCity]   = useState('');
  const [editMode, setEditMode] = useState(false);
  const [saving, setSaving]     = useState(false);

  const [deleteModal, setDeleteModal]     = useState(false);
  const [deletePassword, setDeletePassword] = useState('');
  const [deleting, setDeleting]           = useState(false);

  useEffect(() => {
    if (profile) {
      setName(profile.name ?? '');
      setAge(profile.age  ?? '');
      setCity(profile.city ?? '');
    }
  }, [profile]);

  const isDirty =
    name !== (profile?.name ?? '') ||
    age  !== (profile?.age  ?? '') ||
    city !== (profile?.city ?? '');

  async function handleSave() {
    if (!name.trim()) { Alert.alert('Помилка', "Введіть ім'я."); return; }
    const ageNum = parseInt(age);
    if (age && (isNaN(ageNum) || ageNum < 1 || ageNum > 120)) {
      Alert.alert('Помилка', 'Вік має бути числом від 1 до 120.'); return;
    }
    setSaving(true);
    try {
      await updateProfile({ name: name.trim(), age: age.trim(), city: city.trim() });
      setEditMode(false);
      Alert.alert('✅ Збережено', 'Профіль успішно оновлено.');
    } catch {
      Alert.alert('Помилка', 'Не вдалося зберегти профіль.');
    } finally {
      setSaving(false);
    }
  }

  function handleLogout() {
    Alert.alert('Вийти', 'Ви впевнені?', [
      { text: 'Скасувати', style: 'cancel' },
      { text: 'Вийти', style: 'destructive', onPress: async () => {
        await logout();
        router.replace('/(auth)/login');
      }},
    ]);
  }

  async function handleDelete() {
    if (!deletePassword) { Alert.alert('Помилка', 'Введіть пароль.'); return; }
    setDeleting(true);
    try {
      await deleteAccount(deletePassword);
      router.replace('/(auth)/login');
    } catch (e) {
      Alert.alert('Помилка', ({
        'auth/wrong-password':    'Невірний пароль.',
        'auth/invalid-credential': 'Невірний пароль.',
        'auth/too-many-requests': 'Забагато спроб. Спробуйте пізніше.',
      })[e.code] ?? 'Не вдалося видалити акаунт.');
    } finally {
      setDeleting(false);
      setDeleteModal(false);
      setDeletePassword('');
    }
  }

  return (
    <SafeAreaView style={s.safe}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View style={s.header}>
          <View style={s.avatar}>
            <Text style={s.avatarText}>
              {profile?.name ? profile.name[0].toUpperCase() : user?.email?.[0]?.toUpperCase() ?? '?'}
            </Text>
          </View>
          <Text style={s.emailText}>{user?.email}</Text>
          <View style={s.uidChip}>
            <Text style={s.uidText} numberOfLines={1}>UID: {user?.uid}</Text>
          </View>
        </View>

        {/* Profile form */}
        <View style={s.card}>
          <View style={s.cardHeader}>
            <Text style={s.cardTitle}>Мій профіль</Text>
            <TouchableOpacity
              style={[s.editBtn, editMode && s.editBtnCancel]}
              onPress={() => {
                if (editMode) {
                  setName(profile?.name ?? '');
                  setAge(profile?.age  ?? '');
                  setCity(profile?.city ?? '');
                }
                setEditMode(v => !v);
              }}>
              <Text style={[s.editBtnT, editMode && { color: '#DC2626' }]}>
                {editMode ? 'Скасувати' : '✏️  Редагувати'}
              </Text>
            </TouchableOpacity>
          </View>

          <Field label="Ім'я"  value={name} onChange={setName} editable={editMode} placeholder="Введіть ваше ім'я" />
          <Field label="Вік"   value={age}  onChange={setAge}  editable={editMode} placeholder="Введіть вік" keyboard="numeric" />
          <Field label="Місто" value={city} onChange={setCity} editable={editMode} placeholder="Введіть місто" last />

          {editMode && (
            <TouchableOpacity
              style={[s.saveBtn, (!isDirty || saving) && { opacity: 0.55 }]}
              onPress={handleSave} disabled={!isDirty || saving}>
              {saving
                ? <ActivityIndicator color="#fff" />
                : <Text style={s.saveBtnT}>💾  Зберегти зміни</Text>}
            </TouchableOpacity>
          )}
        </View>

        {/* Info preview */}
        {!editMode && (
          <View style={s.infoCard}>
            <InfoRow icon="👤" label="Ім'я"  value={profile?.name || '—'} />
            <InfoRow icon="🎂" label="Вік"   value={profile?.age  || '—'} />
            <InfoRow icon="🏙️" label="Місто" value={profile?.city || '—'} last />
          </View>
        )}

        <TouchableOpacity style={s.logoutBtn} onPress={handleLogout}>
          <Text style={s.logoutT}>Вийти з акаунту</Text>
        </TouchableOpacity>

        <TouchableOpacity style={s.deleteBtn} onPress={() => setDeleteModal(true)}>
          <Text style={s.deleteT}>🗑️  Видалити акаунт</Text>
        </TouchableOpacity>

        <View style={{ height: 40 }} />
      </ScrollView>

      {/* Modal: delete account */}
      <Modal visible={deleteModal} transparent animationType="slide">
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <View style={s.overlay}>
            <View style={s.modalSheet}>
              <View style={s.handle} />
              <Text style={s.modalTitle}>⚠️ Видалення акаунту</Text>
              <Text style={s.modalDesc}>
                Ця дія незворотна. Всі ваші дані будуть видалені.{'\n'}
                Введіть пароль для підтвердження.
              </Text>
              <TextInput
                style={s.input} placeholder="Ваш пароль" placeholderTextColor="#94A3B8"
                value={deletePassword} onChangeText={setDeletePassword} secureTextEntry autoFocus
              />
              <View style={s.btnRow}>
                <TouchableOpacity style={s.cancelBtn}
                  onPress={() => { setDeleteModal(false); setDeletePassword(''); }}>
                  <Text style={s.cancelT}>Скасувати</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[s.confirmBtn, deleting && { opacity: 0.7 }]}
                  onPress={handleDelete} disabled={deleting}>
                  {deleting ? <ActivityIndicator color="#fff" /> : <Text style={s.confirmT}>Видалити</Text>}
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </SafeAreaView>
  );
}

function Field({ label, value, onChange, editable, placeholder, keyboard, last }) {
  return (
    <View style={{ marginBottom: last ? 0 : 14 }}>
      <Text style={f.label}>{label}</Text>
      <TextInput
        style={[f.input, !editable && f.readonly]}
        value={value} onChangeText={onChange} editable={editable}
        placeholder={editable ? placeholder : '—'} placeholderTextColor="#94A3B8"
        keyboardType={keyboard ?? 'default'}
      />
    </View>
  );
}

function InfoRow({ icon, label, value, last }) {
  return (
    <View style={[ir.row, last && { borderBottomWidth: 0 }]}>
      <Text style={ir.icon}>{icon}</Text>
      <Text style={ir.label}>{label}</Text>
      <Text style={ir.value}>{value}</Text>
    </View>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F1F5F9' },
  header: { backgroundColor: '#2563EB', padding: 24, alignItems: 'center', paddingBottom: 32 },
  avatar: { width: 80, height: 80, borderRadius: 40, backgroundColor: 'rgba(255,255,255,0.25)', alignItems: 'center', justifyContent: 'center', marginBottom: 12, borderWidth: 3, borderColor: 'rgba(255,255,255,0.5)' },
  avatarText: { fontSize: 32, fontWeight: '700', color: '#fff' },
  emailText: { fontSize: 15, color: '#fff', fontWeight: '600' },
  uidChip: { backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: 20, paddingHorizontal: 12, paddingVertical: 4, marginTop: 6, maxWidth: 280 },
  uidText: { fontSize: 10, color: 'rgba(255,255,255,0.8)' },
  card: { backgroundColor: '#fff', margin: 16, marginTop: -16, borderRadius: 20, padding: 20, borderWidth: 0.5, borderColor: '#E2E8F0' },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  cardTitle: { fontSize: 16, fontWeight: '700', color: '#0F172A' },
  editBtn: { backgroundColor: '#EFF6FF', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, borderWidth: 0.5, borderColor: '#BFDBFE' },
  editBtnCancel: { backgroundColor: '#FEF2F2', borderColor: '#FECACA' },
  editBtnT: { fontSize: 13, fontWeight: '600', color: '#2563EB' },
  saveBtn: { backgroundColor: '#2563EB', borderRadius: 12, padding: 14, alignItems: 'center', marginTop: 16 },
  saveBtnT: { color: '#fff', fontSize: 14, fontWeight: '700' },
  infoCard: { backgroundColor: '#fff', marginHorizontal: 16, borderRadius: 16, borderWidth: 0.5, borderColor: '#E2E8F0', overflow: 'hidden', marginBottom: 8 },
  logoutBtn: { margin: 16, marginBottom: 8, backgroundColor: '#fff', borderRadius: 12, padding: 15, alignItems: 'center', borderWidth: 0.5, borderColor: '#E2E8F0' },
  logoutT: { fontSize: 15, fontWeight: '700', color: '#374151' },
  deleteBtn: { marginHorizontal: 16, backgroundColor: '#FEF2F2', borderRadius: 12, padding: 15, alignItems: 'center', borderWidth: 0.5, borderColor: '#FECACA' },
  deleteT: { fontSize: 15, fontWeight: '700', color: '#DC2626' },
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  modalSheet: { backgroundColor: '#fff', borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 24, paddingBottom: 40 },
  handle: { width: 40, height: 4, backgroundColor: '#E2E8F0', borderRadius: 2, alignSelf: 'center', marginBottom: 20 },
  modalTitle: { fontSize: 18, fontWeight: '700', color: '#0F172A', marginBottom: 8 },
  modalDesc: { fontSize: 13, color: '#64748B', lineHeight: 20, marginBottom: 16 },
  input: { borderWidth: 1.5, borderColor: '#E2E8F0', borderRadius: 12, padding: 13, fontSize: 14, color: '#0F172A', backgroundColor: '#F8FAFC', marginBottom: 14 },
  btnRow: { flexDirection: 'row', gap: 10 },
  cancelBtn: { flex: 1, padding: 13, borderRadius: 12, alignItems: 'center', backgroundColor: '#F1F5F9', borderWidth: 0.5, borderColor: '#E2E8F0' },
  cancelT: { fontSize: 14, fontWeight: '700', color: '#64748B' },
  confirmBtn: { flex: 1, padding: 13, borderRadius: 12, alignItems: 'center', backgroundColor: '#DC2626' },
  confirmT: { fontSize: 14, fontWeight: '700', color: '#fff' },
});

const f = StyleSheet.create({
  label: { fontSize: 13, fontWeight: '600', color: '#374151', marginBottom: 6 },
  input: { borderWidth: 1.5, borderColor: '#2563EB', borderRadius: 12, padding: 12, fontSize: 14, color: '#0F172A', backgroundColor: '#fff' },
  readonly: { borderColor: '#E2E8F0', backgroundColor: '#F8FAFC', color: '#64748B' },
});

const ir = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', padding: 14, borderBottomWidth: 0.5, borderBottomColor: '#F1F5F9', gap: 10 },
  icon: { fontSize: 20, width: 28 },
  label: { fontSize: 13, color: '#64748B', flex: 1 },
  value: { fontSize: 14, fontWeight: '600', color: '#0F172A' },
});
