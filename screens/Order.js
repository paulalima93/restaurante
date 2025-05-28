import React from "react";
import { View, Text, Pressable, StyleSheet, Image, TextInput } from "react-native";

export default function Order() {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.info}>
                    <Image
                        source={require('../assets/favicon.png')}
                        style={{
                            width: 30,
                            height: 30,
                            borderRadius: 20
                        }} />
                    <View style={styles.adress}>
                        <Text>Deliver to </Text>
                        <Text>Liberdade, Resende</Text>
                    </View>
                </View>
                <Image
                    source={require('../assets/favicon.png')}
                    style={{
                        width: 30,
                        height: 30,
                    }} />
            </View>
            <View style={styles.searchBar}>
                <TextInput
                    style={styles.input}
                    value="Busca"
                />
                    <Image
                    source={require('../assets/favicon.png')}
                    style={{
                        width: 20,
                        height: 20,
                        position: 'absolute',
                        right: '5%',
                        top: '55%'
                    }} />
            </View>
            <View style={styles.menu}>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginTop: 60,
        width: '90%',
    },
    buttonText: {
        color: '#FFF',
        fontWeight: 'bold'
    },
    header: {
        flexDirection: 'row',
        gap: '40%',
        justifyContent: 'space-between'
    },
    searchBar: {
        flexDirection: 'row'
    },
    menu: {

    },
    info: {
        flexDirection: 'row',
        paddingHorizontal: 20
    },
    input: {
        width: '80%',
        backgroundColor: 'gray',
        alignSelf: 'center',
        borderRadius: 15,
        paddingLeft : 15,
        marginTop: 30
    }
});