import React, { useState, useEffect } from "react";
import Logo from "../Assets/images/logo-text.png";
import "../Assets/styles/Styles.css";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

const Register = () => {
  const userCheck = async () => {
    let data = await fetch("http://127.0.1:8000/user/usercheck", {
      method: "GET",
      credentials: "include",
    });
    let parsedData = await data.json();
    if (data.status === 200) {
      if (parsedData.role === "admin") {
        navigate("/admin-dashboard");
      } else if (parsedData.role === "guide") {
        navigate("/guide/complete");
      } else {
        navigate("/");
      }
    }
  };

  useEffect(() => {
    document.title = "TravelBuddy ● Register";

    userCheck();
  }, []);

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [nationalty, setNationality] = useState("");
  const [place, setPlace] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("seller");
  const [image, setImage] = useState("");

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
    formData.append("image", image);

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

    if (data.status === 201) {
      // swal(`${role.toUpperCase()} registered successfully`, "", "success");
      navigate(`/verify/${email}`)

      setName("");
      setEmail("");
      setAddress("");
      setPassword("");
      setNationality("Nepal");
      setPlace("Natural");
      setPhone("");
      setImage("");
    } else {
      if (parsedData.msg) {
        swal(`${parsedData.msg}`, "", "error");
        return;
      } else {
        swal("Something went wrong", "Please try again", "error");
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
          {role === "user" ? (
            <>
              <div className="register-row ">
                <div className="register-column">
                  <label htmlFor="role">Select your Role</label>
                  <br />
                  <select
                    name="role"
                    id="role"
                    required
                    value={role}
                    onChange={handleRoleChange}
                  >
                    <option value="user">Tourist</option>
                    <option value="guide">Guide</option>
                    <option value="seller">Seller</option>
                  </select>
                </div>

                <div className="register-column">
                  <label htmlFor="phone">Image</label>
                  <br />
                  <input
                    type="file"
                    onChange={(e) => setImage(e.target.files[0])}
                    required
                  />
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
                    <option value="others">Other</option>
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
            </>
          ) : role === "guide" ? (
            <>
              <div className="register-row ">
                <div className="register-column">
                  <label htmlFor="role">Select your Role</label>
                  <br />
                  <select
                    name="role"
                    id="role"
                    required
                    value={role}
                    onChange={handleRoleChange}
                  >
                    <option value="user">Tourist</option>
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
            </>
          ) : (
            <>
              <div className="register-row ">
                <div className="register-column">
                  <label htmlFor="role">Select your Role</label>
                  <br />
                  <select
                    name="role"
                    id="role"
                    required
                    value={role}
                    onChange={handleRoleChange}
                  >
                    <option value="user">Tourist</option>
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
                  <label htmlFor="phone">Image</label>
                  <br />
                  <input
                    type="file"
                    name="image"
                    id="image"
                    onChange={(e) => setImage(e.target.files[0])}
                    required
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
            </>
          )}
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
