// routes/mainRoutes.js
const express = require('express');
const router = express.Router();

const courseController = require('../controllers/courseController');
const userController = require('../controllers/userController');

// Página principal
router.get('/', (req, res) => res.render('users/index', { title: "MindCare" }));

// Usuarios
router.get('/register', userController.registerForm);
router.post('/register', userController.register);
router.get('/login', userController.loginForm);
router.post('/login', userController.login);

// Cursos
router.get('/courses', courseController.list);
router.get('/course/:id', courseController.detail);
router.get('/course/create', courseController.createForm);
router.post('/course/create', courseController.create);
router.get('/course/edit/:id', courseController.editForm);
router.post('/course/edit/:id', courseController.edit);

// Carrito
router.get('/cart', (req, res) => res.render('users/courseCart', { title: "Carrito" }));

module.exports = router;
