const express = require("express");
const router = express.Router();
const { body } = require("express-validator");

const coursesController = require("../controllers/coursesController");

const courseValidations = [
  body("name").trim().notEmpty().withMessage("El nombre es obligatorio"),
  body("description").trim().notEmpty().withMessage("La descripción es obligatoria"),
  body("price").isFloat({ min: 0 }).withMessage("El precio debe ser válido"),
  body("category").trim().notEmpty().withMessage("La categoría es obligatoria")
];

router.get("/", coursesController.list);
router.get("/create", coursesController.createForm);
router.post("/", courseValidations, coursesController.create);
router.get("/:id", coursesController.detail);
router.get("/:id/edit", coursesController.editForm);
router.put("/:id", courseValidations, coursesController.edit);
router.delete("/:id", coursesController.remove);

module.exports = router;
