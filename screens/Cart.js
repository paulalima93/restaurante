import React from "react";
import { View, Text, Pressable, StyleSheet, FlatList, Image } from "react-native";
import { useCart } from '../components/CartContext';

export default function Cart() {
    const { cart, increaseQuantity, decreaseQuantity, removeItem } = useCart();
    const subtotal = cart.reduce((acc, item) => acc + item.total, 0);
    const delivery = cart.length > 0 ? subtotal * 0.05 : 0;
    const total = subtotal + delivery;

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
                        <Image source={require("../assets/Trash.png")} style={{width: 20, height: 20}}/>
                    </Pressable>
                </View>
        </View>
    );

    return (
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

            <View style={styles.totalCard}>
                <>
                    <Text style={styles.itemText}>Subtotal: </Text>
                    <Text style={styles.itemPreco}>R${subtotal.toFixed(2)} </Text>
                </>
                <>
                    <Text style={styles.itemText}>Delivery: </Text>
                    <Text style={styles.itemPreco}>R${delivery.toFixed(2)} </Text>
                </>
                
                <Text style={styles.title}>Total: R${total.toFixed(2)} </Text>
            </View>

            <Pressable style={styles.orderButton}>
                <Text style={styles.orderButtonText}> ORDER NOW </Text>
            </Pressable>
        </View>
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
    totalCard: {
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