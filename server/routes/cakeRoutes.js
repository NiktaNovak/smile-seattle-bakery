import express from "express";
import { getCakes , getAdminCakes, getCakeById , createCakeController , updateCakeController, deleteCakeController, updateCakeAvailabilityController} from "../controllers/cakeController.js";
import validateCake from "../middleware/validateCake.js";
import authMiddleware from "../middleware/authMiddleware.js";
import requireRole from "../middleware/roleMiddleware.js";

const router = express.Router();
router.get("/", getCakes);
router.get("/admin", authMiddleware, requireRole("admin"), getAdminCakes);
router.get("/:id" , getCakeById);
router.post("/", authMiddleware, requireRole("admin"), validateCake, createCakeController);
router.put("/:id" , authMiddleware, requireRole("admin"), validateCake, updateCakeController);
router.patch("/:id/availability", authMiddleware, requireRole("admin"), updateCakeAvailabilityController);
router.delete("/:id",authMiddleware, requireRole("admin"), deleteCakeController);

export default router;