import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';

const HomeScreen = () => {
  const newsItems = [
    {
      id: 1,
      title: 'Заголовок новини',
      date: 'Дата новини',
      description: 'Короткий текст новини',
    },
    {
      id: 2,
      title: 'Заголовок новини',
      date: 'Дата новини',
      description: 'Короткий текст новини',
    },
    {
      id: 3,
      title: 'Заголовок новини',
      date: 'Дата новини',
      description: 'Короткий текст новини',
    },
    {
      id: 4,
      title: 'Заголовок новини',
      date: 'Дата новини',
      description: 'Короткий текст новини',
    },
    {
      id: 5,
      title: 'Заголовок новини',
      date: 'Дата новини',
      description: 'Короткий текст новини',
    },
    {
      id: 6,
      title: 'Заголовок новини',
      date: 'Дата новини',
      description: 'Короткий текст новини',
    },
    {
      id: 7,
      title: 'Заголовок новини',
      date: 'Дата новини',
      description: 'Короткий текст новини',
    },
    {
      id: 8,
      title: 'Заголовок новини',
      date: 'Дата новини',
      description: 'Короткий текст новини',
    },
  ];

  return (
    <View style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        <Text style={styles.sectionTitle}>Новини</Text>
        
        {newsItems.map((item) => (
          <TouchableOpacity key={item.id} style={styles.newsItem}>
            <View style={styles.newsImagePlaceholder}>
              <Image
                source={{ uri: 'https://via.placeholder.com/80' }}
                style={styles.newsImage}
              />
            </View>
            <View style={styles.newsContent}>
              <Text style={styles.newsTitle}>{item.title}</Text>
              <Text style={styles.newsDate}>{item.date}</Text>
              <Text style={styles.newsDescription}>{item.description}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Фоменко В'ячеслав ВТ-22-2
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 20,
    backgroundColor: '#f5f5f5',
    color: '#333',
  },
  newsItem: {
    flexDirection: 'row',
    backgroundColor: 'white',
    marginHorizontal: 15,
    marginBottom: 12,
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  newsImagePlaceholder: {
    width: 70,
    height: 70,
    marginRight: 15,
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  newsImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  newsContent: {
    flex: 1,
    justifyContent: 'center',
  },
  newsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  newsDate: {
    fontSize: 12,
    color: '#999',
    marginBottom: 4,
  },
  newsDescription: {
    fontSize: 14,
    color: '#666',
  },
  footer: {
    backgroundColor: 'white',
    padding: 15,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  footerText: {
    fontSize: 12,
    marginBottom:20,
    color: '#666',
  },
});

export default HomeScreen;