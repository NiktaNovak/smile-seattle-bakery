import { findAllCakes, findAvailableCakes, findCakeById, createCake, updateCake, deleteCake, updateCakeAvailability } from "../services/cakeService.js";

export const getCakes = async (req, res, next) => {

    try {

        const cakes = await findAvailableCakes();

        res.json(cakes);

    } catch (error) {

        next(error);

    }
};

export const getAdminCakes = async (req, res, next) => {

    try {

        const cakes = await findAllCakes();

        res.json(cakes);

    } catch (error) {

        next(error);

    }
};

export const getCakeById = async (req, res, next) => {
    try {
        const cake = await findCakeById(req.params.id);

        if (!cake) {
            return res.status(404).json({
                error: "Cake not found"
            });
        }

        res.json(cake);
    } catch (error) {
        next(error);
    }
};

export const createCakeController = async (req, res, next) => {
    try {
        const cakeId = await createCake(req.body);

        res.status(201).json({
            message: "Cake created successfully",
            cake_id: cakeId
        });
    } catch (error) {
        next(error);
    }
};

export const updateCakeController = async (req, res, next) => {
    try {
        const { id } = req.params;

        const result = await updateCake(id, req.body);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                error: "Cake not found"
            });
        }

        res.json({
            message: "Cake updated successfully",
            cake_id: id
        });
    } catch (error) {
        next(error);
    }
};

export const updateCakeAvailabilityController = async (req, res, next) => {

    try {

        const { id } = req.params;
        const { available } = req.body;

        if (typeof available !== "boolean") {
            return res.status(400).json({
                error: "Available must be true or false"
            });
        }

        const result = await updateCakeAvailability(id, available);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                error: "Cake not found"
            });
        }

        res.json({
            message: available ? "Cake is now available" : "Cake is now unavailable",
            cake_id: id,
            available
        });

    } catch (error) {

        next(error);

    }
};

export const deleteCakeController = async (req, res, next) => {
    try {
        const { id } = req.params;

        const result = await deleteCake(id);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                error: "Cake not found"
            });
        }

        res.json({
            message: "Cake deleted successfully",
            cake_id: id
        });
    } catch (error) {
        next(error);
    }
};