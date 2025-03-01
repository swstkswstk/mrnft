import express from 'express';
import { createProduct, getProducts, getProduct, updateProduct, deleteProduct } from '../controllers/productController.js';
const router = express.Router();

router.get("/", getProducts
  // Get all products
);

router.get("/:id", getProduct
  // Get specific product
);
router.post("/create", createProduct
  // Create a new product
);

router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);
export default router;


