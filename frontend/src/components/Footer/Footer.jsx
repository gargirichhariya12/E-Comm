import { Link } from 'react-router-dom';
import { FaTwitter, FaFacebookF, FaInstagram, FaGithub } from 'react-icons/fa';

const footerLinks = {
  Company: ['About', 'Features', 'Works', 'Career'],
  Help: ['Customer Support', 'Delivery Details', 'Terms & Conditions', 'Privacy Policy'],
  FAQ: ['Account', 'Manage Deliveries', 'Orders', 'Payments'],
  Resources: ['Free eBooks', 'Development Tutorial', 'How to Blog', 'Youtube Playlist'],
};

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="footer-brand-name">SHOP.CO</div>
            <p className="footer-brand-desc">
              We have clothes that suit your style and that you're proud to wear. From women to men.
            </p>
            <div className="footer-social">
              <a href="#" className="social-icon" aria-label="Twitter"><FaTwitter /></a>
              <a href="#" className="social-icon" aria-label="Facebook"><FaFacebookF /></a>
              <a href="#" className="social-icon" aria-label="Instagram"><FaInstagram /></a>
              <a href="#" className="social-icon" aria-label="Github"><FaGithub /></a>
            </div>
          </div>
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <div className="footer-col-title">{title}</div>
              <ul className="footer-col-links">
                {links.map((link) => (
                  <li key={link}><a href="#">{link}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="footer-bottom">
          <p className="footer-copyright">Shop.co © 2000-2024, All Rights Reserved</p>
          <div className="footer-payments">
            {['VISA', 'Mastercard', 'PayPal', 'Apple Pay', 'Google Pay'].map((p) => (
              <span key={p} className="payment-badge">{p}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
