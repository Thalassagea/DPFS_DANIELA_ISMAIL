const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const DATA_PATH = path.join(__dirname, '..', 'data', 'users.json');

function readUsers() {
  try {
    const raw = fs.readFileSync(DATA_PATH, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading users.json', err);
    return [];
  }
}

function writeUsers(users) {
  fs.writeFileSync(DATA_PATH, JSON.stringify(users, null, 2), 'utf-8');
}

// REGISTER
router.get('/register', (req, res) => {
  res.render('users/register', { title: 'Registrarse' });
});

router.post('/register', (req, res) => {
  const users = readUsers();
  const body = req.body;
  const maxId = users.reduce((acc, u) => Math.max(acc, Number(u.id || 0)), 0);
  const newUser = {
    id: maxId + 1,
    firstName: body.firstName || '',
    lastName: body.lastName || '',
    email: body.email || '',
    password: body.password || '',
    category: body.category || '',
    image: body.image || ''
  };
  users.push(newUser);
  writeUsers(users);
  res.redirect('/');
});

// LOGIN
router.get('/login', (req, res) => {
  res.render('users/login', { title: 'Ingresar' });
});

router.post('/login', (req, res) => {
  const users = readUsers();
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) return res.redirect('/users/login');
  res.redirect('/');
});

module.exports = router;
