import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Default from './Pages/default';
import Login from "./Pages/login";
import GuideLogin from "./Pages/guidelogin";
import SellerLogin from "./Pages/sellerlogin";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/login/guide" element={<GuideLogin />} />
          <Route path="/login/seller" element={<SellerLogin />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Default />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;