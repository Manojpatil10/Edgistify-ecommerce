import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { IoIosLock } from "react-icons/io";
import { IoEye, IoEyeOff } from "react-icons/io5";
import axios from "axios";
import style from "./Login.module.css";
import { Link, useNavigate } from "react-router-dom";
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';


const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState({ email: "", password: "" });
  const navigate = useNavigate()

  const validateForm = () => {
    let isValid = true;
    const newError = { email: "", password: "" };

    if (!email) {
      newError.email = "Email is required!";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newError.email = "Invalid email format!";
      isValid = false;
    }

    if (!password) {
      newError.password = "Password is required!";
      isValid = false;
    } else if (password.length < 6) {
      newError.password = "Password must be at least 6 characters!";
      isValid = false;
    }

    setError(newError);
    return isValid;
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    axios
      .post("http://localhost:8080/login", { email, password })
      .then((success) => {
        console.log(success)
        setEmail("");
        setPassword("");
        setError({ email: "", password: "" });
        localStorage.setItem("JWT", success.data.token);
        localStorage.setItem("username", success.data.username);
        alert(success.data.message);
        navigate('/')
      })
      .catch((error) => {
        // console.log(error);
        alert(error.response.data.message);
      });
  };

  return (
    <>
      <Navbar />
      <main>
        <div className={style.login_page}>
          <form className={style.login_form} onSubmit={handleLogin}>
            <h2 className={style.login_heading}>Login</h2>

            <div className={style.input_group}>
              <span className={style.input_icon}>
                <FaUserCircle />
              </span>
              <input
                type="email"
                value={email}
                className={`${style.input_field}`}
                placeholder="Enter Email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            {error.email && <p className={style.error}>{error.email}</p>}

            <div className={style.input_group}>
              <span className={style.input_icon}>
                <IoIosLock />
              </span>
              <input
                type={showPass ? "text" : "password"}
                value={password}
                className={`${style.input_field}`}
                placeholder="Enter Password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <span
                className={style.eye_icon}
                onMouseDown={() => setShowPass(true)}
                onMouseUp={() => setShowPass(false)}
              >
                {showPass ? <IoEye /> : <IoEyeOff />}
              </span>
            </div>
            {error.password && <p className={style.error}>{error.password}</p>}

            <button type="submit" className={style.btn}>
              Login
            </button>

            <div className={style.extra_links}>
              <p className={style.swipe}>
                New here? <Link to={'/signup'} className={style.register}>Sign Up</Link>
              </p>
              <Link to={'/forgetPass'} className={style.forget}>Forgot password?</Link>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default Login



