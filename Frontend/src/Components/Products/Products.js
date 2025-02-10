import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Products.module.css";

const Products = () => {
  const [products, setProducts] = useState([]);
  const token = localStorage.getItem('JWT');

  useEffect(() => {
    axios
      .get("http://localhost:8080/products")
      .then((success) => {
        setProducts(success.data.products);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const addToCart = (id) => {
    axios.post("http://localhost:8080/addToCart", { id, ID : token })
      .then((success) => {
        alert(success.data.message);
        console.log(success)
      })
      .catch((error) => {
        alert(error.response?.data?.message || "An error occurred");
      });
  };

  return (
    <section className="container mt-5">
      <h2 className={styles.heading}>Our Products</h2>
      <div className="row">
        {products.map((product) => (
          <div key={product._id} className="col-3 mb-4">
            <div className={styles.productCard}>
              <img
                src={product.image}
                alt={product.name}
                className={styles.productImage}
              />
              <div className={styles.productInfo}>
                <h5 className={styles.brand}>{product.brand}</h5>
                <h4 className={styles.productName}>{product.name}</h4>
                <p className={styles.price}>
                  ₹{(product.price * 80).toFixed(2)}{" "}
                  <span className={styles.discount}>({product.discount}% OFF)</span>
                </p>
                <p className={styles.stock}>
                  {product.stock} left in stock
                </p>
                <button
                  className={styles.addToCart}
                  onClick={() => addToCart(product._id)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Products;
