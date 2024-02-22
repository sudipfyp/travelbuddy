import React from "react";
import "../Assets/styles/Styles.css";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const Contact = () => {
  document.title = "Travel Buddy | Contact Us";

  return (
    <>
      <Navbar />
      <div className="static-header">
        <h1>Get in touch!</h1>
      </div>

      <p className="static-title">
        If you have any questions, please feel free to contact us. Our customer
        service team will be happy to help you.
      </p>

      <div className="contact-container">
        <div className="contact-info">
          <h2>
            <i className="fa fa-location"> Travel Buddy</i>
          </h2>
          <p style={{ marginLeft: "2.5rem", marginBottom: "3rem" }}>
            Kathmandu, Nepal
          </p>

          <h2>
            <i className="fa fa-envelope"> Email</i>
          </h2>
          <p style={{ marginLeft: "2.5rem", marginBottom: "3rem" }}>
            <a href="mailto:support@travelbuddy.com.np">
              support@travelbuddy.com.np
            </a>
          </p>

          <h2>
            <i className="fa fa-hashtag"> Follow Us</i>
          </h2>
          <div className="socials">
            <a href="/">
              <i className="fa fa-facebook"></i>
            </a>
            <a href="/">
              <i className="fa fa-twitter"></i>
            </a>
            <a href="/">
              <i className="fa fa-instagram"></i>
            </a>
          </div>
        </div>

        <div className="contact-form">
          <h2>
            <i className="fa fa-phone"> Contact Us</i>
          </h2>
          <form>
            <input type="text" placeholder="Your Name" />
            <input type="email" placeholder="Your Email" />
            <input type="text" placeholder="Subject" />
            <textarea placeholder="Your Message"></textarea>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Contact;
