import prisma from '../prisma.js';
import { Request, Response } from 'express';
import { productSchema } from '../utils/joiValidation.js';

//Get all products
export const getAllProducts = async (req: Request, res: Response) => {
    const products = await prisma.product.findMany();

    //check if there are no products
    if (products.length === 0) {
        res.status(404).json({ message: 'No products found' });
        return;
    }

    //send final response
    res.status(200).json(products);

};

//Get product by id
export const getProductById = async (req: Request, res: Response) => {
    const id = req.params.id;

    //check if id is provided
    if (!id) {
        throw new Error('Product ID is required');
    }

    //get the product
    const product = await prisma.product.findUnique({
        where: { id: Number(id) }
    });

    //check if product exists
    if (!product) {
        res.status(404).json({ message: 'Product not found' });
        return;
    }

    //send final response
    res.status(200).json(product);

};

//Get products by category
export const getProductsByCategory = async (req: Request, res: Response) => {
    const { category } = req.query;

    //search for products in the given category
    const products = await prisma.product.findMany({
        where: { category: String(category) }
    });

    //check if products exist
    if (products.length === 0) {
        res.status(404).json({ message: 'No products found in this category' });
        return;
    }

    //send final response
    res.status(200).json(products);

};

//Create a new product
export const createProduct = async (req: Request, res: Response) => {
    const { name, description, stock, price, category } = req.body;

    //validate the request body
    const { error } = productSchema.validate(req.body);
    if (error) {
        res.status(400).json({ message: error.details[0].message });
        return;
    }

    //Create the product
    const product = await prisma.product.create({
        data: {
            name,
            description,
            stock,
            price,
            category
        }
    });

    //check if product is created
    if (!product) {
        res.status(400).json({ message: 'Product creation failed' });
        return;
    }

    //send final response
    res.status(201).json(product);

};