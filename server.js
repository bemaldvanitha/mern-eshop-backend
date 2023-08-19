import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

// connect db to mongoDB
connectDB();

const app = express();

app.use(cors());

app.get('/', (req, res) => {
   res.send("API running");
});

app.use('/api/products', productRoutes);

app.listen(PORT, () => {
   console.log(`Server running on ${PORT}`);
});