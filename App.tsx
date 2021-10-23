import React from 'react';
import { StatusBar } from 'react-native';
import { ThemeProvider } from 'styled-components/native';
import AppProvider from './src/context';
import Routes from './src/pages/routes';
import light from './src/styles/themes/light';

const App: React.FC = () => (
  <ThemeProvider theme={light}>
    <AppProvider>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF" />
      <Routes />
    </AppProvider>
  </ThemeProvider>
);

export default App;
