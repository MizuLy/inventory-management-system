const express = require("express");
const {
  create,
  getAll,
  update,
  destroy,
} = require("../controllers/product.controller");
const verifyToken = require("../middlewares/verifyToken");

const multer = require("multer");
const cloudinary = require("cloudinary");
const CloudinaryStorage = require("multer-storage-cloudinary");

// // Backend only
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/"); // folder to store images
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + "-" + file.originalname); // unique filename
//   },
// });

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "products",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
  },
});

const upload = multer({ storage });

const router = express.Router();

router.post("/", verifyToken, upload.single("image"), create);
router.get("/", verifyToken, getAll);
router.put("/:id", verifyToken, upload.single("image"), update);
router.delete("/:id", verifyToken, destroy);

module.exports = router;
