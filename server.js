const express = require("express");
const mongoose = require("mongoose");

// Models aur business logic import
const Product = require("./models/Product");
const Warehouse = require("./models/Warehouse");
const { updateStock, placeOrder, checkLowStock, dailyOrders, stockSummary } = require("./businessLogic");

const app = express();
app.use(express.json());

// MongoDB connect
mongoose.connect("mongodb://127.0.0.1:27017/stocksprint")
    .then(() => console.log("DB Connected"))
    .catch(err => console.error(err));

// APIs expose karo
app.post("/placeOrder", async (req, res) => {
    try {
        const result = await placeOrder(req.body);
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post("/updateStock", async (req, res) => {
    try {
        const result = await updateStock(req.body);
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get("/lowStock", async (req, res) => {
    const alerts = await checkLowStock();
    res.json(alerts);
});

app.get("/dailyOrders", async (req, res) => {
    const orders = await dailyOrders();
    res.json(orders);
});

app.get("/stockSummary", async (req, res) => {
    const summary = await stockSummary();
    res.json(summary);
});

// Server start
app.listen(5000, () => {
    console.log("Server running at http://localhost:5000");
});
