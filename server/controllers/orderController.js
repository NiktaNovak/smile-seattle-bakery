import { createOrder, getOrdersByUser, getOrderById, getOrderByIdForAdmin, cancelOrder, updateOrderStatus, getAllOrders } from "../services/orderService.js";
import { sendOrderReadyNotification } from "../emailService.js";

export const createOrderController = async (req, res, next) => {
    try {
        const userId = req.user.user_id;
        const result = await createOrder(userId, req.body);
        res.status(201).json({
            message: "Successfully added the order",
            order_id: result.orderId,
            subtotal: result.subtotal,
            tax: result.tax,
            total: result.total
        });
    } catch (error) {
        next(error);
    }
};

export const getOrdersController = async (req, res, next) => {
    try {
        const userId = req.user.user_id;
        const orders = await getOrdersByUser(userId);
        res.json(orders);
    } catch (error) {
        next(error);
    }
};

export const getOrderController = async (req, res, next) => {
    try {
        const userId = req.user.user_id;
        const orderId = req.params.id;
        const order = await getOrderById(userId, orderId);
        if (!order) {
            return res.status(404).json({ error: "Order not found" });
        }
        res.json(order);
    } catch (error) {
        next(error);
    }
};

export const cancelOrderController = async (req, res, next) => {
    try {
        const userId = req.user.user_id;
        const orderId = req.params.id;
        const cancelled = await cancelOrder(userId, orderId);
        if (!cancelled) {
            return res.status(404).json({ error: "Order not found or cannot be cancelled" });
        }
        res.json({message: "Order cancelled successfully"});
    } catch (error) {
        next(error);
    }
};

export const updateOrderStatusController = async (req, res, next) => {
    try {
        const orderId = req.params.id;
        const { status } = req.body;
        const validStatuses = ["pending", "confirmed", "ready", "completed", "cancelled"];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ error: "Invalid order status" });
        }
        // Get the current order before changing its status
        const currentOrder = await getOrderByIdForAdmin(orderId);

        if (!currentOrder) {
            return res.status(404).json({ error: "Order not found" });
        }
        const previousStatus = currentOrder.status;
        const updated = await updateOrderStatus(orderId, status);
        if (!updated) {
            return res.status(404).json({error: "Order not found"});
        }
        // Only send the email when the order actually changes to "ready"
        if (status === "ready" && previousStatus !== "ready") {
            const updatedOrder = await getOrderByIdForAdmin(orderId);
            await sendOrderReadyNotification(updatedOrder);
        }
        res.json({ message: "Order status updated successfully" });
    } catch (error) {
        next(error);
    }
};

export const getAllOrdersController = async (req, res, next) => {
    try {
        const orders = await getAllOrders();
        res.json(orders);
    } catch (error) {
        next(error);
    }
};

