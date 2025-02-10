const Cart = require('../model/cart');
const Product = require('../model/products');

exports.checkoutProduct = (req, res, next) => {
  const userId = req.userId;

  Cart.find({ userId: userId })
    .then((cartItems) => {
      if (!cartItems || cartItems.length === 0) {
        return res.status(404).json({ message: 'No items in cart' });
      }

      const productPromises = cartItems.map((item) => {
        return Product.findById(item.productId)
          .then(product => {
            if (!product) {
              throw new Error(`Product with ID ${item.productId} not found`);
            }
            return {
              productId: product._id,
              name: product.name,
              price: product.price,
              quantity: item.quantity,
              totalPrice: product.price * item.quantity,
              image: product.image
            };
          });
      });

      Promise.all(productPromises)
        .then((productDetails) => {
          return res.status(200).json({ productDetails });
        })
        .catch((error) => {
          console.error(error);
          return res.status(500).json({ message: 'Error fetching product details', error: error.message });
        });
    })
    .catch((error) => {
      console.error(error);
      return res.status(500).json({ message: 'Error fetching cart items', error: error.message });
    });
};
