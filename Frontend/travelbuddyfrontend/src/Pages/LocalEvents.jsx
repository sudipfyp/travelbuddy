import React from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const LocalEvents = () => {
  document.title = "TravelBuddy ● Local Events";
  return (
    <>
      <Navbar />
      
      <div className="common-container">
        <div className="common-header">
          <div className="common-headline">
            <h1>Enjoy the Events!</h1>
          </div>

          <div className="common-search">
            <input type="text" placeholder="Search for the events" />

            <button>Search</button>
          </div>
        </div>

        <div className="common-header-headline">
          <h2>Popular</h2>

          <div className="common-header-section">
            <div className="common-header-section-div">1</div>
            <div className="common-header-section-div">1</div>
            <div className="common-header-section-div">1</div>
            <div className="common-header-section-div">1</div>
          </div>

          <p className="see-more">
            <a href="/">See More</a>
          </p>
        </div>

        <div className="common-header-headline">
          <h2>Happening Now</h2>

          <div className="common-header-section">
            <div className="common-header-section-div">1</div>
            <div className="common-header-section-div">1</div>
            <div className="common-header-section-div">1</div>
            <div className="common-header-section-div">1</div>
          </div>

          <p className="see-more">
            <a href="/">See More</a>
          </p>
        </div>

        <div className="common-header-headline">
          <h2>Upcoming Events</h2>

          <div className="common-header-section">
            <div className="common-header-section-div">1</div>
            <div className="common-header-section-div">1</div>
            <div className="common-header-section-div">1</div>
            <div className="common-header-section-div">1</div>
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

export default LocalEvents;
