# StockSprint Backend (Member 2)

## Overview
This backend system is designed for inventory and order management in quick‑commerce platforms.  
My part includes creating models and implementing business logic functions.

## Setup Instructions
1. Make sure Node.js is installed.
2. Open terminal and go to the project folder: cd StockSprint
3. Install dependencies: npm install
4. Run the demo: node demo.js

## Models (Schemas)
- Product.js → Stores product details (name, price)
- Warehouse.js → Stores warehouse and stock details
- Order.js → Stores customer orders

## Business Logic Functions
- updateStock(productId, warehouseId, qty) → Updates warehouse stock
- placeOrder(customerId, productId, qty) → Creates an order and reduces stock
- checkLowStock(threshold) → Alerts if stock is below threshold
- dailyOrders() → Counts total orders placed in a day
- stockSummary() → Shows total stock per product

## Expected Output (Proof)
When you run `node demo.js`, terminal output will show:
- DB Connected
- Dummy data inserted
- Order JSON printed
- Low Stock Alerts
- Daily Orders
- Stock Summary

## Notes
- MongoDB must be running locally (default: mongodb://127.0.0.1:27017/stocksprint).
- The demo inserts dummy data and tests the functions.
