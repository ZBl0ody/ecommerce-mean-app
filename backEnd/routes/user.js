// inilaizing router from express
const express = require("express");
const router = express.Router();
// router requirements
const { default: mongoose } = require("mongoose");
// Importing models
const Product = require("../models/product");
const User = require("../models/user");
const Order = require("../models/order");
// Importing middlewares
const { requireAuth } = require("../middlewares/authMiddleware");

// current user
var currentUser = {
  userName: "Z_Bl0ody",
  email: "boody.15as@gmail.com",
  _id: "64e204be10af310ebc67970a",
};
// Add to car POST
router.post("/addtocart", async (req, res) => {
  const toAddproductId = req.body.productId;
  console.log(req.body.movieId);
  let newCart = [];
  let newQuantity = 1;
  User.findById({ _id: currentUser._id })
    .then((user) => {
      newCart = [...user.cart.items];
      console.log(user.cart.items);

      const cartMovieIndex = user.cart.items.findIndex((m) => {
        console.log(m);
        return m.productId.toString() == toAddproductId.toString();
      });
      console.log(cartMovieIndex);
      if (cartMovieIndex >= 0) {
        console.log(user.cart.items[cartMovieIndex].quantity);
        // Item already exists in the cart, increase the quantity
        newQuantity = user.cart.items[cartMovieIndex].quantity + 1;
        newCart[cartMovieIndex].quantity = newQuantity;
      } else {
        // Item does not exist in the cart, add a new item

        newCart.push({
          productId: new mongoose.Types.ObjectId(toAddproductId),
          quantity: newQuantity,
        });
      }
      let newCartEl = { items: newCart };
      return User.updateOne(
        { _id: currentUser._id },
        { $set: { cart: newCartEl } }
      );
    })
    .then((updatedUser) => {
      console.log(updatedUser);
      res.status(200).json(updatedUser); // Return the updated user object
    })
    .catch((err) => {
      console.log("Error:", err);
      res.status(500).json({ error: "Internal server error" });
    });
});

// Get Cart
router.get("/cart", (req, res) => {
  let userInfo;
  User.findById({ _id: currentUser._id })
    .then((user) => {
      userInfo = user;
      const productId = user.cart.items.map((el) => {
        return el.productId;
      });
      return Product.find({ _id: { $in: productId } });
    })
    .then((retrevedMovies) => {
      var items = retrevedMovies.map((product) => {
        return {
          id: product.id,
          title: product.title,
          price: product.price,
          description: product.description,
          category: product.category,
          image: product.image,
          rating: {
            rate: product.rating.rate,
            count: product.rating.count,
          },
          quantity: userInfo.cart.items.find((item) => {
            return item.productId.toString() == product._id.toString();
          }).quantity,
        };
      });
      res.json({ cartItems: items });
    })
    .catch((err) => {
      console.log("Error:", err);
    });
});

// Add or place new Order POST
router.post("/addorder", (req, res) => {
  const cartItems = req.body.cartItems;
  const newOrder = new Order({
    items: cartItems,
    user: {
      _id: new mongoose.Types.ObjectId(currentUser._id),
      userName: currentUser.userName,
      email: currentUser,
    },
  });
  newOrder
    .save()
    .then((createdOrder) => {
      User.updateOne(
        { _id: currentUser._id },
        { $set: { cart: { items: [] } } }
      ).then((updatedCartInfo) => {
        console.log(updatedCartInfo);
        res.json("check Out is completed!");
      });
    })
    .catch((err) => {
      console.log(err);
    });
});
// Get Orders
router.get("/orders", function (req, res) {
  Order.find({ "user._id": currentUser._id })
    .then((userOrders) => {
      console.log(userOrders);
      res.json(userOrders);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
