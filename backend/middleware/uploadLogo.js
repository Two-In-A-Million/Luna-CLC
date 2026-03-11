import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/logo/");
  },
  filename: function (req, file, cb) {
    const fileName = req.body.fileName;
    const ext = path.extname(file.originalname);

    cb(null, fileName + ext);
  }
});

const upload = multer({ storage });

export const uploadLogo = upload.single("fileLogo");