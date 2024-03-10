import React, { useState, useEffect } from "react";
import DivItem from "./DivItem";
import Navbar from "./Navbar";
import Search from "./Search";
import Footer from "./Footer";
import { useParams } from "react-router-dom";

const SeeMore = () => {
  const category = window.location.href.split("/").slice(-2)[0];
  const { headerheadline } = useParams();

  const [recommendedPlace, setRecommendedPlace] = useState([]);
  const [culturalHeritagesPlace, setCulturalHeritagesPlace] = useState([]);
  const [naturalScenarioPlace, setNaturalScenarioPlace] = useState([]);
  const [kathmanduDistrictPlace, setKathmanduDistrictPlace] = useState([]);
  const [lalitpurDistrictPlace, setLalitpurDistrictPlace] = useState([]);
  const [bhaktapurDistrictPlace, setBhaktapurDistrictPlace] = useState([]);

  useEffect(() => {
    const getPlaces = async () => {
      let response = await fetch("http://127.0.1:8000/place/list");
      let parsedData = await response.json();
      let placeData = parsedData;

      let recommendedPlace = placeData.filter(
        (item) => item.tag === "recommended"
      );
      setRecommendedPlace(recommendedPlace);

      let culturalHeritagesPlace = placeData.filter(
        (item) => item.tag === "heritage"
      );
      setCulturalHeritagesPlace(culturalHeritagesPlace);

      let naturalScenarioPlace = placeData.filter(
        (item) => item.tag === "natural"
      );
      setNaturalScenarioPlace(naturalScenarioPlace);

      let kathmanduDistrictPlace = placeData.filter(
        (item) => item.location === "ktm"
      );
      setKathmanduDistrictPlace(kathmanduDistrictPlace);

      let lalitpurDistrictPlace = placeData.filter(
        (item) => item.location === "llt"
      );
      setLalitpurDistrictPlace(lalitpurDistrictPlace);

      let bhaktapurDistrictPlace = placeData.filter(
        (item) => item.location === "bkt"
      );
      setBhaktapurDistrictPlace(bhaktapurDistrictPlace);
    };
    getPlaces();
  }, []);

  const [highRatedHotels, setHighRatedHotels] = useState([]);
  const [premiumHotels, setPremiumHotels] = useState([]);
  const [budgetHotels, setBudgetHotels] = useState([]);
  const [kathmanduHotels, setKathmanduHotels] = useState([]);
  const [lalitpurHotels, setLalitpurHotels] = useState([]);
  const [bhaktapurHotels, setBhaktapurHotels] = useState([]);

  useEffect(() => {
    const getHotels = async () => {
      let response = await fetch("http://127.0.1:8000/hotel/list");
      let parsedData = await response.json();
      let hotelData = parsedData;

      let highRatedHotels = hotelData.filter((item) => item.rating > 3);
      setHighRatedHotels(highRatedHotels);

      let premiumHotels = hotelData.filter((item) => item.noOfRoom > 10);
      setPremiumHotels(premiumHotels);

      let budgetHotels = hotelData.filter((item) => item.rating < 4);
      setBudgetHotels(budgetHotels);

      let kathmanduHotels = hotelData.filter(
        (item) => item.address === "Kathmandu"
      );
      setKathmanduHotels(kathmanduHotels);

      let lalitpurHotels = hotelData.filter(
        (item) => item.address === "Lalitpur"
      );
      setLalitpurHotels(lalitpurHotels);

      let bhaktapurHotels = hotelData.filter(
        (item) => item.address === "Bhaktapur"
      );
      setBhaktapurHotels(bhaktapurHotels);
    };
    getHotels();
  }, []);

  const [highlyRatedGuides, setHighlyRatedGuides] = useState([]);
  const [adventureGuides, setAdventureGuides] = useState([]);
  const [culturalExpertGuides, setCulturalExpertGuides] = useState([]);
  const [kathmanduDistrictGuides, setKathmanduDistrictGuides] = useState([]);
  const [lalitpurDistrictGuides, setLalitpurDistrictGuides] = useState([]);
  const [bhaktapurDistrictGuides, setBhaktapurDistrictGuides] = useState([]);

  useEffect(() => {
    const getGuides = async () => {
      let response = await fetch("http://127.0.1:8000/user/guide/list");
      let parsedData = await response.json();
      let guideData = parsedData;

      let highlyRatedGuides = guideData.filter((item) => item.identifier === "guide");
      setHighlyRatedGuides(highlyRatedGuides);

      let adventureGuides = guideData.filter(
        (item) => item.tag === "adventure"
      );
      setAdventureGuides(adventureGuides);

      let culturalExpertGuides = guideData.filter(
        (item) => item.tag === "cultural"
      );
      setCulturalExpertGuides(culturalExpertGuides);

      let kathmanduDistrictGuides = guideData.filter(
        (item) => item.address === "Kathmandu"
      );
      setKathmanduDistrictGuides(kathmanduDistrictGuides);

      let lalitpurDistrictGuides = guideData.filter(
        (item) => item.address === "Lalitpur"
      );
      setLalitpurDistrictGuides(lalitpurDistrictGuides);

      let bhaktapurDistrictGuides = guideData.filter(
        (item) => item.address === "Bhaktapur"
      );
      setBhaktapurDistrictGuides(bhaktapurDistrictGuides);
    };
    getGuides();
  }, []);

  return (
    <>
      <Navbar />

      <div className="common-container">
        <div className="common-header-headline">
          {category === "place" ? (
            <>
              <Search
                headline="Explore the Beauty!"
                placeholder="Search for the places"
              />

              {headerheadline === "recommended" ? (
                <>
                  <h2>Recommended</h2>
                  <div className="common-header-section">
                    {recommendedPlace.map((item, index) => (
                      <DivItem key={index} item={item} />
                    ))}
                  </div>
                </>
              ) : headerheadline === "cultural-heritages" ? (
                <>
                  <h2>Cultural Heritages</h2>
                  <div className="common-header-section">
                    {culturalHeritagesPlace.map((item, index) => (
                      <DivItem key={index} item={item} />
                    ))}
                  </div>
                </>
              ) : headerheadline === "natural-scenario" ? (
                <>
                  <h2>Natural Scenario</h2>
                  <div className="common-header-section">
                    {naturalScenarioPlace.map((item, index) => (
                      <DivItem key={index} item={item} />
                    ))}
                  </div>
                </>
              ) : headerheadline === "kathmandu-district" ? (
                <>
                  <h2>Kathmandu District</h2>
                  <div className="common-header-section">
                    {kathmanduDistrictPlace.map((item, index) => (
                      <DivItem key={index} item={item} />
                    ))}
                  </div>
                </>
              ) : headerheadline === "lalitpur-district" ? (
                <>
                  <h2>Lalitpur District</h2>
                  <div className="common-header-section">
                    {lalitpurDistrictPlace.map((item, index) => (
                      <DivItem key={index} item={item} />
                    ))}
                  </div>
                </>
              ) : headerheadline === "bhaktapur-district" ? (
                <>
                  <h2>Bhaktapur District</h2>
                  <div className="common-header-section">
                    {bhaktapurDistrictPlace.map((item, index) => (
                      <DivItem key={index} item={item} />
                    ))}
                  </div>
                </>
              ) : (
                "No Such categories found"
              )}
            </>
          ) : category === "hotel" ? (
            <>
              <Search
                headline="Stay Comfortably!"
                placeholder="Search for the hotels"
              />

              {headerheadline === "highly-rated" ? (
                <>
                  <h2>Highly Rated</h2>
                  <div className="common-header-section">
                    {highRatedHotels.map((item, index) => (
                      <DivItem key={index} item={item} />
                    ))}
                  </div>
                </>
              ) : headerheadline === "premium-stay" ? (
                <>
                  <h2>Premium Stay</h2>
                  <div className="common-header-section">
                    {premiumHotels.map((item, index) => (
                      <DivItem key={index} item={item} />
                    ))}
                  </div>
                </>
              ) : headerheadline === "budget-friendly" ? (
                <>
                  <h2>Budget Friendly</h2>
                  <div className="common-header-section">
                    {budgetHotels.map((item, index) => (
                      <DivItem key={index} item={item} />
                    ))}
                  </div>
                </>
              ) : headerheadline === "kathmandu-district" ? (
                <>
                  <h2>Kathmandu District</h2>
                  <div className="common-header-section">
                    {kathmanduHotels.map((item, index) => (
                      <DivItem key={index} item={item} />
                    ))}
                  </div>
                </>
              ) : headerheadline === "lalitpur-district" ? (
                <>
                  <h2>Lalitpur District</h2>
                  <div className="common-header-section">
                    {lalitpurHotels.map((item, index) => (
                      <DivItem key={index} item={item} />
                    ))}
                  </div>
                </>
              ) : headerheadline === "bhaktapur-district" ? (
                <>
                  <h2>Bhaktapur District</h2>
                  <div className="common-header-section">
                    {bhaktapurHotels.map((item, index) => (
                      <DivItem key={index} item={item} />
                    ))}
                  </div>
                </>
              ) : (
                "No Such categories found"
              )}
            </>
          ) : category === "guide" ? (
            <>
              <Search
                headline="Travel with the pros!"
                placeholder="Search for the Guides"
              />

              {headerheadline === "highly-rated" ? (
                <>
                  <h2>Highly Rated</h2>
                  <div className="common-header-section">
                    {highlyRatedGuides.map((item, index) => (
                      <DivItem key={index} item={item} />
                    ))}
                  </div>
                </>
              ) : headerheadline === "adventure-guides" ? (
                <>
                  <h2>Adventure Guides</h2>
                  <div className="common-header-section">
                    {adventureGuides.map((item, index) => (
                      <DivItem key={index} item={item} />
                    ))}
                  </div>
                </>
              ) : headerheadline === "cultural-experts" ? (
                <>
                  <h2>Cultural Experts</h2>
                  <div className="common-header-section">
                    {culturalExpertGuides.map((item, index) => (
                      <DivItem key={index} item={item} />
                    ))}
                  </div>
                </>
              ) : headerheadline === "kathmandu-district" ? (
                <>
                  <h2>Kathmandu District</h2>
                  <div className="common-header-section">
                    {kathmanduDistrictGuides.map((item, index) => (
                      <DivItem key={index} item={item} />
                    ))}
                  </div>
                </>
              ) : headerheadline === "lalitpur-district" ? (
                <>
                  <h2>Lalitpur District</h2>
                  <div className="common-header-section">
                    {lalitpurDistrictGuides.map((item, index) => (
                      <DivItem key={index} item={item} />
                    ))}
                  </div>
                </>
              ) : headerheadline === "bhaktapur-district" ? (
                <>
                  <h2>Bhaktapur District</h2>
                  <div className="common-header-section">
                    {bhaktapurDistrictGuides.map((item, index) => (
                      <DivItem key={index} item={item} />
                    ))}
                  </div>
                </>
              ) : (
                "No Such categories found"
              )}
            </>
          ) : category === "product" ? (
            <>Product</>
          ) : category === "localevents" ? (
            <>Local Events</>
          ) : (
            "Error: No such category found"
          )}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default SeeMore;
