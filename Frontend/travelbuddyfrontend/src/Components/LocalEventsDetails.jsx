import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Loader from "./Loader";

const LocalEventsDetails = () => {
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
            {/* <div className="images-bottom">
              <div className="image-bottom">
                <img src="https://placehold.co/600x400/EEE/31343C" alt="" />
              </div>
              <div className="image-bottom">
                <img src="https://placehold.co/600x400/EEE/31343C" alt="" />
              </div>
              <div className="image-bottom">
                <img src="https://placehold.co/600x400/EEE/31343C" alt="" />
              </div>
            </div> */}
          </div>
          <div className="details-container-right">
            <div className="details-title">{event.name}</div>
            <div className="details-description">
              {event.description}
            </div>
            {/* <div className="details-tags">
              <p><i className="fas fa-tag"></i></p>
              <p>hi</p>
              <p>hi</p>
              <p>hi</p>
            </div> */}
            <div className="event-date">
              <p><i className="fas fa-calendar"></i> Start Date: {event.startdate} </p>
              <p><i className="fas fa-calendar"></i> End Date: {event.startdate} </p>
            </div>
            <div className="details-location">
              <p>Location: {event.location}</p>
              <button>Get Direction</button>
            </div>
          </div>
        </div>
        <div className="details-bottom">
          <div className="details-bottom-title">Upcoming Events</div>
          <div className="details-bottom-suggestions">
            <div className="details-bottom-suggestion">1</div>
            <div className="details-bottom-suggestion">2</div>
            <div className="details-bottom-suggestion">3</div>
            <div className="details-bottom-suggestion">4</div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default LocalEventsDetails;
