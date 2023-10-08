const express = require("express");
const router = express.Router();
const { placeOrder, updateOrder } = require("../controllers/OrderController");

router.route("/placeOrder").post(placeOrder);
router.route("/updateOrder").patch(updateOrder);

module.exports = router;
