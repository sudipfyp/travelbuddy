import React, { useState } from "react";
import Logo from "../Assets/images/logo-text.png";
import "../Assets/styles/Styles.css";

const RegisterGuide = () => {
  document.title = "Travel Buddy | GUIDE REGISTER";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [tag, setTag] = useState("Natural");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    let formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("address", address);
    formData.append("tag", tag);
    formData.append("password", password);

    let guideRegister = "http://127.0.1:8000/guideregister/";

    let data = await fetch(guideRegister, {
      method: "POST",
      body: formData,
    });

    let parsedData = await data.json();

    console.log(parsedData);

    if (parsedData.id) {
      alert("Guide registered successfully");
      setName("");
      setEmail("");
      setPhone("");
      setAddress("");
      setPassword("");
      setTag("");
    } else {
      if (parsedData.email) {
        alert(parsedData.email);
        return;
      }
      if (parsedData.phone) {
        alert(parsedData.phone);
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
        <p className="register-heading">CREATE GUIDE ACCOUNT</p>
        <p className="register-sub-heading">
          Already have an account, <a href="/guidelogin">Sign in</a>
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
              <label htmlFor="phone">Phone</label>
              <br />
              <input
                type="number"
                name="phone"
                id="phone"
                placeholder="Your Phone Number"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <div className="register-column">
              <label htmlFor="address">Address</label>
              <br />
              <input
                type="text"
                name="address"
                id="address"
                placeholder="Your Address"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
          </div>

          <div className="register-row">
            <div className="register-column">
              <label htmlFor="tag">Tag</label>
              <br />
              <select
                name="tag"
                id="tag"
                required
                value={tag}
                onChange={(e) => setTag(e.target.value)}
              >
                <option disabled>Select your area of expertise</option>
                <option value="natural">Natural</option>
                <option value="cultural">Cultural</option>
                <option value="histoical">Historical</option>
              </select>
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

export default RegisterGuide;
