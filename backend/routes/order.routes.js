const express = require("express");
const { create, getAll, getById } = require("../controllers/order.controller");
const verifyToken = require("../middlewares/verifyToken");

const router = express.Router();

router.post("/", verifyToken, create);
router.get("/", verifyToken, getAll);
router.get("/:id", verifyToken, getById);

module.exports = router;
