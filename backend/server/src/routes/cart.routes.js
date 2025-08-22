const { Router } = require("express");
const ctrl = require("../controllers/cart.controller");

const router = Router();

// Returns current cart
router.get("/cart", ctrl.getCart);

// Add item(s) to cart: { productId, quantity, deliveryOptionId }
router.post("/cart", ctrl.addToCart);

// Update quantity or delivery option: { productId, quantity?, deliveryOptionId? }
router.patch("/cart", ctrl.updateCartItem);

// Remove item
router.delete("/cart/:productId", ctrl.removeFromCart);

module.exports = router;
