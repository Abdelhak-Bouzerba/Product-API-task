import joi from 'joi';

export const productSchema = joi.object({
    name: joi.string().min(3).max(100).required(),
    description: joi.string().min(10).max(100),
    stock: joi.number().integer().min(0).default(1).required(),
    price: joi.number().precision(2).min(0).required(),
    category: joi.string().min(3).max(50).required()
});