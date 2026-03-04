const { validationResult } = require("express-validator");
const { readCourses, writeCourses } = require("../services/coursesService");
const { normalizeCourseImage } = require("../utils/normalize");

const coursesController = {
  list: (req, res) => {
    const courses = readCourses().map((c) => ({
      ...c,
      image: normalizeCourseImage(c.image)
    }));
    res.render("products/list", { title: "Cursos", courses });
  },

  detail: (req, res) => {
    const id = Number(req.params.id);
    const courses = readCourses();
    const course = courses.find((c) => Number(c.id) === id);

    if (!course) return res.status(404).send("Curso no encontrado");

    const normalized = { ...course, image: normalizeCourseImage(course.image) };
    res.render("products/courseDetail", { title: normalized.name, course: normalized });
  },

  createForm: (req, res) => {
    res.render("products/createCourse", { title: "Crear Curso" });
  },

  create: (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render("products/createCourse", {
        title: "Crear Curso",
        errors: errors.array(),
        old: req.body
      });
    }

    const courses = readCourses();
    const maxId = courses.reduce((acc, c) => Math.max(acc, Number(c.id || 0)), 0);

    const newCourse = {
      id: maxId + 1,
      name: req.body.name,
      description: req.body.description,
      image: normalizeCourseImage(req.body.image),
      category: req.body.category || "General",
      colors: req.body.colors ? req.body.colors.split(",").map((c) => c.trim()) : [],
      price: Number(req.body.price || 0),
      stock: Number(req.body.stock || 0),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    courses.push(newCourse);
    writeCourses(courses);
    res.redirect("/courses");
  },

  editForm: (req, res) => {
    const id = Number(req.params.id);
    const courses = readCourses();
    const course = courses.find((c) => Number(c.id) === id);

    if (!course) return res.status(404).send("Curso no encontrado");

    const normalized = { ...course, image: normalizeCourseImage(course.image) };
    res.render("products/editCourse", { title: "Editar Curso", course: normalized });
  },

  edit: (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render("products/editCourse", {
        title: "Editar Curso",
        errors: errors.array(),
        course: { ...req.body, id: req.params.id }
      });
    }

    const id = Number(req.params.id);
    const courses = readCourses();
    const index = courses.findIndex((c) => Number(c.id) === id);

    if (index === -1) return res.status(404).send("Curso no encontrado");

    courses[index] = {
      ...courses[index],
      name: req.body.name,
      description: req.body.description,
      image: normalizeCourseImage(req.body.image),
      category: req.body.category,
      colors: req.body.colors ? req.body.colors.split(",").map((c) => c.trim()) : courses[index].colors,
      price: Number(req.body.price || courses[index].price),
      stock: Number(req.body.stock || courses[index].stock),
      updatedAt: new Date().toISOString()
    };

    writeCourses(courses);
    res.redirect(`/courses/${id}`);
  },

  remove: (req, res) => {
    const id = Number(req.params.id);
    const courses = readCourses();
    const index = courses.findIndex((c) => Number(c.id) === id);

    if (index === -1) return res.status(404).send("Curso no encontrado");

    courses.splice(index, 1);
    writeCourses(courses);
    res.redirect("/courses");
  }
};

module.exports = coursesController;
