import bcrypt from "bcrypt";
import { createUser, findUserByEmail } from "../services/userServices.js";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const userId = await createUser({ name, email, password: hashedPassword });
        res.status(201).json({
            message: "User created successfully",
            user_id: userId
        });
    } catch (error) {
        next(error);
    }
};

export const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await findUserByEmail(email);
        if (!user) {
            return res.status(401).json({error: "Invalid email or password"});
        }
        const passwordMatches = await bcrypt.compare(password,user.password);
        if (!passwordMatches) {
            return res.status(401).json({error: "Invalid email or password"});
        }
        const token = jwt.sign({ user_id: user.user_id, role: user.role}, process.env.JWT_SECRET,{ expiresIn: "1h" });
        res.json({
            message: "Login successful",
            token,
            user: {
                user_id: user.user_id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        next(error);
    }
};

export const getProfile = async (req, res, next) => {
    try {
        res.json({
            message: "You are authenticated!",
            user: req.user
        });
    } catch (error) {
        next(error);
    }
};

export const getAdminDashboard = async (req, res, next) => {
    try {
        res.json({
            message: "Welcome to the admin dashboard!",
            user: req.user
        });
    } catch (error) {
        next(error);
    }
};