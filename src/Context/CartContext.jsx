import { createContext, useState } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const updateQuantity = (pokemonId, change) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === pokemonId
          ? { ...item, quantity: Math.max(item.quantity + change, 1) } // Asegura que la cantidad mínima sea 1
          : item
      )
    );
  };

  return (
    <CartContext.Provider value={{ cart, setCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
}
