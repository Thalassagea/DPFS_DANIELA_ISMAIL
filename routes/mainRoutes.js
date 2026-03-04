const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const DATA_PATH = path.join(__dirname, "..", "data", "courses.json");

// HOME
router.get("/", (req, res) => {
  let courses = [];
  try {
    const data = fs.readFileSync(DATA_PATH, "utf-8");
    courses = JSON.parse(data);
  } catch (err) {
    console.error("Error al leer courses.json:", err);
  }
  res.render("users/index", { title: "Inicio", courses });
});

// 🔹 CARRITO
router.get("/cart", (req, res) => {
  res.render("users/courseCart", { title: "Mi Carrito" });
});

module.exports = router;
