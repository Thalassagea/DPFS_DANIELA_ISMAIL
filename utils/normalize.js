const DEFAULT_COURSE_IMAGE = "/imgs/hero.png";

function normalizeCourseImage(image) {
  if (!image || typeof image !== "string") return DEFAULT_COURSE_IMAGE;
  const trimmed = image.trim();
  if (!trimmed) return DEFAULT_COURSE_IMAGE;
  return trimmed.startsWith("/") ? trimmed : `/imgs/${trimmed}`;
}

module.exports = { normalizeCourseImage };
