import "./LandingPage.css";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";

function LandingPage() {
  return (
    
    <div className="landing-container">
      {/* Top Navbar */}
      <nav className="landing-nav">
        <h2 className="brand">ShopVerse</h2>

        <div
          style={{
            display: "flex",
            gap: "20px",
            justifyContent: "center",
            marginTop: "100px",
          }}
        ></div>

        <div className="auth-buttons">
          <Link to="/app/login" className="login-btn">
            Login
          </Link>
          {
            <Link to="/app/Sign-up" className="signup-btn">
              SignUp
            </Link>
          }
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <h1 className="hero-title">
          Shop
          <span>
            Verse <FaShoppingCart />
          </span>
        </h1>

        <p className="hero-subtitle">Discover. Shop. Elevate your lifestyle.</p>

        <div className="hero-actions">
          {
            <Link to="/app/Sign-up" className="enter-btn">
              {" "}
              Enter Store
            </Link>
          }
        </div>
      </section>
    </div>
  );
}

export default LandingPage;
