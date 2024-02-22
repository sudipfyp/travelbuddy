import React, { useState } from "react";
import Logo from "../Assets/images/logo-text.png";
import "../Assets/styles/Styles.css";

const RegisterSeller = () => {
  document.title = "Travel Buddy | SELLER REGISTER";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [shopName, setShopName] = useState("");
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [shopAddress, setShopAddress] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    let formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("shop_name", shopName);
    formData.append("registration_number", registrationNumber);
    formData.append("shop_address", shopAddress);
    formData.append("password", password);

    let sellerRegister = "http://127.0.1:8000/sellerregister/";

    let data = await fetch(sellerRegister, {
      method: "POST",
      body: formData,
    });

    let parsedData = await data.json();

    console.log(parsedData);

    if (parsedData.id) {
      alert("Seller registered successfully");
      setName("");
      setEmail("");
      setShopName("");
      setRegistrationNumber("");
      setShopAddress("");
      setPassword("");
    } else {
      if (parsedData.email) {
        alert(parsedData.email);
        return;
      }
      if (parsedData.password) {
        alert(parsedData.password);
        return;
      } else {
        alert("Something went wrong");
      }
    }
  };

  return (
    <>
      <div className="register-top">
        <div className="register-logo">
          <a href="/">
            <img src={Logo} alt="logo of travel buddy" width="100px" />
          </a>
        </div>
      </div>

      <div className="register-upper-top">
        <p className="register-heading">CREATE SELLER ACCOUNT</p>
        <p className="register-sub-heading">
          Already have an account, <a href="/sellerlogin">Sign in</a>
        </p>
      </div>

      <div className="register-form">
        <form onSubmit={handleSubmit}>
          <div className="register-row">
            <div className="register-column">
              <label htmlFor="name">Name</label>
              <br />
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Your name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="register-column">
              <label htmlFor="email">Email</label>
              <br />
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Your Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="register-row">
            <div className="register-column">
              <label htmlFor="shopName">Shop Name</label>
              <br />
              <input
                type="text"
                name="shopName"
                id="shopName"
                placeholder="Your Shop Name"
                required
                value={shopName}
                onChange={(e) => setShopName(e.target.value)}
              />
            </div>

            <div className="register-column">
              <label htmlFor="registrationNumber">Registration Number</label>
              <br />
              <input
                type="text"
                name="registrationNumber"
                id="registrationNumber"
                placeholder="Shop Registration Number"
                required
                value={registrationNumber}
                onChange={(e) => setRegistrationNumber(e.target.value)}
              />
            </div>
          </div>

          <div className="register-row">
            <div className="register-column">
              <label htmlFor="shopAddress">Shop Address</label>
              <br />
              <input
                type="text"
                name="shopAddress"
                id="shopAddress"
                placeholder="Your Shop Address"
                required
                value={shopAddress}
                onChange={(e) => setShopAddress(e.target.value)}
              />
            </div>

            <div className="register-column">
              <label htmlFor="password">Password</label>
              <br />
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="register-row">
            <input type="submit" value="Sign up" />
          </div>
        </form>
      </div>

      <div className="register-bottom">
        <p>By clicking Sign up you agree to our</p>
        <p>
          <a href="/terms" target="_blank">
            Terms and Conditions
          </a>{" "}
          &{" "}
          <a href="/privacypolicy" target="_blank">
            Privacy Policy
          </a>
        </p>
      </div>
    </>
  );
};

export default RegisterSeller;
