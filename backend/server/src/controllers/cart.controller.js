const cartService = require("../services/cart.service");

exports.getCart = async (_req, res, next) => {
  try {
    const cart = await cartService.getCart();
    res.json(cart);
  } catch (e) {
    next(e);
  }
};

exports.addToCart = async (req, res, next) => {
  try {
    const { productId, quantity = 1, deliveryOptionId = "1" } = req.body || {};
    if (!productId)
      return res.status(400).json({ error: "productId required" });
    const cart = await cartService.addToCart(
      productId,
      Number(quantity),
      deliveryOptionId
    );
    res.status(201).json(cart);
  } catch (e) {
    next(e);
  }
};

exports.updateCartItem = async (req, res, next) => {
  try {
    const { productId, quantity, deliveryOptionId } = req.body || {};
    if (!productId)
      return res.status(400).json({ error: "productId required" });
    const cart = await cartService.updateCartItem(
      productId,
      quantity,
      deliveryOptionId
    );
    res.json(cart);
  } catch (e) {
    next(e);
  }
};

exports.removeFromCart = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const cart = await cartService.removeFromCart(productId);
    res.json(cart);
  } catch (e) {
    next(e);
  }
};
