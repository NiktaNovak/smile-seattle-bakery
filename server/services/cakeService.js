import db from "../database/db.js";

// GET AVAILABLE CAKES
export const findAvailableCakes = async () => {
    const [rows] = await db.query(`
        SELECT 
            cakes.cake_id,
            cakes.category_id,
            cakes.name,
            cakes.description,
            cakes.details,
            cakes.price,
            cakes.image_url,
            cakes.available,
            categories.name AS category
        FROM cakes
        JOIN categories
            ON cakes.category_id = categories.category_id
        WHERE cakes.available = TRUE
    `);

    for (const cake of rows) {
        const [sizes] = await db.query(
            `SELECT
                size_id,
                size_name,
                price
             FROM cake_sizes
             WHERE cake_id = ?
             ORDER BY price`,
            [cake.cake_id]
        );
        cake.sizes = sizes;
    }
    return rows;
};

// GET ALL CAKES
export const findAllCakes = async () => {
    const [rows] = await db.query(`
        SELECT 
            cakes.cake_id,
            cakes.category_id,
            cakes.name,
            cakes.description,
            cakes.details,
            cakes.price,
            cakes.image_url,
            cakes.available,
            categories.name AS category
        FROM cakes
        JOIN categories
            ON cakes.category_id = categories.category_id
    `);
    for (const cake of rows) {
        const [sizes] = await db.query(
            `SELECT
                size_id,
                size_name,
                price
             FROM cake_sizes
             WHERE cake_id = ?
             ORDER BY price`,
            [cake.cake_id]
        );
        cake.sizes = sizes;
    }
    return rows;
};

// GET ONE CAKE
export const findCakeById = async (id) => {
    const [rows] = await db.query(`
        SELECT 
            cakes.cake_id,
            cakes.category_id,
            cakes.name,
            cakes.description,
            cakes.details,
            cakes.price,
            cakes.image_url,
            cakes.available,
            categories.name AS category
        FROM cakes
        JOIN categories
            ON cakes.category_id = categories.category_id
        WHERE cakes.cake_id = ?
    `, [id]);
    if (rows.length === 0) {
        return null;
    }
    const cake = rows[0];
    const [sizes] = await db.query(
        `SELECT
            size_id,
            size_name,
            price
         FROM cake_sizes
         WHERE cake_id = ?
         ORDER BY price`,
        [id]
    );
    cake.sizes = sizes;
    return cake;
};

// CREATE CAKE
export const createCake = async (cake) => {
    const { category_id, name, description, details, price, image_url } = cake;
    const [result] = await db.query(
        `INSERT INTO cakes
        (category_id, name, description, details, price, image_url, available)
        VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [category_id, name, description, details, price, image_url, true]
    );
    return result.insertId;
};

// UPDATE CAKE
export const updateCake = async (id, cake) => {
    const { category_id, name, description, details, price, image_url } = cake;
    const [result] = await db.query(
        `UPDATE cakes
         SET
            category_id = ?,
            name = ?,
            description = ?,
            details = ?,
            price = ?,
            image_url = ?
         WHERE cake_id = ?`, [category_id, name, description, details, price, image_url, id]
    );
    return result;
};

// UPDATE AVAILABILITY
export const updateCakeAvailability = async (id, available) => {
    const [result] = await db.query(
        `UPDATE cakes
         SET available = ?
         WHERE cake_id = ?`,[available, id]
    );
    return result;
};

// DELETE CAKE
export const deleteCake = async (id) => {
    const [result] = await db.query(
        `DELETE FROM cakes
         WHERE cake_id = ?`,[id]
    );
    return result;
};