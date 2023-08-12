const router = require("express").Router();
const cartController = require("./controller");
const { police_check } = require("../../middlewares");

router.post("/carts", police_check("create", "Cart"), cartController.store);
// router.put("/carts", police_check("update", "Cart"), cartController.update);

router.get("/carts", police_check("read", "Cart"), cartController.index);

module.exports = router;
