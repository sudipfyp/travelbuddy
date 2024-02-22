import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import RegisterGuide from "./Pages/RegisterGuide";
import RegisterSeller from "./Pages/RegisterSeller";
import PrivacyPolicy from "./Pages/PrivacyPolicy";
import Terms from "./Pages/Terms";
import Aboutus from "./Pages/About";
import Contact from "./Pages/Contact";

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/userlogin" element={<Login user="user" />} />
          <Route path="/guidelogin" element={<Login user="guide" />} />
          <Route path="/sellerlogin" element={<Login user="seller" />} />
          <Route path="/userregister" element={<Register />} />
          <Route path="/guideregister" element={<RegisterGuide />} />
          <Route path="/sellerregister" element={<RegisterSeller />} />
          <Route path="/privacypolicy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/aboutus" element={<Aboutus />} />
          <Route path="/contactus" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
