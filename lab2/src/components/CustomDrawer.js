import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';

const CustomDrawer = (props) => {
  const { state, navigation } = props;

  const menuItems = [
    { label: 'Новини', routeName: 'NewsStack', icon: '📰' },
    { label: 'Контакти', routeName: 'Contacts', icon: '👥' },
  ];

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={styles.container}>
      {/* Профіль */}
      <View style={styles.profileSection}>
        <Image
          source={{ uri: 'https://i.pravatar.cc/150?img=12' }}
          style={styles.avatar}
        />
        <Text style={styles.name}>Фоменко В'ячеслав Андрійович</Text>
        <Text style={styles.group}>Група: ВТ-22-2</Text>
      </View>

      {/* Меню */}
      <View style={styles.menuSection}>
        {menuItems.map((item) => {
          const isActive = state.routes[state.index]?.name === item.routeName;
          return (
            <TouchableOpacity
              key={item.routeName}
              style={[styles.menuItem, isActive && styles.menuItemActive]}
              onPress={() => navigation.navigate(item.routeName)}
            >
              <Text style={styles.menuIcon}>{item.icon}</Text>
              <Text style={[styles.menuLabel, isActive && styles.menuLabelActive]}>
                {item.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  profileSection: {
    padding: 20,
    paddingTop: 40,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    marginBottom: 10,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: '#4a90e2',
    marginBottom: 12,
  },
  name: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  group: {
    color: '#aaa',
    fontSize: 13,
    marginTop: 4,
  },
  menuSection: {
    paddingHorizontal: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 10,
    marginVertical: 4,
  },
  menuItemActive: {
    backgroundColor: '#4a90e2',
  },
  menuIcon: {
    fontSize: 20,
    marginRight: 14,
  },
  menuLabel: {
    fontSize: 16,
    color: '#ccc',
  },
  menuLabelActive: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default CustomDrawer;