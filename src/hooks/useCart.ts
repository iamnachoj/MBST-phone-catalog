import { useContext } from "react";
import { CartContext } from "@/context/CartContext";
import { CartItem } from "@/types/cart";

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  const { cart, setCart, loaded } = context;

  const addToCart = (item: CartItem) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (i) =>
          i.id === item.id &&
          i.color === item.color &&
          i.storage === item.storage,
      );

      if (existingIndex !== -1) {
        const updated = [...prevCart];
        const existingItem = updated[existingIndex];
        updated[existingIndex] = {
          ...existingItem,
          quantity: existingItem.quantity + item.quantity,
        };

        return updated;
      }

      return [...prevCart, item];
    });
  };

  return { cart, addToCart, loaded };
};
