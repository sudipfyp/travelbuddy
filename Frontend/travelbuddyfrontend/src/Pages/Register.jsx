import React, { useState } from "react";
import Logo from "../Assets/images/logo-text.png";
import "../Assets/styles/Styles.css";

const Register = () => {
  document.title = "Travel Buddy | REGISTER";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [tag, setTag] = useState("Natural");
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [shopAddress, setShopAddress] = useState("");
  const [shopName, setShopName] = useState("");
  const [address, setAddress] = useState("");
  const [nationalty, setNationality] = useState("Nepal");
  const [place, setPlace] = useState("Natural");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("address", address);
    formData.append("nationality", nationalty);
    formData.append("preferredplace", place);
    formData.append("password", password);

    formData.append("phone", phone);
    formData.append("tag", tag);

    formData.append("shop_name", shopName);
    formData.append("registration_number", registrationNumber);
    formData.append("shop_address", shopAddress);

    let userRegister = "http://127.0.1:8000/user/userregister";
    let guideRegister = "http://127.0.1:8000/user/guideregister";
    let sellerRegister = "http://127.0.1:8000/user/sellerregister";

    let data = await fetch(
      role === "user"
        ? userRegister
        : role === "guide"
        ? guideRegister
        : sellerRegister,
      {
        method: "POST",
        body: formData,
      }
    );

    let parsedData = await data.json();

    console.log(parsedData);

    if (parsedData.id) {
      alert(`${role.toUpperCase()}  registered successfully`);
      setName("");
      setEmail("");
      setAddress("");
      setPassword("");
      setNationality("Nepal");
      setPlace("Natural");
      setPhone("");
      setTag("Natural");
      setShopName("");
      setRegistrationNumber("");
      setShopAddress("");

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
        <p className="register-heading">CREATE {role.toUpperCase()} ACCOUNT</p>
        <p className="register-sub-heading">
          Already have an account, <a href="/login">Sign in</a>
        </p>
      </div>

      <div className="register-form">
        <form onSubmit={handleSubmit}>
          <div className="register-row">
            <div className="register-column">
              <label htmlFor="role">Role</label>
              <br />
              <select
                name="role"
                id="role"
                required
                value={role}
                onChange={handleRoleChange}
              >
                <option value="user">User</option>
                <option value="guide">Guide</option>
                <option value="seller">Seller</option>
              </select>
            </div>
          </div>

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
              {role === "user" ? (
                <>
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
                </>
              ) : role === "seller" ? (
                <>
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
                </>
              ) : (
                <>
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
                </>
              )}
            </div>

            <div className="register-column">
              {role === "user" ? (
                <>
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
                </>
              ) : role === "seller" ? (
                <>
                  <label htmlFor="registrationNumber">
                    Registration Number
                  </label>
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
                </>
              ) : (
                <>
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
                </>
              )}
            </div>
          </div>

          <div className="register-row">
            <div className="register-column">
              {role === "user" ? (
                <>
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
                </>
              ) : role === "seller" ? (
                <>
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
                </>
              ) : (
                <>
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
                </>
              )}
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
