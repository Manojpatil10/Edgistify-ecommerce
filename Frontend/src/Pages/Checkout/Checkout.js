import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './Checkout.module.css';
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';

const Checkout = () => {
  const [products, setProducts] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [orderDetails, setOrderDetails] = useState({
    name: '',
    email: '',
    phone: '',
    street: '',
    city: '',
    pin: '',
    state: '',
    orderNotes: '',
  });
  const [isOrderPlace, setOrderPlace] = useState(false);
  const [emailOtp, setEmailOtp] = useState('')
  const [error, setError] = useState(null);
  const token = localStorage.getItem('JWT');
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [showOrderPlaced, setShowOrderPlaced] = useState(false);
  const [orderConfirmation, setOrderConfirmation] = useState({});


  useEffect(() => {
    axios
      .post('http://localhost:8080/checkoutProduct', { ID: token })
      .then((success) => {
        setProducts(success.data.productDetails);
      })
      .catch((error) => {
        setError('Failed to fetch products');
        console.error(error);
      });
  }, [token]);

  const calculateTotal = () => {
    let subtotal = 0;
    products.forEach((product) => {
      subtotal += product.price * product.quantity;
    });
    const shipping = 50;
    const tax = subtotal * 0.02;
    const gst = subtotal * 0.18;
    const total = subtotal + shipping + tax + gst;
    return { subtotal, shipping, tax, gst, total };
  };

  const { subtotal, shipping, tax, gst, total } = calculateTotal();

  const placeOrder = () => {

    if (!paymentMethod) {
      alert("Please select a payment method.");
      return;
    }

    const orderData = {
      customerName: orderDetails.name,
      customerEmail: orderDetails.email,
      products: products.map((product) => ({
        id: product.productId,
        name: product.name,
        quantity: product.quantity,
        price: product.price,
      })),
      totalPrice: total,
      shippingAddress: `${orderDetails.street}, ${orderDetails.city}, ${orderDetails.state}, ${orderDetails.pin}`,
      paymentStatus: "Pending",
      orderStatus: "Pending",
      paymentMethod: paymentMethod,
      orderNotes: orderDetails.orderNotes
    };

    axios.post("http://localhost:8080/placeOrder", { orderData, ID: token })
      .then((success) => {
        if (success) {
          console.log(success);
          setOrderConfirmation(success.data.order)
          setShowOrderPlaced(true)
          alert(success.data.message);
        }
      })
      .catch((error) => {
        console.error(error);
        alert("Something went wrong. Please try again.");
      });
  };

  const showOtpForm = () => {

    axios.post('http://localhost:8080/sendOtp', { email: orderDetails.email })
      .then((success) => {
        // console.log(success.data.otp)
        setEmailOtp(success.data.otp)
      }).catch((error) => {
        console.log(error)
      })
    setOrderPlace(true)
  }


  const otpVerify = (event) => {
    event.preventDefault();

    if (emailOtp === otp) {
      placeOrder()
    } else {
      alert('The OTP you entered is incorrect. Please try again.');
    }
  };

  return (
    <>
      <Navbar />
      <main className={styles.main}>
        {showOrderPlaced ? (
          <div className={styles.orderComplete}>
            <div className="text-center">
              <div className={styles.checkIcon}>
                <i className="fas fa-check"></i>
              </div>
              <h2 className={styles.orderH2}>Your order is placed!</h2>
              <p className={styles.orderPara}>Thank you. Your order has been received.</p>
            </div>

            <div className={styles.orderInfo}>
              <div className="row">
                <div className="col-3 text-center">
                  <div className={styles.orderInfoItem}>
                    <label>Total</label>
                    <span>{orderConfirmation.totalPrice}</span>
                  </div>
                </div>
                <div className="col-3 text-center">
                  <div className={styles.orderInfoItem}>
                    <label>Payment Method</label>
                    <span>{orderConfirmation.paymentMethod}</span>
                  </div>
                </div>
                <div className="col-3 text-center">
                  <div className={styles.orderInfoItem}>
                    <label>Customer Name</label>
                    <span>{orderConfirmation.customerName}</span>
                  </div>
                </div>
                <div className="col-3 text-center">
                  <div className={styles.orderInfoItem}>
                    <label>Order Status:</label>
                    <span>{orderConfirmation.orderStatus}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>


        ) : (
          <div>
            {isOrderPlace ? (
              <div className={styles.otpDiv}>
                <div className={styles.otpContainer}>
                  <h2>Verify Your Order</h2>
                  <p>
                    We have sent a one-time password (OTP) to your registered email address.
                    Please enter it below to confirm your order.
                  </p>
                  <form className={styles.otpForm} onSubmit={otpVerify}>
                    <label htmlFor="otp-input">Enter OTP:</label>
                    <input
                      type="text"
                      id="otp-input"
                      maxLength="6"
                      name="otp"
                      placeholder="Enter 6-digit OTP"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                    />
                    <button type="submit">Verify</button>
                  </form>
                  {message && <p className={styles.message}>{message}</p>}
                  <p className={styles.resend}>
                    Didn't receive the OTP? <a href="#">Resend OTP</a>
                  </p>
                </div>
              </div>
            ) : (
              <div className={styles.checkoutContainer}>
                <div className="container">
                  <div className="row">
                    <div className={`${styles.leftContainer} col-7`}>
                      <h2 className={styles.checkoutTitle}>Shipping Information</h2>
                      <form className={`${styles.formContainer} row`}>
                        <div className="col-6 mb-2">
                          <input
                            type="text"
                            placeholder="Full Name"
                            value={orderDetails.name}
                            onChange={(e) => setOrderDetails({ ...orderDetails, name: e.target.value })}
                            className={styles.inputField}
                            required
                          />
                        </div>
                        <div className="col-6 mb-2">
                          <input
                            type="email"
                            placeholder="Email"
                            value={orderDetails.email}
                            onChange={(e) => setOrderDetails({ ...orderDetails, email: e.target.value })}
                            className={styles.inputField}
                            required
                          />
                        </div>
                        <div className="mb-2">
                          <input
                            type="text"
                            placeholder="Phone"
                            value={orderDetails.phone}
                            onChange={(e) => setOrderDetails({ ...orderDetails, phone: e.target.value })}
                            className={styles.inputField}
                            required
                          />
                        </div>
                        <div className="mb-2">
                          <input
                            type="text"
                            placeholder="Street Address"
                            value={orderDetails.street}
                            onChange={(e) => setOrderDetails({ ...orderDetails, street: e.target.value })}
                            className={styles.inputField}
                            required
                          />
                        </div>
                        <div className="mb-2">
                          <input
                            type="text"
                            placeholder="City"
                            value={orderDetails.city}
                            onChange={(e) => setOrderDetails({ ...orderDetails, city: e.target.value })}
                            className={styles.inputField}
                            required
                          />
                        </div>
                        <div className="mb-2">
                          <input
                            type="text"
                            placeholder="Pin Code"
                            value={orderDetails.pin}
                            onChange={(e) => setOrderDetails({ ...orderDetails, pin: e.target.value })}
                            className={styles.inputField}
                            required
                          />
                        </div>
                        <div className="mb-2">
                          <input
                            type="text"
                            placeholder="State"
                            value={orderDetails.state}
                            onChange={(e) => setOrderDetails({ ...orderDetails, state: e.target.value })}
                            className={styles.inputField}
                            required
                          />
                        </div>
                        <div className="mb-2">
                          <textarea
                            placeholder="Order Notes"
                            value={orderDetails.orderNotes}
                            onChange={(e) => setOrderDetails({ ...orderDetails, orderNotes: e.target.value })}
                            className={styles.textareaField}
                          />
                        </div>
                      </form>
                    </div>
                    <div className={`${styles.rightContainer} col-5`}>
                      <h2 className={styles.checkoutTitle}>Order Summary</h2>
                      <div className={styles.orderSummary}>
                        <div className={styles.products}>
                          {products.map((product) => (
                            <div className="d-flex justify-content-between" key={product.id}>
                              <span className="d-block mb-1">{product.name}(x{product.quantity})</span>
                              <span className="d-block mb-1">₹{product.price * product.quantity}</span>
                            </div>
                          ))}
                        </div>
                        <div className={styles.orderDiv}>
                          <span>Subtotal</span>
                          <span>₹{subtotal}</span>
                        </div>
                        <div className={styles.orderDiv}>
                          <span>Shipping</span>
                          <span>₹{shipping}</span>
                        </div>
                        <div className={styles.orderDiv}>
                          <span>Tax (2%)</span>
                          <span>₹{tax}</span>
                        </div>
                        <div className={styles.orderDiv}>
                          <span>GST (18%)</span>
                          <span>₹{gst}</span>
                        </div>
                        <div className={styles.orderDiv}>
                          <span><strong>Total</strong></span>
                          <span><strong>₹{total}</strong></span>
                        </div>
                      </div>

                      <div className={styles.paymentMethod}>
                        <label className="mb-2">Select Payment Method</label>
                        <div className={`${styles.radioContainer} row`}>
                          <label className="col-6 mb-2">
                            <input
                              type="radio"
                              value="creditCard"
                              checked={paymentMethod === 'creditCard'}
                              onChange={(e) => setPaymentMethod(e.target.value)}
                              className="me-1"
                            />
                            Credit Card
                          </label>
                          <label className="col-6 mb-2">
                            <input
                              type="radio"
                              value="paypal"
                              checked={paymentMethod === 'paypal'}
                              onChange={(e) => setPaymentMethod(e.target.value)}
                              className="me-1"
                            />
                            PayPal
                          </label>
                          <label className="col-6 mb-2">
                            <input
                              type="radio"
                              value="bankTransfer"
                              checked={paymentMethod === 'bankTransfer'}
                              onChange={(e) => setPaymentMethod(e.target.value)}
                              className="me-1"
                            />
                            Bank Transfer
                          </label>
                          <label className="col-6 mb-2">
                            <input
                              type="radio"
                              value="cashOnDelivery"
                              checked={paymentMethod === 'cashOnDelivery'}
                              onChange={(e) => setPaymentMethod(e.target.value)}
                              className="me-1"
                            />
                            Cash on Delivery
                          </label>
                        </div>
                      </div>

                      {paymentMethod === 'creditCard' && (
                        <div className={styles.paymentDetails}>
                          <input type="text" placeholder="Card Number" className={styles.inputField} />
                          <input type="text" placeholder="Expiration Date" className={styles.inputField} />
                          <input type="text" placeholder="CVV" className={styles.inputField} />
                        </div>
                      )}

                      {paymentMethod === 'paypal' && (
                        <div className={styles.paymentDetails}>
                          <input type="email" placeholder="PayPal Email" className={styles.inputField} />
                        </div>
                      )}

                      {paymentMethod === 'bankTransfer' && (
                        <div className={styles.paymentDetails}>
                          <input type="text" placeholder="Bank Account Number" className={styles.inputField} />
                          <input type="text" placeholder="Bank Name" className={styles.inputField} />
                        </div>
                      )}

                      <button className={styles.placeOrderButton} onClick={showOtpForm}>
                        Place Order
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
};

export default Checkout;
