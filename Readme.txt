# StockSprint Backend

## 📌 Overview
StockSprint is a smart inventory and order management backend system designed for quick-commerce platforms (like Blinkit/Zepto).

This system manages products, tracks warehouse stock, processes customer orders, and performs intelligent decision-making such as selecting the best warehouse and suggesting alternatives when products are unavailable.

## ⚙️ Setup Instructions
1. Make sure Node.js is installed  
2. Open terminal and navigate to project folder:
   cd StockSprint  
3. Install dependencies:
   npm install  
4. Run the project:
   node demo.js  

## 🗂️ Models (Schemas)
- Product.js → Stores product details (name, price, category)  
- Warehouse.js → Stores warehouse information and stock levels  
- Order.js → Stores customer order data  

## 🧠 Core Functionalities

### 🔹 Stock Management
- Updates product quantity in warehouses  
- Automatically adjusts stock when orders are placed  

### 🔹 Order Processing
- Creates customer orders  
- Reduces stock after successful order placement  

### 🔥 Smart Features
- Auto Warehouse Selection → Selects the best warehouse based on available stock  
- Alternative Product Suggestion → Suggests similar products if item is out of stock  
- Low Stock Alerts → Identifies products below a threshold  

### 📊 Analytics
- Daily Orders → Counts total orders per day  
- Stock Summary → Shows total stock per product  

## 🧪 Expected Output
When running:
node demo.js

The system will:
- Connect to MongoDB  
- Insert dummy data  
- Create an order  
- Update stock automatically  
- Show low stock alerts  
- Display daily order stats  
- Display stock summary  

## 🗄️ Database
MongoDB is used as the database  
Connection URL:
mongodb://127.0.0.1:27017/stocksprint  

Data is handled dynamically using Mongoose  

## 💡 Notes
- MongoDB must be running locally  
- Data is automatically inserted and updated by backend logic  
- System demonstrates real-time inventory updates and smart order processing  
