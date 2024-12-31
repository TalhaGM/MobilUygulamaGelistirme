import { StyleSheet, Text, View, KeyboardAvoidingView, TextInput, TouchableOpacity, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigation } from '@react-navigation/native';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.replace('Drawer');
      }
    });

    return unsubscribe;
  }, []);

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (email === 'admin@sakarya.edu.tr' && password === '123456') {
        console.log("Admin giriş yaptı:", user.email);
        navigation.replace('AdminScreen');
      } else {
        console.log("Kullanıcı giriş yaptı:", user.email);
        navigation.replace('UserScreen');
      }
    } catch (error) {
      console.error("Giriş hatası:", error.message);
      alert("Giriş başarısız: " + error.message);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior='padding'>
      <Image source={require('../assets/SakaryaHastaneLogo.png')} style={styles.logo} />
      <Text style={styles.hastaneName}>SAKARYA EĞİTİM VE ARAŞTIRMA</Text>
      <Text style={styles.hastane2Name}>HASTANESİ</Text>
      <View style={styles.inputContainer}>
        <TextInput 
          style={styles.input} 
          placeholder='Email'
          value={email} 
          onChangeText={text => setEmail(text)} 
        />
        <TextInput 
          style={styles.input} 
          placeholder='Şifre'
          value={password} 
          onChangeText={text => setPassword(text)} 
          secureTextEntry 
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Giriş Yap</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={() => navigation.navigate('SignUpScreen')} 
          style={[styles.button, styles.outlineButton]}
        >
          <Text style={styles.outlineButtonText}>Kayıt Ol!</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  hastaneName: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  hastane2Name: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  inputContainer: {
    width: '80%',
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginTop: 5,
    borderRadius: 10,
  },
  buttonContainer: {
    width: '60%',
    marginTop: 40,
  },
  button: {
    backgroundColor: '#FF6347',
    padding: 15,
    alignItems: 'center',
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
  },
  outlineButton: {
    backgroundColor: 'white',
    marginTop: 5,
  },
  outlineButtonText: {
    color: '#FF6347',
    fontSize: 16,
    fontWeight: '700',
  },
});
