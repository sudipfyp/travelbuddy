import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Search from "../Components/Search";
import Display from "../Components/Display";
import DivItem from "../Components/DivItem";

const Place = () => {
  document.title = "TravelBuddy ● Place";

  const [recommended, setRecommended] = useState([]);
  const [culturalHeritages, setCulturalHeritages] = useState([]);
  const [naturalScenario, setNaturalScenario] = useState([]);
  const [kathmanduDistrict, setKathmanduDistrict] = useState([]);
  const [lalitpurDistrict, setLalitpurDistrict] = useState([]);
  const [bhaktapurDistrict, setBhaktapurDistrict] = useState([]);

  useEffect(() => {
    const getPlaces = async () => {
      let response = await fetch("http://127.0.1:8000/place/list");
      let parsedData = await response.json();
      let placeData = parsedData;

      let recommended = placeData
        .filter((item) => item.tag === "recommended")
        .slice(0, 4);
      setRecommended(recommended);

      let culturalHeritages = placeData
        .filter((item) => item.tag === "heritage")
        .slice(0, 4);
      setCulturalHeritages(culturalHeritages);

      let naturalScenario = placeData
        .filter((item) => item.tag === "natural")
        .slice(0, 4);
      setNaturalScenario(naturalScenario);

      let kathmanduDistrict = placeData
        .filter((item) => item.location === "ktm")
        .slice(0, 4);
      setKathmanduDistrict(kathmanduDistrict);

      let lalitpurDistrict = placeData
        .filter((item) => item.location === "llt")
        .slice(0, 4);
      setLalitpurDistrict(lalitpurDistrict);

      let bhaktapurDistrict = placeData
        .filter((item) => item.location === "bkt")
        .slice(0, 4);
      setBhaktapurDistrict(bhaktapurDistrict);
    };
    getPlaces();
  }, []);

  return (
    <>
      <Navbar />

      <div className="common-container">
        <Search
          headline="Explore the Beauty!"
          placeholder="Search for the places"
        />

        <Display
          headerheadline="Recommended"
          data={recommended}
          component={DivItem}
        />

        <Display
          headerheadline="Cultural Heritages"
          data={culturalHeritages}
          component={DivItem}
        />

        <Display
          headerheadline="Natural Scenario"
          data={naturalScenario}
          component={DivItem}
        />

        <Display
          headerheadline="Kathmandu District"
          data={kathmanduDistrict}
          component={DivItem}
        />

        <Display
          headerheadline="Lalitpur District"
          data={lalitpurDistrict}
          component={DivItem}
        />
        
        <Display
          headerheadline="Bhaktapur District"
          data={bhaktapurDistrict}
          component={DivItem}
        />
      </div>

      {/* <div className="common-container">
        <div className="common-header">
          <div className="common-headline">
            <h1>Explore the Beauty!</h1>
          </div>

          <div className="common-search">
            <input type="text" placeholder="Search for the places" />

            <button>Search</button>
          </div>
        </div>

        <div className="common-header-headline">
          <h2>Recommended</h2>

          <div className="common-header-section">
            {places.map((places, index) => (
              <a href={`/productdetails/${places.id}`}>
                <div key={index} className="common-header-section-div">
                  Name: {places.name}
                  <br />
                  Address: {places.location}
                  <br />
                  ID: {places.id}
                </div>
              </a>
            ))}
          </div>

          <p className="see-more">
            <a href="/">See More</a>
          </p>
        </div>

        <div className="common-header-headline">
          <h2>Cultural Heritages</h2>

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
          <h2>Natural Scenario</h2>

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

export default Place;
