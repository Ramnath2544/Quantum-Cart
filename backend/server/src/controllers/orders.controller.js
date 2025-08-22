const ordersService = require("../services/orders.service");

exports.createOrder = async (req, res, next) => {
  try {
    // For demo: expect body includes cart items; or service reads current cart
    const order = await ordersService.createOrderFromCart();
    res.status(201).json(order);
  } catch (e) {
    next(e);
  }
};

exports.listOrders = async (_req, res, next) => {
  try {
    const orders = await ordersService.listOrders();
    res.json(orders);
  } catch (e) {
    next(e);
  }
};

exports.getOrder = async (req, res, next) => {
  try {
    const order = await ordersService.getOrder(req.params.orderId);
    if (!order) return res.status(404).json({ error: "Not found" });
    res.json(order);
  } catch (e) {
    next(e);
  }
};
