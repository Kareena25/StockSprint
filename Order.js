const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  customerId: String,
  productId: String,
  qty: Number,
  warehouseId: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Order", orderSchema);
