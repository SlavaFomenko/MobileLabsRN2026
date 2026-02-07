import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');
const imageSize = (width - 45) / 2

const GalleryScreen = () => {
  const photos = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    uri: 'https://via.placeholder.com/200',
  }));

  return (
    <View style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.gallery}>
          {photos.map((photo) => (
            <View key={photo.id} style={[styles.imageContainer, { width: imageSize, height: imageSize }]}>
              <Image
                source={{ uri: photo.uri }}
                style={styles.image}
              />
            </View>
          ))}
        </View>
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
  gallery: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 15,
    justifyContent: 'space-between',
  },
  imageContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  footer: {
    backgroundColor: 'white',
    padding: 15,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  footerText: {
    marginBottom:20,
    fontSize: 12,
    color: '#666',
  },
});

export default GalleryScreen;