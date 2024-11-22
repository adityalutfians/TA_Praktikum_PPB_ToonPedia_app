import React, { useState } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { useFavorites } from '../context/FavoriteContext';

const DetailScreen = ({ route }) => {
  const { cartoon } = route.params;
  const { favorites, addFavorite, removeFavorite } = useFavorites();
  const isFavorite = favorites.some(item => item.id === cartoon.id);

  const [isModalVisible, setIsModalVisible] = useState(false); // State untuk modal

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible); // Toggle visibility modal
  };

  return (
    <ScrollView style={styles.container}>
      {/* Gambar yang bisa dipencet */}
      <TouchableOpacity onPress={toggleModal}>
        <Image 
          source={{ uri: cartoon.image }} 
          style={styles.image} 
          resizeMode="cover"
        />
      </TouchableOpacity>

      <View style={styles.details}>
        <Text style={styles.title}>{cartoon.title}</Text>
        <Text style={styles.year}>Tahun: {cartoon.year}</Text>
        <Text style={styles.creator}>Creator: {cartoon.creator.join(', ')}</Text>
        <Text style={styles.rating}>Rating: {cartoon.rating}</Text>
        <Text style={styles.genre}>Genre: {cartoon.genre.join(', ')}</Text>
        <Text style={styles.runtime}>Durasi Episode: {cartoon.runtime_in_minutes} menit</Text>
        <Text style={styles.episodes}>Total Episode: {cartoon.episodes}</Text>
      </View>

      {/* Modal untuk menampilkan gambar penuh */}
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={toggleModal} // Menutup modal jika tekan back button
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.modalCloseButton} onPress={toggleModal}>
            <Text style={styles.modalCloseButtonText}>X</Text>
          </TouchableOpacity>
          <Image 
            source={{ uri: cartoon.image }} 
            style={styles.modalImage} 
            resizeMode="contain"
          />
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5', 
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 10,  
    marginBottom: 15, 
  },
  details: {
    padding: 20,
    backgroundColor: '#fff', 
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    elevation: 5, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  year: {
    fontSize: 16,
    marginBottom: 5,
  },
  creator: {
    fontSize: 16,
    marginBottom: 5,
  },
  rating: {
    fontSize: 16,
    marginBottom: 5,
  },
  genre: {
    fontSize: 16,
    color: '#3498db', 
    marginBottom: 5,
  },
  runtime: {
    fontSize: 16,
    color: '#2ecc71', 
    marginBottom: 5,
  },
  episodes: {
    fontSize: 16,
    color: '#e74c3c', 
    marginBottom: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)', 
  },
  modalCloseButton: {
    position: 'absolute',
    top: 10,  
    right: 10, 
    padding: 5, 
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 15,  
    width: 30,  
    height: 30, 
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCloseButtonText: {
    color: 'white',
    fontSize: 16,  
    fontWeight: 'bold',
  },
  modalImage: {
    width: '90%',
    height: '80%',
    borderRadius: 15,
  },
});

export default DetailScreen;
