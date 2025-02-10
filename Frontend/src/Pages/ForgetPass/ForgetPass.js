import React, { useState } from 'react';
import { FaEnvelope } from 'react-icons/fa';
import style from './ForgetPass.module.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Footer from '../../Components/Footer/Footer';
import Navbar from '../../Components/Navbar/Navbar';

function ForgetPass() {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    setEmailError(!emailPattern.test(email));

    if (emailPattern.test(email)) {
      // console.log('valid email');
      axios
        .post('http://localhost:8080/forgetPass', { email })
        .then((success) => {
          console.log(success);
          // alert(success.data.message)
        })
        .catch((error) => {
          console.log(error);
          // alert(error.response.data.message)
        });
    }
  };

  return (
    <>
      <Navbar />
      <main>
        <div className={style.login_page}>
          <form className={style.login_form} onSubmit={handleSubmit}>
            <h2 className={style.login_heading}>Forgot Password</h2>

            <div className={style.input_group}>
              <input
                type="text"
                value={email}
                className={style.input_field}
                placeholder="Enter Email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <span className={style.input_icon}>
                <FaEnvelope />
              </span>
            </div>
            {emailError && <p className={style.error}>Invalid email address</p>}

            <button type="submit" className={style.btn}>
              Send Reset Link
            </button>

            <div className={style.extra_links}>
              <p className={style.swipe}>
                Remembered your password? <Link to={'/login'} className={style.login}>Log In</Link>
              </p>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default ForgetPass;
