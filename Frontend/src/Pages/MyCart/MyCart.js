import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaTrash } from "react-icons/fa";
import styles from "./MyCart.module.css";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import Login from "../../Pages/Login/Login"
import { useNavigate } from "react-router-dom";

const MyCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("JWT");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }

    axios
      .post("http://localhost:8080/myCart", { ID: token })
      .then((success) => {
        console.log(success.data)
        setCartItems(success.data.cart.map((item) => ({ ...item, quantity: item.quantity || 1 })));
      })
      .catch(() => {
        setLoading(false);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [token]);

  const handleQuantityChange = (_id, action) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item._id === _id
          ? { ...item, quantity: Math.max(1, action === "increment" ? item.quantity + 1 : item.quantity - 1) }
          : item
      )
    );
  };

  const handleDeleteItem = (_id) => {
    axios
      .post("http://localhost:8080/removeFromCart", { ID: token, productId: _id })
      .then(() => {
        setCartItems((prevItems) => prevItems.filter((item) => item._id !== _id));
      })
      .catch((error) => {
        alert(error.response?.data?.message || "Error removing item.");
      });
  };

  const handleUpdateCart = () => {
    axios
      .post("http://localhost:8080/updateCart", { ID: token, cartItems })
      .then((response) => {
        alert(response.data.message);
      })
      .catch((error) => {
        alert(error.response?.data?.message || "Error updating cart.");
      });
  };

  const handleProceedToCheckout = () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty.");
      return;
    }
    navigate("/checkout");
  };

  if (loading) return <p className={styles.loading}>Loading cart...</p>;

  return (
    <>
      {
        token ? (
          <>
            <Navbar />
            <main className={styles.main}>
              <div className="container">
                <div className={styles.cartContainer}>
                  <h2 className={styles.cartHeading}>Your Cart</h2>
                  {cartItems.length === 0 ? (
                    <div className={styles.emptyCart}>
                      <img src="/empty-cart.png" alt="Empty Cart" className={styles.emptyCartImage} />
                      <p>Your cart is empty. Start shopping now!</p>
                      <button onClick={() => navigate("/")} className={styles.shopNowButton}>
                        Shop Now
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className={styles.productsDiv}>
                        {cartItems.map((item) => (
                          <div key={item._id} className={styles.cartItem}>
                            <img src={item.image} alt={item.name} className={styles.productImage} />
                            <div className={styles.productDetails}>
                              <h4 className={styles.productBrand}>{item.brand}</h4>
                              <p className={styles.productName}>{item.name}</p>
                              <p className={styles.productPrice}>₹{item.price}</p>
                              <div className={styles.quantityControls}>
                                <button onClick={() => handleQuantityChange(item._id, "decrement")}>-</button>
                                <span>{item.quantity}</span>
                                <button onClick={() => handleQuantityChange(item._id, "increment")}>+</button>
                              </div>
                            </div>
                            <FaTrash className={styles.deleteIcon} onClick={() => handleDeleteItem(item._id)} />
                          </div>
                        ))}
                      </div>
                      <div className={styles.buttonContainer}>
                        <button onClick={handleUpdateCart} className={styles.updateCartButton}>
                          Update Cart
                        </button>
                        <button onClick={handleProceedToCheckout} className={styles.checkoutButton}>
                          Proceed to Checkout
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </main>
            <Footer />
          </>
        ) : (
          <Login />
        )
      }
    </>
  );
};

export default MyCart;
