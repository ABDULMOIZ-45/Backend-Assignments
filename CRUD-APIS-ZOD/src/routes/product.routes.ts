import { Router } from "express";
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/product-controller";

const productRouter: Router = Router();

productRouter.post("/create", createProduct);

productRouter.get("/getall", getAllProducts);
productRouter.get("/get/:id", getProductById);

productRouter.put("/update/:id", updateProduct);

productRouter.delete("/delete/:id", deleteProduct);

export default productRouter;