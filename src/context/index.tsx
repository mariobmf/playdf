import React from 'react';
import { FileProvider } from './FileContext';

const AppProvider: React.FC = ({ children }) => (
  <FileProvider>{children}</FileProvider>
);

export default AppProvider;
