import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import connectDB from "./config/db.js";
import products from "./data/products.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

// connect db to mongoDB
connectDB();

const app = express();

app.use(cors());

app.get('/', (req, res) => {
   res.send("API running");
});

app.get('/api/products', (req, res) => {
   res.json(products);
});

app.get('/api/products/:id', (req, res) => {
   const id = req.params.id;
   const product = products.find(product => product._id === id);
   res.json(product);
});

app.listen(PORT, () => {
   console.log(`Server running on ${PORT}`);
});