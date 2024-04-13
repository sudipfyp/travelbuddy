import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Loader from "./Loader";

const LocalEventsDetails = () => {
  const navigate = useNavigate();

  const userCheck = async () => {
    let data = await fetch("http://127.0.1:8000/user/usercheck", {
      method: "GET",
      credentials: "include",
    });

    let parsedData = await data.json();

    if (data.status === 200) {
      if (parsedData.role !== "user") {
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    userCheck();
  }, []);

  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/event/detail/${id}`)
      .then((response) => response.json())
      .then((data) => setEvent(data[0]));
  }, []);

  if (!event) {
    return (
      <div className="loading">
        <Loader />
      </div>
    );
  }

  return (
    <>
      <Navbar />

      <div className="details-container">
        <div className="details-top">
          <div className="details-container-left">
            <div className="images-top">
              <img src={event.image} alt="" />
            </div>
          </div>
          <div className="details-container-right">
            <div className="details-title">{event.name}</div>
            <div className="details-description">{event.description}</div>

            <div className="event-date">
              <p>
                <i className="fas fa-calendar"></i> Start Date:{" "}
                {event.startdate}{" "}
              </p>
              <p>
                <i className="fas fa-calendar"></i> End Date: {event.startdate}{" "}
              </p>
            </div>
            <div className="details-location">
              <p>Location: {event.location}</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default LocalEventsDetails;
