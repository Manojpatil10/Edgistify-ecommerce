const nodemailer = require('nodemailer');
const Order = require('../model/OrderData');
const Product = require('../model/products');
const Cart = require('../model/cart');

const generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

exports.sendOtp = (req, res, next) => {
  const { email } = req.body;
  const otp = generateOtp();
  console.log("Generated OTP: ", otp);

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Your OTP for order verification',
    text: `Your OTP is: ${otp}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending OTP email:', error);
      return res.status(500).send('Failed to send OTP');
    }
    console.log('OTP email sent: ' + info.response);
    return res.status(200).send({ otp });
  });
};

exports.placeOrder = (req, res, next) => {
  const userId = req.userId;
  const { orderData } = req.body;

  const newOrder = new Order({
    customerName: orderData.customerName,
    customerEmail: orderData.customerEmail,
    userId: userId,
    products: orderData.products,
    totalPrice: orderData.totalPrice,
    shippingAddress: orderData.shippingAddress,
    paymentStatus: orderData.paymentStatus,
    orderStatus: orderData.orderStatus,
    paymentMethod: orderData.paymentMethod,
    orderNotes: orderData.orderNotes
  });

  newOrder.save()
    .then((savedOrder) => {
      const updatePromises = orderData.products.map(product => {
        return Product.findByIdAndUpdate(
          product.id,
          {
            $inc: { stock: -product.quantity }
          },
          { new: true }
        );
      });

      return Promise.all(updatePromises)
        .then(updatedProducts => {
          const deleteCartPromises = orderData.products.map(product => {
            return Cart.findOneAndDelete({
              userId: userId,
              productId: product.id
            });
          });

          return Promise.all(deleteCartPromises)
            .then(() => {
              res.status(201).json({
                message: 'Your order has been successfully placed! Thank you for shopping with us.',
                order: savedOrder,
                updatedProducts: updatedProducts
              });
            })
            .catch(error => {
              res.status(500).json({
                message: 'Error deleting products from the cart',
                error: error.message
              });
            });
        })
        .catch(error => {
          res.status(500).json({
            message: 'Error updating product quantities',
            error: error.message
          });
        });
    })
    .catch(error => {
      res.status(500).json({
        message: 'Error placing the order',
        error: error.message
      });
    });
};
