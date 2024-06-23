const express = require('express');
const bodyParser = require('body-parser');
const uuid = require('uuid');
let products = require('./products');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Get all products
app.get('/products', (req, res) => {
  res.json(products);
});

// Get a single product by ID
app.get('/products/:id', (req, res) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }
  res.json(product);
});

// Add a new product
app.post('/products', (req, res) => {
  const { name, price, description } = req.body;
  if (!name || !price || !description) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  const newProduct = { id: uuid.v4(), name, price, description };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// Update an existing product
app.put('/products/:id', (req, res) => {
  const { name, price, description } = req.body;
  const product = products.find(p => p.id === req.params.id);
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }
  if (!name || !price || !description) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  product.name = name;
  product.price = price;
  product.description = description;
  res.json(product);
});

// Delete a product
app.delete('/products/:id', (req, res) => {
  const productIndex = products.findIndex(p => p.id === req.params.id);
  if (productIndex === -1) {
    return res.status(404).json({ error: 'Product not found' });
  }
  products.splice(productIndex, 1);
  return res.status(200).json({ message: 'Product has been deleted successfully' });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
