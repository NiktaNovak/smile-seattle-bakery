import db from "../database/db.js";

export const createUser = async (user) => {
    const { name, email, password } = user;
    const [result] = await db.query(
        `INSERT INTO users
        (name, email, password)
        VALUES (?, ?, ?)`,
        [name, email, password]
    );

    return result.insertId;
};

export const findUserByEmail = async (email) => {
    const [rows] = await db.query(
        `SELECT user_id, name, email, password, role
         FROM users
         WHERE email = ?`,
        [email]
    );

    return rows[0];
};