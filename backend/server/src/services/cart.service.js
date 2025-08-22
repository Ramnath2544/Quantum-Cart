const { getProduct } = require("./products.service");

let cart = []; // [{ productId, quantity, deliveryOptionId }]

exports.getCart = async () => {
  return cart;
};

exports.addToCart = async (productId, quantity = 1, deliveryOptionId = "1") => {
  const product = await getProduct(productId);
  if (!product) {
    const err = new Error("Invalid productId");
    err.status = 400;
    throw err;
  }
  const existing = cart.find((i) => i.productId === productId);
  if (existing) {
    existing.quantity += quantity;
    if (deliveryOptionId) existing.deliveryOptionId = deliveryOptionId;
  } else {
    cart.push({ productId, quantity, deliveryOptionId });
  }
  return cart;
};

exports.updateCartItem = async (productId, quantity, deliveryOptionId) => {
  const item = cart.find((i) => i.productId === productId);
  if (!item) {
    const err = new Error("Item not in cart");
    err.status = 404;
    throw err;
  }
  if (typeof quantity !== "undefined") {
    const q = Number(quantity);
    if (!Number.isFinite(q) || q < 1) {
      const err = new Error("quantity must be >= 1");
      err.status = 400;
      throw err;
    }
    item.quantity = q;
  }
  if (deliveryOptionId) item.deliveryOptionId = deliveryOptionId;
  return cart;
};

exports.removeFromCart = async (productId) => {
  cart = cart.filter((i) => i.productId !== productId);
  return cart;
};

exports.resetCart = async () => {
  cart = [];
};

exports.getCartSnapshot = () => cart.map((i) => ({ ...i })); // used by orders
