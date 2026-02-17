import "./Footer.css";

const Footer = ({onBackTotop}) => {

  return (
    <footer className="footer">
      {/* Back to top */}
      <div className="footer-top" onClick={onBackTotop}>
        Back to top
      </div>

      {/* Main footer links */}
      <div className="footer-main">
        <div>
          <h4>Get to Know ShopVerce</h4>
          <ul>
            <li>About Us</li>
            <li>Careers</li>
            <li>Press & Updates</li>
            <li>Tech & Innovation</li>
          </ul>
        </div>

        <div>
          <h4>Connect with Us</h4>
          <ul>
            <li>Instagram</li>
            <li>Twitter / X</li>
            <li>LinkedIn</li>
            <li>GitHub</li>
          </ul>
        </div>

        <div>
          <h4>Shop with Us</h4>
          <ul>
            <li>All Products</li>
            <li>Your Cart</li>
            <li>Your Wishlist</li>
            <li>Order Tracking</li>
          </ul>
        </div>

        <div>
          <h4>Let Us Help You</h4>
          <ul>
            <li>Your Account</li>
            <li>Returns & Refunds</li>
            <li>Support</li>
            <li>FAQs</li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="footer-bottom">
        <div className="footer-brand">
          <img src="/src/assets/icone.png" alt="icon" />
          ShopVerce
        </div>

        <div className="footer-meta">
          <span>🌐 English</span>
          <span>🇮🇳 India</span>
        </div>

        <div className="footer-contact">
          <p>Email: abhigoud198484@gmail.com</p>
          <p>Phone: +91 9074304063</p>
        </div>
      </div>

      <div className="footer-copy">
        © {new Date().getFullYear()} ShopVerce. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
