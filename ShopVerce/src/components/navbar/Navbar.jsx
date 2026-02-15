import { useContext, useState, useRef, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import ApiContext from "../../context/ApiContext";
import { RxHamburgerMenu } from "react-icons/rx";
import "./Navbar.css";
import "../sideBar/Sidebar";

function Navbar() {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const {
    data,
    setUser,
    searchItem,
    setSearchItem,
    setTheam,
    theam,
    setAtiveHambar,
  } = useContext(ApiContext);

  const products = data?.products || [];

  const suggestions = searchItem.trim()
    ? products
        .filter((product) =>
          product.title.toLowerCase().includes(searchItem.toLowerCase()),
        )
        .slice(0, 5)
    : [];

  const user = JSON.parse(localStorage.getItem("currentUser")) || {};
  // const currentUser = users.find((loginUser) => user.email === loginUser.email);

  const [showCard, setShowCard] = useState(false);
  const profileRef = useRef(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    setShowCard(false);
    navigate("/");
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setShowCard(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const initials =
    user?.firstName
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase() || "U";

  function goHomePage() {
    setSearchItem("");
    navigate("/app");
  }

  function theamChanger(e) {
    setTheam(e.target.checked);
  }

  function showSidebar() {
    setAtiveHambar((prev) => !prev);
  }

  return (
    <nav className={`nav-container ${theam ? "dark" : ""}`}>
      <h1 className="nav-logo" onClick={goHomePage}>
        ShopVerse
      </h1>

      <div className="search-wrapper">
        <input
          type="text"
          className={`search-input ${theam ? "dark" : ""}`}
          placeholder="Search products..."
          value={searchItem}
          onChange={(e) => {
            setSearchItem(e.target.value);
            setShowSuggestions(true);
            navigate("/app/product");
          }}
          onFocus={() => searchItem && setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
        />

        {showSuggestions && suggestions.length > 0 && (
          <div className="search-suggestions">
            {suggestions.map((item) => (
              <div
                key={item.id}
                className="suggestion-item"
                onClick={() => {
                  setSearchItem(item.title);
                  setShowSuggestions(false);
                  navigate("/app/product");
                }}
              >
                <img src={item.images[0]} alt={item.title} />
                <span>{item.title}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <RxHamburgerMenu className="pageNavigateOption" onClick={showSidebar} />

      <ul className="nav-links">
        <li>
          <Link to="/app">Home</Link>
        </li>
        <li>
          <Link to="/app/product">Product</Link>
        </li>
        <li>
          <Link to="/app/cart">Cart</Link>
        </li>
        <li>
          <Link to="/app/wishList">WishList</Link>
        </li>
      </ul>

      <div className="toggle-wrapper">
        <input
          className="toggle-checkbox"
          type="checkbox"
          onChange={theamChanger}
        />
        <div className="toggle-container">
          <div className="toggle-button">
            <div className="toggle-button-circles-container">
              <div className="toggle-button-circle" />
              <div className="toggle-button-circle" />
              <div className="toggle-button-circle" />
              <div className="toggle-button-circle" />
              <div className="toggle-button-circle" />
              <div className="toggle-button-circle" />
              <div className="toggle-button-circle" />
              <div className="toggle-button-circle" />
              <div className="toggle-button-circle" />
              <div className="toggle-button-circle" />
              <div className="toggle-button-circle" />
              <div className="toggle-button-circle" />
            </div>
          </div>
        </div>
      </div>

      <div className="profile" ref={profileRef}>
        <FaUserCircle
          className={`profile-icone ${theam ? "dark" : ""}`}
          onClick={() => setShowCard(true)}
        />

        {showCard && user && (
          <div className={`account-card ${theam ? "dark" : ""}`}>
            <div className="account-header">My Account</div>

            <div className="account-body">
              <div className="profile-section">
                <div className="avatar">{initials}</div>

                <div className="user-info">
                  <h3>{user.firstName + " " + user.lastName}</h3>
                  <p className="phone">{user.phone}</p>
                  <p className="email">{user.email}</p>

                  <div className="chips">
                    <span className="chip">{user.gender}</span>
                    <span className="chip">Customer</span>
                  </div>
                </div>
              </div>

              <div className="divider" />
              <button className="logout-btn" onClick={handleLogout}>
                Sign out
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
