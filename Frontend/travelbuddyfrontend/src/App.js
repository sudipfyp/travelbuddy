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
import Hotels from "./Pages/Hotels";
import LocalEvents from "./Pages/LocalEvents";
import CurrencyExchange from "./Pages/CurrencyExchange";
import Translation from "./Pages/Translation";
import Transportation from "./Pages/Transportation";
import TravelTips from "./Pages/TravelTips";
import ScrollToTop from "./Components/Scroll";
import Rates from "./Assets/data/Currency.json";
import ProductDetails from "./Components/ProductDetails";
import PlaceDetails from "./Components/PlaceDetails";
import GuideDetails from "./Components/GuideDetails";
import LocalEventsDetails from "./Components/LocalEventsDetails";
import HotelDetails from "./Components/HotelDetails";
import SeeMore from "./Components/SeeMore";
import GuideHire from "./Pages/GuideHire";
import Dashboard from "./Pages/Admin-Dashboard";
import AdminUsers from "./Pages/Admin-Users";
import AdminShops from "./Pages/Admin-Shops";
import AdminLocalEvents from "./Pages/Admin-LocalEvents";
import AdminHotels from "./Pages/Admin-Hotels";
import AdminPlace from "./Pages/Admin-Place";
import GuideHomepage from "./Pages/GuideHomepage";
import SellerHomepage from "./Pages/SellerHomepage";
import Hirings from "./Pages/GuideHirings";
import Bookings from "./Pages/HotelBookings";
import Verify from "./Pages/Verify";
import Reset from "./Pages/ResetPassword";
import CompleteGuideRegistration from "./Pages/CompleteGuideRegistration";
import CompleteSellerRegistration from "./Pages/CompleteSellerRegistration";
import OngoingHirings from "./Pages/OngoingHirings";
import OngoingBookings from "./Pages/OngoingBookings";
import ManageShop from "./Pages/ManageShop";
import ManageHotel from "./Pages/ManageHotel";
import AddProduct from "./Pages/AddProduct";
import GuideApply from "./Pages/GuideApply";
import FindGuide from "./Pages/FindGuide";
import FindGuideDetails from "./Pages/FindGuideDetails";
import Chat from "./Pages/Chat";
import ShopDetails from "./Components/ShopDetails";
import HotelBook from "./Pages/HotelBook";

import CurrencyExchangeAPI from "./Pages/CurrencyExchangeAPI";

const App = () => {
  return (
    <Router>
      <ScrollToTop />
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
        <Route path="/product" element={<Shop />} />
        <Route path="/hotel" element={<Hotels />} />
        <Route path="/localevents" element={<LocalEvents />} />
        <Route
          path="/currencyexchange"
          element={<CurrencyExchange data={Rates} />}
        />
        <Route path="/translation" element={<Translation />} />
        <Route path="/transportation" element={<Transportation />} />
        <Route path="/traveltips" element={<TravelTips />} />
        <Route path="/productdetails/:id" element={<ProductDetails />} />
        <Route path="/placedetails/:id" element={<PlaceDetails />} />
        <Route path="/guidedetails/:id" element={<GuideDetails />} />
        <Route path="/localeventdetails/:id" element={<LocalEventsDetails />} />
        <Route path="/hoteldetails/:id" element={<HotelDetails />} />
        <Route path="/place/:headerheadline" element={<SeeMore />} />
        <Route path="/guide/:headerheadline" element={<SeeMore />} />
        <Route path="/product/:headerheadline" element={<SeeMore />} />
        <Route path="/hotel/:headerheadline" element={<SeeMore />} />
        <Route path="/localevents/:headerheadline" element={<SeeMore />} />
        <Route path="/guidehire/:id" element={<GuideHire />} />
        <Route path="/admin-dashboard" element={<Dashboard />} />
        <Route path="/admin-users" element={<AdminUsers />} />
        <Route path="/admin-shops" element={<AdminShops />} />
        <Route path="/admin-localevents" element={<AdminLocalEvents />} />
        <Route path="/admin-hotels" element={<AdminHotels />} />
        <Route path="/admin-place" element={<AdminPlace />} />
        <Route path="/guidehomepage" element={<GuideHomepage />} />
        <Route path="/sellerhomepage" element={<SellerHomepage />} />
        <Route path="/hiringdata" element={<Hirings />} />
        <Route path="/bookingdata" element={<Bookings />} />
        <Route path="/verify/:email" element={<Verify />} />
        <Route path="/reset" element={<Reset />} />
        <Route path="/guide/complete" element={<CompleteGuideRegistration />} />
        <Route
          path="/seller/complete"
          element={<CompleteSellerRegistration />}
        />
        <Route path="/ongoinghirings" element={<OngoingHirings />} />
        <Route path="/ongoingbookings" element={<OngoingBookings />} />
        <Route path="/manageshop" element={<ManageShop />} />
        <Route path="/managehotel" element={<ManageHotel />} />
        <Route path="/addproduct" element={<AddProduct />} />
        <Route path="/guideapply" element={<GuideApply />} />
        <Route path="/findguide" element={<FindGuide />} />
        <Route path="/findguide/:id" element={<FindGuideDetails />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/shopdetails/:id" element={<ShopDetails />} />
        <Route path="/hotelbook/:id" element={<HotelBook />} />

        <Route
          path="/currencyexchangeapi"
          element={<CurrencyExchangeAPI data={Rates} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
