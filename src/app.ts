import express from 'express';
import productRouter from './routes/product.js';


const app = express();


//middlewares
app.use(express.json());


//routes
app.use('/api', productRouter);


export default app;