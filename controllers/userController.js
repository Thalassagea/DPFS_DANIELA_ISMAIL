const fs = require("fs");
const path = require("path");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");

const usersFilePath = path.join(__dirname, "../data/users.json");
const usersImagesPath = path.join(__dirname, "../public/images/users");

function getUsers() {
  return JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));
}

function saveUsers(data) {
  fs.writeFileSync(usersFilePath, JSON.stringify(data, null, 2));
}

function resolveUserImage(imageName) {
  const safeName = typeof imageName === "string" ? imageName.trim() : "";
  if (!safeName) return "default.png";

  const absolutePath = path.join(usersImagesPath, safeName);
  return fs.existsSync(absolutePath) ? safeName : "default.png";
}

function hydrateUser(user) {
  if (!user) return null;
  return {
    ...user,
    image: resolveUserImage(user.image)
  };
}

const userController = {
  register: (req, res) => {
    return res.render("users/register", { title: "Registro" });
  },

  processRegister: (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render("users/register", {
        title: "Registro",
        errors: errors.array(),
        old: req.body
      });
    }

    const users = getUsers();
    const existingUser = users.find((u) => u.email === req.body.email.trim());
    if (existingUser) {
      return res.render("users/register", {
        title: "Registro",
        errors: [{ msg: "El email ya está registrado" }],
        old: req.body
      });
    }

    const newUser = {
      id: users.length > 0 ? users[users.length - 1].id + 1 : 1,
      firstName: req.body.firstName.trim(),
      lastName: req.body.lastName.trim(),
      email: req.body.email.trim(),
      password: bcrypt.hashSync(req.body.password, 10),
      image: req.file ? req.file.filename : "default.png",
      category: "user"
    };

    users.push(newUser);
    saveUsers(users);

    return res.redirect("/users/login");
  },

  login: (req, res) => {
    return res.render("users/login", { title: "Ingresar" });
  },

  processLogin: (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render("users/login", {
        title: "Ingresar",
        errors: errors.array(),
        old: req.body
      });
    }

    const users = getUsers();
    const userToLogin = users.find((u) => u.email === req.body.email);

    if (userToLogin && bcrypt.compareSync(req.body.password, userToLogin.password)) {
      const safeUser = hydrateUser(userToLogin);
      req.session.userLogged = safeUser;

      if (req.body.remember) {
        res.cookie("userEmail", safeUser.email, {
          maxAge: 1000 * 60 * 15,
          httpOnly: true,
          sameSite: "lax",
          signed: true,
          secure: process.env.NODE_ENV === "production"
        });
      }

      return res.redirect("/users/profile");
    }

    return res.render("users/login", {
      title: "Ingresar",
      error: "Email o contraseña incorrectos"
    });
  },

  profile: (req, res) => {
    const safeUser = hydrateUser(req.session.userLogged);
    req.session.userLogged = safeUser;

    return res.render("users/profile", {
      title: "Mi Perfil",
      user: safeUser
    });
  },

  logout: (req, res) => {
    res.clearCookie("userEmail");
    req.session.destroy();
    return res.redirect("/");
  }
};

module.exports = userController;
