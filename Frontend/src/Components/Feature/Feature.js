import React from "react";
import styles from "./Feature.module.css";

const Feature = () => {
  return (
    <section className={`${styles.featureSection} section-p1`}>
      <div className="container">
        <div className="mb-5">
          <h2>Our Features</h2>
          <p>Summer Collection New Modern Design</p>
        </div>
        <div className="feature row">
          <div className="col-6 col-md-4 col-xl-2">
            <div className={styles.feBox}>
              <img src="/images/illustration/f1-feature.png" alt="" />
              <h6>Free Shipping</h6>
            </div>
          </div>
          <div className="col-6 col-md-4 col-xl-2">
            <div className={styles.feBox}>
              <img src="/images/illustration/f2-feature.png" alt="" />
              <h6>Online Order</h6>
            </div>
          </div>
          <div className="col-6 col-md-4 col-xl-2">
            <div className={styles.feBox}>
              <img src="/images/illustration/f3-feature.png" alt="" />
              <h6>Save Money</h6>
            </div>
          </div>
          <div className="col-6 col-md-4 col-xl-2">
            <div className={styles.feBox}>
              <img src="/images/illustration/f4-feature.png" alt="" />
              <h6>Promotions</h6>
            </div>
          </div>
          <div className="col-6 col-md-4 col-xl-2">
            <div className={styles.feBox}>
              <img src="/images/illustration/f5-feature.png" alt="" />
              <h6>Happy Customers</h6>
            </div>
          </div>
          <div className="col-6 col-md-4 col-xl-2">
            <div className={styles.feBox}>
              <img src="/images/illustration/f6-feature.png" alt="" />
              <h6>24/7 Support</h6>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Feature;
