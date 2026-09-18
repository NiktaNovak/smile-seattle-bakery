import { useContext, useEffect, useState } from "react";
import AuthContext from "./context/AuthContext";
import "./AdminDashboard.css";
import AddCake from "./AddCake";
import EditCake from "./EditCake";

function AdminDashboard() {

    const { token } = useContext(AuthContext);

    const [orders, setOrders] = useState([]);
    const [cakes, setCakes] = useState([]);
    const [editingCake, setEditingCake] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    // ==============================
    // GET ALL ORDERS
    // ==============================

    const getOrders = async () => {

        try {

            const response = await fetch("http://localhost:5000/api/orders/all",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.error || "Unable to load orders."
                );
            }

            setOrders(data);

        } catch (error) {

            console.error(error);
            setError(error.message);

        }
    };


    // ==============================
    // GET ALL CAKES
    // ==============================

    const getCakes = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/cakes/admin", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error("Failed to fetch cakes");
            }

            const data = await response.json();
            setCakes(data);
        } catch (error) {
            console.error(error);
        }
    };

    // ==============================
    // LOAD ORDERS AND CAKES
    // ==============================

    useEffect(() => {

        const loadDashboard = async () => {

            setLoading(true);
            setError("");

            await Promise.all([
                getOrders(),
                getCakes()
            ]);

            setLoading(false);
        };

        loadDashboard();

    }, [token]);


    // ==============================
    // UPDATE ORDER STATUS
    // ==============================

    const updateStatus = async (orderId, status) => {

        try {

            const response = await fetch(
                `http://localhost:5000/api/orders/${orderId}/status`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({ status })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.error || "Unable to update order."
                );
            }

            await getOrders();

        } catch (error) {

            console.error(error);
            setError(error.message);

        }
    };


    const updateAvailability = async (cakeId, available) => {

        try {

            const response = await fetch(
                `http://localhost:5000/api/cakes/${cakeId}/availability`,
                {
                    method: "PATCH",

                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },

                    body: JSON.stringify({
                        available: !available
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.error || "Unable to update cake availability."
                );
            }

            await getCakes();

        } catch (error) {

            console.error(error);
            setError(error.message);

        }
    };


    // ==============================
    // LOADING
    // ==============================

    if (loading) {

        return (
            <main className="admin-page">

                <h1>Admin Dashboard</h1>

                <p>Loading dashboard...</p>

            </main>
        );
    }


    return (
        <main className="admin-page">

            <h1>Admin Dashboard</h1>

            <p className="admin-subtitle">
                Manage customer orders and bakery cakes
            </p>


            {/* ==============================
                ERROR MESSAGE
            ============================== */}

            {error && (
                <p className="admin-error">
                    {error}
                </p>
            )}


            {/* ==============================
                ORDERS
            ============================== */}

            <section className="admin-section">

                <h2 className="admin-section-title">
                    Customer Orders
                </h2>


                {orders.length === 0 ? (

                    <div className="no-admin-orders">

                        <h2>No orders found.</h2>

                    </div>

                ) : (

                    <div className="admin-orders">

                        {orders.map((order) => (

                            <div
                                className="admin-order-card"
                                key={order.order_id}
                            >

                                <div className="admin-order-header">

                                    <h2>
                                        Order #{order.order_id}
                                    </h2>

                                    <span
                                        className={`admin-status ${order.status}`}
                                    >
                                        {order.status}
                                    </span>

                                </div>


                                <div className="admin-order-info">

                                    <p>
                                        <strong>
                                            Customer:
                                        </strong>{" "}
                                        {order.customer_name}
                                    </p>

                                    <p>
                                        <strong>
                                            Email:
                                        </strong>{" "}
                                        {order.email}
                                    </p>

                                    <p>
                                        <strong>
                                            Phone:
                                        </strong>{" "}
                                        {order.phone}
                                    </p>

                                    <p>
                                        <strong>
                                            Pickup:
                                        </strong>{" "}
                                        {new Date(
                                            order.pickup_date
                                        ).toLocaleDateString()}{" "}
                                        at {order.pickup_time}
                                    </p>

                                    <p>
                                        <strong>
                                            Total:
                                        </strong>{" "}
                                        ${Number(
                                            order.total
                                        ).toFixed(2)}
                                    </p>

                                </div>


                                <div className="admin-actions">

                                    {order.status === "pending" && (
                                        <button
                                            onClick={() =>
                                                updateStatus(
                                                    order.order_id,
                                                    "confirmed"
                                                )
                                            }
                                        >
                                            Confirm Order
                                        </button>
                                    )}


                                    {order.status === "confirmed" && (
                                        <button
                                            onClick={() =>
                                                updateStatus(
                                                    order.order_id,
                                                    "ready"
                                                )
                                            }
                                        >
                                            Mark Ready
                                        </button>
                                    )}


                                    {order.status === "ready" && (
                                        <button
                                            onClick={() =>
                                                updateStatus(
                                                    order.order_id,
                                                    "completed"
                                                )
                                            }
                                        >
                                            Mark Completed
                                        </button>
                                    )}

                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </section>


            {/* ==============================
                CAKES
            ============================== */}

            <section className="admin-section">

                <h2 className="admin-section-title">
                    Manage Cakes
                </h2>


                {cakes.length === 0 ? (

                    <div className="no-admin-cakes">

                        <h2>No cakes found.</h2>

                    </div>

                ) : (

                    <div className="admin-cakes">

                        {cakes.map((cake) => (

                            <div
                                className="admin-cake-card"
                                key={cake.cake_id}
                            >

                                <img
                                    src={cake.image_url}
                                    alt={cake.name}
                                    className="admin-cake-image"
                                />


                                <div className="admin-cake-info">

                                    <h3>
                                        {cake.name}
                                    </h3>

                                    <p className="admin-cake-category">
                                        {cake.category}
                                    </p>

                                    <p>
                                        {cake.description}
                                    </p>

                                    <p className="admin-cake-price">
                                        ${Number(
                                            cake.price
                                        ).toFixed(2)}
                                    </p>

                                    <p>
                                        <strong>
                                            Availability:
                                        </strong>{" "}

                                        {cake.available
                                            ? "Available"
                                            : "Unavailable"
                                        }
                                    </p>
                                    <button
                                        className="edit-cake-button"
                                        onClick={() => setEditingCake(cake)}
                                    >
                                        Edit
                                    </button>

                                    <button
                                        className="availability-button"
                                        onClick={() => updateAvailability(cake.cake_id, cake.available)}>
                                        {cake.available ? "Archive" : "Restore"}
                                    </button>

                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </section>

            {editingCake && (
                <section className="admin-section">

                    <EditCake
                        cake={editingCake}
                        onCakeUpdated={async () => {
                            await getCakes();
                            setEditingCake(null);
                        }}
                        onCancel={() => setEditingCake(null)}
                    />

                </section>
            )}

            <section className="admin-section">

                <AddCake onCakeAdded={getCakes} />

            </section>

        </main>
    );
}

export default AdminDashboard;