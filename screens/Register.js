import React, {useState} from "react";
import { View, Text, TextInput, Pressable, StyleSheet, Image, Alert } from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";

export default function Register({navigation}){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleRegister = async () => {
        if(password != confirmPassword){
            Alert.alert("Erro", "As senhas não coincidem!");
            return;
        }

        try{
            await createUserWithEmailAndPassword(auth, email, password);
            Alert.alert("Sucesso!", "Conta criada!");
            navigation.navigate("Login");   
        } catch (error){
            Alert.alert("Erro ao cadastrar", error.message);
        }
    }

    return(
        <View style={styles.container}> 
            <Image source={require("../assets/favicon.png")} style={styles.logo} />
            <Text style={styles.login}> Criar conta </Text>
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

                <TextInput 
                    placeholder="Confirme sua senha"
                    value={confirmPassword}
                    style={styles.input}
                    placeholderTextColor={"#abaaaaff"}
                    onChangeText={text => setConfirmPassword(text)}
                    secureTextEntry
                />

                {/* <Pressable style={styles.loginButton} onPress={() => navigation.navigate('Login')}> */}
                <Pressable style={styles.loginButton} onPress={() => handleRegister()}>
                    <Text style={styles.loginButtonText}>Cadastrar</Text>
                </Pressable>

                <View>
                    <Text style={styles.texto}>Já tem uma conta?</Text>
                    <Pressable onPress={() => navigation.navigate('Login')}>
                        <Text style={[styles.texto, {textDecorationLine: 'underline'}]}>Clique para entrar</Text>
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