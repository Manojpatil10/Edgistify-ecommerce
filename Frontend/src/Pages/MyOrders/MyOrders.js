import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styles from './MyOrders.module.css';
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';
import Login from '../Login/Login';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('JWT');

  useEffect(() => {
    axios.post('http://localhost:8080/myOrders', { ID: token })
      .then((response) => {
        setOrders(response.data);
      })
      .catch((error) => {
        console.error('Error fetching orders:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [token]);

  return (
    <>
      {
        token ?
          (
            <>
              <Navbar />
              <main className={styles.main}>
                <div className="container">
                  <h2 className={styles.title}>My Orders</h2>

                  {loading ? (
                    <p className={styles.loadingText}>Loading orders...</p>
                  ) : orders.length === 0 ? (
                    <div className={styles.noOrders}>
                      <img src="/no-orders.png" alt="No Orders" className={styles.noOrdersImage} />
                      <p>No orders found. Start shopping now!</p>
                    </div>
                  ) : (
                    <div className="row">
                      {orders.map((order, index) => (
                        <div key={index} className="col-4">
                          <div className={styles.orderCard}>
                            <div className={styles.orderHeader}>
                              <h5>Order Status: {order.orderStatus}</h5>
                              <p className='mb-1'>Payment Method: {order.paymentMethod}</p>
                              <p>Total Amount: ₹{order.totalPrice}</p>
                            </div>

                            <div className={styles.productList}>
                              {order.products.map((product, pIndex) => (
                                <div key={pIndex} className={styles.productItem}>
                                  <img src={product.image} alt={product.name} className={styles.productImage} />
                                  <div className={styles.productDetails}>
                                    <h6>{product.name}</h6>
                                    <p>Qty: {product.quantity} | ₹{product.price}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </main>
              <Footer />
            </>
          )
          : (
            <Login />
          )
      }
    </>
  );
};

export default MyOrders;
