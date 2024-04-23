import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Loader from "./Loader";
import ProductDisplay from "./ProductDisplay";
import swal from "sweetalert";

const ShopDetails = () => {
  const navigate = useNavigate();

  const userCheck = async () => {
    let data = await fetch("http://127.0.1:8000/user/usercheck", {
      method: "GET",
      credentials: "include",
    });

    let parsedData = await data.json();

    if (data.status === 200) {
      if (parsedData.role !== "user") {
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    userCheck();
    document.title = "TravelBuddy ● Shop Details";
  }, []);

  const { id } = useParams();

  const [shop, setShop] = useState("");

  const fetchShop = async () => {
    let api = `http://127.0.1:8000/shop/detailall/${id}`;
    let data = await fetch(api, {
      method: "GET",
      credentials: "include",
    });

    if (data.status === 200) {
      let parsedData = await data.json();
      setShop(parsedData[0]);
    } else {
      swal("Not Found", "Shop not Found", "error");
      navigate("/");
    }
  };

  useEffect(() => {
    fetchShop();
  }, []);

  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    let api = `http://127.0.1:8000/shop/product/list/${shop.id}`;
    let data = await fetch(api, {
      method: "GET",
      credentials: "include",
    });

    let parsedData = await data.json();
    console.log(parsedData);

    if (data.status === 200) {
      setProducts(parsedData);
    }
  };

  useEffect(() => {
    if (shop.id) {
      fetchProducts();
    }
  }, [shop]);

  console.log(products);

  if (!shop) {
    return (
      <div className="loading">
        <Loader />;
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="static-header">
        <h1>{shop.name}</h1>
      </div>

      <div className="tips-container">
        <div className="travel-tips">
          <div className="tips-collection" style={{ marginTop: "1rem" }}>
            {products.map((product) => (
              <ProductDisplay
                key={product.id}
                id={product.id}
                image={product.image}
                name={product.name}
                description={product.description}
                price={product.price}
              />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ShopDetails;
