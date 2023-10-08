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
