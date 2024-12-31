import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';

export default function AdminScreen() {
  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log('Kullanıcı çıkış yaptı.');
      navigation.replace('LoginScreen'); 
    } catch (error) {
      console.error('Çıkış hatası:', error.message);
      alert('Çıkış sırasında bir hata oluştu: ' + error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/SakaryaHastaneisim.png')} style={styles.logo} />
      <Text style={styles.title}>HOŞGELDİN DOKTOR ÖMER</Text>
      <Text style={styles.title2}>Lütfen klavuz seçiniz</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('KilavuzAP')}>
        <Text style={styles.buttonText}>Kılavuz AP</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('KilavuzCilv')}>
        <Text style={styles.buttonText}>Kılavuz CILV</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('KilavuzOS')}>
        <Text style={styles.buttonText}>Kılavuz OS</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Çıkış Yap</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start', 
    alignItems: 'center',         
    paddingTop: 30,               
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  title2: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  logoutButton: {
    backgroundColor: '#FF6347',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  logo: {
    width: 400,
    height: 200,
    marginBottom: 20,
    
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
  },
  button: {
    backgroundColor: '#cfb66f',
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

