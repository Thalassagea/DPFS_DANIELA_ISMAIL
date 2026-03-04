function absoluteUrl(req, relativePath) {
  return `${req.protocol}://${req.get("host")}${relativePath}`;
}

module.exports = { absoluteUrl };
