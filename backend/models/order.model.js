const db = require("../config/db");

// Create Orders
const createOrder = async (customer_id, items) => {
  try {
    let totalPrice = 0;

    // fetch price from DB for each item
    for (const item of items) {
      const [rows] = await db.query(
        "SELECT price, stock FROM products WHERE id=?",
        [item.product_id],
      );

      const product = rows[0];

      if (product.stock < item.quantity) {
        throw new Error(`Not enough stock for product ${item.product_id}`);
      }

      const price = product.price;
      totalPrice += price * item.quantity;
      item.price = price; // attach real price to item
    }

    // 2. insert into orders
    const [order] = await db.query(
      "INSERT INTO orders (customer_id, totalPrice) VALUES (?,?)",
      [customer_id, totalPrice],
    );

    // 3. insert each item into order_items
    for (const item of items) {
      await db.query(
        "INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?,?,?,?)",
        [
          order.insertId,
          item.product_id,
          item.quantity,
          item.price * item.quantity,
        ],
      );

      await db.query("UPDATE products SET stock = stock - ? WHERE id = ?", [
        item.quantity,
        item.product_id,
      ]);
    }

    return order.insertId;
  } catch (err) {
    throw err;
  }
};

// Get orders
const getOrders = async () => {
  try {
    const [orders] = await db.query(
      `
  SELECT o.id, o.totalPrice, o.created_at, c.cusName
  FROM orders o
  JOIN customers c ON o.customer_id = c.id
  ORDER BY o.created_at DESC
`,
    );

    for (const order of orders) {
      const [items] = await db.query(
        `SELECT oi.id, oi.quantity, oi.price, p.prodName, p.image
         FROM order_items oi
         JOIN products p ON oi.product_id = p.id
         WHERE oi.order_id = ?`,
        [order.id],
      );
      order.items = items;
    }

    return orders;
  } catch (err) {
    throw err;
  }
};

// Get orders by id
const getOrderId = async (id) => {
  try {
    const [result] = await db.query("SELECT * FROM orders WHERE id=?", [id]);

    if (result.length === 0) return null;

    const [items] = await db.query(
      `SELECT oi.id, oi.quantity, oi.price, p.prodName, p.image
       FROM order_items oi
       JOIN products p ON oi.product_id = p.id
       WHERE oi.order_id = ?`,
      [id],
    );

    return { ...result[0], items };
  } catch (err) {
    throw err;
  }
};

module.exports = { createOrder, getOrders, getOrderId };
