import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Button, Alert } from 'react-native';
import { useNavigation} from '@react-navigation/native';
import { useAuth } from '../context/AuthContext';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const { logout, user } = useAuth();

  const handleLogout = () => {
    Alert.alert(
      "Konfirmasi Logout",
      "Apakah Anda yakin ingin logout?",
      [
        { text: "Batal", style: "cancel" },
        {
          text: "Logout",
          onPress: async () => {
            await logout();
          },
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Profil Pengguna</Text>
      
      <View style={styles.profileInfo}>
        <View style={styles.profileImageContainer}>
          <Image
            source={{ uri: 'https://avatars.githubusercontent.com/u/129588334?s=400&v=4' }}
            style={styles.profileImage}
          />
        </View>

        <Text style={styles.subTitle}>Username</Text>
        <Text style={styles.text}>{user?.username || 'Pengguna'}</Text>

        <Text style={styles.subTitle}>Tentang Aplikasi</Text>
        <Text style={styles.text}>
          Aplikasi ini bertujuan untuk memberikan informasi dan fitur terbaik bagi pengguna dalam menjelajahi koleksi kartun.
        </Text>
        
        <Text style={styles.subTitle}>Dibuat Oleh</Text>
        <Text style={styles.text}>
          Aditya Lutfian Saputra.
        </Text>

        <View style={styles.logoutButtonContainer}>
          <Button title="Logout" color="#FF6347" onPress={handleLogout} />
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>© 2024 Aditya Lutfian Saputra. All rights reserved.</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  profileInfo: {
    marginBottom: 40,
  },
  subTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
  },
  text: {
    fontSize: 16,
    marginVertical: 5,
    textAlign: 'justify',
  },
  profileImageContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: 'black',
    overflow: 'hidden',
    marginBottom: 20,
    alignSelf: 'center',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 60,
  },
  logoutButtonContainer: {
    marginTop: 20,
    alignSelf: 'center',
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    paddingTop: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  footerText: {
    fontSize: 14,
    color: '#888',
  },
});

export default ProfileScreen;