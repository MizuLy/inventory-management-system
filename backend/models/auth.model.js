const db = require("../config/db");
const bcrypt = require("bcrypt");

// REGISTER
const register = async (name, email, password) => {
  try {
    const [rows] = await db.query("SELECT email FROM users WHERE email=?", [
      email,
    ]);

    if (rows.length > 0) return false;

    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await db.query(
      "INSERT INTO users (name, email, password) VALUES (?,?,?)",
      [name, email, hashedPassword],
    );

    return result;
  } catch (err) {
    throw err;
  }
};

// LOGIN
const login = async (email, password) => {
  try {
    const [result] = await db.query("SELECT * FROM users WHERE email=?", [
      email,
    ]);

    if (result.length === 0) return null;

    const user = result[0];

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) return false;

    return user;
  } catch (err) {
    throw err;
  }
};

// Current user
const currentUser = async (id) => {
  try {
    const [result] = await db.query(
      "SELECT name, email FROM users WHERE id=?",
      [id],
    );

    if (result.length === 0) return null;

    return result[0];
  } catch (err) {
    throw err;
  }
};

module.exports = { register, login, currentUser };
