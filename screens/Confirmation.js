import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

export default function Confirmation({ route }) {
    const { date, hour, seats } = route.params;

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Data: {new Date(date).toLocaleDateString()}</Text>
            <Text style={styles.text}>Hora: {new Date(hour).toLocaleTimeString()}</Text>
            <Text style={styles.text}>Assentos: {seats}</Text>

            <Pressable
                style={styles.confirButton}
                onPress={() => {

                }}
            >
                <Text style={styles.confirButtonText}>
                    RESERVAR
                </Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#151515",
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        color: '#FFF',
        fontSize: 20,
        textAlign: 'left',
        marginBottom: 15
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
})