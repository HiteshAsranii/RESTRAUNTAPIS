const express = require("express");
const router = express.Router();
const { addMenuItems } = require("../controllers/MenuController");
const { addMenuCategories } = require("../controllers/MenuController");
const { updateMenuCategory } = require("../controllers/MenuController");
const { updateMenuItem } = require("../controllers/MenuController");

router.route("/addNewMenuCategory").post(addMenuCategories);
router.route("/addNewMenuItem").post(addMenuItems);
router.route("/updateMenuCategory").patch(updateMenuCategory);
router.route("/updateMenuItem").patch(updateMenuItem);

module.exports = router;

// RequestBody for addNewMenuCategory
// {
//     "menuCategories": [
//         {"CategoryName": "Starters"},
//         {"CategoryName": "Mocktails"}
//     ]
// }

//updateMenuCategory
// params: http://localhost:3000/menu/updateMenuCategory?CategoryId=2
// request body:
//{
//     "CategoryName": "Starters"
//}


//addNewMenuItems request body
// {
//     "menuItems":[
//         { "CategoryId": "2", "ItemName": "Paneer Tikka", "ItemPrice" : "200", "Available": 1 },
//         { "CategoryId": "3", "ItemName": "Blue Lagoon", "ItemPrice" : "160", "Available": 1 }
//     ]
// }


