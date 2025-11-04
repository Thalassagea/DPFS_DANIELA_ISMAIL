const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const DATA_PATH = path.join(__dirname, '..', 'data', 'products.json');

// HOME
router.get('/', (req, res) => {
  let products = [];
  try {
    const data = fs.readFileSync(DATA_PATH, 'utf-8');
    products = JSON.parse(data);
  } catch (err) {
    console.error('Error al leer products.json:', err);
  }
  res.render('users/index', { title: 'Inicio', products });
});

// 🔹 CARRITO
router.get('/cart', (req, res) => {
  res.render('users/courseCart', { title: 'Mi Carrito' });
});

module.exports = router;
