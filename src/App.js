import { React, useEffect, useState } from "react";
import "./App.css";
import logo from "./Images/Logo.jpeg";
import { checkout } from "./services/checkout";

import { getProducts } from "./services/getProducts";

function App() {
  const [products, setProducts] = useState([]);

  const onClick = (price) => {
    checkout(price.id);
  };

  useEffect(() => {
    const loadData = async () => {
      const products = await getProducts();
      setProducts(products);
    };

    loadData();
  }, []);

  const formatMoney = (number) => {
    const formattedNumber = number / 100;
    return formattedNumber.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  return (
    <div className="container">
      <header className="heading-container">
        <img className="logo" src={logo} alt="authoritee-logo" />
        <h1 className="heading">Authori-Tee</h1>
      </header>
      <ul className="product-grid">
        {products.map((product) => (
          <li key={product.id} className="product-cards">
            <img
              className="image"
              src={product.images[0]}
              alt={product.description}
            />
            <h2 className="product-name-header">{product.name}</h2>
            <p className="product-description">{product.description}</p>
            {product.prices.map((price) => (
              <div key={price.id} className="product-price">
                {formatMoney(price.unit_amount)}
              </div>
            ))}
            <button
              className="button-click"
              onClick={() => onClick(product.prices[0])}
            >
              Buy Now
            </button>
          </li>
        ))}
      </ul>
      <footer className="footer-element"> &copy; 2022 Authori-Tee</footer>
    </div>
  );
}
export default App;
