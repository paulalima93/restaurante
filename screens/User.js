
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput, Pressable, Alert } from "react-native";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import app, { db } from "../firebaseConfig";
import { getDoc, doc, updateDoc } from "firebase/firestore";

export default function User() {
  const [email, setEmail] = useState(null);
  const [nome, setNome] = useState("");
  const [endereco, setEndereco] = useState("");
  const [telefone, setTelefone] = useState("");
  const [novoNome, setNovoNome] = useState("");
  const [novoEndereco, setNovoEndereco] = useState("");
  const [novoTelefone, setNovoTelefone] = useState("");
  const [editando, setEditando] = useState("");
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
      Alert.alert("Erro")
    }
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
              <Text style={styles.info}>Nome:  {nome}</Text>
              <Text style={styles.info}>E-mail:  {email}</Text>
              <Text style={styles.info}>Endereço:  {endereco}</Text>
              <Text style={styles.info}>Telefone:  {telefone}</Text>
              <Pressable onPress={() => {
                setEditando(true);
                setNovoNome(nome);
                setNovoEndereco(endereco);
                setNovoTelefone(telefone);
              }}>
                <Text> Editar </Text>
              </Pressable>
            </>
          }
        </>
      ) : (
        <Text style={styles.info}>Nenhum usuário logado</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "stretch",
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    alignSelf: "center",
  },
  info: {
    fontSize: 16,
    color: "#333",
    paddingVertical: 16,
    paddingHorizontal: 8,
  },
  infoE: {
    fontSize: 16,
    color: "#333",
    paddingVertical: 8,
    paddingHorizontal: 8,
  },
  input: {
    fontSize: 16,
    width: 200,
    color: "#333",
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },
  editingField: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 0,
    marginBottom: 10,
  },
});