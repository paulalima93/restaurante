import React, { useEffect, useState } from "react";
import { View, Text, Pressable, StyleSheet, FlatList, Image, ScrollView, Alert } from "react-native";
import app, { db } from "../firebaseConfig";
import { getDoc, doc, collection, addDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useCart } from '../components/CartContext';
import Checkbox from "expo-checkbox";

export default function Cart() {
    const { cart, increaseQuantity, decreaseQuantity, removeItem } = useCart();
    const subtotal = cart.reduce((acc, item) => acc + item.total, 0);
    const deliveryCost = cart.length > 0 ? subtotal * 0.05 : 0;

    const [total, setTotal] = useState(delivery ? subtotal + deliveryCost : subtotal);

    const [uid, setUID] = useState("");
    const [delivery, setDelivery] = useState(false);
    const [pagamento, setPagamento] = useState("");

    const [dinheiro, setDinheiro] = useState(false);
    const [credito, setCredito] = useState(false);
    const [debito, setDebito] = useState(false);
    const [pix, setPix] = useState(false);

    useEffect(() => {
        const auth = getAuth(app);

        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            const userDoc = await getDoc(doc(db, "usuarios", user.uid));
            if (userDoc.exists()) {
                const data = userDoc.data();
                setUID(data.uid);
            }
        });

        return () => unsubscribe();
    }, []);

    const fazerPedido = async () => {
        try {
            const itens = cart.map(item => ({
                nome: item.nome,
                quantidade: item.quantidade,
                preco: item.preco,
                total: item.total
            }))

            await addDoc(collection(db, "pedidos"), {
                uid: uid,
                data: new Date(),
                itens: itens,
                subtotal: subtotal,
                deliveryCost: delivery ? deliveryCost : 0,
                delivery: delivery ? "Entregar" : "Buscar",
                total: total,
                formaPagamento: pagamento
            });
            Alert.alert("Pedido feito com sucesso.")
        } catch (error) {
            Alert.alert("Erro");
        }
    }

    const renderItem = ({ item, index }) => (
        <View style={styles.cartItem}>
            <Image source={{ uri: item.imagem }} style={{ width: 100, height: 100, borderRadius: 5 }} />

            <View style={{ flex: 1 }}>
                <Text style={styles.itemText}> {item.nome}</Text>
                <Text style={styles.itemText}>Preço: R${item.preco.toFixed(2)}</Text>
                <Text style={styles.itemText}>Total: R${item.total.toFixed(2)}</Text>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                <Pressable onPress={() => decreaseQuantity(index)} style={styles.botao}>
                    <Text style={styles.botaoText}>-</Text>
                </Pressable>
                <Text style={{ marginHorizontal: 10, color: '#fff' }}>{item.quantidade}</Text>
                <Pressable onPress={() => increaseQuantity(index)} style={styles.botao}>
                    <Text style={styles.botaoText}>+</Text>
                </Pressable>

                <Pressable onPress={() => removeItem(index)} style={{ marginLeft: 5 }}>
                    <Image source={require("../assets/Trash.png")} style={{ width: 20, height: 20 }} />
                </Pressable>
            </View>
        </View>
    );

    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.title}>Cart</Text>
                <View style={styles.items}>
                    {cart.length === 0 ? (
                        <Text style={{ textAlign: 'center', marginTop: 20 }}>Your cart is empty</Text>
                    ) : (
                        <>
                            <Text style={styles.summaryText}>Order Summary</Text>
                            <FlatList
                                data={cart}
                                renderItem={renderItem}
                                keyExtractor={(item) => item.nome}
                            />
                        </>
                    )}

                    <Text> Endereço da pessoa </Text>
                </View>

                <View style={styles.card}>
                    <Text style={styles.itemText}>Você deseja retirar o pedido no local ou receber por delivery?</Text>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Checkbox
                            value={delivery}
                            onValueChange={() => {
                                setDelivery(!delivery)
                                setTotal(!delivery ? subtotal + deliveryCost : subtotal)
                            }}
                            color={setDelivery ? "#363637" : undefined}
                        />
                        <Text style={[styles.itemText, { marginLeft: 8 }]}>Delivery</Text>
                    </View>
                </View>

                <View style={styles.card}>
                    <Text style={styles.itemText}>Qual a forma de pagamento? </Text>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Checkbox
                            value={dinheiro}
                            onValueChange={() => {
                                setDinheiro(!dinheiro)
                                setPagamento("Dinheiro")
                            }}
                            color={setDinheiro ? "#363637" : undefined}
                        />
                        <Text style={[styles.itemText, { marginLeft: 8 }]}>Dinheiro</Text>
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Checkbox
                            value={credito}
                            onValueChange={() => {
                                setCredito(!credito)
                                setPagamento("Crédito")
                            }}
                            color={setCredito ? "#363637" : undefined}
                        />
                        <Text style={[styles.itemText, { marginLeft: 8 }]}>Crédito</Text>
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Checkbox
                            value={debito}
                            onValueChange={() => {
                                setDebito(!debito)
                                setPagamento("Débito")
                            }}
                            color={setDebito ? "#363637" : undefined}
                        />
                        <Text style={[styles.itemText, { marginLeft: 8 }]}>Débito</Text>
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Checkbox
                            value={pix}
                            onValueChange={() => {
                                setPix(!pix)
                                setPagamento("Pix")
                            }}
                            color={setPix ? "#363637" : undefined}
                        />
                        <Text style={[styles.itemText, { marginLeft: 8 }]}>Pix</Text>
                    </View>
                </View>

                <View style={styles.card}>
                    <>
                        <Text style={styles.itemText}>Subtotal: </Text>
                        <Text style={styles.itemPreco}>R${subtotal.toFixed(2)} </Text>
                    </>
                    <>
                        <Text style={styles.itemText}>Delivery: </Text>
                        <Text style={styles.itemPreco}>{delivery ? `R$${deliveryCost.toFixed(2)}` : "R$0,00"}</Text>
                    </>

                    <Text style={styles.title}>Total: R${total.toFixed(2)} </Text>
                </View>

                <Pressable style={styles.orderButton} onPress={fazerPedido}>
                    <Text style={styles.orderButtonText}> FAZER PEDIDO </Text>
                </Pressable>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 60,
        width: '100%',
        flex: 1,
        backgroundColor: '#151515',
        alignItems: 'center',
    },
    title: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    cartItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        gap: 20,
        width: '100%',
    },
    itemText: {
        color: '#fff',
        fontSize: 16,
        marginVertical: 5,
    },
    summaryText: {
        color: '#fff',
        marginVertical: 5,
        fontSize: 20,
        alignSelf: "left",
        marginLeft: 20
    },
    items: {
        backgroundColor: "gray",
        borderRadius: 5,
        width: "90%",
        paddingBottom: 20,
        marginBottom: 30
    },
    botao: {
        backgroundColor: 'white',
        height: 15,
        width: 15,
        borderRadius: 2,
        alignItems: 'center',
    },
    card: {
        backgroundColor: "gray",
        borderRadius: 5,
        width: "90%",
        paddingBottom: 20,
        marginBottom: 15,
        paddingLeft: 20,
        paddingTop: 20
    },

    itemPreco: {
        color: '#fff',
        fontSize: 16,
        marginBottom: 20
    },
    orderButton: {
        backgroundColor: "#666",
        width: "90%",
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    },
    orderButtonText: {
        color: "#FFF",
        fontSize: 24,
        fontWeight: 'bold'
    }
});