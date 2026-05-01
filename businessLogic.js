const Product = require("./models/Product");
const Order = require("./models/Order");
const Warehouse = require("./models/Warehouse");

// 🔹 1. Update Stock
async function updateStock(productId, warehouseId, qty) {
  await Warehouse.updateOne(
    { _id: warehouseId, "stock.product": productId },
    { $inc: { "stock.$.qty": qty } }
  );
}

// 🔥 2. Auto Warehouse Selection (NEW)
async function findBestWarehouse(productId, qty) {
  const warehouses = await Warehouse.find({
    "stock.product": productId,
    "stock.qty": { $gte: qty }
  });

  if (warehouses.length === 0) return null;

  let best = warehouses[0];

  warehouses.forEach(w => {
    const item = w.stock.find(s => s.product.toString() === productId.toString());
    const bestItem = best.stock.find(s => s.product.toString() === productId.toString());

    if (item.qty > bestItem.qty) {
      best = w;
    }
  });

  return best;
}

// 🔥 3. Alternative Product Suggestion (NEW)
async function suggestAlternative(productId) {
  const product = await Product.findById(productId);

  if (!product || !product.category) return [];

  return await Product.find({
    category: product.category,
    _id: { $ne: productId }
  }).limit(2);
}

// 🔥 4. Updated Place Order
async function placeOrder(customerId, productId, qty) {
  const warehouse = await findBestWarehouse(productId, qty);

  if (!warehouse) {
    const alternatives = await suggestAlternative(productId);
    console.log("Out of stock! Suggested:", alternatives);
    return null;
  }

  await updateStock(productId, warehouse._id, -qty);

  const order = new Order({
    customerId,
    productId,
    qty,
    warehouseId: warehouse._id
  });

  await order.save();
  return order;
}

// 🔹 5. Low Stock Alert
async function checkLowStock(threshold = 5) {
  const lowStock = await Warehouse.aggregate([
    { $unwind: "$stock" },
    { $match: { "stock.qty": { $lt: threshold } } },
    { $project: { product: "$stock.product", qty: "$stock.qty", warehouse: "$name" } }
  ]);
  console.log("Low Stock Alerts:", lowStock);
}

// 🔹 6. Daily Orders
async function dailyOrders() {
  return await Order.aggregate([
    {
      $group: {
        _id: { day: { $dayOfMonth: "$createdAt" } },
        total: { $sum: 1 }
      }
    }
  ]);
}

// 🔹 7. Stock Summary
async function stockSummary() {
  return await Warehouse.aggregate([
    { $unwind: "$stock" },
    {
      $group: {
        _id: "$stock.product",
        totalQty: { $sum: "$stock.qty" }
      }
    }
  ]);
}
async function findBestWarehouse(productId, qty) {
  const warehouses = await Warehouse.find({
    "stock.product": productId,
    "stock.qty": { $gte: qty }
  });

  if (warehouses.length === 0) return null;

  let best = warehouses[0];

  warehouses.forEach(w => {
    const item = w.stock.find(s => s.product.toString() === productId.toString());
    const bestItem = best.stock.find(s => s.product.toString() === productId.toString());

    if (item.qty > bestItem.qty) {
      best = w;
    }
  });

  return best;
}
module.exports = {
  updateStock,
  placeOrder,
  checkLowStock,
  dailyOrders,
  stockSummary,
  findBestWarehouse,
  suggestAlternative
};