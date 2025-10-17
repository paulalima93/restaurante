import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput, Pressable, Alert, Modal } from "react-native";
import { getAuth, onAuthStateChanged, verifyBeforeUpdateEmail, sendPasswordResetEmail } from "firebase/auth";
import app, { auth, db } from "../firebaseConfig";
import { getDoc, doc, updateDoc } from "firebase/firestore";

export default function User() {
  const [email, setEmail] = useState(null);
  const [nome, setNome] = useState("");
  const [endereco, setEndereco] = useState("");
  const [telefone, setTelefone] = useState("");
  const [novoNome, setNovoNome] = useState("");
  const [novoEndereco, setNovoEndereco] = useState("");
  const [novoTelefone, setNovoTelefone] = useState("");
  const [novoEmail, setNovoEmail] = useState("");
  const [editando, setEditando] = useState("");
  const [editandoEmail, setEditandoEmail] = useState("");
  const [editandoSenha, setEditandoSenha] = useState("");
  const [uid, setUID] = useState("");


  useEffect(() => {
    const auth = getAuth(app);

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      const userDoc = await getDoc(doc(db, "usuarios", user.uid));
      if (userDoc.exists()) {
        const data = userDoc.data();
        setUID(data.uid);
        setEmail(data.email);
        setNome(data.nome);
        setEndereco(data.endereco);
        setTelefone(data.telefone);
      }
    });

    return () => unsubscribe();
  }, []);

  const salvar = async () => {
    try {
      await updateDoc(doc(db, "usuarios", uid), {
        nome: novoNome,
        endereco: novoEndereco,
        telefone: novoTelefone
      });
      setNome(novoNome);
      setEndereco(novoEndereco);
      setTelefone(novoTelefone);
      setEditando(false);
    } catch (error) {
      Alert.alert("Erro");
    }
  }

  const redefinirEmail = async () => {
    const auth = getAuth();
    await verifyBeforeUpdateEmail(auth.currentUser, novoEmail).then(() => {
      Alert.alert(
        "Verifique seu e-mail",
        "Foi enviado um link para seu novo e-mail, clique nele para confirmar a troca!"
      );
    }).catch((error) => {
      Alert.alert("Erro", error.message)
    })

    await updateDoc(doc(db, "usuarios", uid), {
      email: novoEmail
    });
    setEditandoEmail(false);
  }

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
      <Text style={styles.title}>Dados do Usuário</Text>
      {email ? (
        <>

          {editando ?
            <>
              <View style={styles.editingField}>
                <Text style={styles.infoE}>Nome:</Text>
                <TextInput
                  style={styles.input}
                  value={novoNome}
                  onChangeText={setNovoNome}
                />
              </View>

              <View style={styles.editingField}>
                <Text style={styles.infoE}>E-mail:</Text>
                <TextInput
                  style={styles.input}
                  value={email}
                />
              </View>

              <View style={styles.editingField}>
                <Text style={styles.infoE}>Endereço:</Text>
                <TextInput
                  style={styles.input}
                  value={novoEndereco}
                  onChangeText={setNovoEndereco}
                />
              </View>

              <View style={styles.editingField}>
                <Text style={styles.infoE}>Telefone:</Text>
                <TextInput
                  style={styles.input}
                  value={novoTelefone}
                  onChangeText={setNovoTelefone}
                />
              </View>

              <View style={{ flexDirection: 'row' }}>
                <Pressable onPress={salvar}>
                  <Text> Salvar </Text>
                </Pressable>
                <Pressable onPress={() => {
                  setEditando(false)
                }}>
                  <Text> Cancelar </Text>
                </Pressable>
              </View>
            </>
            :

            <>
              <View style={styles.display}>
                <Text style={styles.info}>Nome: {nome}</Text>
                <Text style={styles.info}>Endereço: {endereco}</Text>
                <Text style={styles.info}>Telefone: {telefone}</Text>
                <Pressable onPress={() => {
                  setNewName(nome);
                  setNewAddress(endereco);
                  setNewPhone(telefone);
                  setEditing(true);
                }}>
                  <Text style={{
                    fontSize: 16,
                    color: "#FFF",
                    backgroundColor: "black",
                    marginVertical: 5,
                    flexDirection: "center",
                    borderWidth: 2,
                    borderRadius: 5,
                    borderColor: "white",
                    width: 55
                  }}> Editar </Text>
                </Pressable>

              </View>
            </>
          }
          {editandoEmail ?
            <>
              <View style={styles.editingField}>
                <Text style={styles.infoE}>E-Mail: </Text>
                <TextInput
                  style={styles.input}
                  value={novoEmail}
                  onChangeText={setNovoEmail}
                />
              </View>

              <View style={styles.emailbuttons}>
                <Pressable onPress={redefinirEmail}>
                  <Text>Redefinir</Text>
                </Pressable>

                <Pressable
                  style={styles.emailButton}
                  onPress={() => {
                    setEditandoEmail(false)
                  }}>
                  <Text>Cancelar</Text>
                </Pressable>
              </View>
            </>
            :
            <>
              <View style={{
                gap: 5,
                justifyContent: "center",
                alignItems: 'center',
              }}>
                <Text style={{
                  fontSize: 15,
                  color: "white",
                  paddingVertical: 8,
                  paddingHorizontal: 6,
                }}>
                  Email: {email}
                </Text>

                <Pressable style={{
                  color: "#FFF",
                  backgroundColor: "black",
                  borderWidth: 2,
                  borderRadius: 5,
                  borderColor: "white",
                  width: 50,
                  padding: 3,

                }}
                  onPress={() => {
                    setEditandoEmail(true);
                    setNovoEmail(email);
                  }}>
                  <Text style={{
                    color: "#FFF"
                  }}>Editar</Text>
                </Pressable>
              </View>
            </>
          }

          <Pressable style={{
            marginVertical: 15,
            color: "#FFF",
            backgroundColor: "black",
            borderWidth: 2,
            borderRadius: 6,
            borderColor: "white",
            width: 172,
            padding: 0.5
          }} onPress={redefinirSenha}>
            <Text style={styles.infoE}> Redefinir sua senha </Text>
          </Pressable>
        </>
      ) : (
        <Text style={styles.info}>Nenhum usuario logado</Text>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: 'center',
    backgroundColor: "#404040",
  },
  display: {
    padding: 10
  },
  emailbuttons: {
    gap: 10
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    margimBottom: 20,
    alignSelf: "center",
    color: 'white',
  },
  info: {
    fontSize: 18,
    color: "#FFF",
    paddingVertical: 16,
    paddingHorizontal: 8
  },
  input: {
    width: 200,
    borderWidth: 1,
    fontSize: 16,
    color: "#FFF",
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#FFF"
  },
  infoE: {
    fontSize: 16,
    color: "#FFF",
    paddingVertical: 6,
    paddingHorizontal: 8,
  },
  editingField: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    marginBottom: 10
  },
  emailButton: {
    color: "white",
  },
})