const express = require("express");
const cors = require("cors");
const logger = require("morgan");
const rateLimit = require("express-rate-limit");

const authRouter = require("./routes/auth.routes");

const productRouter = require("./routes/product.routes");
const customerRouter = require("./routes/customer.routes");
const orderRouter = require("./routes/order.routes");

const app = express();
const PORT = 6969;

// Rate Limit
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { message: "Too many requests, try again later." },
});

// Middleware
app.use(logger("dev"));
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

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
