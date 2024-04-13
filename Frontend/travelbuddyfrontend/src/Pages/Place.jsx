import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Search from "../Components/Search";
import Display from "../Components/Display";
import DivItem from "../Components/DivItem";
import swal from "sweetalert";

const Place = () => {
  const navigate = useNavigate();

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
    }
  };

  useEffect(() => {
    userCheck();
    document.title = "TravelBuddy ● Place";
  }, []);

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
        .filter((item) => item.district === "Kathmandu")
        .slice(0, 4);
      setKathmanduDistrict(kathmanduDistrict);

      let lalitpurDistrict = placeData
        .filter((item) => item.district === "Lalitpur")
        .slice(0, 4);
      setLalitpurDistrict(lalitpurDistrict);

      let bhaktapurDistrict = placeData
        .filter((item) => item.district === "Bhaktapur")
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

      <Footer />
    </>
  );
};

export default Place;
