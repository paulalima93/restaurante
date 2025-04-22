import React from "react";
import { View, Text, Pressable,StyleSheet } from "react-native";

export default function Home() {
    return (
        <View style={styles.container}>
            <Pressable style={styles.button}>
                <Text style={styles.buttonText}> ORDER FOOD </Text>
            </Pressable>
            <Pressable style={[styles.button, {backgroundColor: "#935025"}]}>
                <Text style={styles.buttonText}> TAKE AWAY </Text>
            </Pressable>
            <Pressable style={[styles.button, {backgroundColor: "#250001"}]}>
                <Text style={styles.buttonText}> RESERVE TABLE </Text>
            </Pressable>
            
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
    buttonText : {
        color: '#FFF',
        fontWeight: 'bold'
    }
  });