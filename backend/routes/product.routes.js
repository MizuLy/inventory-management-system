const express = require("express");
const {
  create,
  getAll,
  update,
  destroy,
} = require("../controllers/product.controller");
const verifyToken = require("../middlewares/verifyToken");

const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // folder to store images
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // unique filename
  },
});

const upload = multer({ storage });

const router = express.Router();

router.post("/", verifyToken, upload.single("image"), create);
router.get("/", verifyToken, getAll);
router.put("/:id", verifyToken, upload.single("image"), update);
router.delete("/:id", verifyToken, destroy);

module.exports = router;
