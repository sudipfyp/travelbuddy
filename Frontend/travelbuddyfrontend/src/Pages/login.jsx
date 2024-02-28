import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../Assets/images/logo-text.png";
import "../Assets/styles/Styles.css";

const Login = (props) => {
  document.title = "TravelBuddy ● Login";

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    let userLogin = "http://127.0.1:8000/user/userlogin";
    let guideLogin = "http://127.0.1:8000/user/guidelogin";
    let sellerLogin = "http://127.0.1:8000/user/sellerlogin";

    let response = await fetch(
      role === "user" ? userLogin : role === "guide" ? guideLogin : sellerLogin,
      {
        method: "POST",
        body: formData,
        credentials: "include",
      }
    );

    let parsedData = await response.json();

    console.log(parsedData);

    if (response.status === 200) {
      alert(`${role.toUpperCase()} logged in successfully`);
      navigate("/home");
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
        <p className="login-heading">{role.toUpperCase()} LOGIN</p>
        <p className="login-sub-heading">
          Don't have an account, <a href="/register">Sign up</a>
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

          <label>Role:</label>
          <select value={role} onChange={handleRoleChange}>
            <option value="" disabled>Select Role</option>
            <option value="user">User</option>
            <option value="guide">Guide</option>
            <option value="seller">Seller</option>
          </select>

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
    </>
  );
};

export default Login;
