import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./backend/uploads/logos");
  },
  filename: function (req, file, cb) {
    const fileSuffix = Date.now();
    cb(null, fileSuffix + file.originalname);
  },
});

export const upload = multer({ storage: storage });
