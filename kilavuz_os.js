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
      {"min_age_months": 0, "max_age_months": 1, "min_val": 5, "max_val": 6},
      {"min_age_months": 1, "max_age_months": 5, "min_val": 0, "max_val": 40},
      {"min_age_months": 6, "max_age_months": 8, "min_val": -2, "max_val": 48},
      {"min_age_months": 9, "max_age_months": 12, "min_val": 15, "max_val": 68},
      {"min_age_months": 13, "max_age_months": 24, "min_val": 27, "max_val": 73},
      {"min_age_months": 25, "max_age_months": 36, "min_val": 31, "max_val": 79},
      {"min_age_months": 37, "max_age_months": 48, "min_val": 46, "max_val": 92},
      {"min_age_months": 49, "max_age_months": 72, "min_val": 72, "max_val": 114},
      {"min_age_months": 73, "max_age_months": 96, "min_val": 66, "max_val": 150},
      {"min_age_months": 97, "max_age_months": 120, "min_val": 71, "max_val": 163},
      {"min_age_months": 121, "max_age_months": 144, "min_val": 73, "max_val": 159},
      {"min_age_months": 145, "max_age_months": 168, "min_val": 81, "max_val": 179},
      {"min_age_months": 169, "max_age_months": 192, "min_val": 80, "max_val": 138},
      {"min_age_months": 193, "max_age_months": null, "min_val": 66, "max_val": 176}
  ],
  "IgM": [
      {"min_age_months": 0, "max_age_months": 1, "min_val": 15, "max_val": 22},
      {"min_age_months": 1, "max_age_months": 5, "min_val": 20, "max_val": 95},
      {"min_age_months": 6, "max_age_months": 8, "min_val": 29, "max_val": 107},
      {"min_age_months": 9, "max_age_months": 12, "min_val": 46, "max_val": 126},
      {"min_age_months": 13, "max_age_months": 24, "min_val": 58, "max_val": 139},
      {"min_age_months": 25, "max_age_months": 36, "min_val": 59, "max_val": 125},
      {"min_age_months": 37, "max_age_months": 48, "min_val": 51, "max_val": 121},
      {"min_age_months": 49, "max_age_months": 72, "min_val": 65, "max_val": 145},
      {"min_age_months": 73, "max_age_months": 96, "min_val": 55, "max_val": 139},
      {"min_age_months": 97, "max_age_months": 120, "min_val": 65, "max_val": 122},
      {"min_age_months": 121, "max_age_months": 144, "min_val": 63, "max_val": 141},
      {"min_age_months": 145, "max_age_months": 168, "min_val": 78, "max_val": 163},
      {"min_age_months": 169, "max_age_months": 192, "min_val": 75, "max_val": 124},
      {"min_age_months": 193, "max_age_months": null, "min_val": 87, "max_val": 174}
  ],
  "IgG": [
      {"min_age_months": 0, "max_age_months": 1, "min_val": 654, "max_val": 1114},
      {"min_age_months": 1, "max_age_months": 5, "min_val": 281, "max_val": 667},
      {"min_age_months": 6, "max_age_months": 8, "min_val": 374, "max_val": 790},
      {"min_age_months": 9, "max_age_months": 12, "min_val": 512, "max_val": 874},
      {"min_age_months": 13, "max_age_months": 24, "min_val": 574, "max_val": 974},
      {"min_age_months": 25, "max_age_months": 36, "min_val": 614, "max_val": 1030},
      {"min_age_months": 37, "max_age_months": 48, "min_val": 723, "max_val": 1037},
      {"min_age_months": 49, "max_age_months": 72, "min_val": 776, "max_val": 1196},
      {"min_age_months": 73, "max_age_months": 96, "min_val": 838, "max_val": 1244},
      {"min_age_months": 97, "max_age_months": 120, "min_val": 824, "max_val": 1302},
      {"min_age_months": 121, "max_age_months": 144, "min_val": 823, "max_val": 1281},
      {"min_age_months": 145, "max_age_months": 168, "min_val": 852, "max_val": 1324},
      {"min_age_months": 169, "max_age_months": 192, "min_val": 773, "max_val": 1189},
      {"min_age_months": 193, "max_age_months": null, "min_val": 945, "max_val": 1505}
  ],
  "Ig1": [
      {"min_age_months": 0, "max_age_months": 1, "min_val": 523, "max_val": 827},
      {"min_age_months": 1, "max_age_months": 5, "min_val": 206, "max_val": 432},
      {"min_age_months": 6, "max_age_months": 8, "min_val": 297, "max_val": 673},
      {"min_age_months": 9, "max_age_months": 12, "min_val": 322, "max_val": 802},
      {"min_age_months": 13, "max_age_months": 24, "min_val": 429, "max_val": 1013},
      {"min_age_months": 25, "max_age_months": 36, "min_val": 451, "max_val": 1021},
      {"min_age_months": 37, "max_age_months": 48, "min_val": 516, "max_val": 1008},
      {"min_age_months": 49, "max_age_months": 72, "min_val": 579, "max_val": 931},
      {"min_age_months": 73, "max_age_months": 96, "min_val": 525, "max_val": 1087},
      {"min_age_months": 97, "max_age_months": 120, "min_val": 624, "max_val": 1096},
      {"min_age_months": 121, "max_age_months": 144, "min_val": 601, "max_val": 1083},
      {"min_age_months": 145, "max_age_months": 168, "min_val": 518, "max_val": 1226},
      {"min_age_months": 169, "max_age_months": 192, "min_val": 527, "max_val": 1065},
      {"min_age_months": 193, "max_age_months": null, "min_val": 643, "max_val": 1071}
  ],
  "Ig2": [
      {"min_age_months": 0, "max_age_months": 1, "min_val": 106, "max_val": 206},
      {"min_age_months": 1, "max_age_months": 5, "min_val": 33, "max_val": 85},
      {"min_age_months": 6, "max_age_months": 8, "min_val": 30, "max_val": 104},
      {"min_age_months": 9, "max_age_months": 12, "min_val": 29, "max_val": 99},
      {"min_age_months": 13, "max_age_months": 24, "min_val": 44, "max_val": 142},
      {"min_age_months": 25, "max_age_months": 36, "min_val": 30, "max_val": 200},
      {"min_age_months": 37, "max_age_months": 48, "min_val": 76, "max_val": 246},
      {"min_age_months": 49, "max_age_months": 72, "min_val": 89, "max_val": 245},
      {"min_age_months": 73, "max_age_months": 96, "min_val": 93, "max_val": 335},
      {"min_age_months": 97, "max_age_months": 120, "min_val": 90, "max_val": 338},
      {"min_age_months": 121, "max_age_months": 144, "min_val": 191, "max_val": 367},
      {"min_age_months": 145, "max_age_months": 168, "min_val": 204, "max_val": 354},
      {"min_age_months": 169, "max_age_months": 192, "min_val": 179, "max_val": 435}
  ],
  "Ig3": [
      {"min_age_months": 0, "max_age_months": 1, "min_val": 21, "max_val": 47},
      {"min_age_months": 1, "max_age_months": 5, "min_val": 11, "max_val": 23},
      {"min_age_months": 6, "max_age_months": 8, "min_val": 14, "max_val": 32},
      {"min_age_months": 9, "max_age_months": 12, "min_val": 13, "max_val": 27},
      {"min_age_months": 13, "max_age_months": 24, "min_val": 17, "max_val": 31},
      {"min_age_months": 25, "max_age_months": 36, "min_val": 20, "max_val": 36},
      {"min_age_months": 37, "max_age_months": 48, "min_val": 24, "max_val": 48},
      {"min_age_months": 49, "max_age_months": 72, "min_val": 28, "max_val": 54},
      {"min_age_months": 73, "max_age_months": 96, "min_val": 29, "max_val": 61},
      {"min_age_months": 97, "max_age_months": 120, "min_val": 34, "max_val": 64},
      {"min_age_months": 121, "max_age_months": 144, "min_val": 36, "max_val": 70},
      {"min_age_months": 145, "max_age_months": 168, "min_val": 37, "max_val": 69},
      {"min_age_months": 169, "max_age_months": 192, "min_val": 35, "max_val": 77}
  ],
  "Ig4": [
      {"min_age_months": 0, "max_age_months": 1, "min_val": 1, "max_val": 6},
      {"min_age_months": 1, "max_age_months": 5, "min_val": 2, "max_val": 8},
      {"min_age_months": 6, "max_age_months": 8, "min_val": 2, "max_val": 10},
      {"min_age_months": 9, "max_age_months": 12, "min_val": 3, "max_val": 12},
      {"min_age_months": 13, "max_age_months": 24, "min_val": 4, "max_val": 16},
      {"min_age_months": 25, "max_age_months": 36, "min_val": 5, "max_val": 18},
      {"min_age_months": 37, "max_age_months": 48, "min_val": 6, "max_val": 22},
      {"min_age_months": 49, "max_age_months": 72, "min_val": 7, "max_val": 24},
      {"min_age_months": 73, "max_age_months": 96, "min_val": 8, "max_val": 26},
      {"min_age_months": 97, "max_age_months": 120, "min_val": 8, "max_val": 28},
      {"min_age_months": 121, "max_age_months": 144, "min_val": 9, "max_val": 30},
      {"min_age_months": 145, "max_age_months": 168, "min_val": 10, "max_val": 32},
      {"min_age_months": 169, "max_age_months": 192, "min_val": 11, "max_val": 34}
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
