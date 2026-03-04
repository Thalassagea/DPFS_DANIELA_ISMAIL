// multerUsers.js
const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // destino correcto desde src/middlewares -> public/images/users
    cb(null, path.join(__dirname, '../../public/images/users'));
  },
  filename: (req, file, cb) => {
    const fileName = 'user-' + Date.now() + path.extname(file.originalname);
    cb(null, fileName);
  }
});

const uploadFile = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowed = ['.png', '.jpg', '.jpeg', '.webp', '.gif'];
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, allowed.includes(ext));
  },
  limits: { fileSize: 2 * 1024 * 1024 } // 2MB
});

module.exports = uploadFile;
