const { Router } = require("express");
const ctrl = require("../controllers/products.controller");

const router = Router();

router.get("/products", ctrl.listProducts);

module.exports = router;
