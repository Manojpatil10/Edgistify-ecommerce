const Order = require('../model/OrderData');
const Product = require('../model/products');

exports.myOrders = (req, res, next) => {
  const userId = req.userId;
  console.log(userId);

  Order.find({ userId: userId })
    .then((orderData) => {
      if (!orderData || orderData.length === 0) {
        return res.status(404).json({ message: "No orders found" });
      }

      const ordersWithImages = orderData.map((order) => {
        const productPromises = order.products.map((product) => {
          return Product.findById(product.id)
            .then((productData) => ({
              name: product.name,
              quantity: product.quantity,
              price: product.price,
              image: productData ? productData.image : null,
            }))
            .catch((error) => {
              console.error("Error fetching product image:", error);
              return { name: product.name, quantity: product.quantity, price: product.price, image: null };
            });
        });

        return Promise.all(productPromises).then((productsWithImages) => ({
          products: productsWithImages,
          orderStatus: order.orderStatus,
          paymentMethod: order.paymentMethod,
          totalPrice: order.totalPrice,
        }));
      });

      return Promise.all(ordersWithImages);
    })
    .then((finalOrders) => {
      res.status(200).json(finalOrders);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    });
};
