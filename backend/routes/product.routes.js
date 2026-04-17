const express = require("express");
const {
  create,
  getAll,
  update,
  destroy,
} = require("../controllers/product.controller");
const verifyToken = require("../middlewares/verifyToken");

const router = express.Router();

router.post("/", verifyToken, create);
router.get("/", verifyToken, getAll);
router.put("/:id", verifyToken, update);
router.delete("/:id", verifyToken, destroy);

module.exports = router;
