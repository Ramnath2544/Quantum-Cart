const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const productsService = require("./products.service");
const cartService = require("./cart.service");

const ordersPath = path.join(__dirname, "..", "data", "orders.json");

async function loadOrders() {
  try {
    const json = await fs.promises.readFile(ordersPath, "utf-8");
    return JSON.parse(json);
  } catch {
    return [];
  }
}

async function saveOrders(orders) {
  await fs.promises.mkdir(path.dirname(ordersPath), { recursive: true });
  await fs.promises.writeFile(ordersPath, JSON.stringify(orders, null, 2));
}

exports.createOrderFromCart = async () => {
  const orders = await loadOrders();
  const cart = cartService.getCartSnapshot();
};

// Build order lines with price and ETA computation (simple demo logic)
const now = Date.now();
const orderProducts = [];
for (const item of cart) {
  const product = await productsService.getProduct(item.productId);
  if (!product) continue;
  const deliveryDays = (() => {
    // Mirror your deliveryOptions ids: '1' => 7 days, '2' => 3 days, '3' => 1 day
    if (item.deliveryOptionId === "3") return 1;
    if (item.deliveryOptionId === "2") return 3;
    return 7;
  })();
  const estimatedDeliveryTime = now + deliveryDays * 24 * 60 * 60 * 1000;

  orderProducts.push({
    productId: product.id,
    name: product.name,
    unitPrice: product.price,
    quantity: item.quantity,
    deliveryOptionId: item.deliveryOptionId,
    estimatedDeliveryTime,
  });
}

const order = {
  id: uuidv4(),
  orderTime: now,
  products: orderProducts,
};

exports.getOrder = async (orderId) => {
  const orders = await loadOrders();
  return orders.find((o) => o.id === orderId);
};
