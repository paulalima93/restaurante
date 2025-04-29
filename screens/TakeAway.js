import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";

export default function TakeAway() {
    return (
        <View style={styles.container}>
            <Text style={styles.buttonText}> Levar </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center'
    },
    button: {
        backgroundColor: '#ce4257',
        alignItems: 'center',
        justifyContent: 'center',
        width: "60%",
        height: 80,
        borderRadius: 20,
        marginBottom: 20
    },
    buttonText: {
        color: '#FFF',
        fontWeight: 'bold'
    }
});