import { useContext, useEffect, useState } from "react";
import AuthContext from "./context/AuthContext";

function EditCake({ cake, onCakeUpdated, onCancel }) {
    const { token } = useContext(AuthContext);

    const [categories, setCategories] = useState([]);
    const [sizes, setSizes] = useState([]);
    const [newSize, setNewSize] = useState({
        size_name: "",
        price: ""
    });

    const [formData, setFormData] = useState({
        category_id: "",
        name: "",
        description: "",
        details: "",
        price: "",
        image_url: ""
    });

    const [error, setError] = useState("");

    // Load categories
    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/api/categories`)
            .then(res => res.json())
            .then(data => {
                if (!Array.isArray(data)) {
                    throw new Error(data.error || "Unable to load categories.");
                }
                setCategories(data);
            })
            .catch(err => setError(err.message));
    }, []);

    // Load cake information
    useEffect(() => {
        if (!cake) return;

        setFormData({
            category_id: cake.category_id || "",
            name: cake.name || "",
            description: cake.description || "",
            details: cake.details || "",
            price: cake.price || "",
            image_url: cake.image_url || ""
        });

        fetch(
            `${import.meta.env.VITE_API_URL}/api/cake-sizes/cake/${cake.cake_id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
            .then(res => res.json())
            .then(data => {
                if (!Array.isArray(data)) {
                    throw new Error(data.error || "Unable to load sizes.");
                }
                setSizes(data);
            })
            .catch(err => setError(err.message));

    }, [cake, token]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSizeChange = (sizeId, field, value) => {
        setSizes(
            sizes.map(size =>
                size.size_id === sizeId
                    ? { ...size, [field]: value }
                    : size
            )
        );
    };

    const handleAddSize = async () => {
        if (!newSize.size_name.trim() || newSize.price === "") {
            setError("Please enter a size name and price.");
            return;
        }

        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/cake-sizes`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        cake_id: cake.cake_id,
                        size_name: newSize.size_name,
                        price: Number(newSize.price)
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.error || "Unable to add cake size."
                );
            }

            setSizes([
                ...sizes,
                {
                    size_id: data.size_id,
                    cake_id: cake.cake_id,
                    size_name: newSize.size_name,
                    price: Number(newSize.price)
                }
            ]);

            setNewSize({
                size_name: "",
                price: ""
            });

            setError("");

        } catch (err) {
            setError(err.message);
        }
    };

    const handleUpdateSize = async (size) => {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/cake-sizes/${size.size_id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        size_name: size.size_name,
                        price: Number(size.price)
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.error || "Unable to update cake size."
                );
            }

            setError("");

        } catch (err) {
            setError(err.message);
        }
    };

    const handleDeleteSize = async (sizeId) => {
        if (!window.confirm("Are you sure you want to delete this size?")) {
            return;
        }

        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/cake-sizes/${sizeId}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.error || "Unable to delete cake size."
                );
            }

            setSizes(
                sizes.filter(size => size.size_id !== sizeId)
            );

            setError("");

        } catch (err) {
            setError(err.message);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/cakes/${cake.cake_id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        ...formData,
                        category_id: Number(formData.category_id),
                        price: Number(formData.price)
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.error || "Unable to update cake."
                );
            }

            onCakeUpdated();

        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="edit-cake">
            <h2>Edit Cake</h2>

            {error && (
                <p className="admin-error">{error}</p>
            )}

            <form onSubmit={handleSubmit}>

                <label>
                    Category
                    <select
                        name="category_id"
                        value={formData.category_id}
                        onChange={handleChange}
                        required
                    >
                        <option value="">
                            Select a category
                        </option>

                        {categories.map(category => (
                            <option
                                key={category.category_id}
                                value={category.category_id}
                            >
                                {category.name}
                            </option>
                        ))}
                    </select>
                </label>

                <label>
                    Cake Name
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </label>

                <label>
                    Description
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    />
                </label>

                <label>
                    Details
                    <textarea
                        name="details"
                        value={formData.details}
                        onChange={handleChange}
                    />
                </label>

                <label>
                    Base Price
                    <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        min="0.01"
                        step="0.01"
                        required
                    />
                </label>

                <label>
                    Image URL
                    <input
                        type="text"
                        name="image_url"
                        value={formData.image_url}
                        onChange={handleChange}
                    />
                </label>

                <div className="cake-size-section">
                    <h3>Sizes & Prices</h3>

                    {sizes.length === 0 ? (
                        <p>No sizes added for this cake.</p>
                    ) : (
                        sizes.map(size => (
                            <div
                                className="cake-size-row"
                                key={size.size_id}
                            >
                                <input
                                    type="text"
                                    value={size.size_name}
                                    onChange={e =>
                                        handleSizeChange(
                                            size.size_id,
                                            "size_name",
                                            e.target.value
                                        )
                                    }
                                    placeholder="Size"
                                />

                                <input
                                    type="number"
                                    value={size.price}
                                    onChange={e =>
                                        handleSizeChange(
                                            size.size_id,
                                            "price",
                                            e.target.value
                                        )
                                    }
                                    min="0.01"
                                    step="0.01"
                                    placeholder="Price"
                                />

                                <button
                                    type="button"
                                    onClick={() =>
                                        handleUpdateSize(size)
                                    }
                                >
                                    Save Size
                                </button>

                                <button
                                    type="button"
                                    onClick={() =>
                                        handleDeleteSize(size.size_id)
                                    }
                                >
                                    Delete
                                </button>
                            </div>
                        ))
                    )}

                    <div className="add-size-row">
                        <input
                            type="text"
                            value={newSize.size_name}
                            onChange={e =>
                                setNewSize({
                                    ...newSize,
                                    size_name: e.target.value
                                })
                            }
                            placeholder="New size"
                        />

                        <input
                            type="number"
                            value={newSize.price}
                            onChange={e =>
                                setNewSize({
                                    ...newSize,
                                    price: e.target.value
                                })
                            }
                            min="0.01"
                            step="0.01"
                            placeholder="Price"
                        />

                        <button
                            type="button"
                            onClick={handleAddSize}
                        >
                            Add Size
                        </button>
                    </div>
                </div>

                <div className="edit-cake-actions">
                    <button type="submit">
                        Save Changes
                    </button>

                    <button
                        type="button"
                        onClick={onCancel}
                    >
                        Cancel
                    </button>
                </div>

            </form>
        </div>
    );
}

export default EditCake;