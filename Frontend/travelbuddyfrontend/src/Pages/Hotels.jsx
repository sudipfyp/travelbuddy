import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Search from "../Components/Search";
import Display from "../Components/Display";
import DivItem from "../Components/DivItem";

const Hotels = () => {
  const [highratedhotels, setHighRatedHotels] = useState([]);
  const [premiumhotels, setPremiumHotels] = useState([]);
  const [budgethotels, setBudgetHotels] = useState([]);
  const [kathmanduhotels, setKathmanduHotels] = useState([]);
  const [lalitpurhotels, setLalitpurHotels] = useState([]);
  const [bhaktapurhotels, setBhaktapurHotels] = useState([]);

  useEffect(() => {
    document.title = "TravelBuddy ● Hotels";

    const getHotels = async () => {
      let response = await fetch("http://127.0.1:8000/hotel/list");
      let parsedData = await response.json();
      let hotelData = parsedData;

      let highrated = hotelData.filter((item) => item.rating > 3).slice(0, 4);
      setHighRatedHotels(highrated);

      let premium = hotelData.filter((item) => item.noOfRoom > 10).slice(0, 4);
      setPremiumHotels(premium);

      let budget = hotelData.filter((item) => item.rating < 4).slice(0, 4);
      setBudgetHotels(budget);

      let kathmandu = hotelData
        .filter((item) => item.address === "Kathmandu")
        .slice(0, 4);
      setKathmanduHotels(kathmandu);

      let lalitpur = hotelData
        .filter((item) => item.address === "Lalitpur")
        .slice(0, 4);
      setLalitpurHotels(lalitpur);

      let bhaktapur = hotelData
        .filter((item) => item.address === "Bhaktapur")
        .slice(0, 4);
      setBhaktapurHotels(bhaktapur);
    };
    getHotels();
  }, []);

  return (
    <>
      <Navbar />

      <div className="common-container">
        <Search
          headline="Stay Comfortably!"
          placeholder="Search for the hotels"
        />

        <Display
          headerheadline="Highly Rated"
          data={highratedhotels}
          component={DivItem}
        />

        <Display
          headerheadline="Premium Stay"
          data={premiumhotels}
          component={DivItem}
        />

        <Display
          headerheadline="Budget Friendly"
          data={budgethotels}
          component={DivItem}
        />

        <Display
          headerheadline="Kathmandu District"
          data={kathmanduhotels}
          component={DivItem}
        />

        <Display
          headerheadline="Lalitpur District"
          data={lalitpurhotels}
          component={DivItem}
        />

        <Display
          headerheadline="Bhaktapur District"
          data={bhaktapurhotels}
          component={DivItem}
        />
      </div>

      {/* <div className="common-container">
        <div className="common-header">
          <div className="common-headline">
            <h1>Stay Comfortably!</h1>
          </div>

          <div className="common-search">
            <input type="text" placeholder="Search for the hotels" />

            <button>Search</button>
          </div>
        </div>

        <div className="common-header-headline">
          <h2>Highly Rated</h2>

          <div className="common-header-section">
            {hotels.map((hotel, index) => (
              <a href={`/productdetails/${hotel.id}`}>
                <div key={index} className="common-header-section-div">
                  Name: {hotel.name}
                  <br />
                  Address: {hotel.address}
                  <br />
                  ID: {hotel.id}
                </div>
              </a>
            ))}
          </div>

          <p className="see-more">
            <a href="/">See More</a>
          </p>
        </div>

        <div className="common-header-headline">
          <h2>Premium Stay</h2>

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
          <h2>Budget Friendly</h2>

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
          <h2>Kathmandu District</h2>

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
          <h2>Lalitpur District</h2>

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
          <h2>Bhaktapur District</h2>

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
      </div> */}

      <Footer />
    </>
  );
};

export default Hotels;
