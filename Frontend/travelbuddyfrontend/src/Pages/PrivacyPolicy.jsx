import React from "react";
import "../Assets/styles/Styles.css";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const PrivacyPolicy = () => {
  document.title = "Travel Buddy | Privacy Policy";

  return (
    <>
      <Navbar />
      <div className="static-header">
        <h1>Travel Buddy protects your privacy</h1>
      </div>

      <p className="static-title">
        This Privacy Policy governs the manner in which Travel Buddy collects,
        uses, maintains, and discloses information collected from users (each, a
        "User") of the Travel Buddy website ("Site"). This privacy policy
        applies to the Site and all products and services offered by Travel
        Buddy.
      </p>

      <div className="static-container">
        <div className="static-contain">
          <h2 className="static-heading">
            Personal identification information:
          </h2>
          <p className="static-p">
            We may collect personal identification information from Users in
            various ways, including, but not limited to, when Users visit our
            site, register on the site, subscribe to the newsletter, fill out a
            form, and in connection with other activities, services, features,
            or resources we make available on our Site. Users may be asked for,
            as appropriate, name, email address, mailing address, phone number,
            and other information. Users may, however, visit our Site
            anonymously. We will collect personal identification information
            from Users only if they voluntarily submit such information to us.
            Users can always refuse to supply personally identification
            information, except that it may prevent them from engaging in
            certain Site-related activities.
          </p>

          <h2 className="static-heading">
            Non-personal identification information:
          </h2>
          <p className="static-p">
            We may collect non-personal identification information about Users
            whenever they interact with our Site. Non-personal identification
            information may include the browser name, the type of computer, and
            technical information about Users' means of connection to our Site,
            such as the operating system and the Internet service providers
            utilized, and other similar information.
          </p>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default PrivacyPolicy;
