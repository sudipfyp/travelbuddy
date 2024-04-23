import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Search from "../Components/Search";
import Display from "../Components/Display";
import DivItem from "../Components/DivItem";
import swal from "sweetalert";

const LocalEvents = () => {
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
    document.title = "TravelBuddy ● Local Events";
  }, []);

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

      if (currentEvents.length > 0) {
        setCurrentEvents(currentEvents.slice(0, 4));
      }
    };

    const getUpcomingEvents = async () => {
      let response = await fetch("http://127.0.1:8000/event/upcomming-event");
      let parsedData = await response.json();
      let upcomingEvents = parsedData;

      if (upcomingEvents.length > 0) {
        setUpcomingEvents(upcomingEvents.slice(0, 4));
      }
    };

    const getPastEvents = async () => {
      let response = await fetch("http://127.0.1:8000/event/past-event");
      let parsedData = await response.json();
      let pastEvents = parsedData;

      if (pastEvents.length > 0) {
        setPastEvents(pastEvents.slice(0, 4));
      }
    };

    const events = async () => {
      let response = await fetch("http://127.0.1:8000/event/list");
      let parsedData = await response.json();
      let events = parsedData;

      if (events.length > 0) {
        setEvents(events.slice(0, 4));

        let popularEvents = events.filter((item) => item.tag === "popular");
        setPopularEvents(popularEvents.slice(0, 4));
      } else {
        swal("No Events Found", "No events found in the database", "error");
      }
    };

    getCurrentEvents();
    getUpcomingEvents();
    getPastEvents();
    events();
  }, []);

  return (
    <>
      <Navbar />

      <div className="common-container">
        <Search
          headline="Enjoy the Events!"
          placeholder="Search for the events"
        />

        {currentEvents.length > 0 ? (
          <Display
            headerheadline="Happening Now"
            data={currentEvents}
            component={DivItem}
          />
        ) : null}

        {popularEvents.length > 0 ? (
          <Display
            headerheadline="Popular"
            data={popularEvents}
            component={DivItem}
          />
        ) : null}

        {upcomingEvents.length > 0 ? (
          <Display
            headerheadline="Upcoming Events"
            data={upcomingEvents}
            component={DivItem}
          />
        ) : null}

        {pastEvents.length > 0 ? (
          <Display
            headerheadline="Past Events"
            data={pastEvents}
            component={DivItem}
          />
        ) : null}

        {events.length > 0 ? (
          <Display
            headerheadline="All Events"
            data={events}
            component={DivItem}
          />
        ) : null}
      </div>

      <Footer />
    </>
  );
};

export default LocalEvents;
