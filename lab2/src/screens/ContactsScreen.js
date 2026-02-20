import React from 'react';
import {
  View,
  Text,
  SectionList,
  StyleSheet,
} from 'react-native';
import { contactsSections } from '../data/contactsData';

const ContactItem = ({ item }) => (
  <View style={styles.contactItem}>
    <View style={styles.avatar}>
      <Text style={styles.avatarText}>
        {item.name.split(' ').map((w) => w[0]).slice(0, 2).join('')}
      </Text>
    </View>
    <View style={styles.contactInfo}>
      <Text style={styles.contactName}>{item.name}</Text>
      <Text style={styles.contactPhone}>{item.phone}</Text>
      <Text style={styles.contactEmail}>{item.email}</Text>
    </View>
  </View>
);

const SectionHeader = ({ section }) => (
  <View style={styles.sectionHeader}>
    <Text style={styles.sectionHeaderText}>{section.title}</Text>
    <Text style={styles.sectionCount}>{section.data.length}</Text>
  </View>
);

const ItemSeparator = () => <View style={styles.separator} />;

const ContactsScreen = () => {
  return (
    <SectionList
      sections={contactsSections}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <ContactItem item={item} />}
      renderSectionHeader={({ section }) => <SectionHeader section={section} />}
      ItemSeparatorComponent={ItemSeparator}
      stickySectionHeadersEnabled={true}
      contentContainerStyle={styles.list}
      style={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f2f5',
  },
  list: {
    paddingBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1a1a2e',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  sectionHeaderText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#fff',
  },
  sectionCount: {
    fontSize: 13,
    color: '#4a90e2',
    backgroundColor: '#2d2d4e',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#4a90e2',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  avatarText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  contactInfo: {
    flex: 1,
  },
  contactName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1a1a2e',
    marginBottom: 3,
  },
  contactPhone: {
    fontSize: 13,
    color: '#4a90e2',
    marginBottom: 2,
  },
  contactEmail: {
    fontSize: 12,
    color: '#999',
  },
  separator: {
    height: 1,
    backgroundColor: '#f0f2f5',
    marginLeft: 78,
  },
});

export default ContactsScreen;