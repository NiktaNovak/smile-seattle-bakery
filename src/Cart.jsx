import { useContext } from "react";
import CartContext from "./context/CartContext";
import "./Cart.css";
import { useNavigate } from "react-router-dom";

function Cart() {
    const { cart, updateQuantity, removeFromCart } = useContext(CartContext);
    const navigate = useNavigate();
    const subtotal = cart.reduce((total, item) => total + Number(item.price) * item.quantity, 0);
    return (
        <main className="cart-page">
            <h1>Your Cart</h1>
            {cart.length === 0 ? (
                <p className="empty-cart">
                    Your cart is empty.
                </p>
            ) : (
                <>
                    <section className="cart-items">
                        {cart.map(item => (
                            <div className="cart-item" key={`${item.cake_id}-${item.size_id}`}>
                                <img src={item.image_url} alt={item.name} />
                                <div className="cart-item-info">
                                    <h2>{item.name}</h2>
                                    {item.size_name && (
                                        <p className="cart-item-size">
                                            Size: {item.size_name}
                                        </p>
                                    )}
                                    <p>
                                        ${Number(item.price).toFixed(2)}
                                    </p>
                                    <div className="quantity-controls">
                                        <button onClick={() => updateQuantity( item.cake_id,item.size_id,item.quantity - 1)}>
                                            −
                                        </button>
                                        <span>
                                            {item.quantity}
                                        </span>
                                        <button onClick={() => updateQuantity(item.cake_id,item.size_id,item.quantity + 1)}>
                                            +
                                        </button>
                                    </div>
                                    <button className="remove-btn" onClick={() =>removeFromCart(item.cake_id,item.size_id)}>
                                        Remove
                                    </button>
                                </div>
                                <p className="item-total">
                                    ${(Number(item.price) * item.quantity).toFixed(2)}
                                </p>
                            </div>
                        ))}
                    </section>

                    <section className="cart-summary">
                        <h2>Order Summary</h2>
                        <div className="summary-row">
                            <span>Subtotal</span>
                            <span>${subtotal.toFixed(2)}</span>
                        </div>
                        <div className="summary-row">
                            <span>Tax</span>
                            <span> ${(subtotal * 0.10).toFixed(2)}</span>
                        </div>
                        <div className="summary-total">
                            <span>Total</span>
                            <span> ${(subtotal * 1.10).toFixed(2)}</span>
                        </div>
                        <button className="checkout-btn" onClick={() => navigate("/Checkout")}>
                            Proceed to Checkout
                        </button>
                    </section>
                </>
            )}
        </main>
    );
}
export default Cart;