const { Router } = require("express");
const ctrl = require("../controllers/orders.controller");

const router = Router();

// Create order from cart
router.post("/orders", ctrl.createOrder);

// List all orders (for demo; in real app, scope to user)
router.get("/orders", ctrl.listOrders);

// Get single order
router.get("/orders/:orderId", ctrl.getOrder);

module.exports = router;
