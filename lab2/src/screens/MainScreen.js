import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { generateNews } from '../data/newsData';

const INITIAL_DATA = generateNews(0, 15);

const NewsCard = ({ item, onPress }) => (
  <TouchableOpacity style={styles.card} onPress={() => onPress(item)} activeOpacity={0.8}>
    <Image source={{ uri: item.image }} style={styles.cardImage} />
    <View style={styles.cardBody}>
      <View style={styles.categoryBadge}>
        <Text style={styles.categoryText}>{item.category}</Text>
      </View>
      <Text style={styles.cardTitle} numberOfLines={2}>{item.title}</Text>
      <Text style={styles.cardDescription} numberOfLines={3}>{item.description}</Text>
      <Text style={styles.cardDate}>{item.date}</Text>
    </View>
  </TouchableOpacity>
);

const ListHeader = () => (
  <View style={styles.header}>
    <Text style={styles.headerTitle}>📰 Стрічка новин</Text>
    <Text style={styles.headerSubtitle}>Актуальні події дня</Text>
  </View>
);

const ListFooter = ({ loading }) => (
  <View style={styles.footer}>
    {loading ? (
      <>
        <ActivityIndicator size="small" color="#4a90e2" />
        <Text style={styles.footerText}>Завантаження...</Text>
      </>
    ) : (
      <Text style={styles.footerText}>Гортайте вгору для оновлення</Text>
    )}
  </View>
);

const ItemSeparator = () => <View style={styles.separator} />;

const MainScreen = ({ navigation }) => {
  const [news, setNews] = useState(INITIAL_DATA);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [nextId, setNextId] = useState(15);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      const freshNews = generateNews(0, 15);
      setNews(freshNews);
      setNextId(15);
      setRefreshing(false);
    }, 1500);
  }, []);

  const onEndReached = useCallback(() => {
    if (loadingMore) return;
    setLoadingMore(true);
    setTimeout(() => {
      const moreNews = generateNews(nextId, 10);
      setNews((prev) => [...prev, ...moreNews]);
      setNextId((prev) => prev + 10);
      setLoadingMore(false);
    }, 1000);
  }, [loadingMore, nextId]);

  const handlePress = (item) => {
    navigation.navigate('Details', { item });
  };

  return (
    <FlatList
      data={news}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <NewsCard item={item} onPress={handlePress} />}
      ListHeaderComponent={ListHeader}
      ListFooterComponent={<ListFooter loading={loadingMore} />}
      ItemSeparatorComponent={ItemSeparator}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={['#4a90e2']}
          tintColor="#4a90e2"
        />
      }
      onEndReached={onEndReached}
      onEndReachedThreshold={0.3}
      initialNumToRender={8}
      maxToRenderPerBatch={10}
      windowSize={5}
      style={styles.list}
      contentContainerStyle={styles.listContent}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
    backgroundColor: '#f0f2f5',
  },
  listContent: {
    paddingBottom: 20,
  },
  header: {
    backgroundColor: '#1a1a2e',
    padding: 20,
    paddingTop: 30,
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#aaa',
    marginTop: 4,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginHorizontal: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  cardImage: {
    width: '100%',
    height: 180,
  },
  cardBody: {
    padding: 14,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#e8f0fe',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
    marginBottom: 8,
  },
  categoryText: {
    fontSize: 11,
    color: '#4a90e2',
    fontWeight: '600',
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#1a1a2e',
    marginBottom: 6,
    lineHeight: 22,
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 8,
  },
  cardDate: {
    fontSize: 12,
    color: '#999',
  },
  separator: {
    height: 12,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    gap: 8,
  },
  footerText: {
    fontSize: 13,
    color: '#999',
    marginLeft: 8,
  },
});

export default MainScreen;