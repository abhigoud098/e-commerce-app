import { useContext, useState } from "react";
import { FaHeart, FaRegHeart, FaShareAlt } from "react-icons/fa";
import "./ProductCard.css";
import ApiContext from "../../context/ApiContext";

function ProductCard({ item }) {
  const [liked, setLiked] = useState(false);
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
  }

  function Wishitem(id) {
    setLiked(!liked);
    const wishlist = JSON.parse(localStorage.getItem("wishList")) || [];
    const wishitem = data?.products?.find((item) => item.id === id);
    console.log(wishitem);
    wishlist.push(wishitem);
    localStorage.setItem("wishList", JSON.stringify(wishlist));
  }

  return (
    <div className={`productcard ${them === "dark" ? "dark" : ""}`}>
      <div className="image-box">
        <img src={item?.images[0]} alt={item?.brand} />

        {/* TOP RIGHT ICONS */}
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
        <p c className={`desc ${them === "dark" ? "dark" : ""}`}>
          {item?.description}
        </p>

        <div className="rating-price">
          <span className="rating">⭐ {item?.rating}</span>
          <span className="original-price">${item?.price}</span>
        </div>

        <button
          className={`cart-btnn ${them === "dark" ? "dark" : ""}`}
          onClick={() => sendIdOfProduct(item.id)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
