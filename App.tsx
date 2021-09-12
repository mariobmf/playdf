import React from 'react';
import { StatusBar } from 'react-native';
import Player from './src/Pages/Player';

const App: React.FC = () => (
  <>
    <StatusBar barStyle="dark-content" backgroundColor="#FFF" />
    <Player />
  </>
);

export default App;
