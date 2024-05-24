import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Loader from "./Loader";
import swal from "sweetalert";

import L from "leaflet";
import "leaflet-routing-machine";

const ProductDetails = () => {
  const navigate = useNavigate();

  const userCheck = async () => {
    let data = await fetch("http://127.0.1:8000/user/usercheck", {
      method: "GET",
      credentials: "include",
    });

    let parsedData = await data.json();

    if (data.status === 200) {
      if (parsedData.role !== "user" && parsedData.role !== "seller") {
        navigate("/login");
      }
      setUser(parsedData.role);
    }
  };

  useEffect(() => {
    userCheck();
    document.title = "TravelBuddy ● Product";
  }, []);

  const { id } = useParams();
  const [user, setUser] = useState("");
  const [product, setProduct] = useState(null);
  const [deviceLocation, setDeviceLocation] = useState(null);
  const [showRoute, setShowRoute] = useState(false);

  useEffect(() => {
    const data = async () => {
      let response = await fetch(
        `http://127.0.0.1:8000/shop/product/detail/${id}`
      );

      if (response.status === 200) {
        let parsedData = await response.json();
        setProduct(parsedData[0]);
      } else {
        swal("Not Found", "Product not Found", "error");
        navigate("/");
      }
    };

    data();

    // Fetch device location
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        setDeviceLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    }
  }, []);

  const handleGetDirection = () => {
    setShowRoute(!showRoute);
  };

  useEffect(() => {
    if (showRoute && product.shop && deviceLocation) {
      // Create map
      const map = L.map("map").setView(
        [deviceLocation.lat, deviceLocation.lng],
        13
      );
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(
        map
      );

      // Add device marker
      L.marker([deviceLocation.lat, deviceLocation.lng]).addTo(map);

      // Add destination marker
      L.marker([product.shop.latitude, product.shop.longitude]).addTo(map);

      // Initialize routing control
      L.Routing.control({
        waypoints: [
          L.latLng(deviceLocation.lat, deviceLocation.lng),
          L.latLng(product.shop.latitude, product.shop.longitude),
        ],
      }).addTo(map);
    }
  }, [showRoute, product, deviceLocation]);

  if (!product) {
    return (
      <div className="loading">
        <Loader />
      </div>
    );
  }
  console.log(product);

  return (
    <>
      <Navbar />

      <div className="details-container">
        <div className="details-top">
          <div className="details-container-left">
            <div className="images-top">
              <img src={product.image} alt="" />
            </div>
          </div>
          <div className="details-container-right">
            <div className="details-title">{product.name}</div>
            <div className="details-description">{product.description}</div>
            <div className="details-action">
              <p>
                <i className="fa fa-money"></i> Rs. {product.price}
              </p>
            </div>
            <div className="details-tags">
              <p>
                <i className="fas fa-tag" /> {product.tag}
              </p>
            </div>
            
            <div className="details-location">
              <p>
                <i className="fas fa-map"> </i>
                &nbsp;&nbsp; Address: {product.shop.address}
              </p>
              <button onClick={handleGetDirection}>
                {showRoute ? "Show Location" : "Get Direction"}
              </button>
            </div>
            <div
              className="details-shop"
              onClick={() => {
                navigate(`/shopdetails/${product.shop.id}`);
              }}
            >
              <div className="details-shop-img">
                <img src={product.shop.image} alt="" />
              </div>

              <div className="details-shop-details">
                <h2>{product.shop.name}</h2>
                <p>Visit Store</p>
              </div>
            </div>
          </div>
        </div>
        <div className="details-bottom">
          <div className="details-bottom-title">Location</div>

          {showRoute ? (
            <div className="details-map-route">
              {/* Display route map */}
              {deviceLocation && (
                <div id="map" style={{ width: "100%", height: "100%" }}></div>
              )}
            </div>
          ) : (
            <div className="details-map">
              {/* Display initial map */}
              {deviceLocation && (
                <iframe
                  title="map"
                  src={`https://gallimap.com/static/map.html?lat=${product.shop.latitude}&lng=${product.shop.longitude}&markerColor=Red&markerLabel=${product.shop.name}&accessToken=a66d666f-068e-432d-a5d1-bb93355fd045`}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  aria-hidden="false"
                  tabIndex="0"
                />
              )}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ProductDetails;
