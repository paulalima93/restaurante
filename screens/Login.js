import React, {useState} from "react";
import { View, Text, TextInput, Pressable, StyleSheet, Image } from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";

export default function Login({navigation}){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    
    return(
        <View style={styles.container}> 
            <Image source={require("../assets/favicon.png")} style={styles.logo} />
            <Text style={styles.login}> Faça Login</Text>
            <View style={styles.inputArea}>
                <TextInput 
                    placeholder="Insira seu e-mail"
                    value={email}
                    style={styles.input}
                    placeholderTextColor={"#abaaaaff"}
                    onChangeText={text => setEmail(text)}
                />
                <TextInput 
                    placeholder="Insira sua senha"
                    value={password}
                    style={styles.input}
                    placeholderTextColor={"#abaaaaff"}
                    onChangeText={text => setPassword(text)}
                    secureTextEntry
                />

                <Pressable style={styles.loginButton} onPress={() => navigation.navigate('Home')}>
                    <Text style={styles.loginButtonText}> Entrar </Text>
                </Pressable>

                <Text style={styles.texto}> Ou entre com sua rede social </Text>
                <View style={styles.socialMediaArea}>
                    <Pressable>
                        <Image source={require("../assets/favicon.png")} style={styles.socialMediaIcon} />
                    </Pressable>
                    <Pressable>
                        <Image source={require("../assets/favicon.png")} style={styles.socialMediaIcon} />
                    </Pressable>
                    <Pressable>
                        <Image source={require("../assets/favicon.png")} style={styles.socialMediaIcon} />
                    </Pressable>
                </View>
                <View>
                    <Text style={styles.texto}>Não tem cadastro?</Text>
                    <Pressable onPress={() => navigation.navigate('Register')}>
                        <Text style={[styles.texto, {textDecorationLine: 'underline'}]}>Clique para cadastrar</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#151515',
    },
    logo: {
        width: 100,
        height: 100,
        marginTop: 100,
        marginBottom: 20
    },
    inputArea: {
        width: "90%",
        justifyContent: 'center',
        alignItems:"center",
        marginTop: 20
    },
    input: {
        width: "70%",
        height: 40,
        borderWidth: 1,
        borderColor: "#5a5a5aff",
        backgroundColor: "#2f2e2eff",
        marginBottom: 10,
        borderRadius: 5,
        color: "#cececeff"
    },
    login: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold'
    },
    loginButton: {
        backgroundColor: "#3b3939ff",
        borderWidth: 1,
        borderColor:"#494747ff",
        width: "50%",
        height:40,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20
    },
    loginButtonText: {
        color: "white",
        fontSize: 16
    },
    socialMediaIcon:{
        width:40, 
        height:40
    },
    socialMediaArea: {
        flexDirection: 'row',
        marginVertical: 20
    },
    texto: {
        color: '#FFF',
        fontSize: 14
    }
})