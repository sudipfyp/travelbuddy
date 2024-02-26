import React from "react";
import { Link } from "react-router-dom";
import "../Assets/styles/Styles.css";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const Home = () => {
  return (
    <div>
      <Navbar />

      <nav >
        <h2 style={{'padding': '2rem'}}>Pages developed</h2>
        
        <div className="links">
        <ul>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
          <li>
            <a href="/privacypolicy">Privacy Policy</a>
          </li>
          <li>
            <a href="/terms">Terms and Conditions</a>
          </li>
          <li>
            <a href="/aboutus">About Us</a>
          </li>
          <li>
            <a href="/contactus">Contact Us</a>
          </li>
          <li>
            <a href="/home">Homepage</a>
          </li>
        </ul>
        </div>
      </nav>

      <hr />

      <Footer />
    </div>
  );
};

export default Home;
