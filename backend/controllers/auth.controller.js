const jwt = require("jsonwebtoken");
require("dotenv").config();
const { register, login, currentUser } = require("../models/auth.model");

// REGISTER
const signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const result = await register(name, email, password);

    if (result === false)
      return res.status(400).json({ message: "Email already registered" });

    res.status(201).json({ message: "Registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// LOGIN
const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await login(email, password);

    if (result === null)
      return res.status(404).json({ message: "Email doesn't exist" });
    if (result === false)
      return res.status(400).json({ message: "Invalid email or password" });

    const token = jwt.sign(
      {
        id: result.id,
        email: result.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "3d",
      },
    );

    res.status(200).json({
      message: "Login successful",
      user: {
        id: result.id,
        name: result.name,
        email: result.email,
      },
      token,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Current user
const current = async (req, res) => {
  try {
    const { id } = req.user;

    const result = await currentUser(id);

    if (!result) return res.status(404).json({ message: "User not found" });

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = { signUp, signIn, current };
