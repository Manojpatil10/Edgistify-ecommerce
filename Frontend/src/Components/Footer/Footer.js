import styles from './Footer.module.css';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <h3 className={styles.footerLogo}>Ecommerce Platform</h3>
      <ul className={styles.footerMenu}>
        <li className={styles.footerMenuItem}>
          <Link to="/">Home</Link>
        </li>
        <li className={styles.footerMenuItem}>
          <Link to="/addTask">About Us</Link>
        </li>
        <li className={styles.footerMenuItem}>
          <Link to="/myTask">Contact</Link>
        </li>
      </ul>
      <div className={styles.footerSocial}>
        <Link to="/" className={styles.socialLink}>
          <i className="fa-brands fa-square-twitter"></i>
        </Link>
        <Link to="/" className={styles.socialLink}>
          <i className="fa-brands fa-square-facebook"></i>
        </Link>
        <Link to="/" className={styles.socialLink}>
          <i className="fa-brands fa-square-instagram"></i>
        </Link>
      </div>
      <p className={styles.footerCredit}>
        © 2025 Copyright: {' '}
        <span>❤</span> by <Link to="/">Manoj Patil</Link>
      </p>
    </footer>
  );
}

export default Footer;