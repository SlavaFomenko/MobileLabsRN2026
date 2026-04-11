
import {
  View, Text, Image, ScrollView, TouchableOpacity,
  StyleSheet, SafeAreaView,
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { products } from '../../../data/products';

function formatPrice(price) {
  return price.toLocaleString('uk-UA') + ' ₴';
}

export default function DetailsScreen() {
  const { id } = useLocalSearchParams();
  const product = products.find(p => p.id === id);

  if (!product) {
    return (
      <SafeAreaView style={s.safe}>
        <View style={s.notFound}>
          <Text style={{ fontSize: 56 }}>😕</Text>
          <Text style={s.notFoundT}>Товар не знайдено</Text>
          <TouchableOpacity style={s.btn} onPress={() => router.back()}>
            <Text style={s.btnT}>← Повернутися</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={s.safe}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Image */}
        <View style={s.imgWrap}>
          <Image source={{ uri: product.image }} style={s.img} />
          <TouchableOpacity style={s.backBtn} onPress={() => router.back()}>
            <Text style={{ fontSize: 20 }}>←</Text>
          </TouchableOpacity>
        </View>

        <View style={s.content}>
          {/* Badge + title */}
          <View style={s.chip}>
            <Text style={s.chipT}>{product.category}</Text>
          </View>
          <Text style={s.name}>{product.name}</Text>

          {/* Price + rating */}
          <View style={s.priceRow}>
            <Text style={s.price}>{formatPrice(product.price)}</Text>
            <View style={s.ratingWrap}>
              <Text style={s.star}>★</Text>
              <Text style={s.rating}>{product.rating}</Text>
              <Text style={s.reviews}>· {product.reviews} відгуків</Text>
            </View>
          </View>

          {/* Description */}
          <View style={s.section}>
            <Text style={s.sectionTitle}>Опис</Text>
            <Text style={s.desc}>{product.description}</Text>
          </View>

          {/* Specs */}
          <View style={s.section}>
            <Text style={s.sectionTitle}>Характеристики</Text>
            <View style={s.specsCard}>
              {Object.entries(product.specs).map(([key, val], i, arr) => (
                <View
                  key={key}
                  style={[s.specRow, i === arr.length - 1 && { borderBottomWidth: 0 }]}>
                  <Text style={s.specKey}>{key}</Text>
                  <Text style={s.specVal}>{val}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Buy button */}
          <TouchableOpacity style={s.buyBtn}>
            <Text style={s.buyBtnT}>🛒  Додати до кошика</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },
  imgWrap: { position: 'relative' },
  img: { width: '100%', height: 300, backgroundColor: '#F1F5F9' },
  backBtn: { position: 'absolute', top: 16, left: 16, width: 40, height: 40, borderRadius: 20, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', elevation: 4, shadowColor: '#000', shadowOpacity: 0.15, shadowRadius: 8, shadowOffset: { width: 0, height: 2 } },
  content: { padding: 20 },
  chip: { backgroundColor: '#EFF6FF', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 20, alignSelf: 'flex-start', marginBottom: 10 },
  chipT: { fontSize: 12, fontWeight: '700', color: '#2563EB' },
  name: { fontSize: 22, fontWeight: '700', color: '#0F172A', lineHeight: 30, marginBottom: 14 },
  priceRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20, paddingBottom: 20, borderBottomWidth: 0.5, borderBottomColor: '#E2E8F0' },
  price: { fontSize: 26, fontWeight: '800', color: '#2563EB' },
  ratingWrap: { flexDirection: 'row', alignItems: 'center', gap: 3 },
  star: { fontSize: 16, color: '#F59E0B' },
  rating: { fontSize: 15, fontWeight: '700', color: '#374151' },
  reviews: { fontSize: 12, color: '#94A3B8' },
  section: { marginBottom: 22 },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: '#0F172A', marginBottom: 10 },
  desc: { fontSize: 14, color: '#475569', lineHeight: 22 },
  specsCard: { backgroundColor: '#F8FAFC', borderRadius: 14, borderWidth: 0.5, borderColor: '#E2E8F0', overflow: 'hidden' },
  specRow: { flexDirection: 'row', justifyContent: 'space-between', padding: 12, borderBottomWidth: 0.5, borderBottomColor: '#E2E8F0' },
  specKey: { fontSize: 13, color: '#64748B', flex: 1 },
  specVal: { fontSize: 13, fontWeight: '600', color: '#0F172A', flex: 1, textAlign: 'right' },
  buyBtn: { backgroundColor: '#2563EB', borderRadius: 14, padding: 16, alignItems: 'center', marginTop: 4, marginBottom: 20 },
  buyBtnT: { color: '#fff', fontSize: 16, fontWeight: '700' },
  notFound: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12 },
  notFoundT: { fontSize: 18, color: '#64748B' },
  btn: { backgroundColor: '#2563EB', borderRadius: 12, paddingHorizontal: 24, paddingVertical: 12, marginTop: 8 },
  btnT: { color: '#fff', fontSize: 15, fontWeight: '700' },
});
