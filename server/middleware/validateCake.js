const validateCake = (req, res, next) => {
    const { category_id,  name,  description, price } = req.body;

    if (!category_id) {
        return res.status(400).json({
            error: "Category is required"
        });
    }

    if (!name || name.trim() === "") {
        return res.status(400).json({
            error: "Cake name is required"
        });
    }

    if (!description || description.trim() === "") {
        return res.status(400).json({
            error: "Description is required"
        });
    }

    if ( price === undefined || price === null || Number(price) <= 0) {
        return res.status(400).json({
            error: "Price must be greater than 0"
        });
    }

    next();
};

export default validateCake;