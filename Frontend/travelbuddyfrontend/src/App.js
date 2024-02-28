import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import PrivacyPolicy from "./Pages/PrivacyPolicy";
import Terms from "./Pages/Terms";
import Aboutus from "./Pages/About";
import Contact from "./Pages/Contact";
import Profile from "./Pages/Profile";
import EditProfile from "./Pages/EditProfile";
import Place from "./Pages/Place";
import Guide from "./Pages/Guide";
import Shop from "./Pages/Shop";
import Feed from "./Pages/Feed";
import Hotels from "./Pages/Hotels";
import LocalEvents from "./Pages/LocalEvents";
import CurrencyExchange from "./Pages/CurrencyExchange";
import Translation from "./Pages/Translation";
import Transportation from "./Pages/Transportation";
import SafetyGuidelines from "./Pages/SafetyGuidelines";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/privacypolicy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/aboutus" element={<Aboutus />} />
        <Route path="/contactus" element={<Contact />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/editprofile" element={<EditProfile />} />
        <Route path="/place" element={<Place />} />
        <Route path="/guide" element={<Guide />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/hotels" element={<Hotels />} />
        <Route path="/localevents" element={<LocalEvents />} />
        <Route path="/currencyexchange" element={<CurrencyExchange />} />
        <Route path="/translation" element={<Translation />} />
        <Route path="/transportation" element={<Transportation />} />
        <Route path="/safetyguidelines" element={<SafetyGuidelines />} />
      </Routes>
    </Router>
  );
};

export default App;
