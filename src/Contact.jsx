import { useEffect, useState } from "react";
import "./Contact.css";

function Contact() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState("");
    const [submitError, setSubmitError] = useState("");

    const [formData, setFormData] = useState(() => {
        const savedForm = sessionStorage.getItem("cakeInquiry");
        if (savedForm) {
            return JSON.parse(savedForm);
        }
        return {
            firstName: "",
            lastName: "",
            phone: "",
            email: "",
            orderType: "",
            occasion: "",
            flavor: "",
            servings: "",
            eventDate: "",
            message: ""
        };
    });

    const [photoPreview, setPhotoPreview] = useState(null);
    useEffect(() => {
        sessionStorage.setItem("cakeInquiry", JSON.stringify(formData));
    }, [formData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    const handlePhoto = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPhotoPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitMessage("");
        setSubmitError("");
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/contact`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(
                    data.error || "Unable to send your request."
                );
            }
            setSubmitMessage("Thank you! Your request has been sent successfully. " + "We'll get back to you within 48 hours.");
            // Clear the saved form after successful submission
            sessionStorage.removeItem("cakeInquiry");
            // Reset the form
            setFormData({
                firstName: "",
                lastName: "",
                phone: "",
                email: "",
                orderType: "",
                occasion: "",
                flavor: "",
                servings: "",
                eventDate: "",
                message: ""
            });
            setPhotoPreview(null);
        } catch (error) {
            console.error("Contact form error:", error);
            setSubmitError(error.message || "Something went wrong. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <main className="contact-page">
            <section className="contact-heading">
                <h1>Let's Create Something Sweet</h1>
                <p>
                    Tell us a little about your celebration and what
                    you're looking for. Nana will get back to you
                    about availability, details, and pricing.
                </p>
            </section>

            <div className="contact-container">
                <section className="contact-info">
                    <h2>Custom Orders</h2>
                    <p>
                        From birthdays and weddings to everyday
                        celebrations, we'd love to create something
                        special for you.
                    </p>
                    <div className="contact-detail">
                        <h3>🎂 Cakes</h3>
                        <p>
                            Custom cakes for birthdays, weddings,
                            anniversaries, graduations, and more.
                        </p>
                    </div>
                    <div className="contact-detail">

                        <h3>🧁 Cupcakes</h3>
                        <p>
                            Perfect for parties, celebrations,
                            events, or just because!
                        </p>
                    </div>
                    <div className="contact-detail">
                        <h3>✨ Custom Designs</h3>
                        <p>
                            Have a theme, color palette, or inspiration
                            in mind? Tell us about it and upload a photo.
                        </p>
                    </div>
                    <div className="contact-detail">
                        <h3>📅 Planning Ahead</h3>
                        <p>
                            Let us know your event date so Nana can
                            check availability for your order.
                        </p>
                    </div>
                </section>

                <form className="contact-form" onSubmit={handleSubmit}>
                    <h2>Request an Order</h2>
                    <div className="name-fields">
                        <div className="form-group">
                            <label htmlFor="firstName"> First Name *</label>
                            <input id="firstName" type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="lastName">Last Name *</label>
                            <input id="lastName" type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
                        </div>
                    </div>
                    <div className="name-fields">
                        <div className="form-group">
                            <label htmlFor="email"> Email *</label>
                            <input id="email" type="email" name="email" value={formData.email} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="phone">Phone Number </label>
                            <input id="phone" type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="(000) 000-0000" />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="orderType"> What would you like to order? * </label>
                        <select id="orderType" name="orderType" value={formData.orderType} onChange={handleChange} required>
                            <option value="">
                                Select an option
                            </option>
                            <option value="cake">
                                Custom Cake
                            </option>
                            <option value="cupcakes">
                                Cupcakes
                            </option>
                            <option value="cookies">
                                Cookies
                            </option>
                            <option value="other">
                                Something Else
                            </option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="occasion">
                            What's the occasion?
                        </label>
                        <select id="occasion" name="occasion" value={formData.occasion} onChange={handleChange}>
                            <option value="">
                                Select an occasion
                            </option>
                            <option value="birthday">
                                Birthday
                            </option>
                            <option value="wedding">
                                Wedding
                            </option>
                            <option value="baby-shower">
                                Baby Shower
                            </option>
                            <option value="anniversary">
                                Anniversary
                            </option>
                            <option value="graduation">
                                Graduation
                            </option>
                            <option value="engagement">
                                Engagement
                            </option>
                            <option value="other">
                                Other
                            </option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="flavor">
                            Flavor
                        </label>
                        <select id="flavor" name="flavor" value={formData.flavor} onChange={handleChange}>
                            <option value="">
                                Choose a flavor
                            </option>
                            <option value="vanilla">
                                Vanilla
                            </option>
                            <option value="chocolate">
                                Chocolate
                            </option>
                            <option value="red-velvet">
                                Red Velvet
                            </option>
                            <option value="strawberry">
                                Strawberry
                            </option>
                            <option value="lemon">
                                Lemon
                            </option>
                            <option value="other">
                                Other / Not Sure
                            </option>
                        </select>
                    </div>
                    <div className="name-fields">
                        <div className="form-group">
                            <label htmlFor="servings">
                                Number of Servings
                            </label>
                            <input id="servings" type="number" name="servings" min="1" placeholder="Example: 25" value={formData.servings} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="eventDate">
                                Event / Pickup Date *
                            </label>
                            <input id="eventDate" type="date" name="eventDate" value={formData.eventDate} onChange={handleChange} required />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="message">
                            Tell us about your order
                        </label>
                        <textarea id="message" name="message" rows="6" placeholder="Tell us about your theme, colors, decorations, writing on the cake, dietary requests, or anything else Nana should know..." value={formData.message} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="photo">
                            Inspiration Photo
                        </label>
                        <div className="photo-upload">
                            <input id="photo" type="file" accept="image/png, image/jpeg, image/webp" onChange={handlePhoto} />
                            <p>
                                Upload a photo of a cake or design
                                you love
                            </p>
                            <span>
                                JPG, PNG or WEBP
                            </span>
                            {photoPreview && (
                                <div className="image-preview">
                                    <img src={photoPreview} alt="Cake inspiration preview" />
                                </div>
                            )}
                        </div>
                    </div>
                    {submitMessage && (
                        <p className="success-message">
                            {submitMessage}
                        </p>
                    )}
                    {submitError && (
                        <p className="error-message">
                            {submitError}
                        </p>
                    )}
                    <button type="submit" disabled={isSubmitting} className="contact-button" >
                        {isSubmitting ? "Sending..." : "Send Request"}
                    </button>
                </form>
            </div>
        </main>
    );
}
export default Contact;