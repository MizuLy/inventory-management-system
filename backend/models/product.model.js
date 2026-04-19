const db = require("../config/db");

// POST /products/add
const createProduct = async (prodName, image, price, stock, description) => {
  try {
    const [result] = await db.query(
      "INSERT INTO products (prodName, image, price, stock, description) VALUES (?,?,?,?,?)",
      [prodName, image, price, stock, description],
    );

    return result;
  } catch (err) {
    throw err;
  }
};

// GET /products
const getProduct = async () => {
  try {
    const [result] = await db.query(
      "SELECT * FROM products ORDER BY created_at DESC",
    );

    return result;
  } catch (err) {
    throw err;
  }
};

// PUT /products/edit/:id
const updateProduct = async (
  id,
  prodName,
  image,
  price,
  stock,
  description,
) => {
  try {
    const [rows] = await db.query(
      "UPDATE products SET prodName = ?, image = ?, price = ?, stock = ?, description = ? WHERE id = ?",
      [id, prodName, image, price, stock, description],
    );

    if (rows.affectedRows === 0) return null;

    return rows;
  } catch (err) {
    throw err;
  }
};

// DELETE /products/delete/:id
const deleteProduct = async (id) => {
  try {
    const [rows] = await db.query("DELETE FROM products WHERE id = ?", [id]);

    if (rows.affectedRows === 0) return null;

    return rows;
  } catch (err) {
    throw err;
  }
};

module.exports = { createProduct, getProduct, updateProduct, deleteProduct };
