import React from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const Shop = () => {
  document.title = "TravelBuddy ● Shop";

  return (
    <>
      <Navbar />

      <div className="common-container">
        <div className="common-header">
          <div className="common-headline">
            <h1>Crafted with Love!</h1>
          </div>

          <div className="common-search">
            <input type="text" placeholder="Search for the products" />

            <button>Search</button>
          </div>
        </div>

        <div className="common-header-headline">
          <h2>Popular Now</h2>

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
          <h2>Hand Crafted</h2>

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
          <h2>Decorations</h2>

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
          <h2>Clothing</h2>

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
          <h2>Ornaments</h2>

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
          <h2>Historical Items</h2>

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

export default Shop;
