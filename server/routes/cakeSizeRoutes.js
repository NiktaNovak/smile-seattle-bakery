import express from "express";
import db from "../database/db.js";
import authMiddleware from "../middleware/authMiddleware.js";
import requireRole from "../middleware/roleMiddleware.js";

const router = express.Router();

// GET SIZES FOR A CAKE
router.get("/cake/:cakeId", authMiddleware, requireRole("admin"), async (req, res) => {
    try {
        const [sizes] = await db.query(
            `SELECT
                    size_id,
                    cake_id,
                    size_name,
                    price
                 FROM cake_sizes
                 WHERE cake_id = ?
                 ORDER BY price`, [req.params.cakeId]
        );
        res.json(sizes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Unable to load cake sizes." });
    }
}
);

// CREATE SIZE
router.post("/", authMiddleware, requireRole("admin"), async (req, res) => {
    try {
        const { cake_id, size_name, price } = req.body;
        if (!cake_id || !size_name || price === undefined) {
            return res.status(400).json({ error: "Cake, size name, and price are required." });
        }
        const [result] = await db.query(
            `INSERT INTO cake_sizes(cake_id,size_name,price)
                VALUES (?, ?, ?)`, [cake_id, size_name, Number(price)]
        );
        res.status(201).json({
            message: "Cake size added successfully.",
            size_id: result.insertId
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Unable to add cake size." });
    }
}
);

// UPDATE SIZE
router.put("/:sizeId", authMiddleware, requireRole("admin"), async (req, res) => {
    try {
        const { size_name, price } = req.body;
        if (!size_name || price === undefined) {
            return res.status(400).json({ error: "Size name and price are required." });
        }
        const [result] = await db.query(
            `UPDATE cake_sizes
                 SET size_name = ?,
                     price = ?
                 WHERE size_id = ?`, [size_name, Number(price), req.params.sizeId]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Cake size not found." });
        }
        res.json({ message: "Cake size updated successfully." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Unable to update cake size." });
    }
}
);

// DELETE SIZE
router.delete("/:sizeId", authMiddleware, requireRole("admin"), async (req, res) => {
    try {
        const [result] = await db.query(
            `DELETE FROM cake_sizes
                 WHERE size_id = ?`, [req.params.sizeId]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Cake size not found." });
        }
        res.json({
            message: "Cake size deleted successfully."
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Unable to delete cake size." });
    }
}
);
export default router;