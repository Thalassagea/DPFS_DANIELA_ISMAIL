const fs = require('fs');
const path = require('path');

const usersFilePath = path.join(__dirname, '../../data/users.json');
const usersImagesPath = path.join(__dirname, '../../public/images/users');

function getUsers() {
  try {
    if (!fs.existsSync(usersFilePath)) return [];
    return JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
  } catch (err) {
    console.error('Error al leer users.json:', err);
    return [];
  }
}

function resolveUserImage(imageName) {
  const safeName = typeof imageName === 'string' ? imageName.trim() : '';
  if (!safeName) return 'default.png';

  const absolutePath = path.join(usersImagesPath, safeName);
  return fs.existsSync(absolutePath) ? safeName : 'default.png';
}

function hydrateUser(user) {
  if (!user) return null;
  return {
    ...user,
    image: resolveUserImage(user.image)
  };
}

module.exports = (req, res, next) => {
  res.locals.isLogged = false;
  res.locals.userLogged = null;

  const emailInCookie = req.signedCookies?.userEmail;
  const users = getUsers();
  const userFromCookie = users.find((u) => u.email === emailInCookie);

  if (userFromCookie) {
    req.session.userLogged = hydrateUser(userFromCookie);
  }

  if (req.session && req.session.userLogged) {
    const safeUser = hydrateUser(req.session.userLogged);
    req.session.userLogged = safeUser;
    res.locals.isLogged = true;
    res.locals.userLogged = safeUser;
  }

  next();
};
