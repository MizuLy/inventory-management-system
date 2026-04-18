const express = require("express");
const logger = require("morgan");

const authRouter = require("./routes/auth.routes");

const productRouter = require("./routes/product.routes");
const customerRouter = require("./routes/customer.routes");
const orderRouter = require("./routes/order.routes");

const app = express();
const PORT = 6969;

// Middleware
app.use(express.json());
app.use(logger("dev"));

// Auth
app.use("/api/auth", authRouter);

// CRUD
app.use("/api/products", productRouter);
app.use("/uploads", express.static("uploads"));

app.use("/api/customers", customerRouter);
app.use("/api/orders", orderRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
