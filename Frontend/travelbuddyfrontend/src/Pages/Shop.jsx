import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Search from "../Components/Search";
import Display from "../Components/Display";
import DivItem from "../Components/DivItem";
import swal from "sweetalert";

const Shop = () => {
  const navigate = useNavigate();

  const userCheck = async () => {
    let data = await fetch("http://127.0.1:8000/user/usercheck", {
      method: "GET",
      credentials: "include",
    });

    let parsedData = await data.json();

    if (data.status === 200) {
      if (parsedData.role !== "user") {
        swal(
          "Unauthorized Access",
          "You are not authorized to access this page",
          "error"
        );

        navigate("/login");
      }
    }
  };

  useEffect(() => {
    userCheck();
    document.title = "TravelBuddy ● Shop";
  }, []);

  const [popularNow, setPopularNow] = useState([]);
  const [handCrafted, setHandCrafted] = useState([]);
  const [decorations, setDecorations] = useState([]);
  const [clothing, setClothing] = useState([]);
  const [ornaments, setOrnaments] = useState([]);
  const [historicalItems, setHistoricalItems] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      let response = await fetch("http://127.0.1:8000/shop/product/listall");
      let parsedData = await response.json();
      let productData = parsedData;

      let popularNow = productData
        .filter((item) => item.tag === "popular")
        .slice(0, 4);
      setPopularNow(popularNow);

      let handCrafted = productData
        .filter((item) => item.tag === "handcrafted")
        .slice(0, 4);
      setHandCrafted(handCrafted);

      let decorations = productData
        .filter((item) => item.tag === "decoration")
        .slice(0, 4);
      setDecorations(decorations);

      let clothing = productData
        .filter((item) => item.tag === "clothing")
        .slice(0, 4);
      setClothing(clothing);

      let ornaments = productData
        .filter((item) => item.tag === "ornament")
        .slice(0, 4);
      setOrnaments(ornaments);

      let historicalItems = productData
        .filter((item) => item.tag === "historical")
        .slice(0, 4);
      setHistoricalItems(historicalItems);
    };

    getProducts();
  }, []);

  return (
    <>
      <Navbar />

      <div className="common-container">
        <Search
          headline="Crafted with Love!"
          placeholder="Search for the products"
        />

        <Display
          headerheadline="Popular"
          data={popularNow}
          component={DivItem}
        />

        <Display
          headerheadline="Hand Crafted"
          data={handCrafted}
          component={DivItem}
        />

        <Display
          headerheadline="Decorations"
          data={decorations}
          component={DivItem}
        />

        <Display
          headerheadline="Clothing"
          data={clothing}
          component={DivItem}
        />

        <Display
          headerheadline="Ornaments"
          data={ornaments}
          component={DivItem}
        />

        <Display
          headerheadline="Historical Items"
          data={historicalItems}
          component={DivItem}
        />
      </div>

      <Footer />
    </>
  );
};

export default Shop;
