import React from 'react';
import { StatusBar } from 'react-native';
import AppProvider from './src/context';
import Routes from './src/pages/routes';

const App: React.FC = () => (
  <AppProvider>
    <StatusBar barStyle="dark-content" backgroundColor="#FFF" />
    <Routes />
  </AppProvider>
);

export default App;
