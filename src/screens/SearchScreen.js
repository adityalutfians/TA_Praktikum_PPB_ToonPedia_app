import React, { useState } from 'react';
import { View, TextInput, FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { searchCartoons } from '../services/api';
import CartoonCard from '../components/CartoonCard';

const SearchScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [noResults, setNoResults] = useState(false);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    setNoResults(false);

    try {
      const results = await searchCartoons(searchQuery);
      if (results.length === 0) {
        setNoResults(true);
      }
      setSearchResults(results);
    } catch (error) {
      console.error('Pencarian gagal:', error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleClearSearch = () => {
    setSearchQuery(''); 
    setSearchResults([]); 
    setNoResults(false); 
  };

  const navigateToDetail = (cartoon) => {
    navigation.navigate('Detail', { cartoon });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Cari kartun..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        onSubmitEditing={handleSearch}
      />
      <TouchableOpacity style={styles.clearButton} onPress={handleClearSearch}>
        <Text style={styles.clearButtonText}>Clear Search</Text>
      </TouchableOpacity>
      {isSearching ? (
        <Text style={styles.infoText}>Sedang mencari...</Text>
      ) : noResults ? (
        <Text style={styles.infoText}>Tidak ada kartun yang cocok.</Text>
      ) : (
        <FlatList
          data={searchResults}
          renderItem={({ item }) => (
            <CartoonCard 
              cartoon={item} 
              onPress={navigateToDetail} 
            />
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  clearButton: {
    backgroundColor: '#ff4d4d',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  clearButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
  infoText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#888',
    marginTop: 20,
  },
});

export default SearchScreen;
