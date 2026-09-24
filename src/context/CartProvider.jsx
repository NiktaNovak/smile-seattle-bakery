import { useState } from "react";
import CartContext from "./CartContext";

function CartProvider({ children }) {
    const [cart, setCart] = useState([]);
    const [cartMessage, setCartMessage] = useState("");
    const addToCart = (item) => {
        setCart(currentCart => {
            const existingItem = currentCart.find(cartItem => cartItem.cake_id === item.cake_id && cartItem.size_id === item.size_id);
            if (existingItem) {
                return currentCart.map(cartItem => cartItem.cake_id === item.cake_id && cartItem.size_id === item.size_id
                    ? { ...cartItem, quantity: cartItem.quantity + 1 }
                    : cartItem
                );
            }
            return [...currentCart, { ...item, quantity: 1 }];
        });
        setCartMessage(`${item.name} (${item.size_name}) added to cart!`);
        setTimeout(() => { setCartMessage(""); }, 2500);
    };

    const updateQuantity = (cakeId, sizeId, newQuantity) => {
        if (newQuantity <= 0) {
            setCart(currentCart => currentCart.filter(item => !(item.cake_id === cakeId && item.size_id === sizeId)));
            return;
        }
        setCart(currentCart => currentCart.map(item => item.cake_id === cakeId && item.size_id === sizeId
            ? {
                ...item,
                quantity: newQuantity
            }
            : item
        )
        );
    };

    const removeFromCart = (cakeId, sizeId) => {
        setCart(currentCart => currentCart.filter(item => !(item.cake_id === cakeId && item.size_id === sizeId)));
    };

    return (
        <CartContext.Provider
            value={{ cart, setCart, addToCart, updateQuantity, removeFromCart, cartMessage }}>
            {children}
        </CartContext.Provider>
    );
}
export default CartProvider;