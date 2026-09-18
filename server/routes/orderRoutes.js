import express from "express";
import { createOrderController , getOrdersController, getOrderController, cancelOrderController, updateOrderStatusController, getAllOrdersController} from "../controllers/orderController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import validateOrder from "../middleware/validateOrder.js";
import requireRole from "../middleware/roleMiddleware.js";

const router = express.Router();

router.get("/all", authMiddleware,requireRole("admin"),getAllOrdersController);
router.get("/",authMiddleware,getOrdersController);
router.get("/:id",authMiddleware, getOrderController);
router.post( "/", authMiddleware,validateOrder, createOrderController);
router.patch("/:id/cancel",authMiddleware,cancelOrderController);
router.patch("/:id/status",authMiddleware,requireRole("admin"),updateOrderStatusController);
export default router;