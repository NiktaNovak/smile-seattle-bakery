import express from "express";
import cors from "cors";
import cakeRoutes from "./routes/cakeRoutes.js";
import errorHandler from "./middleware/errorMiddleware.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js"
import categoryRoutes from "./routes/categoryRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import cakeSizeRoutes from "./routes/cakeSizeRoutes.js";

const app = express();
app.use(cors());
app.use("/api/payments/webhook", express.raw({ type: "application/json" }), paymentRoutes);
app.use(express.json());
const port = 5000;

app.use('/api/cakes', cakeRoutes);
app.use("/api/users", userRoutes);
app.use('/api/orders', orderRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/cake-sizes", cakeSizeRoutes);
app.use("/api/categories", categoryRoutes);
app.use(errorHandler);

app.listen(port, () => {
    console.log('Server running on port 5000..');
})