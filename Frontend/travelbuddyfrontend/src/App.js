import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import PrivacyPolicy from "./Pages/PrivacyPolicy";
import Terms from "./Pages/Terms";
import Aboutus from "./Pages/About";
import Contact from "./Pages/Contact";

import Default from "./Pages/Default";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Default />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/privacypolicy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/aboutus" element={<Aboutus />} />
        <Route path="/contactus" element={<Contact />} />
      </Routes>
    </Router>
  );
};

export default App;
