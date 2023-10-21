const multer = require('multer');
const path = require('path');

const diskStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../upload'));
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + ' ' + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: diskStorage });

module.exports = upload;
