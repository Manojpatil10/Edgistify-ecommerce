const Cart = require('../model/cart');
const Product = require('../model/products');

exports.addToCart = (req, res, next) => {
  const productId = req.body.id;
  const userId = req.userId;

  Product.findOne({ _id: productId })
    .then((product) => {
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }

      if (product.stock > 0) {
        Cart.findOne({ userId, productId })
          .then((existingCartItem) => {
            if (existingCartItem) {
              return res.status(400).json({ message: 'Product is already in the cart' });
            }

            const newCartItem = new Cart({
              userId,
              productId,
              quantity: 1
            });

            newCartItem
              .save()
              .then((savedCart) => {
                res.status(200).json({ message: 'Product added to cart' });
              })
              .catch((error) => {
                console.error(error);
                res.status(500).json({ message: 'Error, please try again' });
              });
          })
          .catch((error) => {
            console.error(error);
            res.status(500).json({ message: 'Error, please try again' });
          });
      } else {
        res.status(400).json({ message: 'Product is out of stock' });
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: 'Error, please try again' });
    });
};

exports.myCart = (req, res, next) => {
  const userId = req.userId;

  Cart.find({ userId: userId })
    .then((cartItems) => {
      if (cartItems.length === 0) {
        return res.status(200).json({ message: "Your cart is empty", cart: [] });
      }

      const productDetailsPromises = cartItems.map((item) => 
        Product.findById(item.productId)
          .then((product) => {
            if (!product) return null;
            return {
              _id: item._id,
              name: product.name,
              brand: product.brand,
              price: product.price,
              image: product.image
            };
          })
      );

      Promise.all(productDetailsPromises)
        .then((products) => {
          const filteredProducts = products.filter((product) => product !== null); 
          res.status(200).json({ cart: filteredProducts });
        })
        .catch((error) => {
          console.error(error);
          res.status(500).json({ message: "Error fetching cart details" });
        });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: "Error fetching cart" });
    });
};

exports.removeFromCart = (req, res, next) => {
  const userId = req.userId;
  const { productId } = req.body;

  Cart.deleteOne({ userId: userId, productId: productId })
    .then((success) => {
      if (success.deletedCount === 0) {
        return res.status(404).json({ message: "Product not found in cart" });
      }
      return res.status(200).json({ message: "Product removed from cart successfully" });
    })
    .catch((error) => {
      console.error(error);
      return res.status(500).json({ message: "Error removing product from cart" });
    });
};

exports.updateCart = (req, res, next) => {
  const { cartItems } = req.body;

  const updatePromises = cartItems.map((item) => {
    return Cart.updateOne(
      { _id: item._id },
      { $set: { quantity: item.quantity } }
    );
  });

  Promise.all(updatePromises)
    .then((success) => {
      res.status(200).json({ message: "Cart updated successfully" });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: "Error updating cart" });
    });
};
