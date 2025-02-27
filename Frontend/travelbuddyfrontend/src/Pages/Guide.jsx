import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Search from "../Components/Search";
import Display from "../Components/Display";
import DivItem from "../Components/DivItem";
import swal from "sweetalert";

const Guide = () => {
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
    document.title = "TravelBuddy ● Guide";
  }, []);

  const [highlyrated, setHighlyrated] = useState([]);
  const [adventureGuides, setAdventureGuides] = useState([]);
  const [culturalExperts, setCulturalExperts] = useState([]);
  const [kathmanduDistrict, setKathmanduDistrict] = useState([]);
  const [lalitpurDistrict, setLalitpurDistrict] = useState([]);
  const [bhaktapurDistrict, setBhaktapurDistrict] = useState([]);

  useEffect(() => {
    const getGuides = async () => {
      let response = await fetch("http://127.0.1:8000/user/guide/list");
      let parsedData = await response.json();
      let guideData = parsedData;

      let highlyrated = guideData
        .filter((item) => item.identifier === "guide")
        .slice(0, 4);
      setHighlyrated(highlyrated);

      let adventureGuides = guideData
        .filter((item) => item.tag === "adventure")
        .slice(0, 4);
      setAdventureGuides(adventureGuides);

      let culturalExperts = guideData
        .filter((item) => item.tag === "cultural")
        .slice(0, 4);
      setCulturalExperts(culturalExperts);

      let kathmanduDistrict = guideData
        .filter((item) => item.address === "Kathmandu")
        .slice(0, 4);
      setKathmanduDistrict(kathmanduDistrict);

      let lalitpurDistrict = guideData
        .filter((item) => item.address === "Lalitpur")
        .slice(0, 4);
      setLalitpurDistrict(lalitpurDistrict);

      let bhaktapurDistrict = guideData
        .filter((item) => item.address === "Bhaktapur")
        .slice(0, 4);
      setBhaktapurDistrict(bhaktapurDistrict);
    };
    getGuides();
  }, []);

  return (
    <>
      <Navbar />

      <div className="common-container">
        <Search
          headline="Travel with the pros!"
          placeholder="Search for the Guides"
        />

        <Display
          headerheadline="All Guides"
          data={highlyrated}
          component={DivItem}
        />

        <Display
          headerheadline="Adventure Guides"
          data={adventureGuides}
          component={DivItem}
        />

        <Display
          headerheadline="Cultural Experts"
          data={culturalExperts}
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

      {user.role === "user" ? (
        <div className="floating">
          <a href="/hiringdata">View Hirings</a>
        </div>
      ) : null}

      <Footer />
    </>
  );
};

export default Guide;
