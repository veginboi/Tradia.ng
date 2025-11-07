// const http = require('http');

// const server = http.createServer((req, res) => {
//   res.end('Hello Tradia');
// });

// server.listen(3000, () => {
//   console.log('Server running on http://localhost:3000');
// });


// Import Express
const express = require('express');

// Create an Express app
const app = express();

// Define a simple route
app.get('/', (req, res) => {
  res.send('Welcome to Tradia API 🚀');
});

// Start the server
app.listen(3000, () => {
  console.log('✅ Tradia API is running on http://localhost:3000');
});


// Sellers route
app.get('/sellers', (req, res) => {
  res.send('Here are all approved Tradia sellers');
});

// Buyers route
app.get('/buyers', (req, res) => {
  res.send('Here are all verified Tradia buyers');
});

// Products route
app.get('/products', (req, res) => {
  res.send('Here are the latest products on Tradia');
});
