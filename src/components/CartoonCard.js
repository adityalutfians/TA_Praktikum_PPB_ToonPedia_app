import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useFavorites } from '../context/FavoriteContext';

const CartoonCard = ({ cartoon, onPress }) => {
  const { favorites, addFavorite, removeFavorite } = useFavorites();
  const isFavorite = favorites.some(item => item.id === cartoon.id);

  return (
    <TouchableOpacity style={styles.card} onPress={() => onPress(cartoon)}>
      <Image 
        source={{ uri: cartoon.image }} 
        style={styles.image} 
        resizeMode="cover"
      />
      <View style={styles.details}>
        <Text style={styles.title}>{cartoon.title}</Text>
        <Text style={styles.year}>Tahun: {cartoon.year}</Text>
        
        <TouchableOpacity 
          onPress={() => isFavorite ? removeFavorite(cartoon.id) : addFavorite(cartoon)}
        >
          <Text style={[styles.favoriteButton, isFavorite ? styles.favoriteActive : styles.favoriteInactive]}>
            {isFavorite ? '❤️ Hapus Favorit' : '🤍 Tambah Favorit'}
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    marginBottom: 15,
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
    marginHorizontal: 10,
  },
  image: {
    width: 120,
    height: 180,
    borderRadius: 8,
  },
  details: {
    padding: 15,
    justifyContent: 'center',
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  year: {
    fontSize: 14,
    color: '#777',
    marginBottom: 10,
  },
  favoriteButton: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  favoriteActive: {
    color: '#e74c3c', 
  },
  favoriteInactive: {
    color: '#3498db',
  },
});

export default CartoonCard;
