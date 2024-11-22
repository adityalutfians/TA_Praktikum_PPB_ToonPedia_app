import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';

import { useAuth } from '../context/AuthContext';
import HomeScreen from '../screens/HomeScreen';
import DetailScreen from '../screens/DetailScreen';
import FavoriteScreen from '../screens/FavoriteScreen';
import SearchScreen from '../screens/SearchScreen';
import ProfileScreen from '../screens/ProfileScreen';
import LoginScreen from '../screens/LoginScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Stack untuk Home
const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="HomeScreen" 
        component={HomeScreen}
        options={{ 
          headerTitle: 'Home',
          headerShown: true 
        }} 
      />
      <Stack.Screen 
        name="Detail" 
        component={DetailScreen}
        options={{ 
          headerShown: true,
          headerBackTitleVisible: false
        }} 
      />
    </Stack.Navigator>
  );
};

// Stack untuk Search
const SearchStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="SearchScreen" 
        component={SearchScreen}
        options={{ 
          headerTitle: 'Search',
          headerShown: true 
        }} 
      />
      <Stack.Screen 
        name="Detail" 
        component={DetailScreen}
        options={{ 
          headerShown: true,
          headerBackTitleVisible: false
        }} 
      />
    </Stack.Navigator>
  );
};

// Stack untuk Favorites
const FavoriteStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="FavoriteScreen" 
        component={FavoriteScreen}
        options={{ 
          headerTitle: 'Favorites',
          headerShown: true 
        }} 
      />
      <Stack.Screen 
        name="Detail" 
        component={DetailScreen}
        options={{ 
          headerShown: true,
          headerBackTitleVisible: false
        }} 
      />
    </Stack.Navigator>
  );
};

// Tab Navigator
const AppTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home-outline';
          } else if (route.name === 'Search') {
            iconName = 'search-outline';
          } else if (route.name === 'Favorites') {
            iconName = 'heart-outline';
          } else if (route.name === 'Profile') {
            iconName = 'person-outline';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
        tabBarLabelStyle: {
          fontSize: 12
        },
        headerShown: false
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeStack}
      />
      <Tab.Screen
        name="Search"
        component={SearchStack}
      />
      <Tab.Screen
        name="Favorites"
        component={FavoriteStack}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: true,
          headerTitle: 'Profile'
        }}
      />
    </Tab.Navigator>
  );
};

// Stack untuk Auth (Login/Register)
const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: 'white' }
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
};

// Root Navigator
const RootNavigator = () => {
  const { user } = useAuth();

  return (
    <NavigationContainer>
      {user ? <AppTabs /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default RootNavigator;