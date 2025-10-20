// controllers/userController.js
const userController = {
  registerForm: (req, res) => {
    res.render('users/register', { title: "Registrarse" });
  },

  register: (req, res) => {
    console.log('Registro:', req.body);
    res.redirect('/');
  },

  loginForm: (req, res) => {
    res.render('users/login', { title: "Ingresar" });
  },

  login: (req, res) => {
    console.log('Login:', req.body);
    res.redirect('/');
  }
};

module.exports = userController;
