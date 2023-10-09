const express = require("express");
const { sql, poolPromise } = require("../ConnectionProvider");
const moment = require("moment");

const app = express();
app.use(express.json());

const placeOrder = async (req, res) => {
  try {
    const { orderDetails, orderItems } = req.body; // Destructure orderDetails and orderItems

    const pool = await poolPromise;
    const request = pool.request();

    // Generate the current date and time using moment.js
    const orderDate = moment().format("YYYY-MM-DD");
    const orderTime = moment().format("HH:mm:ss");

    // Log the date and time for debugging
    console.log(orderDate);
    console.log(orderTime);

    request.input("TableId", sql.Int, orderDetails.TableId);
    request.input("OrderDate", sql.Date, orderDate);
    request.input("OrderTime", sql.VarChar, orderTime);
    request.input("OrderTotal", sql.Int, orderDetails.OrderTotal);
    request.input("OrderStatus", sql.VarChar, "Placed");

    // Define TVP as a table with rows
    const tvp = new sql.Table();
    tvp.columns.add("ItemIndex", sql.Int); // Add ItemIndex column
    tvp.columns.add("ItemId", sql.Int);
    tvp.columns.add("Quantity", sql.Int);
    tvp.columns.add("Subtotal", sql.Int);

    // Populate the TVP
    orderItems.forEach((item, index) => {
      tvp.rows.add(index + 1, item.ItemId, item.Quantity, item.Subtotal); // Assign unique index values
    });

    request.input("OrderItems", sql.TVP, tvp);

    await request.execute("InsertOrderWithItems");
    res.status(200).json({ message: "Order placed successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateOrder = async (req, res) => {
  try {
    const orderId = req.query.OrderId;
    const tableId = req.query.TableId;
    const { orderDetails } = req.body;
    const { orderItems } = req.body;
    const pool = await poolPromise;
    const request = pool.request();

    request.input("OrderId", sql.Int, orderId);
    request.input("TableId", sql.Int, tableId);
    request.input("OrderTotal", sql.Int, orderDetails.OrderTotal);
    const tvp = new sql.Table();
    tvp.columns.add("ItemIndex", sql.Int); // Add ItemIndex column
    tvp.columns.add("ItemId", sql.Int);
    tvp.columns.add("Quantity", sql.Int);
    tvp.columns.add("Subtotal", sql.Int);

    // Populate the TVP
    orderItems.forEach((item, index) => {
      tvp.rows.add(index + 1, item.ItemId, item.Quantity, item.Subtotal); // Assign unique index values
    });

    request.input("OrderItems", sql.TVP, tvp);

    await request.execute("updateOrder");
    res.status(200).json({ message: "Order placed successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getOrderDetails = async (req, res) => {
  try {
    const tableId = req.query.tableId;
    const pool = await poolPromise;
  } catch (error) {}
};

module.exports = { placeOrder, updateOrder };
