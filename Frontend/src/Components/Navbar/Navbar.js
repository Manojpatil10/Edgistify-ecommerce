import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isArrow, setIsArrow] = useState(true);
  const username = localStorage.getItem('username');
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const logout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.setItem("JWT", "");
      localStorage.setItem("username", "");
      navigate("/");
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
    setIsArrow(!isArrow);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
        setIsArrow(true);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header>
      <nav className={styles.nav}>
        <div className="container">
          <div className={styles.top}>
            <div className={styles.topLeft}>
              <Link to="/" className={styles.logo}>
                Ecommerce Platform
              </Link>
            </div>
            <div className={styles.topCenter}>
              <ul className={styles.topList}>
                <li className={styles.topListItem}>
                  <Link className={styles.link} to="/">
                    Home
                  </Link>
                </li>
                <li className={styles.topListItem}>
                  <Link className={styles.link} to="/">
                    About Us
                  </Link>
                </li>
                <li className={styles.topListItem}>
                  <Link className={styles.link} to="/">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div className={styles.topRight}>
              {username ? (
                <div className={styles.userMenu}>
                  <span className={styles.userName} onClick={toggleDropdown}>
                    {username}{" "}
                    {isArrow ? (
                      <i className="fa-solid fa-chevron-down ms-1"></i>
                    ) : (
                      <i className="fa-solid fa-chevron-up ms-1"></i>
                    )}
                  </span>
                  {isDropdownOpen && (
                    <ul className={styles.dropdown} ref={dropdownRef}>
                      <li className={styles.dropdownLink} onClick={() => navigate('/profile')}>
                        <i className="fa-solid fa-user me-2"></i>
                        <span>Profile</span>
                      </li>
                      <li className={styles.dropdownLink} onClick={() => navigate('/myCart')}>
                        <i className="fa-regular fa-heart me-2"></i>
                        <span>My Cart</span>
                      </li>
                      <li className={styles.dropdownLink} onClick={() => navigate('/myOrders')}>
                        <i className="fa-solid fa-cart-shopping me-2"></i>
                        <span>My Orders</span>
                      </li>
                      <li className={styles.dropdownLink} onClick={logout}>
                        <i className="fa-solid fa-sign-out-alt me-2"></i>
                        <span>Logout</span>
                      </li>
                    </ul>
                  )}
                </div>
              ) : (
                <ul className={`${styles.topList}`}>
                  <li className={styles.topListItem}>
                    <Link className={styles.link} to="/login">
                      LOGIN
                    </Link>
                  </li>
                  <li className={styles.separator}>|</li>
                  <li className={styles.topListItem}>
                    <Link className={styles.link} to="/signup">
                      REGISTER
                    </Link>
                  </li>
                </ul>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
