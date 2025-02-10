import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Cart.module.css";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('JWT');

  useEffect(() => {
    axios
      .post("http://localhost:8080/myCart",{token})
      .then((success) => {
        setCartItems(success.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Error fetching cart items.");
        setLoading(false);
      });
  }, []);

  const handleQuantityChange = (productId, action) => {
    const updatedItems = cartItems.map((item) => {
      if (item.productId === productId) {
        if (action === "increment") {
          item.quantity += 1;
        } else if (action === "decrement" && item.quantity > 1) {
          item.quantity -= 1;
        }
      }
      return item;
    });
    setCartItems(updatedItems);
  };

  const handleProceedToCheckout = () => {
    console.log("Proceeding to checkout...");
  };

  if (loading) return <p>Loading cart...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className={styles.cartContainer}>
      <h2 className={styles.cartHeading}>Your Cart</h2>
      {cartItems.map((item) => (
        <div key={item.productId} className={styles.cartItem}>
          <img src={item.image} alt={item.brand} className={styles.productImage} />
          <div className={styles.productInfo}>
            <h4 className={styles.productBrand}>{item.brand}</h4>
            <div className={styles.quantityControls}>
              <button
                className={styles.quantityButton}
                onClick={() => handleQuantityChange(item.productId, "decrement")}
              >
                -
              </button>
              <span className={styles.quantity}>{item.quantity}</span>
              <button
                className={styles.quantityButton}
                onClick={() => handleQuantityChange(item.productId, "increment")}
              >
                +
              </button>
            </div>
          </div>
        </div>
      ))}
      <button className={styles.checkoutButton} onClick={handleProceedToCheckout}>
        Proceed to Checkout
      </button>
    </div>
  );
};

export default Cart;
