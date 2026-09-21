import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
// FORMAT DATE
const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric"
    });
};

// FORMAT TIME
const formatTime = (time) => {
    const [hours, minutes] = time.split(":");
    const date = new Date();
    date.setHours(hours, minutes);
    return date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit"
    });
};

// CUSTOMER CONFIRMATION EMAIL
export const sendOrderConfirmation = async (order) => {
    try {
        await resend.emails.send({
            from: "Smile Seattle Bakery <onboarding@resend.dev>",
            to: order.email,
            subject: `Order #${order.order_id} Confirmation`,
            html: `
                <div style=" font-family: Arial, sans-serif; max-width: 650px; margin: auto; color: #4e342e; line-height: 1.6;">

                    <h1 style="color: #8b4513;"> Thank You for Your Order! 🍰</h1>
                    <p>
                        Hi ${order.customer_name},
                    </p>
                    <p>
                        Thank you for ordering from
                        <strong>Smile Seattle Bakery</strong>!
                        Your payment has been successfully received
                        and your order is confirmed.
                    </p>
                    <hr>
                    <h2>Order #${order.order_id}</h2>
                    <h3>Pickup Information</h3>
                    <p>
                        <strong>Pickup Date:</strong>
                        ${formatDate(order.pickup_date)}
                    </p>
                    <p>
                        <strong>Pickup Time:</strong>
                        ${formatTime(order.pickup_time)}
                    </p>
                    <h3>Your Order</h3>
                    ${order.items.map(item => `
                        <p>
                            <strong>${item.name}</strong>
                            ${item.size_name ? `(${item.size_name})` : ""}
                            × ${item.quantity}
                            — $${Number(item.price).toFixed(2)} each
                        </p>

                    `).join("")}
                    <h3>Payment</h3>
                    <p>
                        <strong>Payment Status:</strong>
                        ${order.payment_status}
                    </p>
                    <p>
                        <strong>Subtotal:</strong>
                        $${Number(order.subtotal).toFixed(2)}
                    </p>
                    <p>
                        <strong>Tax:</strong>
                        $${Number(order.tax).toFixed(2)}
                    </p>
                    <p style="font-size: 18px;">
                        <strong>Total:</strong>
                        $${Number(order.total).toFixed(2)}
                    </p>
                    <hr>
                    <h3>What Happens Next?</h3>
                    <p>
                        Your order is now confirmed and will be prepared
                        by Nana.
                    </p>
                    <p>
                        Once your order is ready for pickup, you will
                        receive an <strong>email or text notification</strong>
                        letting you know that it is ready.
                    </p>
                    <p>
                        Please keep an eye on your email and phone as your
                        pickup date approaches.
                    </p>
                    <p>
                        We look forward to making something sweet for you!
                        💕
                    </p>
                    <p>
                        — Smile Seattle Bakery
                    </p>
                </div>
            `
        });
        console.log(`Confirmation email sent for Order #${order.order_id}`);
    } catch (error) {
        console.error("Customer email error:", error);
    }
};

// BAKERY OWNER NOTIFICATION
export const sendNewOrderNotification = async (order) => {
    try {
        await resend.emails.send({
            from: "Smile Seattle Bakery <onboarding@resend.dev>",
            to: process.env.BAKERY_OWNER_EMAIL,
            subject: `🍰 New Order #${order.order_id}`,
            html: `
                <div style=" font-family: Arial, sans-serif; max-width: 700px; margin: auto; color: #4e342e; line-height: 1.6;">
                    <h1 style="color: #8b4513;">
                        New Bakery Order! 🍰
                    </h1>
                    <p>
                        A new order has been successfully paid for
                        through Stripe.
                    </p>
                    <hr>
                    <h2>Order #${order.order_id}</h2>
                    <h3>Customer Information</h3>
                    <p>
                        <strong>Name:</strong>
                        ${order.customer_name}
                    </p>
                    <p>
                        <strong>Email:</strong>
                        ${order.email}
                    </p>
                    <p>
                        <strong>Phone:</strong>
                        ${order.phone}
                    </p>
                    <h3>Pickup Information</h3>
                    <p>
                        <strong>Date:</strong>
                        ${formatDate(order.pickup_date)}
                    </p>
                    <p>
                        <strong>Time:</strong>
                        ${formatTime(order.pickup_time)}
                    </p>
                    <h3>Order Details</h3>
                    ${order.items.map(item => `
                        <p>
                            <strong>${item.name}</strong>
                            ${item.size_name ? `(${item.size_name})` : ""}
                            × ${item.quantity}
                            — $${Number(item.price).toFixed(2)} each
                        </p>
                    `).join("")}
                    <h3>Payment Information</h3>
                    <p>
                        <strong>Payment Status:</strong>
                        ${order.payment_status}
                    </p>
                    <p>
                        <strong>Stripe Payment ID:</strong>
                        ${order.stripe_payment_id || "N/A"}
                    </p>
                    <p>
                        <strong>Subtotal:</strong>
                        $${Number(order.subtotal).toFixed(2)}
                    </p>
                    <p>
                        <strong>Tax:</strong>
                        $${Number(order.tax).toFixed(2)}
                    </p>
                    <p style="font-size: 18px;">
                        <strong>Total:</strong>
                        $${Number(order.total).toFixed(2)}
                    </p>
                    <h3>Order Status</h3>
                    <p>
                        <strong>${order.status}</strong>
                    </p>
                    <hr>
                    <p>
                        The customer has been told that they will receive
                        an email or text notification once their order
                        is ready for pickup.
                    </p>
                    <p>
                        — Smile Seattle Bakery
                    </p>
                </div>
            `
        });
        console.log(`New order notification sent for Order #${order.order_id}`);
    } catch (error) {
        console.error("Bakery owner email error:", error);
    }
};

// CUSTOMER READY FOR PICKUP EMAIL
export const sendOrderReadyNotification = async (order) => {
    try {
        await resend.emails.send({
            from: "Smile Seattle Bakery <onboarding@resend.dev>",
            to: order.email,
            subject: `🍰 Your Order #${order.order_id} Is Ready!`,
            html: `
                <div style=" font-family: Arial, sans-serif; max-width: 650px; margin: auto; color: #4e342e; line-height: 1.6;">
                    <h1 style="color: #8b4513;">
                        Your Order Is Ready! 🍰
                    </h1>
                    <p>
                        Hi ${order.customer_name},
                    </p>
                    <p>
                        Great news! Your order from
                        <strong>Smile Seattle Bakery</strong>
                        is ready for pickup.
                    </p>
                    <hr>
                    <h2>Order #${order.order_id}</h2>
                    <h3>Pickup Information</h3>
                    <p>
                        <strong>Date:</strong>
                        ${formatDate(order.pickup_date)}
                    </p>
                    <p>
                        <strong>Time:</strong>
                        ${formatTime(order.pickup_time)}
                    </p>
                    <h3>Your Order</h3>
                    ${order.items.map(item => `
                        <p>
                            <strong>${item.name}</strong>
                            ${item.size_name ? `(${item.size_name})` : ""}
                            × ${item.quantity}
                            — $${Number(item.price).toFixed(2)} each
                        </p>
                    `).join("")}
                    <h3>Order Total</h3>
                    <p style="font-size: 18px;">
                        <strong>
                            $${Number(order.total).toFixed(2)}
                        </strong>
                    </p>
                    <hr>
                    <p>
                        Your order is ready and waiting for you!
                        We look forward to seeing you. 💕
                    </p>
                    <p>
                        — Smile Seattle Bakery
                    </p>
                </div>
            `
        });
        console.log(`Ready-for-pickup email sent for Order #${order.order_id}`);
    } catch (error) {
        console.error("Ready-for-pickup email error:", error);
    }
};

// CONTACT FORM - OWNER NOTIFICATION
export const sendContactOwnerNotification = async (inquiry) => {
    try {
        await resend.emails.send({
            from: "Smile Seattle Bakery <onboarding@resend.dev>",
            to: process.env.BAKERY_OWNER_EMAIL,
            subject:
                `💌 New Custom Order Request from ${inquiry.firstName} ${inquiry.lastName}`,
            html: `
                <div style=" font-family: Arial, sans-serif; max-width: 700px; margin: auto; color: #4e342e; line-height: 1.6;">
                    <h1 style="color: #8b4513;">
                        New Custom Order Request 💌
                    </h1>
                    <p>
                        A customer has submitted a new request
                        through the Smile Seattle Bakery website.
                    </p>
                    <hr>
                    <h2>Customer Information</h2>
                    <p>
                        <strong>Name:</strong>
                        ${inquiry.firstName} ${inquiry.lastName}
                    </p>
                    <p>
                        <strong>Email:</strong>
                        ${inquiry.email}
                    </p>
                    <p>
                        <strong>Phone:</strong>
                        ${inquiry.phone || "Not provided"}
                    </p>
                    <h2>Request Details</h2>
                    <p>
                        <strong>Order Type:</strong>
                        ${inquiry.orderType || "Not provided"}
                    </p>
                    <p>
                        <strong>Occasion:</strong>
                        ${inquiry.occasion || "Not provided"}
                    </p>
                    <p>
                        <strong>Flavor:</strong>
                        ${inquiry.flavor || "Not provided"}
                    </p>
                    <p>
                        <strong>Servings:</strong>
                        ${inquiry.servings || "Not provided"}
                    </p>
                    <p>
                        <strong>Event Date:</strong>
                        ${inquiry.eventDate || "Not provided"}
                    </p>
                    <h2>Customer Message</h2>
                    <p>
                        ${inquiry.message}
                    </p>
                    <hr>
                    <p>
                        Please contact the customer within 48 hours
                        to discuss their request and pricing.
                    </p>
                    <p>
                        — Smile Seattle Bakery
                    </p>
                </div>
            `
        });
        console.log(`Contact request email sent to owner from ${inquiry.email}`);
    } catch (error) {
        console.error("Contact owner email error:", error);
        throw error;
    }
};

// CONTACT FORM - CUSTOMER CONFIRMATION
export const sendContactConfirmation = async (inquiry) => {
    try {
        await resend.emails.send({
            from: "Smile Seattle Bakery <onboarding@resend.dev>",
            to: inquiry.email,
            subject: "💌 We Received Your Request!",
            html: `
                <div style=" font-family: Arial, sans-serif; max-width: 650px; margin: auto; color: #4e342e; line-height: 1.6; ">
                    <h1 style="color: #8b4513;">
                        Thank You, ${inquiry.firstName}! 💕
                    </h1>
                    <p>
                        We've received your request and are excited
                        to hear about your special occasion.
                    </p>
                    <hr>
                    <h2>We've Got Your Request!</h2>
                    <p>
                        Your request has been successfully submitted
                        to <strong>Smile Seattle Bakery</strong>.
                    </p>
                    <p>
                        Nana will review your request and we'll get
                        back to you within <strong>48 hours</strong>
                        to discuss the details and next steps.
                    </p>
                    <p>
                        If you included an event date, we'll keep that
                        date in mind when reviewing your request.
                    </p>
                    <h3>What Happens Next?</h3>
                    <p>
                        We'll contact you by email or phone to discuss
                        your request, answer any questions, and provide
                        pricing if needed.
                    </p>
                    <p>
                        Thank you for choosing
                        <strong>Smile Seattle Bakery</strong>!
                    </p>
                    <p>
                        We can't wait to help make your celebration
                        something sweet. 🍰
                    </p>
                    <p>
                        — Smile Seattle Bakery
                    </p>
                </div>
            `
        });
        console.log(`Contact confirmation email sent to ${inquiry.email}`);
    } catch (error) {
        console.error("Contact confirmation error:", error);
        throw error;
    }
};