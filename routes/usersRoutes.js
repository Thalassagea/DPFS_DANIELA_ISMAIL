const express = require("express");
const router = express.Router();
const { body } = require("express-validator");

// ---------------------------
//  CONTROLADOR
// ---------------------------
const userController = require("../controllers/userController");

// ---------------------------
//  MIDDLEWARES
// ---------------------------
// Ajustado a tu estructura actual: src/middlewares/
const uploadFile = require("../src/middlewares/multerUsers");
const guestMiddleware = require("../src/middlewares/guestMiddleware");
const authMiddleware = require("../src/middlewares/authMiddleware");

const registerValidations = [
  body("firstName").trim().notEmpty().withMessage("Nombre obligatorio"),
  body("lastName").trim().notEmpty().withMessage("Apellido obligatorio"),
  body("email").isEmail().withMessage("Email inválido"),
  body("password").isLength({ min: 6 }).withMessage("Mínimo 6 caracteres")
];

const loginValidations = [
  body("email").isEmail().withMessage("Email inválido"),
  body("password").notEmpty().withMessage("Contraseña obligatoria")
];

// ---------------------------
//  RUTAS DE USUARIO
// ---------------------------

// Registro de usuario (solo huéspedes)
router.get("/register", guestMiddleware, userController.register);
router.post(
  "/register",
  uploadFile.single("image"),
  registerValidations,
  userController.processRegister
);

// Login de usuario (solo huéspedes)
router.get("/login", guestMiddleware, userController.login);
router.post("/login", loginValidations, userController.processLogin);

// Perfil de usuario (solo usuarios logueados)
router.get("/profile", authMiddleware, userController.profile);

// Logout
router.get("/logout", userController.logout);

module.exports = router;
