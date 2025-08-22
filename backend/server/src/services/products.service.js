const fs = require("fs");
const path = require("path");

const productsPath = path.join(__dirname, "..", "data", "products.json");

exports.getAllProducts = async () => {
  const json = await fs.promises.readFile(productsPath, "utf-8");
  return JSON.parse(json);
};

exports.getProduct = async (id) => {
  const all = await exports.getAllProducts();
  return all.find((p) => p.id === id);
};
