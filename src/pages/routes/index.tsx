import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from '../Home';
import Player from '../Player';
import AddAlbum from '../AddAlbum';
import AddPlaybackButton from '../../components/AddPlaybackButton';

export type RouteStackParamList = {
  Home: undefined;
  Player: undefined;
  AddAlbum: undefined;
};

const Stack = createNativeStackNavigator<RouteStackParamList>();

const Routes: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            title: 'Albuns',
            headerTitleAlign: 'center',
            headerRight: () => <AddPlaybackButton />,
          }}
        />
        <Stack.Screen
          name="AddAlbum"
          component={AddAlbum}
          options={{
            title: 'Adicionar novo album',
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name="Player"
          component={Player}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
