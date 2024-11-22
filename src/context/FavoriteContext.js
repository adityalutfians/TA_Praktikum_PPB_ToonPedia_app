import React, { createContext, useState, useContext } from 'react';

const FavoriteContext = createContext();

export const FavoriteProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  const addFavorite = (cartoon) => {
    setFavorites(prev => {
      // Cek apakah kartun sudah ada di favorit
      if (!prev.some(item => item.id === cartoon.id)) {
        return [...prev, cartoon];
      }
      return prev;
    });
  };

  const removeFavorite = (cartoonId) => {
    setFavorites(prev => prev.filter(item => item.id !== cartoonId));
  };

  return (
    <FavoriteContext.Provider value={{ favorites, addFavorite, removeFavorite }}>
      {children}
    </FavoriteContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoriteContext);