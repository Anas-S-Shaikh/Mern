import React from "react";
import { Link } from "react-router-dom";
import "./style.css";
const Menu = () => {
  return (
    <div className="menu">
      <h1> Clementius Practical Test</h1>
      <h2>Exploring User Data</h2>
      <div className="btn_container">
        <Link to="/">
          <button id='createbtn'>Create</button>
        </Link>
        <Link to="/view">
          <button id='viewbtn'>View</button>
        </Link>
      </div>
    </div>
  );
};

export default Menu;
