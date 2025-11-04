const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override');

// Rutas
const mainRoutes = require('./routes/mainRoutes');
const productsRoutes = require('./routes/productsRoutes');
const usersRoutes = require('./routes/usersRoutes');

// Configuración EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'));

// Archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Body parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Method override
app.use(methodOverride('_method'));

// 🔹 Montaje de rutas
app.use('/', mainRoutes);          // incluye /cart, /
app.use('/courses', productsRoutes);
app.use('/users', usersRoutes);

// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
