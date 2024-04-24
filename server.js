import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import path from "path";

import connectDB from "./config/db.js";
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

// connect db to mongoDB
connectDB();

const app = express();

const corsOptions = {
   origin: true,
   credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

app.get('/', (req, res) => {
   res.send("API running");
});

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);
app.get('/api/config/paypal', (req, res) => res.send({
   clientId: process.env.PAYPAL_CLIENT_ID
}));

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
   console.log(`Server running on ${PORT}`);
});