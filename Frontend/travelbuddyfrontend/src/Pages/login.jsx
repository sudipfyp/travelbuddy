import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../Assets/images/logo-text.png";
import "../Assets/styles/Styles.css";

const Login = (props) => {
  document.title = `Travel Buddy | ${props.user.toUpperCase()} LOGIN`;

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    let formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    let userLogin = "http://127.0.1:8000/userlogin/";
    let guideLogin = "http://127.0.1:8000/guidelogin/";
    let sellerLogin = "http://127.0.1:8000/sellerlogin/";

    let response = await fetch(
      props.user === "user"
        ? userLogin
        : props.user === "guide"
        ? guideLogin
        : sellerLogin,
      {
        method: "POST",
        body: formData,
        credentials: "include",
      }
    );

    let parsedData = await response.json();

    console.log(parsedData);

    if (response.status === 200) {
      alert(`${props.user.toUpperCase()} logged in successfully`);
      // navigate("/profile");
    } else {
      alert("Invalid Username or Password");
    }
  };

  return (
    <>
      <div className="login-top">
        <div className="login-logo">
          <a href="/">
            <img src={Logo} alt="logo of travel buddy" width="100px" />
          </a>
        </div>
      </div>

      <div className="login-upper-top">
        <p className="login-heading">{props.user.toUpperCase()} LOGIN</p>
        <p className="login-sub-heading">
          Don't have an account, <a href={`/${props.user}register`}>Sign up</a>
        </p>
      </div>

      <div className="login-form">
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username/Email</label>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Your Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="login-remember-forgot">
            <div className="login-remember-me">
              <input type="checkbox" name="remember" id="remember" />
              <label htmlFor="remember">Remember me</label>
            </div>
            <a className="login-forget-password" href="/forgetpassword">
              Forget Password?
            </a>
          </div>

          <input type="submit" value="Sign in" />
        </form>
      </div>

      <div className="login-bottom">
        <p>Sign in as</p>
        <p>
          {props.user === "user" && (
            <>
              <Link to="/guidelogin">Guide</Link> or{" "}
              <Link to="/sellerlogin">Seller</Link>
            </>
          )}
          {props.user === "seller" && (
            <>
              <Link to="/userlogin">User</Link> or{" "}
              <Link to="/guidelogin">Guide</Link>
            </>
          )}
          {props.user === "guide" && (
            <>
              <Link to="/userlogin">User</Link> or{" "}
              <Link to="/sellerlogin">Seller</Link>
            </>
          )}
        </p>
      </div>
    </>
  );
};

export default Login;
