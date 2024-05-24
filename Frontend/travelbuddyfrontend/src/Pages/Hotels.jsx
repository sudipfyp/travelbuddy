import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Search from "../Components/Search";
import Display from "../Components/Display";
import DivItem from "../Components/DivItem";
import swal from "sweetalert";

const Hotels = () => {
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
    document.title = "TravelBuddy ● Hotels";
  }, []);

  const [popularhotels, setPopularHotels] = useState([]);
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

      if (hotelData.length > 0) {
        let popular = hotelData.sort(() => 0.5 - Math.random()).slice(0, 4);
        setPopularHotels(popular);

        let premium = hotelData
          .filter((item) => item.noOfRoom > 10)
          .slice(0, 4);
        setPremiumHotels(premium);

        let budget = hotelData.filter((item) => item.noOfRoom < 7).slice(0, 4);
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
      } else {
        swal("No Hotels Found", "No hotels found in the database", "error");
      }
      console.log(hotelData)
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
          headerheadline="Popular"
          data={popularhotels}
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

      {user.role === "user" ? (
        <div className="floating">
          <a href="/bookingdata">View Bookings</a>
        </div>
      ) : null}

      <Footer />
    </>
  );
};

export default Hotels;
