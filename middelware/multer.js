import multer from "multer";
import os from "os";
// console.log(os.tmpdir());
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, os.tmpdir());
  },
  filename: function (req, file, cb) {
    return cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage });

export default upload;
