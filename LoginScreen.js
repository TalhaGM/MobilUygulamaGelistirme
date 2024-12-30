import { StyleSheet, Text, View, KeyboardAvoidingView, TextInput, TouchableOpacity, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { auth, firestore } from '../firebase';  // Firestore'u burada import ediyoruz
import { useNavigation } from '@react-navigation/native';

export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                // Kullanıcı rolüne göre yönlendirme
                firestore.collection('users').doc(user.uid).get().then((doc) => {
                    const role = doc.data().role;
                    if (role === 'admin') {
                        navigation.navigate('AdminHome');
                    } else {
                        navigation.navigate('Home');
                    }
                }).catch((error) => {
                    console.error("Error getting document:", error);
                });
            }
        });

        return unsubscribe;
    }, []);

    const handleSignUp = () => {
        auth
            .createUserWithEmailAndPassword(email, password)
            .then((userCredentials) => {
                const user = userCredentials.user;
                console.log('Kullanıcı ', user.email);
                // Kullanıcı rolünü ekleyin
                firestore.collection('users').doc(user.uid).set({
                    role: 'user', // veya 'admin'
                }).then(() => {
                    console.log('User role added');
                }).catch((error) => {
                    console.error("Error adding document:", error);
                });
            })
            .catch((error) => alert(error.message));
    };

    const handleLogin = () => {
        auth
            .signInWithEmailAndPassword(email, password)
            .then(async (userCredentials) => {
                const user = userCredentials.user;
                console.log('Kullanıcı giriş yaptı', user.email);
                // Kullanıcı rolünü al
                const userDoc = await firestore.collection('users').doc(user.uid).get();
                if (userDoc.exists) {
                    const role = userDoc.data().role;
                    if (role === 'admin') {
                        navigation.navigate('AdminHome');
                    } else {
                        navigation.navigate('Home');
                    }
                } else {
                    console.log("No such document!");
                }
            })
            .catch((error) => alert(error.message));
    };

    return (
        <KeyboardAvoidingView style={styles.container} behavior='padding'>
            <Image source={require('../assets/SakaryaHastaneLogo.png')} style={styles.logo} />
            <Text style={styles.hastaneName}>SAKARYA EĞİTİM VE ARAŞTIRMA</Text>
            <Text style={styles.hastane2Name}>HASTANESİ</Text>
            <View style={styles.inputContainer}>
                <TextInput style={styles.input} placeholder='Email'
                    value={email} onChangeText={text => setEmail(text)} />
                <TextInput style={styles.input} placeholder='Şifre'
                    value={password} onChangeText={text => setPassword(text)} secureTextEntry />
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Giriş Yap</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleSignUp} style={[styles.button, styles.outlineButton]}>
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
