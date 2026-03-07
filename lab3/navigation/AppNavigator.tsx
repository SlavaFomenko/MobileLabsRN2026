import React from 'react';
import {Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useTheme} from '../context/ThemeContext';
import GameScreen from '../screens/GameScreen';
import ChallengesScreen from '../screens/ChallengesScreen';
import SettingsScreen from '../screens/SettingsScreen';

const Tab = createBottomTabNavigator();

const AppNavigator: React.FC = () => {
  const {theme} = useTheme();

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: theme.colors.tabBar,
            borderTopColor: theme.colors.tabBarBorder,
            borderTopWidth: 1,
            height: 60,
            paddingBottom: 8,
          },
          tabBarActiveTintColor: theme.colors.tabIconActive,
          tabBarInactiveTintColor: theme.colors.tabIconInactive,
          tabBarShowLabel: false,
        }}>
        <Tab.Screen
          name="Game"
          component={GameScreen}
          options={{
            tabBarIcon: ({color}) => <Text style={{fontSize: 24, color}}>▶</Text>,
          }}
        />
        <Tab.Screen
          name="Challenges"
          component={ChallengesScreen}
          options={{
            tabBarIcon: ({color}) => <Text style={{fontSize: 22, color}}>☰</Text>,
          }}
        />
        <Tab.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            tabBarIcon: ({color}) => <Text style={{fontSize: 22, color}}>⚙</Text>,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
