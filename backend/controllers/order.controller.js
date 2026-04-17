const { createOrder, getOrders, getOrderId } = require("../models/order.model");

// Create order
const create = async (req, res) => {
  try {
    const { customer_id, items } = req.body;
    // items = [{ product_id: 1, quantity: 2, price: 10 }, ...]

    const orderId = await createOrder(customer_id, items);

    res.status(201).json({ message: "Order placed:", orderId });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Get all
const getAll = async (req, res) => {
  try {
    const result = await getOrders();

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Get by ID
const getById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await getOrderId(id);

    if (!result) return res.status(404).json({ message: "Order not found" });

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = { create, getAll, getById };
