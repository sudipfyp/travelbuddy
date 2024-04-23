import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../Assets/images/logo-text.png";
import "../Assets/styles/Styles.css";
import swal from "sweetalert";

const Login = (props) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
      } else if (parsedData.role === "seller") {
        navigate("/seller/complete");
      } else {
        navigate("/");
      }
    }
  };

  useEffect(() => {
    document.title = "TravelBuddy ● Login";

    userCheck();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    let login = "http://127.0.1:8000/user/login";

    let response = await fetch(login, {
      method: "POST",
      body: formData,
      credentials: "include",
    });

    let parsedData = await response.json();

    console.log(parsedData);
    console.log(response);

    if (response.status === 200) {
      swal("Login Successful", "Welcome to Travel Buddy", "success");

      if (parsedData.role === "admin") {
        navigate("/admin-dashboard");
      } else if (parsedData.role === "guide") {
        navigate("/guide/complete");
      } else if (parsedData.role === "seller") {
        navigate("/seller/complete");
      } else {
        navigate("/");
      }
    } else if (response.status === 401) {
      swal("Unverified", "Please verify your email", "error");
      navigate(`/verify/${email}`);
    } else {
      swal("Login Failed", "Invalid Username or Password", "error");
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
        <p className="login-heading">LOGIN</p>
        <p className="login-sub-heading">
          Don't have an account, <a href="/register">Sign up</a>
        </p>
      </div>

      <div className="login-form">
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Email</label>
          <input
            type="email"
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
            <a className="login-forget-password" href="/reset">
              Forget Password?
            </a>
          </div>

          <input type="submit" value="Sign in" />
        </form>
      </div>
    </>
  );
};

export default Login;
