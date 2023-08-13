import express from 'express';
import dotenv from 'dotenv';

import products from "./data/products.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();

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