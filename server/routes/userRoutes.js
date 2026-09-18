import express from "express";
import { registerUser , loginUser , getProfile , getAdminDashboard } from "../controllers/userController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import requireRole from "../middleware/roleMiddleware.js";
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get( "/profile", authMiddleware, getProfile);
router.get("/admin", authMiddleware, requireRole("admin"), getAdminDashboard);


export default router;