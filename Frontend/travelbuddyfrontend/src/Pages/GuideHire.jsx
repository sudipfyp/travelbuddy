import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Image from "../Assets/images/logo.png";
import Loader from "../Components/Loader";

const GuideHire = () => {
  const { id } = useParams();
  const [guide, setGuide] = useState(null);

  const navigate = useNavigate();

  const userCheck = async () => {
    let data = await fetch("http://127.0.1:8000/user/usercheck", {
      method: "GET",
      credentials: "include",
    });
    let parsedData = await data.json();
    if (data.status === 200) {
      console.log(parsedData);
    } else {
      alert("Login First");
      navigate("/login");
    }
  };

  useEffect(() => {
    userCheck();
  }, []);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/user/guide/detail/${id}`)
      .then((response) => response.json())
      .then((data) => setGuide(data[0]));
    console.log(guide);
  }, []);

  const [noOfDays, setNoOfDays] = useState("");
  const [placesInterested, setPlacesInterested] = useState("");

  const handleGuideHire = async (e) => {
    e.preventDefault();

    let form = new FormData();
    form.append("day", noOfDays);
    form.append("place", placesInterested);

    let response = await fetch(`http://127.0.1:8000/guide/hire/${id}/`, {
      method: "POST",
      body: form,
      credentials: "include",
    });

    let data = await response.json();
    console.log(data);

    if (response.status === 200) {
      alert("Request sent successfully");
      navigate(`/guidedetails/${guide.id}`);
    } else {
      alert("Request failed");
    }
  };

  if (!guide) {
    return (
      <div className="loading">
        <Loader />
      </div>
    );
  }

  return (
    <>
      <div className="guide-hire-container">
        <div className="ghc-left">
          <img src={guide.image} alt="" />
          <br />
          <h3>Name: {guide.name}</h3>
        </div>

        <div className="ghc-right">
          {/* {guide.identifier === "guide" ? (
            <div className="ghc-right-top">
              <h3>Your request is pending</h3>
            </div>
          ) : ( */}
            <div className="ghc-right-top">
              <h3>Guide Hire</h3>
              <br />
              <form onSubmit={handleGuideHire}>
                <input
                  type="number"
                  placeholder="Number of days"
                  onChange={(e) => setNoOfDays(e.target.value)}
                />
                <br />
                <input
                  type="text"
                  placeholder="Places interested"
                  onChange={(e) => setPlacesInterested(e.target.value)}
                />
                <br />
                <p>Charge (per day): {guide.charge}</p>
                <button type="submit">Send Request</button>
              </form>
            </div>
          {/* )} */}
        </div>
      </div>
    </>
  );
};

export default GuideHire;
