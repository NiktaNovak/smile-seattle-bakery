const validateOrder = (req, res, next) => {
    const { phone, pickup_date, pickup_time, items } = req.body;

    if (!phone || phone.trim() === "") {
        return res.status(400).json({ error: "Phone number is required" });
    }

    if (!pickup_date) {
        return res.status(400).json({ error: "Pickup date is required" });
    }

    if (!pickup_time) {
        return res.status(400).json({ error: "Pickup time is required" });
    }

    if (!Array.isArray(items) || items.length === 0) {
        return res.status(400).json({
            error: "Order must contain at least one item"
        });
    }

    for (const item of items) {

        if (!item.cake_id) {
            return res.status(400).json({
                error: "Each item must have a cake_id"
            });
        }

        if (!item.size_id) {
            return res.status(400).json({
                error: "Each item must have a size_id"
            });
        }

        if (!Number.isInteger(item.quantity) || item.quantity <= 0) {
            return res.status(400).json({
                error: "Quantity must be a positive whole number"
            });
        }
    }

    next();
};

export default validateOrder;