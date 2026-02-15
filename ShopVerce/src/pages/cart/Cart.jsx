import { useContext, useEffect, useState } from "react";
import "./Cart.css";
import { Link } from "react-router-dom";
import ApiContext from "../../context/ApiContext";
import Footer from "../../components/footer/Footer";

function Cart() {
  const { theam } = useContext(ApiContext);

  const [cartItems, setCartItems] = useState([]);

  // Load cart once
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(data);
  }, []);

  // Save cart whenever it changes
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const removeItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const increaseQty = (id) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  };

  const decreaseQty = (id) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item,
      ),
    );
  };

  const subtotal = Math.floor(
    cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
  );

  const delivery = subtotal > 500 ? 0 : 99;
  const total = Math.floor(subtotal + delivery);

  return (
    <div className={`cart-wrapper ${theam ? "dark" : "light"}`}>
      <h2 className="cart-title">Shopping Cart</h2>

      <div className="cart-layout">
        {/* LEFT SIDE */}
        <div className="cart-left">
          {cartItems.length === 0 ? (
            <p className="empty-cart">Your cart is empty</p>
          ) : (
            cartItems.map((item) => (
              <div className="cart-item" key={item.id}>
                <img src={item.images[0]} alt={item.title} />

                <div className="cart-info">
                  <h4>{item.title}</h4>
                  <p className="price">₹{item.price}</p>
                  <p className="stock">In stock</p>

                  <div className="cart-actions">
                    <div className="qty-box">
                      <button onClick={() => decreaseQty(item.id)}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => increaseQty(item.id)}>+</button>
                    </div>

                    <button
                      className="remove-btn"
                      onClick={() => removeItem(item.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* RIGHT SIDE */}
        <div className="cart-right">
          <h3>Order Summary</h3>

          <div className="summary-row">
            <span>Subtotal</span>
            <span>${subtotal}</span>
          </div>

          <div className="summary-row">
            <span>Delivery</span>
            <span>{delivery === 0 ? "FREE" : `$${delivery}`}</span>
          </div>

          <hr />

          <div className="summary-row total">
            <span>Total</span>
            <span>${total}</span>
          </div>

          <Link to="/app/checkout">
            <button className="checkout-btn">Proceed to Buy</button>
          </Link>
        </div>
      </div>
      <div className="footer-div">
        <Footer />
      </div>
    </div>
  );
}

export default Cart;
