const express = require("express");

const { signUp, signIn, current } = require("../controllers/auth.controller");
const verifyToken = require("../middlewares/verifyToken");

const router = express.Router();

// Block to avoid people registering
router.post("/register", signUp);

// PUBLIC
router.post("/login", signIn);
router.get("/me", verifyToken, current);

module.exports = router;
