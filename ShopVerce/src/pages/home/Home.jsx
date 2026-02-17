import { useContext, useEffect, useState, useMemo } from "react";
import ProductCard from "../../components/productCard/ProductCard";
import "./Home.css";
import ApiContext from "../../context/ApiContext";
import Fuse from "fuse.js";
import { Link } from "react-router-dom";

function Home() {
  const { data, searchItem, theam } = useContext(ApiContext);
  const products = data?.products || [];

  const [startProduct] = useState(() =>
    Math.floor(Math.random() * Math.max(products.length - 4, 1)),
  );
  const [productNum, setProductNum] = useState(startProduct);

  const fuse = useMemo(() => {
    return new Fuse(products, {
      keys: ["title", "brand", "category"],
      threshold: 0.4,
    });
  }, [products]);

  const filteredProducts = useMemo(() => {
    if (!searchItem.trim()) return products;
    return fuse.search(searchItem).map((result) => result.item);
  }, [searchItem, fuse, products]);

  useEffect(() => {
    if (products.length < 4) return;

    const timer = setInterval(() => {
      setProductNum((prev) =>
        prev >= startProduct + 3 ? startProduct : prev + 1,
      );
    }, 4000);

    return () => clearInterval(timer);
  }, [startProduct, products.length]);

  const product = products[productNum];
  const isSearchActive = searchItem.trim().length > 0;

  // 🔍 SEARCH VIEW
  if (isSearchActive) {
    return (
      <div className="still-you-want">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((item) => (
            <div className="product-component" key={item.id}>
              <ProductCard item={item} />
            </div>
          ))
        ) : (
          <h3>No products found</h3>
        )}
      </div>
    );
  }

  // 🏠 NORMAL HOME VIEW
  return (
    <div className="main-content-container">
      {product && (
        <div className={`hero-banner ${theam ? "bannerdark" : ""}`}>
          <h3>Trending products..</h3>
          <img src={product.images?.[0]} alt="banner" className="hero-image" />
          <div className="hero-overlay">
            <h1>Starting from just ${product.price}</h1>
            <h4 className="subtitle">{product.title}</h4>
            <div className="brands">
              <span>{product.brand}</span>
              <span id="availabilityStatus">{product.availabilityStatus}</span>
            </div>
            <Link to="/app/product">
              <button className={`shop-btn ${theam ? "dark" : ""}`}>Shop Now</button>
            </Link>
          </div>
        </div>
      )}

      <div className="still-you-want">
        {products.slice(12, 18).map((item) => (
          <div className="product-component" key={item.id}>
            <ProductCard item={item} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
