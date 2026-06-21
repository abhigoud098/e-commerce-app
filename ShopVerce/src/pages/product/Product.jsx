import { useContext, useMemo } from "react";
import ApiContext from "../../context/ApiContext";
import ProductCard from "../../components/productCard/ProductCard";
import "./Product.css";

function Product() {
  const { data, searchItem, them } = useContext(ApiContext);
  const products = data?.products || [];

  const search = searchItem.trim().toLowerCase();

  const filteredProducts = useMemo(() => {
    if (!search) return products;

    return products.filter(
      (product) =>
        product.title.toLowerCase().includes(search) ||
        product.brand?.toLowerCase().includes(search) ||
        product.category?.toLowerCase().includes(search),
    );
  }, [search, products]);

  if (products.length === 0) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className={`main-container ${them === "dark" ? "dark" : ""}`}>
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

export default Product;
