const {
  createCustomer,
  getCustomers,
  updateCustomer,
  deleteCustomer,
} = require("../models/customer.model");

// POST
const create = async (req, res) => {
  try {
    const { cusName, email, phone, gender } = req.body;

    const result = await createCustomer(cusName, email, phone, gender);

    res.status(201).json({
      message: "Customer added",
      id: result.insertId,
      name: cusName,
      email,
      phone,
      gender,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// GET
const getAll = async (req, res) => {
  try {
    const result = await getCustomers();

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// UPDATE
const update = async (req, res) => {
  try {
    const { cusName, email, phone, gender } = req.body;
    const { id } = req.params;

    const rows = updateCustomer(cusName, email, phone, gender, id);

    if (!rows) return res.status(404).json({ message: "Customer not found" });

    res.status(200).json({
      message: "Customer updated",
      name: cusName,
      email,
      phone,
      gender,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// DELETE
const destroy = async (req, res) => {
  try {
    const { id } = req.params;

    const rows = deleteCustomer(id);

    if (!rows) return res.status(404).json({ message: "Customer not found" });

    res.status(200).json({ message: "Customer deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = { create, getAll, update, destroy };
