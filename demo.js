const mongoose = require("mongoose");
const Product = require("./models/Product");
const Warehouse = require("./models/Warehouse");
const { updateStock, placeOrder, checkLowStock, dailyOrders, stockSummary } = require("./businessLogic");

mongoose.connect("mongodb://127.0.0.1:27017/stocksprint")
  .then(async () => {
    console.log("DB Connected");

    // Dummy Product insert
    const product = new Product({
     name: "Laptop",
     price: 50000,
     category: "electronics"   // 👈 ye add karo
});
    await product.save();

    // Dummy Warehouse insert
    const warehouse = new Warehouse({
      name: "Main Warehouse",
      stock: [{ product: product._id.toString(), qty: 20 }]
    });
    await warehouse.save();

    console.log("Dummy data inserted:", product._id, warehouse._id);

    // Ab actual ObjectId use karo
    await updateStock(product._id, warehouse._id, 10);
    console.log(await placeOrder("c1", product._id, 5));
    await checkLowStock(5);
    console.log(await dailyOrders());
    console.log(await stockSummary());

    mongoose.disconnect();
  })
  .catch(err => console.error(err));
