const express = require("express");
const { sql, poolPromise } = require("../ConnectionProvider");
const moment = require("moment");

const app = express();
app.use(express.json());

const placeOrder = async (req, res) => {
  try {
    const { orderDetails } = req.body;
    const { orderItems } = req.body;
    const today = moment();
    var orderDate = today.format("YYYY-MM-DD");
    var orderTime = today.format("HH:mm:ss");

    const pool = await poolPromise;
    const request = pool.request();

    request.input("TableId", sql.Int, orderDetails.TableId);
    request.input("OrderTime", sql.Time, orderDate);
    request.input("OrderDate", sql.Date, orderTime);
    request.input("OrderTotal", sql.Int, orderDetails.OrderTotal);
    request.input("OrderStatus", sql.VarChar, "Placed");
    request.input("OrderItems", sql.TVP, orderItems);

    await request.execute("InsertOrderWithItems");
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
    request.input("OrderItems", sql.TVP, orderItems);   

    await request.execute("updateOrder");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { placeOrder, updateOrder };
