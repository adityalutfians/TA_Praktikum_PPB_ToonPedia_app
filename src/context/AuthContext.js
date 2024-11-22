import React, { createContext, useState, useContext } from 'react';
import { Alert } from 'react-native';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Username dan password yang di-hardcode
  const correctUsername = 'user123';
  const correctPassword = 'password123';

  // Fungsi untuk login
  const login = (username, password) => {
    try {
      if (!username || !password) {
        Alert.alert('Error', 'Username dan password harus diisi');
        return false;
      }

      if (username === correctUsername && password === correctPassword) {
        setUser({ username });
        return true;
      } else {
        Alert.alert('Error', 'Username atau password salah');
        return false;
      }
    } catch (error) {
      Alert.alert('Error', 'Terjadi kesalahan saat login');
      return false;
    }
  };

  // Fungsi untuk logout
  const logout = () => {
    try {
      setUser(null);
      return true;
    } catch (error) {
      Alert.alert('Error', 'Terjadi kesalahan saat logout');
      return false;
    }
  };

  // Fungsi untuk cek status login
  const isLoggedIn = () => {
    return user !== null;
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout,
      isLoggedIn 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};