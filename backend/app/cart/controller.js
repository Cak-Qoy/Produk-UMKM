const Product = require("../product/model");
const CartItem = require("../cart-item/model");

const store = async (req, res, next) => {
  try {
    let payload = req.body;
    let user = req.user;
    let cartItem = new CartItem({ ...payload, user: user._id});
    await cartItem.save();
    return res.json(cartItem);
  } catch (err) {
    if (err && err.name === "ValidationError") {
      return res.json({
        error: 1,
        massage: err.massage,
        fields: err.errors,
      });
    }
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const { items } = req.body;
    const productIds = items.map((item) => item.product._id);
    const products = await Product.find({ _id: { $in: productIds } });
    let cartItems = items.map((item) => {
      let relatedProduct = products.find(
        (product) => product._id.toString() === item.product._id
      );
      return {
        product: relatedProduct._id,
        price: relatedProduct.price,
        image_url: relatedProduct.image_url,
        name: relatedProduct.name,
        user: req.user._id,
        qty: item.qty,
      };
    });

    await CartItem.deleteMany({ user: req.user._id });
    await CartItem.bulkWrite(
      cartItems.map((item) => {
        return {
          updateOne: {
            filter: {
              user: req.user._id,
              product: item.product,
            },
            update: item,
            upsert: true,
          },
        };
      })
    );

    return res.json(cartItems);
  } catch (err) {
    if (err && err.name === "ValidationError") {
      return res.json({
        error: 1,
        massage: err.massage,
        fields: err.errors,
      });
    }
    next(err);
  }
};

const index = async (req, res, next) => {
  try {
    let items = await CartItem.find({ user: req.user._id }).populate("product");
    return res.json(items);
  } catch (err) {
    if (err && err.name === "ValidationError") {
      return res.json({
        error: 1,
        massage: err.massage,
        fields: err.errors,
      });
    }
    next(err);
  }
};

module.exports = {
  store,
  update,
  index,
};
