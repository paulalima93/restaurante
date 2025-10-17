import React, { useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet, Image, Alert, Modal } from "react-native";
import { signInWithEmailAndPassword, sendPasswordResetEmail, getAuth } from "firebase/auth";
import { auth } from "../firebaseConfig";



export default function Login({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert("Erro", "Preencha todos os campos")
        }

        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigation.navigate("Home");
        } catch (error) {
            Alert.alert("Erro no login", error.message);
        }
    };

    const redefinirSenha = async () => {
        const auth = getAuth();
        await sendPasswordResetEmail(auth, email).then(() => {
            Alert.alert(
                "Verifique seu e-mail",
                "Foi enviado um link para seu e-mail, clique nele para confirmar a troca!"
            );
        }).catch((error) => {
            Alert.alert("Erro", error.message)
        })
        setEditandoSenha(false);
    }


    return (
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

                <Pressable style={styles.loginButton} onPress={() => handleLogin()}>
                    <Text style={styles.loginButtonText}> Entrar </Text>
                </Pressable>

                <View>
                    <Text style={styles.texto} >Esqueceu sua senha? </Text>
                    <Pressable onPress={() => { setModalVisible(true) }} >
                        <Text style={[styles.texto, { textDecorationLine: 'underline' }]}>Clique para recuperar</Text>
                    </Pressable>
                </View>

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
                        <Text style={[styles.texto, { textDecorationLine: 'underline' }]}>Clique para cadastrar</Text>
                    </Pressable>
                </View>
            </View>

            <Modal visible={modalVisible} transparent={true} animationType="slide">
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Pressable style={{
                            position: 'absolute',
                            backgroundColor: "#f6f7f9",
                            borderRadius: 20,
                            height: 25,
                            width: 25,
                            justifyContent: 'center',
                            alignSelf: 'center',
                            top: -8,
                            right: 10
                        }} 
                        onPress={() => {setModalVisible(false)}}
                        >
                            <Text style={{
                                textAlign: 'center',
                                fontSize: 20
                            }}> x </Text>
                        </Pressable>

                        <View style={styles.editingField}>
                            <Text style={styles.infoE}>E-mail:</Text>
                            <TextInput
                                style={styles.input2}
                                value={email}
                                onChangeText={setEmail}
                            />
                        </View>

                        <Pressable style={styles.loginButton} onPress={() => {
                            setModalVisible(false);
                            redefinirSenha()
                        }} >
                            <Text style={styles.loginButtonText}>Redefinir</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
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
        alignItems: "center",
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
        borderColor: "#494747ff",
        width: "50%",
        height: 40,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20
    },
    loginButtonText: {
        color: "white",
        fontSize: 16
    },
    socialMediaIcon: {
        width: 40,
        height: 40
    },
    socialMediaArea: {
        flexDirection: 'row',
        marginVertical: 20
    },
    texto: {
        color: '#FFF',
        fontSize: 14
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
    },
    modalContent: {
        width: '90%',
        height: '50%',
        backgroundColor: '#2d2d2dff',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    infoE: {
        fontSize: 16,
        color: "#FFF",
        paddingVertical: 6,
        paddingHorizontal: 8,
    },
    editingField: {
        flexDirection: 'collumn',
        alignItems: 'center',
        paddingVertical: 4,
        marginBottom: 10
    },
    input2: {
        width: 300,
        height: 40,
        borderWidth: 1,
        borderColor: "#5a5a5aff",
        backgroundColor: "#3c3b3bff",
        marginBottom: 10,
        borderRadius: 5,
        color: "#cececeff"
    },
})