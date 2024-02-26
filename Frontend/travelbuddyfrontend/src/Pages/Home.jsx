import React, { useEffect } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();

    // eslint-disable-next-line
  }, []);

  const fetchData = async () => {
    let api = "http://127.0.1:8000/user/profile";
    let data = await fetch(api, {
      method: "GET",
      credentials: "include",
    });

    if (data.status === 401) {
      navigate("/login");
    }
  };

  return (
    <>
      <Navbar />

      <div className="home-container">
        <div className="home-header">
          <div className="home-headline">
            <h1>Find your Destination!</h1>
          </div>

          <div className="home-search">
            <input type="text" placeholder="No. of Days" />
            <select name="" id="">
              <option value="" disabled>
                Preferences
              </option>
              <option value="">Natural</option>
              <option value="">Cultural</option>
              <option value="">Historical</option>
              <option value="">Religious</option>
              <option value="">Adventure</option>
              <option value="">Hills</option>
            </select>
            <button>Search</button>
          </div>
        </div>

        <div className="home-header-image"></div>

        <div className="home-header-image-section">
          <div className="home-header-section-div">1</div>
          <div className="home-header-section-div">1</div>
          <div className="home-header-section-div">1</div>
          <div className="home-header-section-div">1</div>
        </div>

        <div className="home-header-headline">
          <h2>Trending Destinations</h2>

          <div className="home-header-section">
            <div className="home-header-section-div">1</div>
            <div className="home-header-section-div">1</div>
            <div className="home-header-section-div">1</div>
            <div className="home-header-section-div">1</div>
          </div>

          <p className="see-more">
            <a href="/">See More</a>
          </p>
        </div>

        <div className="home-header-headline">
          <h2>Trending Products</h2>

          <div className="home-header-section">
            <div className="home-header-section-div">1</div>
            <div className="home-header-section-div">1</div>
            <div className="home-header-section-div">1</div>
            <div className="home-header-section-div">1</div>
          </div>

          <p className="see-more">
            <a href="/">See More</a>
          </p>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Home;
