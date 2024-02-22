import React, { useState } from "react";
import Logo from "../Assets/images/logo-text.png";
import "../Assets/styles/Styles.css";

const Register = () => {
  document.title = "Travel Buddy | USER REGISTER";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [nationalty, setNationality] = useState("Nepal");
  const [place, setPlace] = useState("Natural");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    let formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("address", address);
    formData.append("nationality", nationalty);
    formData.append("preferredplace", place);
    formData.append("password", password);

    let userRegister = "http://127.0.1:8000/userregister/";

    let data = await fetch(userRegister, {
      method: "POST",
      body: formData,
    });

    let parsedData = await data.json();

    console.log(parsedData);

    if (parsedData.id) {
      alert("User registered successfully");
      setName("");
      setEmail("");
      setAddress("");
      setPassword("");
      setNationality("");
      setPlace("");
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
        <p className="register-heading">CREATE USER ACCOUNT</p>
        <p className="register-sub-heading">
          Already have an account, <a href="/userlogin">Sign in</a>
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

            <div className="register-column">
              <label htmlFor="nationality">Nationality</label>
              <br />
              <select
                name="nationality"
                id="nationality"
                required
                value={nationalty}
                onChange={(e) => setNationality(e.target.value)}
              >
                <option disabled>Select your Country</option>
                <option value="Nepal">Nepal</option>
                <option value="India">India</option>
                <option value="China">China</option>
                <option value="USA">USA</option>
                <option value="UK">UK</option>
              </select>
            </div>
          </div>

          <div className="register-row">
            <div className="register-column">
              <label htmlFor="place">Your preferred place</label>
              <br />
              <select
                name="place"
                id="place"
                required
                value={place}
                onChange={(e) => setPlace(e.target.value)}
              >
                <option disabled>Select your preferred place</option>
                <option value="Natural">Natural</option>
                <option value="Historical">Historical</option>
                <option value="Religious">Religious</option>
                <option value="Adventure">Adventure</option>
                <option value="City">City</option>
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

export default Register;
