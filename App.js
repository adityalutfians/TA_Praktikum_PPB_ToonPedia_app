import React from 'react';
import { FavoriteProvider } from './src/context/FavoriteContext';
import AppNavigator from './src/navigation/AppNavigator';

const App = () => {
  return (
    <FavoriteProvider>
      <AppNavigator />
    </FavoriteProvider>
  );
};

export default App;
