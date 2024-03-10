import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const HotelDetails = () => {
  const { id } = useParams();
  const [hotel, setHotel] = useState(null);

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/hotel/detail/${id}`)
        .then((response) => response.json())
        .then((data) => setHotel(data));
    }
    , [id]);

    if (!hotel) {
        return <div>Loading...</div>;
    }

  return (
    <>
      <Navbar />

      <div className="details-container">
        <div className="details-top">
          <div className="details-container-left">
            <div className="images-top">
              <img src={hotel.image} alt="" />
            </div>
            <div className="images-bottom">
              <div className="image-bottom">
                <img src="https://placehold.co/600x400/EEE/31343C" alt="" />
              </div>
              <div className="image-bottom">
                <img src="https://placehold.co/600x400/EEE/31343C" alt="" />
              </div>
              <div className="image-bottom">
                <img src="https://placehold.co/600x400/EEE/31343C" alt="" />
              </div>
            </div>
          </div>
          <div className="details-container-right">
            <div className="details-title">{hotel.name}</div>
            <div className="details-description">
              {hotel.description}
            </div>
            <div className="details-rating">
              <p>Rating: {hotel.rating}</p>
            </div>
            <div className="room-details">
              <p>Room Details:</p>
              <p>Room Details:</p>
            </div>
            <div className="details-location">
              <p>Location: {hotel.address}</p>
              <button>Get Direction</button>
            </div>
            <div className="details-action">
              <p><span>Min</span> - <span>Max</span></p>
              <a href="/">Book Hotel</a>
            </div>
          </div>
        </div>
        <div className="details-bottom">
          <div className="details-bottom-title">You may also like</div>
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

export default HotelDetails;
