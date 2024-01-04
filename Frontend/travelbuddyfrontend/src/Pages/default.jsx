import React from 'react';
import '../App.css';
import logo from '../Assets/images/logo.png';
import { Link } from 'react-router-dom';

const Default = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>UNDER DEVELOPMENT</p>
      </header>

      <hr />
      <hr />

      <nav>
        <h2>Pages developed</h2>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/login/guide">Guide Login</Link>
            </li>
            <li>
              <Link to="/login/seller">Seller Login</Link>
            </li>
          </ul>
        </nav>
    </div>
  );
};

export default Default;
