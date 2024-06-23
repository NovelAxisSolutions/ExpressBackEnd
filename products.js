const { v4: uuidv4 } = require('uuid');

let products = [
  { id: uuidv4(), name: 'Product 1', price: 10.99, description: 'Description of Product 1' },
  { id: uuidv4(), name: 'Product 2', price: 20.99, description: 'Description of Product 2' },
];

module.exports = products;
