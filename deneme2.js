import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

// IgA data
const IgAData = [
  { min_age_months: 0, max_age_months: 1, min_val: 0, max_val: 11 },
  { min_age_months: 1, max_age_months: 4, min_val: 6, max_val: 50 },
  { min_age_months: 4, max_age_months: 7, min_val: 8, max_val: 90 },
  { min_age_months: 7, max_age_months: 13, min_val: 16, max_val: 100 },
  { min_age_months: 13, max_age_months: 36, min_val: 20, max_val: 230 },
  { min_age_months: 36, max_age_months: 60, min_val: 50, max_val: 150 },
  { min_age_months: 60, max_age_months: null, min_val: 70, max_val: 312 },
];

const BubbleShowcase = () => {
  const [age, setAge] = useState('');
  const [igAValue, setIgAValue] = useState('');
  const [result, setResult] = useState('');

  // Function to calculate if IgA value is normal, low, or high
  const checkIgA = () => {
    const parsedAge = parseInt(age, 10);
    const parsedIgA = parseInt(igAValue, 10);

    if (isNaN(parsedAge) || parsedAge <= 0) {
      setResult("Please enter a valid age.");
      return;
    }

    if (isNaN(parsedIgA) || parsedIgA < 0) {
      setResult("Please enter a valid IgA value.");
      return;
    }

    // Find the correct IgA range based on the age
    const range = IgAData.find(
      (range) =>
        (range.max_age_months === null || parsedAge <= range.max_age_months) &&
        parsedAge >= range.min_age_months
    );

    if (!range) {
      setResult("Age not within valid range.");
      return;
    }

    // Check if the IgA value is normal, low, or high
    if (parsedIgA < range.min_val) {
      setResult("Your IgA is low.");
    } else if (parsedIgA > range.max_val) {
      setResult("Your IgA is high.");
    } else {
      setResult("Your IgA is normal.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>IgA Value Checker</Text>
      
      {/* Input fields for age and IgA value */}
      <TextInput
        style={styles.input}
        placeholder="Enter your age in months"
        keyboardType="numeric"
        value={age}
        onChangeText={setAge}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Enter your IgA value"
        keyboardType="numeric"
        value={igAValue}
        onChangeText={setIgAValue}
      />
      
      <Button 
      style={styles.buton}
      title="Check IgA" onPress={checkIgA} />
      
      {/* Display the result */}
      {result && <Text style={styles.result}>{result}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    fontSize: 16,
    marginBottom: 20,
  },
  result: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
  },
  buton:{
    backgroundColor: '#FF6347',
      padding: 15,
      alignItems: 'center',
      borderRadius: 10,
  },
});

export default BubbleShowcase;
