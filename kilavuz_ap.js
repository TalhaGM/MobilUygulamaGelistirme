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
        { "min_age_months": 0, "max_age_month": 5, "min_val": 0.07, "max_val": 0.37 },
        { "min_age_months": 5.1, "max_age_month": 9, "min_val": 0.16, "max_val": 0.50 },
        {"min_age_months": 9.1, "max_age_month": 15, "min_val": 0.27, "max_val": 0.66},
        {"min_age_months": 15.1, "max_age_month": 24, "min_val": 0.36, "max_val": 0.79},
        {"min_age_months": 24.1, "max_age_month": 48, "min_val": 0.27, "max_val": 2.46},
        {"min_age_months": 48.1, "max_age_month": 84, "min_val": 0.29, "max_val": 2.56},
        {"min_age_months": 84.1, "max_age_month": 120, "min_val": 0.34, "max_val": 2.74},
        {"min_age_months": 120.1, "max_age_month": 156, "min_val": 0.42, "max_val": 2.95},
        {"min_age_months": 156.1, "max_age_month": 192, "min_val": 0.52, "max_val": 3.19},
        {"min_age_months": 192.1, "max_age_month": 216, "min_val": 0.60, "max_val": 3.37},
        {"min_age_months": 216.1, "max_age_month": null, "min_val": 0.61, "max_val": 3.56}
    ],
    "IgM": [
        { "min_age_months": 0, "max_age_month": 5, "min_val": 0.26, "max_val": 1.22 },
        { "min_age_months": 5.1, "max_age_month": 9, "min_val": 0.32, "max_val": 1.32 },
        {"min_age_months": 9.1, "max_age_month": 15, "min_val": 0.40, "max_val": 1.43},
        {"min_age_months": 15.1, "max_age_month": 24, "min_val": 0.46, "max_val": 1.52},
        {"min_age_months": 24.1, "max_age_month": 48, "min_val": 0.37, "max_val": 1.84},
        {"min_age_months": 48.1, "max_age_month": 84, "min_val": 0.37, "max_val": 2.24},
        {"min_age_months": 84.1, "max_age_month": 120, "min_val": 0.38, "max_val": 2.51},
        {"min_age_months": 120.1, "max_age_month": 156, "min_val": 0.41, "max_val": 2.55},
        {"min_age_months": 156.1, "max_age_month": 192, "min_val": 0.45, "max_val": 2.44},
        {"min_age_months": 192.1, "max_age_month": 216, "min_val": 0.49, "max_val": 2.01},
        {"min_age_months": 216.1, "max_age_month": null, "min_val": 0.37, "max_val": 2.86}
    ],
    "IgG": [
        { "min_age_months": 0, "max_age_month": 5, "min_val": 1.0, "max_val": 1.34 },
        { "min_age_months": 5.1, "max_age_month": 9, "min_val": 1.64, "max_val": 5.88 },
        {"min_age_months": 9.1, "max_age_month": 15, "min_val": 2.46, "max_val": 9.04},
        {"min_age_months": 15.1, "max_age_month": 24, "min_val": 3.13, "max_val": 11.7},
        {"min_age_months": 24.1, "max_age_month": 48, "min_val": 2.95, "max_val": 11.56},
        {"min_age_months": 48.1, "max_age_month": 84, "min_val": 3.86, "max_val": 14.7},
        {"min_age_months": 84.1, "max_age_month": 120, "min_val": 4.62, "max_val": 16.82},
        {"min_age_months": 120.1, "max_age_month": 156, "min_val": 5.03, "max_val": 15.8},
        {"min_age_months": 156.1, "max_age_month": 192, "min_val": 5.09, "max_val": 15.8},
        {"min_age_months": 192.1, "max_age_month": 216, "min_val": 4.87, "max_val": 13.27},
        {"min_age_months": 216.1, "max_age_month": null, "min_val": 7.67, "max_val": 15.9}
    ],
    "IgG1": [
        { "min_age_months": 0, "max_age_month": 5, "min_val": 0.56, "max_val": 2.15 },
        { "min_age_months": 5.1, "max_age_month": 9, "min_val": 1.02, "max_val": 3.69 },
        {"min_age_months": 9.1, "max_age_month": 15, "min_val": 1.6, "max_val": 5.62},
        {"min_age_months": 15.1, "max_age_month": 24, "min_val": 2.09, "max_val": 7.24},
        {"min_age_months": 24.1, "max_age_month": 48, "min_val": 1.58, "max_val": 7.21},
        {"min_age_months": 48.1, "max_age_month": 84, "min_val": 2.09, "max_val": 9.02},
        {"min_age_months": 84.1, "max_age_month": 120, "min_val": 2.53, "max_val": 10.19},
        {"min_age_months": 120.1, "max_age_month": 156, "min_val": 2.8, "max_val": 10.3},
        {"min_age_months": 156.1, "max_age_month": 192, "min_val": 2.89, "max_val": 9.34},
        {"min_age_months": 192.1, "max_age_month": 216, "min_val": 2.83, "max_val": 7.72},
        {"min_age_months": 216.1, "max_age_month": null, "min_val": 3.41, "max_val": 8.94}
    ],
    "IgG2": [
        { "min_age_months": 0, "max_age_month": 5, "min_val": 0, "max_val": 0.82 },
        { "min_age_months": 5.1, "max_age_month": 9, "min_val": 0, "max_val": 0.89 },
        {"min_age_months": 9.1, "max_age_month": 15, "min_val": 0.24, "max_val": 0.98},
        {"min_age_months": 15.1, "max_age_month": 24, "min_val": 0.35, "max_val": 1.05},
        {"min_age_months": 24.1, "max_age_month": 48, "min_val": 0.39, "max_val": 1.76},
        {"min_age_months": 48.1, "max_age_month": 84, "min_val": 0.44, "max_val": 3.16},
        {"min_age_months": 84.1, "max_age_month": 120, "min_val": 0.54, "max_val": 4.35},
        {"min_age_months": 120.1, "max_age_month": 156, "min_val": 0.66, "max_val": 5.02},
        {"min_age_months": 156.1, "max_age_month": 192, "min_val": 0.82, "max_val": 5.16},
        {"min_age_months": 192.1, "max_age_month": 216, "min_val": 0.98, "max_val": 4.86},
        {"min_age_months": 216.1, "max_age_month": null, "min_val": 1.71, "max_val": 6.32}
    ],
    "IgG3": [
        { "min_age_months": 0, "max_age_month": 5, "min_val": 0.07, "max_val": 8.23 },
        { "min_age_months": 5.1, "max_age_month": 9, "min_val": 0.119, "max_val": 0.74 },
        {"min_age_months": 9.1, "max_age_month": 15, "min_val": 0.173, "max_val": 0.637},
        {"min_age_months": 15.1, "max_age_month": 24, "min_val": 0.219, "max_val": 0.550},
        {"min_age_months": 24.1, "max_age_month": 48, "min_val": 0.170, "max_val": 0.847},
        {"min_age_months": 48.1, "max_age_month": 84, "min_val": 0.108, "max_val": 0.949},
        {"min_age_months": 84.1, "max_age_month": 120, "min_val": 0.085, "max_val": 1.06},
        {"min_age_months": 120.1, "max_age_month": 156, "min_val": 0.115, "max_val": 0.53},
        {"min_age_months": 156.1, "max_age_month": 192, "min_val": 0.200, "max_val": 1.032},
        {"min_age_months": 192.1, "max_age_month": 216, "min_val": 0.313, "max_val": 0.976},
        {"min_age_months": 216.1, "max_age_month": null, "min_val": 0.184, "max_val": 1.060}
    ],
    "IgG4": [
        { "min_age_months": 0, "max_age_month": 5, "min_val": 0, "max_val": 0.198 },
        { "min_age_months": 5.1, "max_age_month": 9, "min_val": 0, "max_val": 0.208 },
        {"min_age_months": 9.1, "max_age_month": 15, "min_val": 0, "max_val": 0.220},
        {"min_age_months": 15.1, "max_age_month": 24, "min_val": 0, "max_val": 0.230},
        {"min_age_months": 24.1, "max_age_month": 48, "min_val": 0.004, "max_val": 0.491},
        {"min_age_months": 48.1, "max_age_month": 84, "min_val": 0.008, "max_val": 0.819},
        {"min_age_months": 84.1, "max_age_month": 120, "min_val": 0.010, "max_val": 1.087},
        {"min_age_months": 120.1, "max_age_month": 156, "min_val": 0.010, "max_val": 1.219},
        {"min_age_months": 156.1, "max_age_month": 192, "min_val": 0.007, "max_val": 1.217},
        {"min_age_months": 192.1, "max_age_month": 216, "min_val": 0.003, "max_val": 1.110},
        {"min_age_months": 216.1, "max_age_month": null, "min_val": 0.024, "max_val": 1.210}
    ],
};

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
