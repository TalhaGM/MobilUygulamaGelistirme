import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { auth , firestore } from '../firebase';
import { useNavigation } from '@react-navigation/native';
//import firestore from '@react-native-firebase/firestore';

export default function HomeScreen() {
  const navigation = useNavigation();
  const [glucoseChecks, setGlucoseChecks] = useState([]);

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.navigate('Login');
      })
      .catch((error) => alert(error.message));
  };

  useEffect(() => {
    const fetchGlucoseChecks = async () => {
      const glucoseCheckList = [];
      const snapshot = await firestore().collection('glucoseChecks').get();
      snapshot.forEach(doc => {
        glucoseCheckList.push(doc.data());
      });
      setGlucoseChecks(glucoseCheckList);
    };
    fetchGlucoseChecks();
  }, []);

  const renderGlucoseCheck = ({ item }) => (
    <View style={styles.card}>
      <Text>Adı: {item.name}</Text>
      <Text>Yaşı: {item.age}</Text>
      <Text>Glikoz Seviyesi: {item.glucose}</Text>
      <Text>Durum: {item.status}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text>Email: {auth.currentUser?.email}</Text>
      <FlatList
        data={glucoseChecks}
        renderItem={renderGlucoseCheck}
        keyExtractor={(item, index) => index.toString()}
      />
      <TouchableOpacity onPress={handleSignOut} style={styles.button}>
        <Text style={styles.buttonText}>Çıkış Yap</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  button: {
    backgroundColor: '#FF6347',
    padding: 15,
    alignItems: 'center',
    borderRadius: 10,
    width: '60%',
    marginTop: 50,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 700,
  },
  card: {
    backgroundColor: '#f9f9f9',
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    width: '100%',
  },
});
