const {
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
} = require("../models/product.model");

// POST /products/add
const create = async (req, res) => {
  try {
    const { prodName, image, price, stock, description } = req.body;

    const result = await createProduct(
      prodName,
      image,
      price,
      stock,
      description,
    );

    res.status(201).json({
      message: "Product added",
      id: result.insertId,
      name: prodName,
      image,
      price,
      stock,
      description,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// GET /products
const getAll = async (req, res) => {
  try {
    const result = await getProduct();

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// PUT /products/edit/:id
const update = async (req, res) => {
  try {
    const { prodName, image, price, stock, description } = req.body;
    const { id } = req.params;

    const rows = await updateProduct(
      prodName,
      image,
      price,
      stock,
      description,
      id,
    );

    if (!rows) return res.status(404).json({ message: "Product not found" });

    res.status(200).json({
      message: "Product updated",
      name: prodName,
      image,
      price,
      stock,
      description,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// DELETE /products/delete/:id
const destroy = async (req, res) => {
  try {
    const { id } = req.params;

    const rows = await deleteProduct(id);

    if (!rows) return res.status(404).json({ message: "Product not found" });

    res.status(200).json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = {
  create,
  getAll,
  update,
  destroy,
};
