const fs = require("fs");
const path = require("path");

const coursesFile = path.join(__dirname, "../data/courses.json");

function readCourses() {
  try {
    return JSON.parse(fs.readFileSync(coursesFile, "utf-8"));
  } catch (error) {
    return [];
  }
}

function writeCourses(courses) {
  fs.writeFileSync(coursesFile, JSON.stringify(courses, null, 2), "utf-8");
}

module.exports = { readCourses, writeCourses };
