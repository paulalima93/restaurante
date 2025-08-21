import React from "react";
import { View, Text, Pressable,StyleSheet, Image } from "react-native";
import { useNavigation } from '@react-navigation/native';
export default function Home() {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Pressable style={styles.button} onPress={() => navigation.navigate('Order')}>
                <Image source={require('../assets/img-button/1.png')} style={{width: 70, height:70}}/>
                <Text style={styles.buttonText}> ORDER FOOD </Text>
            </Pressable>
            <Pressable style={[styles.button, {backgroundColor: "#935025"}]}>
                <Image source={require('../assets/img-button/2.png')} style={styles.buttonImage}/>
                <Text style={styles.buttonText}> TAKE AWAY </Text>
            </Pressable>
            <Pressable style={[styles.button, {backgroundColor: "#250001"}]}>
                <Image source={require('../assets/img-button/3.png')} style={styles.buttonImage}/>
                <Text style={styles.buttonText}> RESERVE TABLE </Text>
            </Pressable>
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        backgroundColor: '#151515',
    },
    button: {
      backgroundColor: '#ce4257',
      alignItems: 'center',
      justifyContent: 'center',
      width: "60%",
      height: 80,
      borderRadius: 20,
      marginBottom: 20,
      flexDirection: 'row',
      gap: 30,
    },
    buttonText : {
        color: '#FFF',
        fontWeight: 'bold'
    },
    buttonImage: {
        width: 90,
        height:70
    }
  });