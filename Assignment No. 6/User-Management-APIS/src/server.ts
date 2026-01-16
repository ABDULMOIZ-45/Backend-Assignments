import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import userRoutes from "./routes/user-routes";
import { logger } from "./middlewares/logger";
import { globalError } from "./middlewares/error";

dotenv.config();
const app = express();
const PORT = Number(process.env.PORT) || 3001;
app.use(express.json(), logger);

connectDB();
app.use('/api/users', userRoutes);  
app.listen(PORT, () => {
  console.log("Server running at http://localhost:3000");
});