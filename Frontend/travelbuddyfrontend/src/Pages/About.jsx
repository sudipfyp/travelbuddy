import React from "react";
import "../Assets/styles/Styles.css";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const About = () => {
  document.title = "Travel Buddy | About Us";

  return (
    <>
      <Navbar />
      <div className="static-header">
        <h1>Who are we?</h1>
      </div>

      <p className="static-title">
        "Travel Buddy" is a web application designed to assist local and
        international tourists during their visit to the Kathmandu Valley.
      </p>

      <div className="static-container">
        <div className="static-contain">
          <h2 className="static-heading">Travel Buddy</h2>
          <p className="static-p">
            Travel Buddy is a web application designed to assist local and
            international tourists during their visit to the Kathmandu Valley.
            It provides information about the various tourist attractions,
            hotels, restaurants, and transportation services available in the
            valley.
          </p>
          <br />
          <h2 className="static-heading">Why Travel Buddy?</h2>
          <p className="static-p">
            The Kathmandu Valley is a popular tourist destination, and it can be
            overwhelming for tourists to navigate the city and find the best
            places to visit, eat, and stay. Travel Buddy aims to simplify the
            travel experience by providing comprehensive information about the
            valley's attractions and services. It also allows users to create
            personalized itineraries and share their experiences with others.
          </p>
          <br />
          <h2 className="static-heading">Our Mission</h2>
          <p className="static-p">
            Our mission is to make travel planning and exploration in the
            Kathmandu Valley easy and enjoyable. We want to help tourists make
            the most of their visit by providing them with the information they
            need to create memorable experiences.
            <br />
            We also aim to support local businesses by promoting their services
            to a wider audience and encouraging tourists to explore the valley's
            hidden gems.
          </p>
          <br />
          <h2 className="static-heading">Contact Us</h2>
          <p className="static-p">
            If you have any questions or feedback, please feel free to contact
            us at:&nbsp;
            <a href="mailto:support@travelbuddy.com.np">
              support@travelbuddy.com.np
            </a>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default About;
