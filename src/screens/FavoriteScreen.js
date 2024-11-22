import React from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import { useFavorites } from '../context/FavoriteContext';
import CartoonCard from '../components/CartoonCard';

const FavoriteScreen = ({ navigation }) => {
  const { favorites } = useFavorites();

  const navigateToDetail = (cartoon) => {
    navigation.navigate('Detail', { cartoon });
  };

  if (favorites.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text>Belum ada kartun favorit</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={favorites}
        renderItem={({ item }) => (
          <CartoonCard 
            cartoon={item} 
            onPress={navigateToDetail} 
          />
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default FavoriteScreen;
