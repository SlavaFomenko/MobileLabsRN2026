import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity, Text } from 'react-native';

import MainScreen from './src/screens/MainScreen';
import DetailsScreen from './src/screens/DetailsScreen';
import ContactsScreen from './src/screens/ContactsScreen';
import CustomDrawer from './src/components/CustomDrawer';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const NewsStack = ({ navigation }) => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: { backgroundColor: '#1a1a2e' },
      headerTintColor: '#fff',
      headerTitleStyle: { fontWeight: 'bold' },
    }}
  >
    <Stack.Screen
      name="Main"
      component={MainScreen}
      options={{
        title: 'Новини',
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => navigation.openDrawer()}
            style={{ marginLeft: 16 }}
          >
            <Text style={{ color: '#fff', fontSize: 22 }}>☰</Text>
          </TouchableOpacity>
        ),
      }}
    />
    <Stack.Screen
      name="Details"
      component={DetailsScreen}
      options={({ route }) => ({
        title: route.params?.item?.title?.slice(0, 20) + '...' || 'Деталі',
      })}
    />
  </Stack.Navigator>
);

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={(props) => <CustomDrawer {...props} />}
        screenOptions={{ headerShown: false }}
      >
        <Drawer.Screen name="NewsStack" component={NewsStack} />
        <Drawer.Screen
          name="Contacts"
          component={ContactsScreen}
          options={({ navigation }) => ({
            headerShown: true,
            title: 'Контакти',
            headerStyle: { backgroundColor: '#1a1a2e' },
            headerTintColor: '#fff',
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => navigation.openDrawer()}
                style={{ marginLeft: 16 }}
              >
                <Text style={{ color: '#fff', fontSize: 22 }}>☰</Text>
              </TouchableOpacity>
            ),
          })}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}