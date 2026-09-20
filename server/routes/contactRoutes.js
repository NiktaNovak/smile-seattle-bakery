import express from "express";
import { sendContactOwnerNotification, sendContactConfirmation } from "../emailService.js";

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const { firstName, lastName, phone, email, orderType, occasion, flavor, servings, eventDate, message } = req.body;
        if (!firstName || !lastName || !email || !message) {
            return res.status(400).json({ error: "Please fill in all required fields." });
        }
        const inquiry = { firstName, lastName, phone, email, orderType, occasion, flavor, servings, eventDate, message };
        await sendContactOwnerNotification(inquiry);
        await sendContactConfirmation(inquiry);
        res.status(200).json({ message: "Your request has been sent successfully." });
    } catch (error) {
        console.error("Contact form error:", error);
        res.status(500).json({ error: "Unable to send your request." });
    }
});
export default router;