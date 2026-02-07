import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'react-native';

import HomeScreen from './screens/HomeScreen';
import GalleryScreen from './screens/GalleryScreen';
import ProfileScreen from './screens/ProfileScreen';

const Stack = createNativeStackNavigator();
const Tab = createMaterialTopTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarShowIcon: true,
        tabBarIcon: ({ color }) => {
          let iconName;
          if (route.name === 'Головна') iconName = 'home';
          if (route.name === 'Фотогалерея') iconName = 'images';
          if (route.name === 'Профіль') iconName = 'person';
          return <Ionicons name={iconName} size={22} color={color} />;
        },
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: '#999',
        tabBarIndicatorStyle: { backgroundColor: '#007AFF', height: 3 },
        tabBarLabelStyle: { fontSize: 12, fontWeight: '500' },
        tabBarStyle: { 
          backgroundColor: 'white',
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 1,
          borderBottomColor: '#e0e0e0',
        },
      })}
    >
      <Tab.Screen name="Головна" component={HomeScreen} />
      <Tab.Screen name="Фотогалерея" component={GalleryScreen} />
      <Tab.Screen name="Профіль" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Main"
          component={MainTabs}
          options={{
            title: 'FirstMobileApp',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontSize: 18,
              fontWeight: '600',
            },
            headerLeft: () => (
              <Image
                source={{
                  uri: 'https://ztu.edu.ua/img/logo/university-colored.png',
                }}
                style={{ width: 140, height: 30, marginLeft: 10 }}
                resizeMode="contain"
              />
            ),
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}