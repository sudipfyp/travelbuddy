import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Search from "../Components/Search";
import Display from "../Components/Display";
import DivItem from "../Components/DivItem";

const LocalEvents = () => {
  const [events, setEvents] = useState([]);
  const [currentEvents, setCurrentEvents] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);
  const [popularEvents, setPopularEvents] = useState([]);

  useEffect(() => {
    document.title = "TravelBuddy ● Local Events";

    const getCurrentEvents = async () => {
      let response = await fetch("http://127.0.1:8000/event/current-event");
      let parsedData = await response.json();
      let currentEvents = parsedData;

      setCurrentEvents(currentEvents.slice(0, 4));
    };

    const getUpcomingEvents = async () => {
      let response = await fetch("http://127.0.1:8000/event/upcomming-event");
      let parsedData = await response.json();
      let upcomingEvents = parsedData;

      setUpcomingEvents(upcomingEvents.slice(0, 4));
    };

    const getPastEvents = async () => {
      let response = await fetch("http://127.0.1:8000/event/past-event");
      let parsedData = await response.json();
      let pastEvents = parsedData;

      setPastEvents(pastEvents.slice(0, 4));
    };

    const events = async () => {
      let response = await fetch("http://127.0.1:8000/event/list");
      let parsedData = await response.json();
      let events = parsedData;

      setEvents(events.slice(0, 4))

      let popularEvents = events
        .filter((item) => item.tag === "popular")
      setPopularEvents(popularEvents.slice(0, 4));
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
          headerheadline="Enjoy the Events!"
          placeholder="Search for the events"
        />

        <Display
          headerheadline="Popular"
          data={popularEvents}
          component={DivItem}
        />

        <Display
          headerheadline="Happening Now"
          data={currentEvents}
          component={DivItem}
        />

        <Display
          headerheadline="Upcoming Events"
          data={upcomingEvents}
          component={DivItem}
        />

        <Display
          headerheadline="Past Events"
          data={pastEvents}
          component={DivItem}
        />

        <Display
          headerheadline="All Events"
          data={events}
          component={DivItem}
        />
      </div>

      <Footer />
    </>
  );
};

export default LocalEvents;
