
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';

const evaluateMeasurement = (value, ageMonths, guide, key) => {
    const ranges = guide[key];

    for (const range of ranges) {
        if (ageMonths >= range.min_age_months && ageMonths <= range.max_age_month) {
            if (value < range.min_val) {
                return { status: "Düşük", color: "blue", symbol: "↓" };
            } else if (value > range.max_val) {
                return { status: "Yüksek", color: "red", symbol: "↑" };
            } else {
                return { status: "Normal", color: "green", symbol: "↔" };
            }
        }
    }

    return { status: "Tanımsız", color: "gray", symbol: "?" };
};

const guide = {
  "IgA": [
      {"min_age_months": 0, "max_age_months": 1, "min_val": 0, "max_val": 11},
      {"min_age_months": 1, "max_age_months": 4, "min_val": 6, "max_val": 50},
      {"min_age_months": 4, "max_age_months": 7, "min_val": 8, "max_val": 90},
      {"min_age_months": 7, "max_age_months": 13, "min_val": 16, "max_val": 100},
      {"min_age_months": 13, "max_age_months": 36, "min_val": 20, "max_val": 230},
      {"min_age_months": 36, "max_age_months": 60, "min_val": 50, "max_val": 150},
      {"min_age_months": 60, "max_age_months": null, "min_val": 70, "max_val": 312}
  ],
  "IgM": [
      {"min_age_months": 0, "max_age_months": 1, "min_val": 5, "max_val": 30},
      {"min_age_months": 1, "max_age_months": 4, "min_val": 15, "max_val": 70},
      {"min_age_months": 4, "max_age_months": 7, "min_val": 10, "max_val": 90},
      {"min_age_months": 7, "max_age_months": 13, "min_val": 25, "max_val": 115},
      {"min_age_months": 13, "max_age_months": 36, "min_val": 30, "max_val": 120},
      {"min_age_months": 36, "max_age_months": 60, "min_val": 22, "max_val": 100},
      {"min_age_months": 60, "max_age_months": null, "min_val": 56, "max_val": 352}
  ],
  "IgG": [
      {"min_age_months": 0, "max_age_months": 1, "min_val": 700, "max_val": 1300},
      {"min_age_months": 1, "max_age_months": 4, "min_val": 280, "max_val": 750},
      {"min_age_months": 4, "max_age_months": 7, "min_val": 200, "max_val": 1200},
      {"min_age_months": 7, "max_age_months": 13, "min_val": 300, "max_val": 1500},
      {"min_age_months": 13, "max_age_months": 36, "min_val": 400, "max_val": 1300},
      {"min_age_months": 36, "max_age_months": 60, "min_val": 600, "max_val": 1500},
      {"min_age_months": 60, "max_age_months": null, "min_val": 639, "max_val": 1344}
  ],
  "IgG1": [
      {"min_age_months": 0, "max_age_months": 3, "min_val": 435, "max_val": 1084},
      {"min_age_months": 3, "max_age_months": 6, "min_val": 218, "max_val": 496},
      {"min_age_months": 6, "max_age_months": 12, "min_val": 143, "max_val": 394},
      {"min_age_months": 12, "max_age_months": 24, "min_val": 286, "max_val": 680},
      {"min_age_months": 24, "max_age_months": 48, "min_val": 381, "max_val": 884},
      {"min_age_months": 48, "max_age_months": 72, "min_val": 422, "max_val": 802},
      {"min_age_months": 72, "max_age_months": 120, "min_val": 456, "max_val": 938},
      {"min_age_months": 120, "max_age_months": 144, "min_val": 347, "max_val": 993},
      {"min_age_months": 144, "max_age_months": null, "min_val": 422, "max_val": 1292}
  ],
  "IgG2": [
      {"min_age_months": 0, "max_age_months": 3, "min_val": 143, "max_val": 453},
      {"min_age_months": 3, "max_age_months": 6, "min_val": 40, "max_val": 167},
      {"min_age_months": 6, "max_age_months": 12, "min_val": 23, "max_val": 147},
      {"min_age_months": 12, "max_age_months": 24, "min_val": 37, "max_val": 167},
      {"min_age_months": 24, "max_age_months": 48, "min_val": 83, "max_val": 513},
      {"min_age_months": 48, "max_age_months": 72, "min_val": 113, "max_val": 480},
      {"min_age_months": 72, "max_age_months": 120, "min_val": 163, "max_val": 513},
      {"min_age_months": 120, "max_age_months": 144, "min_val": 140, "max_val": 440},
      {"min_age_months": 144, "max_age_months": null, "min_val": 117, "max_val": 747}
  ],
  "IgG3": [
      {"min_age_months": 0, "max_age_months": 3, "min_val": 27, "max_val": 146},
      {"min_age_months": 3, "max_age_months": 6, "min_val": 4, "max_val": 23},
      {"min_age_months": 6, "max_age_months": 12, "min_val": 4, "max_val": 100},
      {"min_age_months": 12, "max_age_months": 24, "min_val": 13, "max_val": 82},
      {"min_age_months": 24, "max_age_months": 48, "min_val": 17, "max_val": 90},
      {"min_age_months": 48, "max_age_months": 72, "min_val": 15, "max_val": 133},
      {"min_age_months": 72, "max_age_months": 120, "min_val": 26, "max_val": 179},
      {"min_age_months": 120, "max_age_months": 144, "min_val": 23, "max_val": 117},
      {"min_age_months": 144, "max_age_months": null, "min_val": 41, "max_val": 129}
  ],
  "IgG4": [
      {"min_age_months": 0, "max_age_months": 3, "min_val": 1, "max_val": 47},
      {"min_age_months": 3, "max_age_months": 6, "min_val": 1, "max_val": 120},
      {"min_age_months": 6, "max_age_months": 12, "min_val": 1, "max_val": 120},
      {"min_age_months": 12, "max_age_months": 24, "min_val": 1, "max_val": 120},
      {"min_age_months": 24, "max_age_months": 48, "min_val": 2, "max_val": 112},
      {"min_age_months": 48, "max_age_months": 72, "min_val": 1, "max_val": 95},
      {"min_age_months": 72, "max_age_months": 120, "min_val": 1, "max_val": 153},
      {"min_age_months": 120, "max_age_months": 144, "min_val": 1, "max_val": 143},
      {"min_age_months": 144, "max_age_months": null, "min_val": 10, "max_val": 67}
  ]
}
;

const MeasurementScreen = () => {
    const [ageMonths, setAgeMonths] = useState('');
    const [measurements, setMeasurements] = useState({});
    const [results, setResults] = useState({});

    const handleEvaluate = (key) => {
        const value = parseFloat(measurements[key]);
        const age = parseFloat(ageMonths);
        if (!isNaN(value) && !isNaN(age)) {
            const evaluation = evaluateMeasurement(value, age, guide, key);
            setResults((prevResults) => ({
                ...prevResults,
                [key]: evaluation,
            }));
        }
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>HASTA DEĞER ÖLÇÜMÜ</Text>

            <TextInput
                style={styles.input}
                placeholder="Hastanın Yaşını ay olarak giriniz"
                keyboardType="numeric"
                value={ageMonths}
                onChangeText={setAgeMonths}
            />

            {Object.keys(guide).map((key) => (
                <View key={key} style={styles.measurementContainer}>
                    <Text style={styles.label}>{key}:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder={`${key} değeri girin`}
                        keyboardType="numeric"
                        value={measurements[key] || ''}
                        onChangeText={(value) =>
                            setMeasurements((prev) => ({ ...prev, [key]: value }))
                        }
                    />
                    <Button title={`Ölç ${key}`} onPress={() => handleEvaluate(key)} />
                    {results[key] && (
                        <Text style={{ color: results[key].color, marginTop: 5 }}>
                            {results[key].status} {results[key].symbol}
                        </Text>
                    )}
                </View>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginVertical: 10,
    },
    measurementContainer: {
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default MeasurementScreen;
