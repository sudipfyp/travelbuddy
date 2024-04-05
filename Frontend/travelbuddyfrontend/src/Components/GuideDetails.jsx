import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Loader from "./Loader";

const GuideDetails = () => {
  const { id } = useParams();
  const [guide, setGuide] = useState(null);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/user/guide/detail/${id}`)
      .then((response) => response.json())
      .then((data) => setGuide(data[0]));
  }, []);

  if (!guide) {
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
              <img src={guide.image} alt="" />
            </div>
          </div>
          <div className="details-container-right">
            <div className="details-title">{guide.name}</div>
            <div className="details-description">Email: {guide.email}</div>
            <div className="guide-area">
              <p>
                <i className="fas fa-map"></i>
              </p>
              <p>{guide.address}</p>
            </div>
            <div className="details-tags">
              <p>
                <i className="fas fa-tag"></i>
              </p>
              <p>{guide.tag}</p>
            </div>
            <div className="details-rating">
              <p>Rating: {guide.rating}</p>
            </div>
            <div className="guide-price">
              <p>
                <i className="fa fa-money"></i> Charge per Hour: {guide.charge}
              </p>
            </div>
            <div className="details-action">
              <a href="/">Call</a>
              <a href="/">Chat</a>
              <a href={`/guidehire/${guide.id}`}>Hire Guide</a>
            </div>
          </div>
        </div>
        <div className="details-bottom">
          <div className="details-bottom-title">Popular Guides</div>
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

export default GuideDetails;
