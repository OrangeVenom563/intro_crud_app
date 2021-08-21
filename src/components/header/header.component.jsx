import React from "react";
import { Link } from "react-router-dom";
import logo from "./orange.jpg";
import "./header.styles.css";

const Header = () => (
  <div className="header">
    <Link to="/">
      <img className="logo-container" src={logo} alt="logo" />
    </Link>

    <div className="AppName">
      The Orange App
    </div>

    <div className="options">
      <Link className="option" to="/">
        HOME
      </Link>

      <Link className="option" to="/posts">
        POSTS
      </Link>

      <Link className="option" to="/about">
        ABOUT
      </Link>
    </div>
  </div>
);

export default Header;
