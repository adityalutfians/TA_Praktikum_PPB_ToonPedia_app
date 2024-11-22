import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, ActivityIndicator, Text } from 'react-native';
import { fetchCartoons } from '../services/api';
import CartoonCard from '../components/CartoonCard';

const HomeScreen = ({ navigation }) => {
  const [cartoons, setCartoons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadCartoons = async () => {
      try {
        const data = await fetchCartoons();
        setCartoons(data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    loadCartoons();
  }, []);

  const navigateToDetail = (cartoon) => {
    navigation.navigate('Detail', { cartoon });
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text>Error memuat data: {error.message}</Text>;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={cartoons}
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
  }
});

export default HomeScreen;