import React from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const Home = () => {
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
          <div className="home-header-section-div">Destinations</div>
          <div className="home-header-section-div">Products</div>
          <div className="home-header-section-div">Guides</div>
          <div className="home-header-section-div">Hotels</div>
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

        <div className="home-header-headline">
          <h2>Trending Guides</h2>

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
          <h2>Trending Hotels</h2>

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
          <h2>Local Events</h2>

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
