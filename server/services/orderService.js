import db from "../database/db.js";

export const createOrder = async (userId, orderData) => {
    const {
        phone,
        pickup_date,
        pickup_time,
        items,
        stripe_payment_id
    } = orderData;

    const connection = await db.getConnection();

    try {
        await connection.beginTransaction();

        let subtotal = 0;
        const orderItems = [];

        for (const item of items) {

            const [rows] = await connection.query(
                `SELECT
                    cake_sizes.size_id,
                    cake_sizes.size_name,
                    cake_sizes.price,
                    cakes.name
                 FROM cake_sizes
                 JOIN cakes
                     ON cake_sizes.cake_id = cakes.cake_id
                 WHERE cake_sizes.size_id = ?
                 AND cake_sizes.cake_id = ?`,
                [item.size_id, item.cake_id]
            );

            if (rows.length === 0) {
                throw new Error(
                    `Size with ID ${item.size_id} not found for cake ${item.cake_id}`
                );
            }

            const size = rows[0];
            const price = Number(size.price);

            subtotal += price * item.quantity;

            orderItems.push({
                cake_id: item.cake_id,
                size_id: size.size_id,
                size_name: size.size_name,
                quantity: item.quantity,
                price: price
            });
        }

        const tax = subtotal * 0.10;
        const total = subtotal + tax;

        const [userRows] = await connection.query(
            `SELECT name, email
             FROM users
             WHERE user_id = ?`,
            [userId]
        );

        if (userRows.length === 0) {
            throw new Error("User not found");
        }

        const user = userRows[0];

        const [order] = await connection.query(
            `INSERT INTO orders
            (
                user_id,
                customer_name,
                email,
                phone,
                pickup_date,
                pickup_time,
                subtotal,
                tax,
                total,
                stripe_payment_id,
                payment_status
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                userId,
                user.name,
                user.email,
                phone,
                pickup_date,
                pickup_time,
                subtotal,
                tax,
                total,
                stripe_payment_id || null,
                stripe_payment_id ? "paid" : "pending"
            ]
        );

        const orderId = order.insertId;

        for (const item of orderItems) {

            await connection.query(
                `INSERT INTO order_items
                (
                    order_id,
                    cake_id,
                    size_id,
                    quantity,
                    price
                )
                VALUES (?, ?, ?, ?, ?)`,
                [
                    orderId,
                    item.cake_id,
                    item.size_id,
                    item.quantity,
                    item.price
                ]
            );
        }

        await connection.commit();

        return {
            orderId,
            subtotal,
            tax,
            total
        };

    } catch (error) {
        await connection.rollback();
        throw error;

    } finally {
        connection.release();
    }
};

export const getOrdersByUser = async (userId) => {
    const [orders] = await db.query(
        `SELECT
            order_id,
            customer_name,
            email,
            phone,
            pickup_date,
            pickup_time,
            subtotal,
            tax,
            total,
            status,
            created_at
         FROM orders
         WHERE user_id = ?
         ORDER BY created_at DESC`,
        [userId]
    );

    return orders;
};

export const getOrderById = async (userId, orderId) => {
    const [orders] = await db.query(
        `SELECT
            order_id,
            customer_name,
            email,
            phone,
            pickup_date,
            pickup_time,
            subtotal,
            tax,
            total,
            status,
            payment_status,
            stripe_payment_id,
            created_at
         FROM orders
         WHERE order_id = ?
         AND user_id = ?`,
        [orderId, userId]
    );
    if (orders.length === 0) {
        return null;
    }
    const order = orders[0];
    const [items] = await db.query(
        `SELECT
            oi.cake_id,
            c.name,
            oi.size_id,
            cs.size_name,
            oi.quantity,
            oi.price
         FROM order_items oi
         JOIN cakes c
             ON oi.cake_id = c.cake_id
         JOIN cake_sizes cs
             ON oi.size_id = cs.size_id
         WHERE oi.order_id = ?`, [orderId]
    );
    return { ...order, items };
};

export const cancelOrder = async (userId, orderId) => {
    const [result] = await db.query(
        `UPDATE orders
         SET status = 'cancelled'
         WHERE order_id = ?
         AND user_id = ?
         AND status = 'pending'`,
        [orderId, userId]
    );

    return result.affectedRows > 0;
};

export const updateOrderStatus = async (orderId, status) => {
    const [result] = await db.query(
        `UPDATE orders
         SET status = ?
         WHERE order_id = ?`,
        [status, orderId]
    );

    return result.affectedRows > 0;
};

export const getAllOrders = async () => {
    const [orders] = await db.query(
        `SELECT
            o.order_id,
            o.user_id,
            o.customer_name,
            o.email,
            o.phone,
            o.pickup_date,
            o.pickup_time,
            o.subtotal,
            o.tax,
            o.total,
            o.status,
            o.created_at
         FROM orders o
         ORDER BY o.created_at DESC`
    );

    return orders;
};

export const findOrderByStripePaymentId = async (stripePaymentId) => {

    const [orders] = await db.query(
        `SELECT order_id
         FROM orders
         WHERE stripe_payment_id = ?`,
        [stripePaymentId]
    );

    return orders.length > 0 ? orders[0] : null;
};

export const getOrderByIdForAdmin = async (orderId) => {
    const [orders] = await db.query(
        `SELECT
            order_id,
            user_id,
            customer_name,
            email,
            phone,
            pickup_date,
            pickup_time,
            subtotal,
            tax,
            total,
            status,
            payment_status,
            stripe_payment_id,
            created_at
        FROM orders
        WHERE order_id = ?`,
        [orderId]
    );

    if (orders.length === 0) {
        return null;
    }

    const order = orders[0];

    const [items] = await db.query(
        `SELECT
        oi.cake_id,
        c.name,
        oi.size_id,
        cs.size_name,
        oi.quantity,
        oi.price
     FROM order_items oi
     JOIN cakes c
         ON oi.cake_id = c.cake_id
     JOIN cake_sizes cs
         ON oi.size_id = cs.size_id
     WHERE oi.order_id = ?`,
        [orderId]
    );


    return {
        ...order,
        items
    };
};