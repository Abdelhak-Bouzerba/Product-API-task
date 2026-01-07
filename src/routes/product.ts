import { getAllProducts , getProductById , getProductsByCategory , createProduct } from "../controllers/product.js";
import { Router } from "express";
import asyncHandler from "express-async-handler";

const router = Router();

//@desc Get All products
//@route GET /api/products
//@access Public
router.get('/products', asyncHandler(getAllProducts));


//@desc Get Single product
//@route GET /api/products/:id
//@access Public
router.get('/products/:id', asyncHandler(getProductById));


//@desc Get products by category
//@route GET /api/products?category=categoryName
//@access Public
router.get('/products', asyncHandler(getProductsByCategory));


//@desc Create a new product
//@route POST /api/products
//@access Public
router.post('/products', asyncHandler(createProduct));

export default router;