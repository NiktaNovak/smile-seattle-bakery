import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CartContext from "./context/CartContext";
import "./Order.css";

function Order() {
    const { addToCart, cartMessage } = useContext(CartContext);
    const navigate = useNavigate();
    const [cakes, setCakes] = useState([]);
    const [selectedSizes, setSelectedSizes] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/api/cakes`)
            .then(res => {
                if (!res.ok) {
                    throw new Error("Unable to load cakes.");
                }
                return res.json();
            })
            .then(data => {
                setCakes(data);
                const defaultSizes = {};
                data.forEach(cake => {
                    if (cake.sizes?.length > 0) {
                        defaultSizes[cake.cake_id] =
                            cake.sizes[0].size_id;
                    }
                });
                setSelectedSizes(defaultSizes);
                setLoading(false);
            })
            .catch(error => {
                console.log(error);
                setError("Unable to load cakes. Please try again later.");
                setLoading(false);
            });
    }, []);

    const handleSizeChange = (cakeId, sizeId) => {
        setSelectedSizes({...selectedSizes, [cakeId]: Number(sizeId)});
    };

    const handleAddToCart = (cake) => {
        const selectedSize = cake.sizes?.find( size => size.size_id === selectedSizes[cake.cake_id]);
        if (!selectedSize) return;
        addToCart({
            cake_id: cake.cake_id,
            name: cake.name,
            size_id: selectedSize.size_id,
            size_name: selectedSize.size_name,
            price: Number(selectedSize.price),
            image_url: cake.image_url
        });
    };

    return (
        <main className="order-page">

            {cartMessage && (
                <div className="cart-message">
                    {cartMessage}
                </div>
            )}

            <section className="order-heading">
                <h1>Order Online</h1>

                <p>
                    Choose your favorite treats and add them
                    to your cart.
                </p>
            </section>

            <section className="order-products">

                {loading && (
                    <p className="order-status">
                        Loading our delicious cakes...
                    </p>
                )}

                {error && (
                    <p className="order-status order-error">
                        {error}
                    </p>
                )}

                {!loading &&
                    !error &&
                    cakes.length === 0 && (
                        <p className="order-status">
                            No cakes are currently available.
                        </p>
                    )}

                {!loading &&
                    !error &&
                    cakes.map(item => {

                        const isWeddingCake =
                            item.name === "Wedding Cakes";

                        const selectedSize =
                            item.sizes?.find(
                                size =>
                                    size.size_id ===
                                    selectedSizes[item.cake_id]
                            );

                        return (
                            <div
                                className="order-card"
                                key={item.cake_id}
                            >

                                <img
                                    src={item.image_url}
                                    alt={item.name}
                                />

                                <div className="order-card-info">

                                    <h2>{item.name}</h2>

                                    {isWeddingCake ? (
                                        <p className="order-price">
                                            Custom Pricing
                                        </p>
                                    ) : item.sizes?.length > 0 ? (
                                        <>
                                            <label>
                                                Size:
                                            </label>

                                            <select
                                                value={
                                                    selectedSizes[
                                                        item.cake_id
                                                    ] || ""
                                                }
                                                onChange={e =>
                                                    handleSizeChange(
                                                        item.cake_id,
                                                        e.target.value
                                                    )
                                                }
                                            >
                                                {item.sizes.map(size => (
                                                    <option
                                                        key={size.size_id}
                                                        value={size.size_id}
                                                    >
                                                        {size.size_name} - $
                                                        {Number(
                                                            size.price
                                                        ).toFixed(2)}
                                                    </option>
                                                ))}
                                            </select>

                                            <p className="order-price">
                                                $
                                                {Number(
                                                    selectedSize?.price || 0
                                                ).toFixed(2)}
                                            </p>
                                        </>
                                    ) : (
                                        <p className="order-price">
                                            $
                                            {Number(
                                                item.price
                                            ).toFixed(2)}
                                        </p>
                                    )}

                                    <p className="order-description">
                                        {item.description}
                                    </p>

                                    <button
                                        onClick={() =>
                                            navigate(
                                                `/Cakes/${item.cake_id}`
                                            )
                                        }
                                    >
                                        Details
                                    </button>

                                    {isWeddingCake ? (
                                        <button
                                            onClick={() =>
                                                navigate("/Contact")
                                            }
                                        >
                                            Request a Quote
                                        </button>
                                    ) : item.sizes?.length > 0 ? (
                                        <button
                                            onClick={() =>
                                                handleAddToCart(item)
                                            }
                                        >
                                            Add to Cart
                                        </button>
                                    ) : null}

                                </div>
                            </div>
                        );
                    })}

            </section>
        </main>
    );
}

export default Order;