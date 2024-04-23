import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import swal from "sweetalert";
import No from "../Assets/images/no.jpg";

const Recommendation = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState("");

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
      setUser(parsedData);
    }
  };

  useEffect(() => {
    userCheck();
    document.title = "TravelBuddy ● Recommendations";
  }, []);

  const [place, setPlace] = useState("");

  const fetchData = async () => {
    let api = "http://127.0.1:8000/user/profile";
    let data = await fetch(api, {
      method: "GET",
      credentials: "include",
    });

    let parsedData = await data.json();

    setPlace(parsedData[0].preferredplace);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const [recommendation, setRecommendation] = useState([]);
  const [days, setDays] = useState("");

  const getRecommendation = async (e) => {
    e.preventDefault();

    let formData = new FormData();
    formData.append("days", days);
    formData.append("tag", place);

    let api = `http://127.0.1:8000/place/recommendation`;
    let data = await fetch(api, {
      method: "POST",
      credentials: "include",
      body: formData,
    });

    let parsedData = await data.json();

    setRecommendation(parsedData);

    setDays("");
  };

  return (
    <>
      <Navbar />
      <div className="home-container">
        <div className="home-header">
          <div className="home-headline">
            <h1>Get Recommendations!</h1>
          </div>

          <div className="home-search">
            <input
              type="text"
              placeholder="No. of Days"
              value={days}
              onChange={(e) => setDays(e.target.value)}
            />

            <button onClick={getRecommendation}>Search</button>
          </div>

          <div>
            {recommendation.length > 0 ? (
              <div className="recommendation-container">
                {recommendation.map((item) => {
                  return (
                    <div className="recommendation-card" key={item.id}>
                      <img src={item.image} alt="" />
                      <div className="recommendation-card-info">
                        <h3>{item.name}</h3>
                        <br />
                        <p>{item.description}</p>
                        <br />
                        <a href={`placedetails/${item.id}`}>Get Details</a>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <img
                src={No}
                alt=""
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  marginTop: "20px",
                }}
              />
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Recommendation;
