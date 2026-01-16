import { Router } from "express";
import { createProduct, getAllProducts, getProductByID, updateProduct, deleteProduct} from "../controllers/product-controller";

const router = Router();

router.post("/create", createProduct);
router.get("/getall", getAllProducts);
router.get("/get/:id", getProductByID);
router.put("/update/:id", updateProduct);
router.delete("/delete/:id", deleteProduct);

export default router;
