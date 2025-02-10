import React from 'react'
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';
import HeroSection from '../../Components/HeroSection/HeroSection';
import Contact from '../../Components/Contact/Contact';
import Feature from '../../Components/Feature/Feature';
import Products from '../../Components/Products/Products';

const Home = () => {
  return (
    <>
      <Navbar />
      <HeroSection/>
      <Feature/>
      <Products/>
      <Contact/>
      <Footer />
    </>
  )
}

export default Home;
