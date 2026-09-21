import "./Cakes.css";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import CartContext from "./context/CartContext";

function Cakes() {
    const navigate = useNavigate();
    const { addToCart, cartMessage } = useContext(CartContext);
    const [cakes, setCakes] = useState([]);
    const [selectedSizes, setSelectedSizes] = useState({});
    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/api/cakes`)
            .then(res => res.json())
            .then(data => {
                setCakes(data);
                const defaultSizes = {};
                data.forEach(cake => {
                    if (cake.sizes?.length > 0) {
                        defaultSizes[cake.cake_id] = cake.sizes[0].size_id;
                    }
                });
                setSelectedSizes(defaultSizes);
            })
            .catch(error => console.error("Error fetching cakes:", error));
    }, []);

    const categories = [...new Set(cakes.map(item => item.category))];
    const handleSizeChange = (cakeId, sizeId) => {
        setSelectedSizes({ ...selectedSizes, [cakeId]: Number(sizeId) });
    };

    const handleAddToCart = (cake) => {
        const selectedSize = cake.sizes?.find(size => size.size_id === selectedSizes[cake.cake_id]);
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
        <section className="cake-section">
            {cartMessage && (
                <div className="cart-notification">
                    {cartMessage}
                </div>
            )}
            <h1>Our Bakery Menu</h1>
            {categories.map(category => (
                <div key={category}>
                    <h2 className="category-title">
                        {category}
                    </h2>
                    <div className="cake-cards">
                        {cakes
                            .filter(item => item.category === category)
                            .map(item => {
                                const isWeddingCake = item.name === "Wedding Cakes";
                                const selectedSize = item.sizes?.find(size => size.size_id === selectedSizes[item.cake_id]);
                                return (
                                    <div className="cake" key={item.cake_id}>
                                        <img src={item.image_url} alt={item.name} />
                                        <div className="cake-info">
                                            <h2>{item.name}</h2>
                                            {isWeddingCake ? (
                                                <p className="price">
                                                    Custom Pricing
                                                </p>
                                            ) : item.sizes?.length > 0 ? (
                                                <>
                                                    <label>
                                                        Size:
                                                    </label>
                                                    <select value={selectedSizes[item.cake_id] || ""} onChange={e => handleSizeChange(item.cake_id, e.target.value)}>
                                                        {item.sizes.map(size => (
                                                            <option key={size.size_id} value={size.size_id}>
                                                                {size.size_name} - ${Number(size.price).toFixed(2)}
                                                            </option>
                                                        ))}
                                                    </select>
                                                    <p className="price">
                                                        ${Number(selectedSize?.price || 0).toFixed(2)}
                                                    </p>
                                                </>
                                            ) : (
                                                <p className="price">
                                                    ${Number(item.price).toFixed(2)}
                                                </p>
                                            )}
                                            <p>
                                                {item.description}
                                            </p>
                                            <button onClick={() => navigate(`/Cakes/${item.cake_id}`)}>
                                                Details
                                            </button>
                                            {isWeddingCake ? (
                                                <button onClick={() => navigate("/Contact")}>
                                                    Request a Quote
                                                </button>
                                            ) : item.sizes?.length > 0 ? (
                                                <button onClick={() => handleAddToCart(item)}>
                                                    Add to Cart
                                                </button>
                                            ) : null}
                                        </div>
                                    </div>
                                );
                            })}
                    </div>
                </div>
            ))}
        </section>
    );
}
export default Cakes;