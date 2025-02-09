const multer = require("multer");
require("dotenv").config();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../"); // Adjust the destination folder
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
