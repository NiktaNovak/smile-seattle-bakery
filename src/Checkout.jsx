import { useContext, useState } from "react";
import CartContext from "./context/CartContext";
import AuthContext from "./context/AuthContext";
import "./Checkout.css";

function Checkout() {
    const { cart } = useContext(CartContext);
    const { token, user } = useContext(AuthContext);
    const [phone, setPhone] = useState("");
    const [pickupDate, setPickupDate] = useState("");
    const [pickupTime, setPickupTime] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const subtotal = cart.reduce((total, item) => total + Number(item.price) * item.quantity, 0);
    const tax = subtotal * 0.10;
    const total = subtotal + tax;
    const orderItems = cart.map((item) => ({
        cake_id: item.cake_id,
        size_id: item.size_id,
        quantity: item.quantity
    }));

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");
        setSuccess("");
        if (cart.length === 0) {
            setError("Your cart is empty.");
            return;
        }
        if (phone.trim().length < 10) {
            setError("Please enter a valid phone number.");
            return;
        }
        if (pickupDate < new Date().toISOString().split("T")[0]) {
            setError("Pickup date cannot be in the past.");
            return;
        }
        setLoading(true);
        try {
            const paymentResponse = await fetch(`${import.meta.env.VITE_API_URL}/api/payments/create-checkout-session`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        phone,
                        pickup_date: pickupDate,
                        pickup_time: pickupTime,
                        items: orderItems
                    })
                }
            );
            const paymentData = await paymentResponse.json();
            if (!paymentResponse.ok) {
                throw new Error(paymentData.error || "Unable to start payment.");
            }
            window.location.href = paymentData.url;
        } catch (error) {
            console.error(error);
            setError(error.message);
            setLoading(false);
        }
    };

    return (
        <main className="checkout-page">
            <h1>Checkout</h1>
            <div className="checkout-container">
                <section className="checkout-form">
                    <h2>Pickup Information</h2>
                    <p className="checkout-user">
                        Ordering as: <strong>{user?.name}</strong>
                    </p>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="phone">
                                Phone Number
                            </label>
                            <input id="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="(555) 123-4567" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="pickupDate">
                                Pickup Date
                            </label>
                            <input id="pickupDate" type="date" value={pickupDate} onChange={(e) => setPickupDate(e.target.value)} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="pickupTime">
                                Pickup Time
                            </label>
                            <input id="pickupTime" type="time" value={pickupTime} onChange={(e) => setPickupTime(e.target.value)} required />
                        </div>
                        {error && (
                            <p className="checkout-error">
                                {error}
                            </p>
                        )}
                        {success && (
                            <p className="checkout-success">
                                {success}
                            </p>
                        )}
                        <button type="submit" disabled={loading} className="place-order-btn">
                            {loading ? "Placing Order..." : "Place Order"}
                        </button>
                    </form>
                </section>

                <section className="checkout-summary">
                    <h2>Your Order</h2>
                    {cart.map((item) => (
                        <div className="checkout-item" key={`${item.cake_id}-${item.size_id}`}>
                            <div>
                                <h3>{item.name}</h3>
                                {item.size_name && (
                                    <p>
                                        Size: {item.size_name}
                                    </p>
                                )}
                                <p>
                                    Quantity: {item.quantity}
                                </p>
                            </div>
                            <strong>
                                $ {(Number(item.price) * item.quantity).toFixed(2)}
                            </strong>
                        </div>
                    ))}
                    <div className="checkout-line">
                        <span>Subtotal</span>
                        <span>
                            ${subtotal.toFixed(2)}
                        </span>
                    </div>
                    <div className="checkout-line">
                        <span>Tax</span>
                        <span>
                            ${tax.toFixed(2)}
                        </span>
                    </div>
                    <div className="checkout-total">
                        <strong>Total</strong>
                        <strong>
                            ${total.toFixed(2)}
                        </strong>
                    </div>
                </section>
            </div>
        </main>
    );
}
export default Checkout;