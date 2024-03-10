import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useParams } from "react-router-dom";

const PlaceDetails = () => {
  const { id } = useParams();
  const [place, setPlace] = useState(null);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/place/detail/${id}`)
      .then((response) => response.json())
      .then((data) => setPlace(data[0]));
  }, [id]);

  if (!place) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar />

      <div className="details-container">
        <div className="details-top">
          <div className="details-container-left">
            <div className="images-top">
              <img src={place.image} alt="" />
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
            <div className="details-title">{place.name}</div>
            <div className="details-description">{place.description}</div>
            <div className="details-tags">
              <p>
                <i className="fas fa-tag"></i>
              </p>
              <p>{place.tag}</p>
            </div>

            <div className="details-location">
              <p>
                <i className="fas fa-map"> </i>
                &nbsp;&nbsp; Location: {place.location}
              </p>
              <button>Get Direction</button>
            </div>
          </div>
        </div>

        <div className="details-bottom">
          <div className="details-bottom-title">Recommended</div>
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

export default PlaceDetails;
