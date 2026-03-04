const express = require("express");
const router = express.Router();

const apiCoursesController = require("../controllers/api/apiCoursesController");

router.get("/", apiCoursesController.list);
router.get("/:id", apiCoursesController.detail);

module.exports = router;
