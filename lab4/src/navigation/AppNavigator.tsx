import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import ExplorerScreen from '../screens/ExplorerScreen';
import EditorScreen from '../screens/EditorScreen';

export type RootStackParamList = {
  Explorer: undefined;
  Editor: {uri: string; name: string; readOnly?: boolean};
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Explorer" component={ExplorerScreen} />
        <Stack.Screen
          name="Editor"
          component={EditorScreen}
          options={{animation: 'slide_from_right'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
