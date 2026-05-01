const mongoose = require("mongoose");

const warehouseSchema = new mongoose.Schema({
  name: String,
  stock: [{ product: String, qty: Number }]
});

module.exports = mongoose.model("Warehouse", warehouseSchema);
