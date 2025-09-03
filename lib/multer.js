import multer from "multer";

// Configure storage for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/schoolImages");
  },
  filename: (req, file, cb) => {
    // Generate unique filename
    cb(null, Date.now() + "-" + file.originalname);
  },
});

export const upload = multer({ storage: storage });
