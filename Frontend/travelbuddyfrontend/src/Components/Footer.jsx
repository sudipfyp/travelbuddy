import React from "react";
import "../Assets/styles/Styles.css";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-text">
        <p>
          "Travel Buddy" is a web application designed to assist local
          and international tourists during their visit to the Kathmandu Valley.
        </p>
      </div>

      <div className="footer-links">
        <a href="/aboutus">About Us</a>
        <a href="/contactus">Contact Us</a>
        <a href="/privacypolicy">Privacy Policy</a>
        <a href="/terms">Terms and Conditions</a>
      </div>

      <div className="footer-social">
        <a href="https://www.facebook.com">
          <i className="fab fa-facebook"></i>
        </a>
        <a href="https://www.twitter.com">
          <i className="fa fa-twitter"></i>
        </a>
        <a href="https://www.instagram.com">
          <i className="fa fa-instagram"></i>
        </a>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Travel Buddy</p>
      </div>
    </div>
  );
};

export default Footer;
