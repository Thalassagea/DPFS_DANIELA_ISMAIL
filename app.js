// app.js
const express = require('express');
const path = require('path');
const app = express();

// Importar rutas
const mainRoutes = require('./routes/mainRoutes');

// Configuración del motor de vistas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'));

// Archivos estáticos (CSS, imágenes)
app.use(express.static(path.join(__dirname, 'public')));

// Middleware para formularios
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Rutas principales
app.use('/', mainRoutes);

// Puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
