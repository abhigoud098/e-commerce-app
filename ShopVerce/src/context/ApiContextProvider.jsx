import ApiContext from "./ApiContext";
import { useEffect, useState } from "react";

function ApiContextProvider({ children }) {
  const [data, setData] = useState(null);
  const [searchItem, setSearchItem] = useState(
    () => localStorage.getItem("lastSearch") || "",
  );
  const [user, setUser] = useState(null);
  const [userInfo, setUserInfo] = useState("");
  const [activeHambar, setAtiveHambar] = useState(false);
  const [them, setThem] = useState(localStorage.getItem("them") || "light");

  // fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch("https://dummyjson.com/products");
      const result = await res.json();
      setData(result);
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    localStorage.setItem("lastSearch", searchItem);
  }, [searchItem]);

  return (
    <ApiContext.Provider
      value={{
        data,
        setData,
        searchItem,
        setSearchItem,
        user,
        setUser,
        them,
        setThem,
        userInfo,
        setUserInfo,
        activeHambar,
        setAtiveHambar,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
}

export default ApiContextProvider;
