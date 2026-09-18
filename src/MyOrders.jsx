import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "./context/AuthContext";
import "./MyOrders.css";

function MyOrders() {

    const { token } = useContext(AuthContext);

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        const getOrders = async () => {

            try {

                const response = await fetch(
                    "http://localhost:5000/api/orders",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(
                        data.message || "Failed to load orders."
                    );
                }

                setOrders(data);

            } catch (error) {

                console.error(error);
                setError(error.message);

            } finally {

                setLoading(false);
            }
        };

        getOrders();

    }, [token]);


    if (loading) {
        return (
            <div className="orders-page">
                <h2>My Orders</h2>
                <p>Loading your orders...</p>
            </div>
        );
    }


    if (error) {
        return (
            <div className="orders-page">
                <h2>My Orders</h2>

                <p className="orders-error">
                    {error}
                </p>
            </div>
        );
    }


    return (
        <div className="orders-page">

            <h2>My Orders</h2>

            {orders.length === 0 ? (

                <div className="no-orders">

                    <h3>You don't have any orders yet.</h3>

                    <p>
                        Ready to order something delicious?
                    </p>

                    <Link to="/Order">
                        <button>Order Online</button>
                    </Link>

                </div>

            ) : (

                <div className="orders-list">

                    {orders.map((order) => (

                        <div
                            className="order-card"
                            key={order.order_id}
                        >

                            <div className="order-header">

                                <h3>
                                    Order #{order.order_id}
                                </h3>

                                <span
                                    className={`order-status ${order.status}`}
                                >
                                    {order.status}
                                </span>

                            </div>


                            <p>
                                <strong>Order Date:</strong>{" "}
                                {new Date(
                                    order.created_at
                                ).toLocaleDateString()}
                            </p>


                            <p>
                                <strong>Pickup Date:</strong>{" "}
                                {new Date(
                                    order.pickup_date
                                ).toLocaleDateString()}
                            </p>


                            <p>
                                <strong>Pickup Time:</strong>{" "}
                                {order.pickup_time}
                            </p>


                            <div className="order-total">

                                <strong>Total:</strong>{" "}

                                ${Number(order.total).toFixed(2)}

                            </div>


                            <Link
                                to={`/orders/${order.order_id}`}
                                className="view-order"
                            >
                                View Order
                            </Link>

                        </div>

                    ))}

                </div>

            )}

        </div>
    );
}

export default MyOrders;