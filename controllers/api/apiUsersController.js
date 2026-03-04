const path = require("path");
const fs = require("fs");
const { absoluteUrl } = require("../../utils/url");

const usersFile = path.join(__dirname, "../../data/users.json");
const usersImagesDir = path.join(__dirname, "../../public/images/users");
const DEFAULT_USER_IMAGE = "default.png";

function readUsers() {
  try {
    return JSON.parse(fs.readFileSync(usersFile, "utf-8"));
  } catch (error) {
    return [];
  }
}

function resolveUserImage(fileName) {
  const safeName = typeof fileName === "string" && fileName.trim() ? fileName.trim() : DEFAULT_USER_IMAGE;
  const filePath = path.join(usersImagesDir, safeName);
  return fs.existsSync(filePath) ? safeName : DEFAULT_USER_IMAGE;
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
    const users = readUsers();
    const { page = 1, limit = 10 } = req.query;
    const { currentPage, perPage, offset, paginated } = paginate(users, page, limit);

    const next =
      offset + perPage < users.length
        ? absoluteUrl(req, `/api/users?page=${currentPage + 1}&limit=${perPage}`)
        : null;

    const previous =
      currentPage > 1
        ? absoluteUrl(req, `/api/users?page=${currentPage - 1}&limit=${perPage}`)
        : null;

    return res.json({
      count: users.length,
      next,
      previous,
      users: paginated.map((u) => ({
        id: u.id,
        name: `${u.firstName} ${u.lastName}`,
        email: u.email,
        detail: absoluteUrl(req, `/api/users/${u.id}`)
      }))
    });
  },

  detail: (req, res) => {
    const users = readUsers();
    const user = users.find((u) => String(u.id) === String(req.params.id));

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const { password, category, ...safeUser } = user;
    const imageName = resolveUserImage(user.image);

    return res.json({
      ...safeUser,
      image: imageName,
      imageURL: absoluteUrl(req, `/images/users/${imageName}`)
    });
  }
};
