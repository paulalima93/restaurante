import React, {createContext, useContext, useState} from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addItem = (item) => {
    // Verifica se já existe
    const index = cart.findIndex((i) => i.nome === item.nome);
    if (index !== -1) {
      const updatedCart = [...cart];
      updatedCart[index].quantidade += item.quantidade;
      updatedCart[index].total = updatedCart[index].quantidade * updatedCart[index].preco;
      setCart(updatedCart);
    } else {
      setCart((prev) => [...prev, item]);
    }
  };

  const increaseQuantity = (index) => {
    setCart((prev) =>
      prev.map((item, i) =>
        i === index
          ? { ...item, quantidade: item.quantidade + 1, total: (item.quantidade + 1) * item.preco }
          : item
      )
    );
  };

  const decreaseQuantity = (index) => {
    setCart((prev) =>
      prev.map((item, i) => {
        if (i === index && item.quantidade > 1) {
          const novaQtd = item.quantidade - 1;
          return { ...item, quantidade: novaQtd, total: novaQtd * item.preco };
        }
        return item;
      })
    );
  };

  const removeItem = (index) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <CartContext.Provider value={{ cart, addItem, removeItem, increaseQuantity, decreaseQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

export function useCart() {
    return useContext(CartContext);
}