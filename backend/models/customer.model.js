const db = require("../config/db");

// POST /customers/add
const createCustomer = async (cusName, email, phone, gender) => {
  try {
    const [result] = await db.query(
      "INSERT INTO customers (cusName, email, phone, gender) VALUES (?,?,?,?)",
      [cusName, email, phone, gender],
    );

    return result;
  } catch (err) {
    throw err;
  }
};

// GET /customers
const getCustomers = async () => {
  try {
    const [result] = await db.query("SELECT * FROM customers");

    return result;
  } catch (err) {
    throw err;
  }
};

// PUT /customers/edit/:id
const updateCustomer = async (id, cusName, email, phone, gender) => {
  try {
    const [rows] = await db.query(
      "UPDATE customers SET cusName=?, email=?, phone=?, gender=? WHERE id=?",
      [id, cusName, email, phone, gender],
    );

    if (rows.affectedRows === 0) return null;

    return rows;
  } catch (err) {
    throw err;
  }
};

// DELETE /customers/delete/:id
const deleteCustomer = async (id) => {
  try {
    const [rows] = await db.query("DELETE FROM customers WHERE id=?", [id]);

    if (rows.affectedRows === 0) return null;

    return rows;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  createCustomer,
  getCustomers,
  updateCustomer,
  deleteCustomer,
};
