const service = require("../services/products.service");

exports.listProducts = async (_req, res, next) => {
  try {
    const products = await service.getAllProducts();
    res.json(products);
  } catch (e) {
    next(e);
  }
};
