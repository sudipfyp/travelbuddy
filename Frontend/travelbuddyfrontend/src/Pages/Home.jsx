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
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/userlogin">Login</Link>
          </li>
          <li>
            <Link to="/guidelogin">Guide Login</Link>
          </li>
          <li>
            <Link to="/sellerlogin">Seller Login</Link>
          </li>
          <li>
            <Link to="/userregister">Register</Link>
          </li>
          <li>
            <Link to="/guideregister">Guide Register</Link>
          </li>
          <li>
            <Link to="/sellerregister">Seller Register</Link>
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
        </ul>
        </div>
      </nav>

      <hr />

      <Footer />
    </div>
  );
};

export default Home;
