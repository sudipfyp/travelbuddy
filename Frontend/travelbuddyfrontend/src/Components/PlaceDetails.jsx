import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Loader from "./Loader";
import swal from "sweetalert";

import L from "leaflet";
import "leaflet-routing-machine";

const PlaceDetails = () => {
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
    document.title = "TravelBuddy ● Place Details ";
    userCheck();
  }, []);

  const { id } = useParams();
  const [place, setPlace] = useState(null);
  const [deviceLocation, setDeviceLocation] = useState(null);
  const [showRoute, setShowRoute] = useState(false);

  useEffect(() => {
    const data = async () => {
      let response = await fetch(`http://127.0.0.1:8000/place/detail/${id}`);

      if (response.status === 200) {
        let parsedData = await response.json();
        setPlace(parsedData[0]);
      } else {
        swal("Not Found", "Place not Found", "error");
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
    if (showRoute && place && deviceLocation) {
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
      L.marker([place.latitude, place.longitude]).addTo(map);

      // Initialize routing control
      L.Routing.control({
        waypoints: [
          L.latLng(deviceLocation.lat, deviceLocation.lng),
          L.latLng(place.latitude, place.longitude),
        ],
      }).addTo(map);
    }
  }, [showRoute, place, deviceLocation]);

  if (!place) {
    return (
      <div className="loading">
        <Loader />
      </div>
    );
  }

  return (
    <>
      <Navbar />

      <div className="details-container">
        <div className="details-top">
          <div className="details-container-left">
            <div className="images-top">
              <img src={place.image} alt="" />
            </div>
          </div>
          <div className="details-container-right">
            <div className="details-title">{place.name}</div>
            <div className="details-description">{place.description}</div>
            <div className="details-tags">
              <p>
                <i className="fas fa-tag"></i>
              </p>
              <p>{place.tag}</p>
            </div>

            <div className="details-location">
              <p>
                <i className="fas fa-map"> </i>
                &nbsp;&nbsp; Address: {place.location}
              </p>
              <button onClick={handleGetDirection}>
                {showRoute ? "Show Location" : "Get Direction"}
              </button>
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
                  src={`https://gallimap.com/static/map.html?lat=${place.latitude}&lng=${place.longitude}&markerColor=Red&markerLabel=${place.name}&accessToken=a66d666f-068e-432d-a5d1-bb93355fd045`}
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

export default PlaceDetails;
