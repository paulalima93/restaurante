import React, { useState } from "react";
import { View, Text, Pressable, StyleSheet, Image, TextInput, FlatList, Dimensions, Modal } from "react-native";
import { useCart } from '../components/CartContext';
import { useNavigation } from '@react-navigation/native';

import menu from './menu.json';


const { width } = Dimensions.get('window');
export default function Order() {

    const [modalVisible, setModalVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null); 
    const [quantidade, setQuantidade] = useState(1); 

    const {addItem} = useCart(); 
    const navigation = useNavigation();
    
    const aumentarQuantidade = () => setQuantidade(qtd => qtd + 1);
    const diminuirQuantidade = () => {
        if (quantidade > 1) setQuantidade(qtd => qtd - 1);
    };
    
    
    const adicionarAoCarrinho = () => {
        if (!selectedItem) return;

        const itemCarrinho = {
            ...selectedItem,
            quantidade,
            total: selectedItem.preco * quantidade
        };

        addItem(itemCarrinho);
        setQuantidade(1); 
        alert("Adicionado ao carrinho!");
    };

    const renderItem = ({ item }) => (
        <Pressable style={styles.card} onPress={() => {
            setSelectedItem(item); //
            setModalVisible(true); // 
        }}>
            <Image source={{ uri: item.imagem }} style={styles.imagem} />
            <View style={styles.infoPrato}>
                <Text style={styles.textoPrato}> {item.nome}</Text>
                <Text style={styles.textoPrato}> {item.calorias} kcal | {item.quantidade_g}g</Text>
                <Text style={styles.textoPrato}> R${item.preco.toFixed(2)}</Text>
            </View>
        </Pressable>
    )

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
                        <Text style={styles.textAdress}>Deliver to </Text>
                        <Text style={styles.textAdress}>Liberdade, Resende</Text>
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
                        right: '13%',
                        top: '55%'
                    }} />
            </View>

            <View style={styles.menu}>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={styles.menuText}> MENU </Text>
                    <Text style={styles.menuText}> SORT BY</Text>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                    <Pressable>
                        <Text style={styles.menuText}> Frequent Order</Text>
                    </Pressable>
                    <Pressable>
                        <Text style={styles.menuText}> Veg</Text>
                    </Pressable>
                    <Pressable>
                        <Text style={styles.menuText}> Chicken</Text>
                    </Pressable>
                    <Pressable>
                        <Text style={styles.menuText}> Meat</Text>
                    </Pressable>
                    <Pressable>
                        <Text style={styles.menuText}> Egg</Text>
                    </Pressable>
                    <Pressable>
                        <Text style={styles.menuText} >Fish</Text>
                    </Pressable>
                </View>

                <View style={{ width: width - 40 }}>
                    <FlatList
                        data={menu}
                        keyExtractor={(item) => item.nome}
                        renderItem={renderItem}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                    />
                </View>
            </View>

            <Modal visible={modalVisible} transparent={true} animationType="slide">
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        {selectedItem ? (
                            <View style={{ alignItems: 'center' }}>
                                <Image source={{ uri: selectedItem.imagem }} style={{ width: 200, height: 200, borderRadius: 10 }} />
                                <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 10 }}>{selectedItem.nome}</Text>
                                <Text>{selectedItem.calorias} kcal | {selectedItem.quantidade_g}g</Text>
                                <Text>Preço: R$ {selectedItem.preco.toFixed(2)}</Text>


                                {/* Seletor de quantidade */}
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10, marginBottom: 20 }}>
                                    <Pressable onPress={diminuirQuantidade} style={{ width: 40, alignItems: 'center', backgroundColor: 'tomato', borderRadius: 5 }}>
                                        <Text style={{ fontSize: 20, paddingHorizontal: 10 }}>-</Text>
                                    </Pressable>
                                    <Text style={{ marginHorizontal: 10 }}>{quantidade}</Text>
                                    <Pressable onPress={aumentarQuantidade} style={{ width: 40, alignItems: 'center', backgroundColor: 'tomato', borderRadius: 5 }}>
                                        <Text style={{ fontSize: 20, paddingHorizontal: 10 }}>+</Text>
                                    </Pressable>
                                </View>

                                {/* Botão adicionar */}
                                <Pressable style={styles.continuarComprandoButton} onPress={adicionarAoCarrinho} >
                                    <Text style={styles.continuarComprandoText}>Adicionar ao Carrinho</Text>
                                </Pressable>
                            </View>
                        ) : null}

                        <Pressable style={styles.continuarComprandoButton} onPress={() => setModalVisible(false)}>
                            <Text style={styles.continuarComprandoText}>Continuar Comprando</Text>
                        </Pressable>

                        <Pressable style={styles.verCarrinhoButton} onPress={() => {
                            setModalVisible(false)
                            navigation.navigate('Cart');
                            }}>
                            <Text style={styles.verCarrinhoText}>Ver Carrinho</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        // alignItems: 'center',
        paddingTop: 60,
        width: '100%',
        flex: 1,
        backgroundColor: '#151515',
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
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: 30,
        justifyContent: 'center'
    },
    menu: {
        alignSelf: 'center',
        width: "90%"
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
        paddingLeft: 15,
        marginTop: 30,
        height: 30
    },
    imagem: {
        width: 140,
        height: 200,
        borderRadius: 10
    },
    infoPrato: {
        backgroundColor: '#333',
        opacity: 0.7,
        position: 'absolute',
        width: 140,
        top: 120,
        height: 80,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10
    },
    textoPrato: {
        color: 'white',
    },
    card: {
        marginTop: 20,
        marginRight: 15
    },
    textAdress: {
        color: '#FFF'
    },
    menuText: {
        color: '#FFF',
        fontWeight: 'bold'
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
    },
    modalContent: {
        width: '90%',
        height: '90%',
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    continuarComprandoButton: {
        backgroundColor: 'tomato',
        padding: 10,
        borderRadius: 5,
        marginBottom: 20,
    },
    continuarComprandoText: {
        color: '#FFF',
        fontWeight: 'bold',
    },
    verCarrinhoButton: {

    },
    verCarrinhoText: {
        color: 'tomato',
        fontWeight: 'bold',
    }

});