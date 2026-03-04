const path = require("path");
const fs = require("fs");
const { absoluteUrl } = require("../../utils/url");
const { normalizeCourseImage } = require("../../utils/normalize");

const coursesFile = path.join(__dirname, "../../data/courses.json");

function readCourses() {
  try {
    return JSON.parse(fs.readFileSync(coursesFile, "utf-8"));
  } catch (error) {
    return [];
  }
}

function paginate(items, page = 1, limit = 10) {
  const currentPage = Number(page) || 1;
  const perPage = Number(limit) || 10;
  const offset = (currentPage - 1) * perPage;
  const paginated = items.slice(offset, offset + perPage);
  return { currentPage, perPage, offset, paginated };
}

module.exports = {
  list: (req, res) => {
    const courses = readCourses();
    const { page = 1, limit = 10 } = req.query;
    const { currentPage, perPage, offset, paginated } = paginate(courses, page, limit);

    const countByCategory = {};
    courses.forEach((c) => {
      const category = c.category || "Sin categoría";
      countByCategory[category] = (countByCategory[category] || 0) + 1;
    });

    const next =
      offset + perPage < courses.length
        ? absoluteUrl(req, `${req.baseUrl}?page=${currentPage + 1}&limit=${perPage}`)
        : null;

    const previous =
      currentPage > 1
        ? absoluteUrl(req, `${req.baseUrl}?page=${currentPage - 1}&limit=${perPage}`)
        : null;

    return res.json({
      count: courses.length,
      countByCategory,
      next,
      previous,
      products: paginated.map((c) => ({
        id: c.id,
        name: c.name,
        description: c.description,
        categories: [c.category].filter(Boolean),
        detail: absoluteUrl(req, `${req.baseUrl}/${c.id}`)
      })),
      courses: paginated.map((c) => ({
        id: c.id,
        name: c.name,
        description: c.description,
        categories: [c.category].filter(Boolean),
        detail: absoluteUrl(req, `${req.baseUrl}/${c.id}`)
      }))
    });
  },

  detail: (req, res) => {
    const courses = readCourses();
    const course = courses.find((c) => String(c.id) === String(req.params.id));

    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    const imagePath = normalizeCourseImage(course.image);

    return res.json({
      ...course,
      categories: [course.category].filter(Boolean),
      colors: Array.isArray(course.colors) ? course.colors : [],
      sizes: Array.isArray(course.sizes) ? course.sizes : [],
      imageURL: absoluteUrl(req, imagePath)
    });
  }
};
