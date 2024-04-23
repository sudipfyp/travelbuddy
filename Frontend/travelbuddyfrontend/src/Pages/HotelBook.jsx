import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { useParams, useNavigate } from "react-router-dom";
import Loader from "../Components/Loader";
import swal from "sweetalert";

const HotelBook = () => {
  const { id } = useParams();
  const [hotel, setHotel] = useState(null);
  const [room, setRoom] = useState([]);

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

    if (data.status === 403) {
      swal(
        "Unauthorized Access",
        "You are not authorized to access this page",
        "error"
      );

      navigate("/login");
    }
  };

  useEffect(() => {
    userCheck();
    document.title = "TravelBuddy ● Book Hotel";
  }, []);

  const fetchHotel = async () => {
    let api = `http://127.0.0.1:8000/hotel/detail/all/${id}`;
    let data = await fetch(api, {
      method: "GET",
      credentials: "include",
    });

    if (data.status === 200) {
      let parsedData = await data.json();
      console.log(parsedData);
      setHotel(parsedData);
    }
  };

  const fetchRoom = async () => {
    let api = `http://127.0.0.1:8000/hotel/room/list/${id}`;
    let data = await fetch(api, {
      method: "GET",
      credentials: "include",
    });

    if (data.status === 200) {
      let parsedData = await data.json();
      console.log(parsedData);
      setRoom(parsedData);
    }
  };

  useEffect(() => {
    if (id) {
      fetchHotel();
      fetchRoom();
    }
  }, []);

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [roomType, setRoomType] = useState([]);

  const handleHotelBook = async (e) => {
    e.preventDefault();

    let form = new FormData();
    form.append("checkIn", checkIn);
    form.append("checkOut", checkOut);
    form.append("roomType", roomType);

    let response = await fetch(
      `http://127.0.1:8000/hotel/room/book/${roomType}`,
      {
        method: "POST",
        body: form,
        credentials: "include",
      }
    );

    let data = await response.json();
    console.log(data);

    if (response.status === 200) {
      swal("Success", "Request sent Successfully", "success");
      navigate(`/hoteldetails/${hotel.id}`);
    } else {
      swal("Error", "Request Failed", "error");
    }
  };

  if (!hotel) {
    return (
      <div className="loading">
        <Loader />
      </div>
    );
  }

  return (
    <>
      <Navbar />

      <div className="static-header">
        <h1>Book {hotel.name}</h1>
      </div>

      <div className="guide-hire-container">
        <div className="ghc-left">
          <img src={hotel.image} alt="" />
          <br />
          <h3>Name: {hotel.name}</h3>
          <br />
          <p>{hotel.description}</p>
        </div>

        <div className="ghc-right">
          <div className="ghc-right-top">
            <h3>Book Hotel</h3>
            <br />
            <form onSubmit={handleHotelBook}>
              <label htmlFor="checkin">Check-In Date</label>
              <input
                type="date"
                id="checkin"
                min={new Date().toISOString().split("T")[0]}
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
              />
              <br />
              <label htmlFor="checkout">Check-Out Date</label>
              <input
                type="date"
                id="checkout"
                min={new Date().toISOString().split("T")[0]}
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
              />
              <br />
              <label htmlFor="type">Room Type</label>
              <select id="type" onChange={(e) => setRoomType(e.target.value)}>
                <option default>Select room type</option>
                {room.map((room) => (
                  <option key={room.id} value={room.id}>
                    {room.roomType} (Rs. {room.roomPrice})
                  </option>
                ))}
              </select>
              <br />
              <button type="submit">Send Request</button>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default HotelBook;
