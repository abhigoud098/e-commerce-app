import { useContext, useState } from "react";
import { FaHeart, FaRegHeart, FaShareAlt } from "react-icons/fa";
import "./ProductCard.css";
import ApiContext from "../../context/ApiContext";

function ProductCard({ item }) {
  const [liked, setLiked] = useState(false);
  const [added, setAdded] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const { them, data } = useContext(ApiContext);

  const handleShare = async () => {
    const shareUrl = window.location.href;

    if (navigator.share) {
      await navigator.share({
        title: item?.title,
        text: item?.description,
        url: shareUrl,
      });
    } else {
      navigator.clipboard.writeText(shareUrl);
      alert("Link copied");
    }
  };

  function sendIdOfProduct(id) {
    const storedCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

    const existingProduct = storedCartItems.find((item) => item.id === id);

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      storedCartItems.push({
        ...item,
        quantity: 1,
      });
    }

    localStorage.setItem("cartItems", JSON.stringify(storedCartItems));

    setAdded(true);
  }

  function Wishitem(id) {
    const wishlist = JSON.parse(localStorage.getItem("wishList")) || [];

    const wishitem = data?.products?.find((item) => item.id === id);

    const existingItem = wishlist.some((item) => item.id === id);

    if (existingItem) {
      setShowPopup(true);
      return;
    }

    setLiked(true);

    wishlist.push(wishitem);

    localStorage.setItem("wishList", JSON.stringify(wishlist));
  }

  return (
    <div>
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <button className="close-btn" onClick={() => setShowPopup(false)}>
              ✕
            </button>

            <h3>Already in Wishlist ❤️</h3>
            <p>This item has already been added to your wishlist.</p>
          </div>
        </div>
      )}

      <div className={`productcard ${them === "dark" ? "dark" : ""}`}>
        <div className="image-box">
          <img src={item?.images[0]} alt={item?.brand} />

          <div className="top-icons">
            <button className="icon-btn" onClick={() => Wishitem(item.id)}>
              {liked ? <FaHeart /> : <FaRegHeart />}
            </button>

            <button className="icon-btn" onClick={handleShare}>
              <FaShareAlt />
            </button>
          </div>
        </div>

        <div className="product-info">
          <h3>{item?.title}</h3>

          <p className={`desc ${them === "dark" ? "dark" : ""}`}>
            {item?.description}
          </p>

          <div className="rating-price">
            <span className="rating">⭐ {item?.rating}</span>
            <span className="original-price">${item?.price}</span>
          </div>

          <button
            className={`cart-btnn ${them === "dark" ? "dark" : ""}`}
            onClick={() => sendIdOfProduct(item.id)}
            disabled={added}
          >
            {added ? "✓ Added to Cart" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
