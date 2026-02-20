import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
} from 'react-native';

const DetailsScreen = ({ route }) => {
  const { item } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.content}>
        <View style={styles.meta}>
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>{item.category}</Text>
          </View>
          <Text style={styles.date}>{item.date}</Text>
        </View>
        <Text style={styles.title}>{item.title}</Text>
        <View style={styles.divider} />
        <Text style={styles.description}>{item.description}</Text>
        <Text style={styles.description}>
          Детальніше про цю подію можна дізнатись у наших наступних матеріалах.
          Редакція продовжує слідкувати за розвитком ситуації та оперативно
          повідомлятиме про всі зміни. Залишайтесь з нами!
        </Text>
        <Text style={styles.description}>
          За словами експертів, ця тема є надзвичайно важливою для сучасного
          суспільства. Фахівці рекомендують звертати особливу увагу на подібні
          повідомлення та критично оцінювати отриману інформацію.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 240,
  },
  content: {
    padding: 16,
  },
  meta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryBadge: {
    backgroundColor: '#e8f0fe',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  categoryText: {
    fontSize: 12,
    color: '#4a90e2',
    fontWeight: '600',
  },
  date: {
    fontSize: 13,
    color: '#999',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1a1a2e',
    lineHeight: 30,
    marginBottom: 14,
  },
  divider: {
    height: 2,
    backgroundColor: '#4a90e2',
    width: 50,
    borderRadius: 1,
    marginBottom: 16,
  },
  description: {
    fontSize: 15,
    color: '#444',
    lineHeight: 24,
    marginBottom: 14,
  },
});

export default DetailsScreen;