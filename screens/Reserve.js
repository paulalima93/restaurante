import React, { useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import DateTime from '../components/DateTime';
import { useNavigation } from '@react-navigation/native';

export default function Reserve() {
    const navigation = useNavigation();
    const botoes = [2, 3, 4, 5, 6, 7, 8]

    const [date, setDate] = useState(new Date());
    const [hour, setHour] = useState(new Date());
    const [selectedSeats, setSelectedSeats] = useState(null);

    return (
        <View style={styles.container}>

            <Text style={styles.buttonText}> Reservar Mesa </Text>

            <DateTime date={date} setDate={setDate} hour={hour} setHour={setHour} />

            <Text style={styles.buttonText}>Selecione a quantidade de assentos</Text>
            <View style={{ flexDirection: 'row', gap: 5, marginTop: 10 }}>
                {botoes.map((but) => (
                    <Pressable
                        key={but}
                        style={[styles.button,
                        selectedSeats === but && { backgroundColor: "#ce4257" }
                        ]}
                        onPress={() => setSelectedSeats(but)}
                    >
                        <Text style={styles.buttonText}>{but}</Text>
                    </Pressable>
                ))}
            </View>

            <Pressable 
                style={styles.confirButton} 
                onPress={()=> {
                    navigation.navigate("Confirmation", {
                        date: date.toString(),
                        hour: hour.toString(),
                        seats: selectedSeats
                    })
                }}
            >
                <Text style={styles.confirButtonText}>
                    Confirmar
                </Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        backgroundColor: "#151515"
    },
    button: {
        backgroundColor: "gray",
        alignItems: 'center',
        justifyContent: 'center',
        width: 30,
        height: 40,
        borderRadius: 10,
        marginBottom: 20,

    },
    buttonText: {
        color: '#FFF',
        fontWeight: 'bold'
    },
    confirButton: {
        backgroundColor: "#666",
        width: "90%",
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    },
   confirButtonText: {
        color: "#FFF",
        fontSize: 24,
        fontWeight: 'bold'
    }
});