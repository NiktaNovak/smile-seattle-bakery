import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AuthContext from "./context/AuthContext";
import "./OrderDetails.css";

function OrderDetails() {
    const { id } = useParams();
    const { token } = useContext(AuthContext);
    const navigate = useNavigate();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [cancelling, setCancelling] = useState(false);

    useEffect(() => {
        const getOrder = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/api/orders/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );
                const data = await response.json();
                if (!response.ok) {
                    throw new Error(
                        data.error || "Failed to load order."
                    );
                }
                setOrder(data);
            } catch (error) {
                console.error(error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        getOrder();
    }, [id, token]);

    const handleCancel = async () => {
        const confirmed = window.confirm("Are you sure you want to cancel this order?");
        if (!confirmed) {
            return;
        }
        setCancelling(true);
        setError("");
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/orders/${id}/cancel`,
                {
                    method: "PATCH",
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error || "Unable to cancel order.");
            }
            // Update the page immediately
            setOrder({...order,status: "cancelled"});
        } catch (error) {
            console.error(error);
            setError(error.message);
        } finally {
            setCancelling(false);
        }
    };

    if (loading) {
        return (
            <div className="order-details-page">
                <p>Loading order...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="order-details-page">
                <h2>Order Not Found</h2>
                <p className="order-error">{error}</p>
                <button onClick={() => navigate("/MyOrders")}>
                    Back to My Orders
                </button>
            </div>
        );
    }

    return (
        <div className="order-details-page">
            <button className="back-orders" onClick={() => navigate("/MyOrders")}>
                ← Back to My Orders
            </button>
            <h2>Order #{order.order_id}</h2>
            <div className="order-status-large">
                {order.status}
            </div>
            {order.status === "pending" && (
                <button className="cancel-order-btn" onClick={handleCancel} disabled={cancelling}>
                    {cancelling ? "Cancelling..." : "Cancel Order"}
                </button>
            )}

            <div className="order-info-card">
                <h3>Order Information</h3>
                <p>
                    <strong>Order Date:</strong>{" "}
                    {new Date(order.created_at).toLocaleDateString()}
                </p>
                <p>
                    <strong>Pickup Date:</strong>{" "}
                    {new Date(order.pickup_date).toLocaleDateString()}
                </p>
                <p>
                    <strong>Pickup Time:</strong>{" "}
                    {order.pickup_time}
                </p>
                <p>
                    <strong>Customer:</strong>{" "}
                    {order.customer_name}
                </p>
                <p>
                    <strong>Email:</strong>{" "}
                    {order.email}
                </p>
                <p>
                    <strong>Phone:</strong>{" "}
                    {order.phone}
                </p>
            </div>

            <div className="order-items-card">
                <h3>Items</h3>
                {order.items.map((item) => (
                    <div className="order-item" key={item.cake_id}>
                        <div>
                            <h4>{item.name}</h4>
                            <p>
                                Quantity: {item.quantity}
                            </p>
                        </div>
                        <div>
                            ${(Number(item.price) * item.quantity).toFixed(2)}
                        </div>
                    </div>
                ))}
            </div>

            <div className="order-summary-card">
                <h3>Order Summary</h3>
                <div>
                    <span>Subtotal</span>
                    <span>
                        ${Number(order.subtotal).toFixed(2)}
                    </span>
                </div>
                <div>
                    <span>Tax</span>
                    <span>
                        ${Number(order.tax).toFixed(2)}
                    </span>
                </div>

                <div className="order-total-row">
                    <strong>Total</strong>
                    <strong>
                        ${Number(order.total).toFixed(2)}
                    </strong>
                </div>
            </div>
        </div>
    );
}
export default OrderDetails;