import { useContext, useEffect, useState } from "react";
import AuthContext from "./context/AuthContext";

function AddCake({ onCakeAdded }) {

    const { token } = useContext(AuthContext);

    const [categories, setCategories] = useState([]);

    const [formData, setFormData] = useState({
        category_id: "",
        name: "",
        description: "",
        details: "",
        price: "",
        image_url: ""
    });

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");


    // ==============================
    // GET CATEGORIES
    // ==============================

    useEffect(() => {

        const getCategories = async () => {

            try {

                const response = await fetch(
                    "http://localhost:5000/api/categories"
                );

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(
                        data.error || "Unable to load categories."
                    );
                }

                setCategories(data);

            } catch (error) {

                console.error(error);
                setError(error.message);

            }
        };

        getCategories();

    }, []);


    // ==============================
    // HANDLE INPUT CHANGES
    // ==============================

    const handleChange = (event) => {

        const { name, value } = event.target;

        setFormData({
            ...formData,
            [name]: value
        });
    };


    // ==============================
    // SUBMIT FORM
    // ==============================

    const handleSubmit = async (event) => {

        event.preventDefault();

        setMessage("");
        setError("");

        try {

            const response = await fetch(
                "http://localhost:5000/api/cakes",
                {
                    method: "POST",

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
                    data.error || "Unable to create cake.");
            }

            setMessage("Cake added successfully!");

            setFormData({
                category_id: "",
                name: "",
                description: "",
                details: "",
                price: "",
                image_url: ""
            });
            onCakeAdded();

        } catch (error) {

            console.error(error);
            setError(error.message);

        }
    };


    return (
        <div className="add-cake">

            <h2>Add New Cake</h2>


            {message && (
                <p className="success-message">
                    {message}
                </p>
            )}


            {error && (
                <p className="admin-error">
                    {error}
                </p>
            )}


            <form onSubmit={handleSubmit}>

                {/* Category */}

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

                        {categories.map((category) => (

                            <option
                                key={category.category_id}
                                value={category.category_id}
                            >
                                {category.name}
                            </option>

                        ))}

                    </select>

                </label>


                {/* Cake Name */}

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


                {/* Description */}

                <label>
                    Description

                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    />
                </label>


                {/* Details */}

                <label>
                    Details

                    <textarea
                        name="details"
                        value={formData.details}
                        onChange={handleChange}
                    />
                </label>


                {/* Price */}

                <label>
                    Price

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


                {/* Image URL */}

                <label>
                    Image URL

                    <input
                        type="text"
                        name="image_url"
                        value={formData.image_url}
                        onChange={handleChange}
                        placeholder="/images/example.jpg"
                    />
                </label>


                <button type="submit">
                    Add Cake
                </button>

            </form>

        </div>
    );
}

export default AddCake;