
import {
  View, Text, FlatList, TouchableOpacity,
  StyleSheet, SafeAreaView, Image, TextInput,
} from 'react-native';
import { Link, router } from 'expo-router';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { products } from '../../data/products';

function formatPrice(price) {
  return price.toLocaleString('uk-UA') + ' ₴';
}

function ProductCard({ item }) {
  return (
    <Link href={`/details/${item.id}`} asChild>
      <TouchableOpacity style={s.card} activeOpacity={0.85}>
        <Image source={{ uri: item.image }} style={s.cardImg} />
        <View style={s.cardBody}>
          <View style={s.chip}>
            <Text style={s.chipT}>{item.category}</Text>
          </View>
          <Text style={s.cardName} numberOfLines={2}>{item.name}</Text>
          <View style={s.cardFooter}>
            <Text style={s.price}>{formatPrice(item.price)}</Text>
            <View style={s.ratingRow}>
              <Text style={s.star}>★</Text>
              <Text style={s.rating}>{item.rating}</Text>
              <Text style={s.reviews}>({item.reviews})</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Link>
  );
}

export default function CatalogScreen() {
  const { user, logout } = useAuth();
  const [search, setSearch] = useState('');

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  function handleLogout() {
    logout();
    router.replace('/login');
  }

  return (
    <SafeAreaView style={s.safe}>
      {/* Header */}
      <View style={s.header}>
        <View style={s.headerTop}>
          <View>
            <Text style={s.greeting}>Привіт, {user?.name ?? 'Гість'}! 👋</Text>
            <Text style={s.subtitle}>Знайди щось чудове</Text>
          </View>
          <TouchableOpacity style={s.logoutBtn} onPress={handleLogout}>
            <Text style={s.logoutT}>Вийти</Text>
          </TouchableOpacity>
        </View>

        {/* Search */}
        <View style={s.searchWrap}>
          <Text style={s.searchIcon}>🔍</Text>
          <TextInput
            style={s.searchInput}
            placeholder="Пошук товарів..."
            placeholderTextColor="#94A3B8"
            value={search}
            onChangeText={setSearch}
          />
          {search.length > 0 && (
            <TouchableOpacity onPress={() => setSearch('')}>
              <Text style={{ fontSize: 16, color: '#94A3B8' }}>✕</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* List */}
      <FlatList
        data={filtered}
        keyExtractor={item => item.id}
        numColumns={2}
        columnWrapperStyle={s.row}
        contentContainerStyle={s.list}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <Text style={s.sectionTitle}>
            {search ? `Результати: ${filtered.length}` : `Каталог (${products.length})`}
          </Text>
        }
        ListEmptyComponent={
          <View style={s.empty}>
            <Text style={{ fontSize: 48 }}>🔍</Text>
            <Text style={s.emptyT}>Нічого не знайдено</Text>
          </View>
        }
        renderItem={({ item }) => <ProductCard item={item} />}
      />
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F1F5F9' },
  header: { backgroundColor: '#fff', padding: 16, paddingBottom: 12, borderBottomWidth: 0.5, borderBottomColor: '#E2E8F0' },
  headerTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 },
  greeting: { fontSize: 18, fontWeight: '700', color: '#0F172A' },
  subtitle: { fontSize: 13, color: '#64748B', marginTop: 2 },
  logoutBtn: { backgroundColor: '#FEF2F2', paddingHorizontal: 14, paddingVertical: 8, borderRadius: 10, borderWidth: 0.5, borderColor: '#FECACA' },
  logoutT: { fontSize: 13, fontWeight: '700', color: '#DC2626' },
  searchWrap: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F1F5F9', borderRadius: 12, paddingHorizontal: 12, paddingVertical: 2, borderWidth: 0.5, borderColor: '#E2E8F0', gap: 8 },
  searchIcon: { fontSize: 16 },
  searchInput: { flex: 1, fontSize: 14, color: '#0F172A', paddingVertical: 10 },
  list: { padding: 12, paddingBottom: 40 },
  row: { gap: 12, marginBottom: 12 },
  sectionTitle: { fontSize: 14, fontWeight: '700', color: '#64748B', marginBottom: 12, letterSpacing: 0.5 },
  card: { flex: 1, backgroundColor: '#fff', borderRadius: 16, overflow: 'hidden', borderWidth: 0.5, borderColor: '#E2E8F0' },
  cardImg: { width: '100%', height: 140, backgroundColor: '#F1F5F9' },
  cardBody: { padding: 10 },
  chip: { backgroundColor: '#EFF6FF', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 20, alignSelf: 'flex-start', marginBottom: 5 },
  chipT: { fontSize: 10, fontWeight: '700', color: '#2563EB' },
  cardName: { fontSize: 13, fontWeight: '600', color: '#0F172A', lineHeight: 18, marginBottom: 8 },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  price: { fontSize: 14, fontWeight: '800', color: '#2563EB' },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 2 },
  star: { fontSize: 12, color: '#F59E0B' },
  rating: { fontSize: 11, fontWeight: '700', color: '#374151' },
  reviews: { fontSize: 10, color: '#94A3B8' },
  empty: { alignItems: 'center', paddingTop: 60, gap: 10 },
  emptyT: { fontSize: 15, color: '#94A3B8' },
});
