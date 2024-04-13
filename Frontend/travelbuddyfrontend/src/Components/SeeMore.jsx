import React, { useState, useEffect } from "react";
import DivItem from "./DivItem";
import Navbar from "./Navbar";
import Search from "./Search";
import Footer from "./Footer";
import { useParams } from "react-router-dom";

const SeeMore = () => {
  const category = window.location.href.split("/").slice(-2)[0];
  const { headerheadline } = useParams();

  const [searchTerm, setSearchTerm] = useState("");

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
        (item) =>
          item.tag === "recommended" &&
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
          item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setRecommendedPlace(recommendedPlace);

      let culturalHeritagesPlace = placeData.filter(
        (item) =>
          item.tag === "heritage" &&
          item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setCulturalHeritagesPlace(culturalHeritagesPlace);

      let naturalScenarioPlace = placeData.filter(
        (item) =>
          item.tag === "natural" &&
          item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setNaturalScenarioPlace(naturalScenarioPlace);

      let kathmanduDistrictPlace = placeData.filter(
        (item) =>
          item.district === "Kathmandu" &&
          item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setKathmanduDistrictPlace(kathmanduDistrictPlace);

      let lalitpurDistrictPlace = placeData.filter(
        (item) =>
          item.district === "Lalitpur" &&
          item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setLalitpurDistrictPlace(lalitpurDistrictPlace);

      let bhaktapurDistrictPlace = placeData.filter(
        (item) =>
          item.district === "Bhaktapur" &&
          item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setBhaktapurDistrictPlace(bhaktapurDistrictPlace);
    };
    getPlaces();
  }, [searchTerm]);

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

      let highRatedHotels = hotelData.filter(
        (item) =>
          item.noOfRoom > 30 &&
          item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setHighRatedHotels(highRatedHotels);

      let premiumHotels = hotelData.filter(
        (item) =>
          item.noOfRoom > 10 &&
          item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setPremiumHotels(premiumHotels);

      let budgetHotels = hotelData.filter(
        (item) =>
          item.noOfRoom < 7 &&
          item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setBudgetHotels(budgetHotels);

      let kathmanduHotels = hotelData.filter(
        (item) =>
          item.address === "Kathmandu" &&
          item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setKathmanduHotels(kathmanduHotels);

      let lalitpurHotels = hotelData.filter(
        (item) =>
          item.address === "Lalitpur" &&
          item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setLalitpurHotels(lalitpurHotels);

      let bhaktapurHotels = hotelData.filter(
        (item) =>
          item.address === "Bhaktapur" &&
          item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setBhaktapurHotels(bhaktapurHotels);
    };
    getHotels();
  }, [searchTerm]);

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

      let highlyRatedGuides = guideData.filter(
        (item) =>
          item.identifier === "guide" &&
          item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setHighlyRatedGuides(highlyRatedGuides);

      let adventureGuides = guideData.filter(
        (item) =>
          item.tag === "adventure" &&
          item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setAdventureGuides(adventureGuides);

      let culturalExpertGuides = guideData.filter(
        (item) =>
          item.tag === "cultural" &&
          item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setCulturalExpertGuides(culturalExpertGuides);

      let kathmanduDistrictGuides = guideData.filter(
        (item) =>
          item.address === "Kathmandu" &&
          item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setKathmanduDistrictGuides(kathmanduDistrictGuides);

      let lalitpurDistrictGuides = guideData.filter(
        (item) =>
          item.address === "Lalitpur" &&
          item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setLalitpurDistrictGuides(lalitpurDistrictGuides);

      let bhaktapurDistrictGuides = guideData.filter(
        (item) =>
          item.address === "Bhaktapur" &&
          item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setBhaktapurDistrictGuides(bhaktapurDistrictGuides);
    };
    getGuides();
  }, [searchTerm]);

  const [events, setEvents] = useState([]);
  const [currentEvents, setCurrentEvents] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);
  const [popularEvents, setPopularEvents] = useState([]);

  useEffect(() => {
    const getCurrentEvents = async () => {
      let response = await fetch("http://127.0.1:8000/event/current-event");
      let parsedData = await response.json();
      let currentEvents = parsedData;

      setCurrentEvents(
        currentEvents.filter((item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    };

    const getUpcomingEvents = async () => {
      let response = await fetch("http://127.0.1:8000/event/upcomming-event");
      let parsedData = await response.json();
      let upcomingEvents = parsedData;

      setUpcomingEvents(
        upcomingEvents.filter((item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    };

    const getPastEvents = async () => {
      let response = await fetch("http://127.0.1:8000/event/past-event");
      let parsedData = await response.json();
      let pastEvents = parsedData;

      setPastEvents(
        pastEvents.filter((item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    };

    const events = async () => {
      let response = await fetch("http://127.0.1:8000/event/list");
      let parsedData = await response.json();
      let events = parsedData;

      setEvents(events);

      let popularEvents = events.filter((item) => item.tag === "popular");
      setPopularEvents(popularEvents);
    };

    getCurrentEvents();
    getUpcomingEvents();
    getPastEvents();
    events();
  }, [searchTerm]);

  const [popularProducts, setPopularProducts] = useState([]);
  const [handCraftedProducts, setHandCraftedProducts] = useState([]);
  const [decorationsProducts, setDecorationsProducts] = useState([]);
  const [clothingProducts, setClothingProducts] = useState([]);
  const [ornamentsProducts, setOrnamentsProducts] = useState([]);
  const [historicalItemsProducts, setHistoricalItemsProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      let response = await fetch("http://127.0.1:8000/shop/product/listall");
      let parsedData = await response.json();
      let productData = parsedData;

      let popularProducts = productData.filter(
        (item) =>
          item.tag === "popular" &&
          item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setPopularProducts(popularProducts);

      let handCraftedProducts = productData.filter(
        (item) =>
          item.tag === "handcrafted" &&
          item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setHandCraftedProducts(handCraftedProducts);

      let decorationsProducts = productData.filter(
        (item) =>
          item.tag === "decoration" &&
          item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setDecorationsProducts(decorationsProducts);

      let clothingProducts = productData.filter(
        (item) =>
          item.tag === "clothing" &&
          item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setClothingProducts(clothingProducts);

      let ornamentsProducts = productData.filter(
        (item) =>
          item.tag === "ornament" &&
          item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setOrnamentsProducts(ornamentsProducts);

      let historicalItemsProducts = productData.filter(
        (item) =>
          item.tag === "historical" &&
          item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setHistoricalItemsProducts(historicalItemsProducts);
    };

    getProducts();
  }, [searchTerm]);

  return (
    <>
      <Navbar />

      <div className="common-container">
        <div className="common-header-headline">
          {category === "place" ? (
            <>
              <div className="common-header">
                <div className="common-headline">
                  <h1>Explore the Beauty!</h1>
                </div>

                <div className="common-search">
                  <input
                    type="text"
                    placeholder="Search for the places"
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

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
              <div className="common-header">
                <div className="common-headline">
                  <h1>Stay Comfortably!</h1>
                </div>

                <div className="common-search">
                  <input
                    type="text"
                    placeholder="Search for the Hotels"
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              {headerheadline === "popular" ? (
                <>
                  <h2>Popular</h2>
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
              <div className="common-header">
                <div className="common-headline">
                  <h1>Travel with the pros!</h1>
                </div>

                <div className="common-search">
                  <input
                    type="text"
                    placeholder="Search for the Guides"
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

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
            <>
              <div className="common-header">
                <div className="common-headline">
                  <h1>Crafted with Love!</h1>
                </div>

                <div className="common-search">
                  <input
                    type="text"
                    placeholder="Search for the Products"
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              {headerheadline === "popular" ? (
                <>
                  <h2>Popular</h2>
                  <div className="common-header-section">
                    {popularProducts.map((item, index) => (
                      <DivItem key={index} item={item} />
                    ))}
                  </div>
                </>
              ) : headerheadline === "hand-crafted" ? (
                <>
                  <h2>Hand Crafted</h2>
                  <div className="common-header-section">
                    {handCraftedProducts.map((item, index) => (
                      <DivItem key={index} item={item} />
                    ))}
                  </div>
                </>
              ) : headerheadline === "decorations" ? (
                <>
                  <h2>Decorations</h2>
                  <div className="common-header-section">
                    {decorationsProducts.map((item, index) => (
                      <DivItem key={index} item={item} />
                    ))}
                  </div>
                </>
              ) : headerheadline === "clothing" ? (
                <>
                  <h2>Clothing</h2>
                  <div className="common-header-section">
                    {clothingProducts.map((item, index) => (
                      <DivItem key={index} item={item} />
                    ))}
                  </div>
                </>
              ) : headerheadline === "ornaments" ? (
                <>
                  <h2>Ornaments</h2>
                  <div className="common-header-section">
                    {ornamentsProducts.map((item, index) => (
                      <DivItem key={index} item={item} />
                    ))}
                  </div>
                </>
              ) : headerheadline === "historical-items" ? (
                <>
                  <h2>Historical Items</h2>
                  <div className="common-header-section">
                    {historicalItemsProducts.map((item, index) => (
                      <DivItem key={index} item={item} />
                    ))}
                  </div>
                </>
              ) : (
                "No such category found"
              )}
            </>
          ) : category === "localevents" ? (
            <>
              <div className="common-header">
                <div className="common-headline">
                  <h1>Enjoy the Events!</h1>
                </div>

                <div className="common-search">
                  <input
                    type="text"
                    placeholder="Search for the Events"
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              {headerheadline === "popular" ? (
                <>
                  <h2>Popular</h2>
                  <div className="common-header-section">
                    {popularEvents.map((item, index) => (
                      <DivItem key={index} item={item} />
                    ))}
                  </div>
                </>
              ) : headerheadline === "happening-now" ? (
                <>
                  <h2>Happening Now</h2>
                  <div className="common-header-section">
                    {currentEvents.map((item, index) => (
                      <DivItem key={index} item={item} />
                    ))}
                  </div>
                </>
              ) : headerheadline === "upcoming-events" ? (
                <>
                  <h2>Upcoming Events</h2>
                  <div className="common-header-section">
                    {upcomingEvents.map((item, index) => (
                      <DivItem key={index} item={item} />
                    ))}
                  </div>
                </>
              ) : headerheadline === "past-events" ? (
                <>
                  <h2>Past Events</h2>
                  <div className="common-header-section">
                    {pastEvents.map((item, index) => (
                      <DivItem key={index} item={item} />
                    ))}
                  </div>
                </>
              ) : headerheadline === "all-events" ? (
                <>
                  <h2>All Events</h2>
                  <div className="common-header-section">
                    {events.map((item, index) => (
                      <DivItem key={index} item={item} />
                    ))}
                  </div>
                </>
              ) : (
                "No such category found"
              )}
            </>
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
