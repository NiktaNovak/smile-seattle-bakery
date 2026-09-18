import { useParams, useNavigate } from "react-router-dom";
import "./Details.css";
import { useContext, useEffect, useState } from "react";
import CartContext from "./context/CartContext";

function Details() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useContext(CartContext);

    const [cake, setCake] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:5000/api/cakes/${id}`)
            .then(res => res.json())
            .then(data => setCake(data))
            .catch(error => console.log(error));
    }, [id]);

    if (!cake) {
        return <h1>Item not found</h1>;
    }

    const isWeddingCake = cake.name === "Wedding Cakes";

    const handleAddToCart = () => {
        if (!cake.sizes || cake.sizes.length === 0) return;

        const size = cake.sizes[0];

        addToCart({
            cake_id: cake.cake_id,
            name: cake.name,
            size_id: size.size_id,
            size_name: size.size_name,
            price: Number(size.price),
            image_url: cake.image_url
        });
    };

    return (
        <section className="details-page">
            <div className="details-card">

                <div className="details-image">
                    <img src={cake.image_url} alt={cake.name} />
                </div>

                <div className="details-info">
                    <h1>{cake.name}</h1>

                    <p className="details-description">
                        {cake.details}
                    </p>

                    {isWeddingCake ? (
                        <>
                            <p className="details-price">
                                Custom Pricing
                            </p>

                            <button
                                className="cart-btn"
                                onClick={() => navigate("/Contact")}
                            >
                                Request a Quote
                            </button>
                        </>
                    ) : (
                        <>
                            {cake.sizes?.length > 0 && (
                                <>
                                    <p className="details-price">
                                        Starting at $
                                        {Number(cake.sizes[0].price).toFixed(2)}
                                    </p>

                                    <button
                                        className="cart-btn"
                                        onClick={handleAddToCart}
                                    >
                                        Add to Cart
                                    </button>
                                </>
                            )}
                        </>
                    )}
                </div>

            </div>
        </section>
    );
}

export default Details;