import { findAllCategories } from "../services/categoryService.js";

export const getCategories = async (req, res, next) => {
    try {
        const categories = await findAllCategories();
        res.json(categories);
    } catch (error) {
        next(error);
    }
};