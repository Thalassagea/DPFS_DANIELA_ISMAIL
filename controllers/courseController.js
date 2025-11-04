// controllers/courseController.js
const courses = require('../data/courses');

const courseController = {
  list: (req, res) => {
    res.render('products/list', { courses, title: "Cursos" });
  },

  detail: (req, res) => {
    const id = Number(req.params.id);
    const course = courses.find(c => c.id === id);
    if (!course) return res.status(404).send('Curso no encontrado');
    res.render('products/courseDetail', { course, title: course.name });
  },

  createForm: (req, res) => {
    res.render('products/createCourse', { title: "Crear Curso" });
  },

  create: (req, res) => {
    
    console.log('Curso creado:', req.body);
    res.redirect('/courses');
  },

  editForm: (req, res) => {
    const id = Number(req.params.id);
    const course = courses.find(c => c.id === id);
    if (!course) return res.status(404).send('Curso no encontrado');
    res.render('products/editCourse', { course, title: "Editar Curso" });
  },

  edit: (req, res) => {
    // Aquí podría ir la lógica de actualización real.
    console.log('Curso editado:', req.params.id, req.body);
    res.redirect('/courses');
  }
};

module.exports = courseController;
