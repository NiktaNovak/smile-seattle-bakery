import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import CartContext from "./context/CartContext";
import "./CheckoutSuccess.css";

function CheckoutSuccess() {
    const { setCart } = useContext(CartContext);
    useEffect(() => {
        setCart([]);
    }, [setCart]);
    return (
        <main className="checkout-success-page">
            <div className="checkout-success-card">
                <div className="success-icon">✓</div>
                <h1>Thank You!</h1>
                <h2>Your payment was successful.</h2>
                <p>
                    Your payment has been received.
                    We'll take care of the rest!
                </p>
                <Link to="/MyOrders" className="success-button">
                    View My Orders
                </Link>
                <Link to="/" className="success-home">
                    Back to Home
                </Link>
            </div>
        </main>
    );
}
export default CheckoutSuccess;