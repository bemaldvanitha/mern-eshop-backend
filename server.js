import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import connectDB from "./config/db.js";
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

// connect db to mongoDB
connectDB();

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.get('/', (req, res) => {
   res.send("API running");
});

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.get('/api/config/paypal', (req, res) => res.send({
   clientId: process.env.PAYPAL_CLIENT_ID
}));

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
   console.log(`Server running on ${PORT}`);
});