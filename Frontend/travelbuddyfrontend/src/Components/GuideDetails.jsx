import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Loader from "./Loader";
import swal from "sweetalert";

const GuideDetails = () => {
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
    document.title = "TravelBuddy ● Guide Details ";
    userCheck();
  }, []);

  const { id } = useParams();
  const [guide, setGuide] = useState(null);

  useEffect(() => {
    const data = async () => {
      let response = await fetch(
        `http://127.0.0.1:8000/user/guide/detail/${id}`
      );

      if (response.status === 200) {
        let parsedData = await response.json();
        setGuide(parsedData[0]);
      } else {
        swal("Not Found", "Guide not Found", "error");
        navigate("/");
      }
    };

    data();
  }, []);

  if (guide === undefined) {
    swal("Not Found", "Guide not Found", "error");
    navigate("/");
  }

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
            <div className="details-description">{guide.description}</div>
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
              <p><i className="fa fa-star"  style={{color:'gold'}}></i> {guide.rating}</p>
            </div>
            <div className="guide-price">
              <p>
                <i className="fa fa-money"></i> Per Day Charges: {guide.charge}
              </p>
            </div>

            <div className="details-action">
              <a href={`tel:${guide.phone}`}>
                <i className="fa fa-phone"  style={{color:'white'}}></i> {guide.phone}
              </a>
              <a href={`/chat/${guide.id}/guide`}>Chat</a>
              <a href={`/guidehire/${guide.id}`}>Hire Guide</a>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default GuideDetails;
