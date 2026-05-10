import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./WishList.css";
import ApiContext from "../../context/ApiContext";

function WishList() {
  const initialWishlist = JSON.parse(localStorage.getItem("wishList")) || [];

  const { them, data } = useContext(ApiContext);
  const navigate = useNavigate();

  const removeItem = (id) => {
    const removeItem = initialWishlist.filter((item) => item.id !== id);
    localStorage.setItem("wishList", JSON.stringify(removeItem));
    location.reload();
  };

  const addToCart = (id) => {
    sendIdOfProduct(id);
    navigate("/app/cart");
    removeItem(id);
  };

  function sendIdOfProduct(id) {
    const storedCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

    const existingProduct = storedCartItems.find((item) => item.id === id);
    const item = data?.products?.find((item) => item.id === id);

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      storedCartItems.push({
        ...item,
        quantity: 1,
      });
    }

    localStorage.setItem("cartItems", JSON.stringify(storedCartItems));
  }

  if (initialWishlist.length === 0) {
    return (
      <div className="wishlist-empty">
        <h2>Your wishlist is empty 💔</h2>
        <p>Save items you love to see them here.</p>
      </div>
    );
  }

  return (
    <div className={`wishlist-container ${them === "dark" ? "dark" : ""}`}>
      <h1>You want buy..?</h1>
      <h4>Total wishlist {initialWishlist.length}</h4>

      <div className="wishlist-grid">
        {initialWishlist.map((item) => (
          <div
            className={`wishlist-card ${them === "dark" ? "dark" : ""}`}
            key={item.id}
          >
            <img src={item?.images[0]} alt={item?.brand} />

            <h3>{item.name}</h3>
            <p className="price">₹{item.price}</p>

            <p className={item.availabilityStatus ? "stock in" : "stock out"}>
              {item.availabilityStatus ? "In Stock" : "Out of Stock"}
            </p>

            <div className="actions">
              <button
                className="cart-btn"
                disabled={!item.availabilityStatus}
                onClick={() => addToCart(item.id)}
              >
                Add to Cart
              </button>

              <button
                className="remove-btn"
                onClick={() => removeItem(item.id)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WishList;
