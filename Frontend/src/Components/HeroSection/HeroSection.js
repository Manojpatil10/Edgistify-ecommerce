import React from "react";
import Slider from "react-slick";  
import "slick-carousel/slick/slick.css";  
import "slick-carousel/slick/slick-theme.css";  
import styles from "./HeroSection.module.css";  

const HeroSection = () => {
  const settings = {
    arrows: false,
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <>
      <Slider {...settings}>
        <div className={`${styles.heroSection1} ${styles.heroSection}`}>
          <div className="container">
            <div className={styles.heroSectionInner}>
              <h4 className={styles.heroH4}>Trade-in-fair</h4>
              <h2 className={styles.heroH2}>Super value deals</h2>
              <h1 className={styles.heroH1}>On all Products</h1>
              <p className={styles.heroPara}>Save more with coupons and up to 70% off!</p>
              <button className={styles.heroBtn}>Shop Now</button>
            </div>
          </div>
        </div>
        <div className={`${styles.heroSection2} ${styles.heroSection}`}>
          <div className="container">
            <div className={styles.heroSectionInner}>
              <h4 className={styles.heroH4}>Trade-in-fair</h4>
              <h2 className={styles.heroH2}>Super value deals</h2>
              <h1 className={styles.heroH1}>On all Products</h1>
              <p className={styles.heroPara}>Save more with coupons and up to 70% off!</p>
              <button className={styles.heroBtn}>Shop Now</button>
            </div>
          </div>
        </div>
        <div className={`${styles.heroSection3} ${styles.heroSection}`}>
          <div className="container">
            <div className={styles.heroSectionInner}>
              <h4 className={styles.heroH4}>Trade-in-fair</h4>
              <h2 className={styles.heroH2}>Super value deals</h2>
              <h1 className={styles.heroH1}>On all Products</h1>
              <p className={styles.heroPara}>Save more with coupons and up to 70% off!</p>
              <button className={styles.heroBtn}>Shop Now</button>
            </div>
          </div>
        </div>
      </Slider>
    </>
  );
};

export default HeroSection;
