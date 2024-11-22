import React from 'react';
import { FavoriteProvider } from './src/context/FavoriteContext';
import { AuthProvider } from './src/context/AuthContext'; // Import AuthProvider
import AppNavigator from './src/navigation/AppNavigator';

const App = () => {
  return (
    <AuthProvider>
      <FavoriteProvider>
        <AppNavigator />
      </FavoriteProvider>
    </AuthProvider>
  );
};

export default App;