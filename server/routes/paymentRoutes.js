import express from "express";
import stripe from "../stripe.js";
import db from "../database/db.js";
import authMiddleware from "../middleware/authMiddleware.js";
import { createOrder, findOrderByStripePaymentId, getOrderById } from "../services/orderService.js";
import { sendOrderConfirmation, sendNewOrderNotification } from "../emailService.js";

const router = express.Router();

// CREATE STRIPE CHECKOUT SESSION
router.post("/create-checkout-session", authMiddleware, async (req, res) => {
    try {
        const userId = req.user.user_id;
        const { phone, pickup_date, pickup_time, items } = req.body;
        if (!items || items.length === 0) {
            return res.status(400).json({ error: "No items provided." });
        }
        const lineItems = [];
        let subtotal = 0;
        for (const item of items) {
            const [rows] = await db.query(
                `SELECT
                        cake_sizes.size_id,
                        cake_sizes.size_name,
                        cake_sizes.price,
                        cakes.cake_id,
                        cakes.name,
                        cakes.available
                     FROM cake_sizes
                     JOIN cakes
                         ON cake_sizes.cake_id = cakes.cake_id
                     WHERE cake_sizes.size_id = ?
                     AND cake_sizes.cake_id = ?`, [item.size_id, item.cake_id]
            );
            if (rows.length === 0) {
                return res.status(404).json({ error: `Selected size not found for cake ${item.cake_id}.` });
            }
            const cake = rows[0];
            if (!cake.available) {
                return res.status(400).json({ error: `${cake.name} is not available.` });
            }
            const price = Number(cake.price);
            const quantity = Number(item.quantity);
            subtotal += price * quantity;
            lineItems.push({
                price_data: {
                    currency: "usd",
                    product_data: { name: `${cake.name} - ${cake.size_name}` },
                    unit_amount: Math.round(price * 100)
                },
                quantity: quantity
            });
        }
        // SALES TAX
        const tax = subtotal * 0.10;
        lineItems.push({
            price_data: {
                currency: "usd",
                product_data: { name: "Sales Tax (10%)" },
                unit_amount: Math.round(tax * 100)
            },
            quantity: 1
        });

        // CREATE STRIPE SESSION
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: lineItems,
            mode: "payment",
            metadata: {
                user_id: String(userId),
                phone: phone,
                pickup_date: pickup_date,
                pickup_time: pickup_time,
                items: JSON.stringify(items)
            },
            success_url:
                "http://localhost:5173/checkout-success",
            cancel_url:
                "http://localhost:5173/Checkout"
        });
        res.json({ url: session.url });
    } catch (error) {
        console.error("Stripe error:", error);
        res.status(500).json({ error: "Unable to create payment session." });
    }
}
);

// STRIPE WEBHOOK
router.post("/webhook", express.raw({ type: "application/json" }), async (req, res) => {
    const signature = req.headers["stripe-signature"];
    let event;
    try {
        event = stripe.webhooks.constructEvent(req.body, signature, process.env.STRIPE_WEBHOOK_SECRET);
    } catch (error) {
        console.error("Webhook signature verification failed:", error.message);
        return res.status(400).send(`Webhook Error: ${error.message}`);
    }
    if (event.type === "checkout.session.completed") {
        const session = event.data.object;
        const { user_id, phone, pickup_date, pickup_time, items } = session.metadata;
        const stripePaymentId = session.payment_intent;
        // Check if this payment already created an order
        const existingOrder = await findOrderByStripePaymentId(stripePaymentId);
        if (existingOrder) {
            console.log(`Order already exists for Stripe payment ${stripePaymentId}.`);
            return res.json({ received: true });
        }
        // Create the order
        const result = await createOrder(Number(user_id),
            {
                phone,
                pickup_date,
                pickup_time,
                items: JSON.parse(items),
                stripe_payment_id:
                    stripePaymentId
            }
        );
        console.log(`Order #${result.orderId} created after successful payment.`);
        const order = await getOrderById(Number(user_id), result.orderId);
        await sendOrderConfirmation(order);
        await sendNewOrderNotification(order);
    }
    res.json({ received: true });
}
);
export default router;