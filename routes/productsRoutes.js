const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const DATA_PATH = path.join(__dirname, '..', 'data', 'products.json');

function readProducts() {
  try {
    const raw = fs.readFileSync(DATA_PATH, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading products.json', err);
    return [];
  }
}

function writeProducts(products) {
  fs.writeFileSync(DATA_PATH, JSON.stringify(products, null, 2), 'utf-8');
}

// LISTADO DE CURSOS
router.get('/', (req, res) => {
  const courses = readProducts();
  res.render('products/list', { title: 'Cursos', courses });
});

// FORMULARIO CREAR
router.get('/create', (req, res) => {
  res.render('products/createCourse', { title: 'Crear Curso' });
});

// CREAR - POST
router.post('/', (req, res) => {
  const products = readProducts();
  const body = req.body;
  const maxId = products.reduce((acc, p) => Math.max(acc, Number(p.id || 0)), 0);
  const newProduct = {
    id: maxId + 1,
    name: body.name,
    description: body.description,
    image: body.image || '/imgs/default.png',
    category: body.category || 'General',
    colors: body.colors ? body.colors.split(',').map(c => c.trim()) : [],
    price: Number(body.price || 0)
  };
  products.push(newProduct);
  writeProducts(products);
  res.redirect('/courses');
});

// DETALLE
router.get('/:id', (req, res) => {
  const id = Number(req.params.id);
  const products = readProducts();
  const course = products.find(p => Number(p.id) === id);
  if (!course) return res.status(404).send('Curso no encontrado');
  res.render('products/courseDetail', { title: course.name, course });
});

// FORMULARIO EDITAR
router.get('/:id/edit', (req, res) => {
  const id = Number(req.params.id);
  const products = readProducts();
  const course = products.find(p => Number(p.id) === id);
  if (!course) return res.status(404).send('Curso no encontrado');
  res.render('products/editCourse', { title: 'Editar Curso', course });
});

// EDITAR - PUT
router.put('/:id', (req, res) => {
  const id = Number(req.params.id);
  const products = readProducts();
  const index = products.findIndex(p => Number(p.id) === id);
  if (index === -1) return res.status(404).send('Curso no encontrado');

  const body = req.body;
  products[index] = {
    ...products[index],
    name: body.name || products[index].name,
    description: body.description || products[index].description,
    image: body.image || products[index].image,
    category: body.category || products[index].category,
    colors: body.colors ? body.colors.split(',').map(c => c.trim()) : products[index].colors,
    price: Number(body.price || products[index].price)
  };

  writeProducts(products);
  res.redirect('/courses/' + id);
});

// ELIMINAR - DELETE
router.delete('/:id', (req, res) => {
  const id = Number(req.params.id);
  const products = readProducts();
  const index = products.findIndex(p => Number(p.id) === id);
  if (index === -1) return res.status(404).send('Curso no encontrado');

  products.splice(index, 1);
  writeProducts(products);
  res.redirect('/courses');
});

module.exports = router;
