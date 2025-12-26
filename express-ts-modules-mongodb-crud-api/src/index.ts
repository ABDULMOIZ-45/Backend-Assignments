import dotenv from "dotenv";
import express from "express";
import { connectDB } from './db/db';
import userRoutes from './routes/user-routes';
import { logger } from "./middlewares/logger";
import productRoutes from "./routes/product-routes";

dotenv.config();
const app = express();
const PORT = Number(process.env.PORT) || 3001;
app.use(express.json(), logger);

connectDB();
app.use('/api/user', userRoutes)
app.use("/api/products", productRoutes);
app.listen(PORT, () => {
  console.log("Server is running at... 3000 port")
})
