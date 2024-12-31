import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, FlatList } from "react-native";
import { collection, query, where, getDocs } from "firebase/firestore";
import db from "../firebase"; // Firebase bağlantısı buradan alınır

const UserScreen = () => {
  const [username, setUsername] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchUserData = async () => {
    setLoading(true);
    setResults([]);

    try {
      const usersRef = collection(db, "userMeasurements");
      const q = query(usersRef, where("username", "==", username));
      const querySnapshot = await getDocs(q);

      const data = [];
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });

      // Tarihlere göre sıralama (en yeni tarih ilk sırada)
      data.sort((a, b) => b.year - a.year);
      setResults(data);
    } catch (error) {
      console.error("Veri çekme hatası:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Kullanıcı Geçmişi</Text>
      <TextInput
        style={styles.input}
        placeholder="Kullanıcı Adı"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <Button title="Sonuçları Getir" onPress={fetchUserData} />
      {loading ? (
        <Text style={styles.loadingText}>Yükleniyor...</Text>
      ) : (
        <FlatList
          data={results}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.resultContainer}>
              <Text style={styles.resultText}>
                {item.year}: {item.value}
              </Text>
            </View>
          )}
          ListEmptyComponent={<Text style={styles.emptyText}>Sonuç bulunamadı.</Text>}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  loadingText: {
    textAlign: "center",
    marginVertical: 20,
    color: "#999",
  },
  resultContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  resultText: {
    fontSize: 16,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 20,
    color: "#999",
  },
});

export default UserScreen;
