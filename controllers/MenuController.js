const express = require("express");
const { sql, poolPromise } = require("../ConnectionProvider");

const app = express();
app.use(express.json());

const addMenuCategories = async (req, res) => {
  try {
    const { menuCategories } = req.body;
    const pool = await poolPromise;

    for (const menuCategory of menuCategories) {
      const { CategoryName } = menuCategory;
      const request = pool.request();
      request.input("categoryName", sql.VarChar, CategoryName);
      await request.query(
        "Insert into MenuCategories (CategoryName) VALUES (@categoryName)"
      );
    }

    res.status(200).json({ message: "Menu Category inserted successfully" });
  } catch (error) {
    console.error("Error inserting menu category:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const addMenuItems = async (req, res) => {
  try {
    const { menuItems } = req.body; // Assuming menuItems is an array of menu items

    const pool = await poolPromise;

    for (const menuItem of menuItems) {
      const { CategoryId, ItemName, ItemPrice, Available } = menuItem;

      const request = pool.request();
      request.input("categoryId", sql.Int, CategoryId);
      request.input("itemName", sql.VarChar, ItemName);
      request.input("price", sql.Int, ItemPrice);
      request.input("available", sql.Int, Available);

      await request.query(
        "INSERT INTO MenuItems (CategoryId, ItemName, ItemPrice, Available) VALUES (@categoryId, @itemName, @price, @available)"
      );
    }

    res.status(200).json({ message: "Menu items inserted successfully" });
  } catch (error) {
    console.error("Error inserting menu items:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateMenuCategory = async (req, res) => {
  const categoryId = req.query.CategoryId;
  const updates = req.body;

  console.log(`Received request to update category with ID ${categoryId}`);
  console.log(`Received updates:`, updates);
  try {
    const pool = await poolPromise;
    const request = pool.request();
    const setClause = Object.keys(updates)
      .map((key) => `${key} = @${key}`)
      .join(", ");
    Object.keys(updates).forEach((key) => {
      request.input(key, sql.VarChar, updates[key]);
    });
    const query = `UPDATE MenuCategories SET ${setClause} WHERE CategoryId = @categoryId`;
    request.input("categoryId", sql.Int, categoryId);

    await request.query(query);

    res
      .status(200)
      .json({ message: `Category with ID ${categoryId} updated successfully` });
  } catch (error) {
    console.error("Error updating category:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateMenuItem = async (req, res) => {
  const itemId = req.query.ItemId;
  const updates = req.body;

  console.log(`Received request to update Item with ID ${itemId}`);
  console.log(`Received updates:`, updates);
  try {
    const pool = await poolPromise;
    const request = pool.request();
    const setClause = Object.keys(updates)
      .map((key) => {
        let dataType;
        switch (key) {
          case "CategoryId":
            dataType = sql.Int;
            break;
          case "ItemName":
            dataType = sql.VarChar; // Adjust this based on the actual data type
            break;
          // Add cases for other fields with their respective data types
          case "ItemPrice":
            dataType = sql.Int;
            break;
          case "Available":
            dataType = sql.Binary;
            break;
          default:
            dataType = sql.VarChar; // Set a default data type if needed
        }
        request.input(key, dataType, updates[key]);
        return `${key} = @${key}`;
      })
      .join(", ");
    const query = `UPDATE MenuItems SET ${setClause} WHERE ItemId = @itemId`;
    request.input("itemId", sql.Int, itemId);

    await request.query(query);

    res
      .status(200)
      .json({ message: `Item with ID ${itemId} updated successfully` });
  } catch (error) {
    console.error("Error updating Item:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  addMenuItems,
  addMenuCategories,
  updateMenuCategory,
  updateMenuItem,
};
