import React, { Component } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";
import { MenuData } from "./Json_files/MenuData.jsx";
import "./navStyles.css";

class Navbar extends Component {
  state = { clicked: false };

  handleClick = () => {
    this.setState({ clicked: !this.state.clicked });
  };

  render() {
    return (
      <nav className="navBarItems">
        <Link to="/">
          <img src={logo} className="logo" alt="ON Shack Logo" />
        </Link>
        <div className="menu-icons" onClick={this.handleClick}>
          <i
            className={this.state.clicked ? "fas fa-times" : "fas fa-bars"}></i>
        </div>
        <NavMenu clicked={this.state.clicked} />
      </nav>
    );
  }
}

const NavMenu = ({ clicked }) => {
  const location = useLocation();

  return (
    <ul className={clicked ? "nav-menu active" : "nav-menu"}>
      {/* Map the data from MenuData.jsx to the navbar */}
      {MenuData.map((item, index) => (
        <li key={index}>
          <Link
            to={item.url}
            className={`${item.cName} ${
              location.pathname === item.url ? "active" : ""
            }`}>
            <i className={item.icon}></i> {item.title}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default Navbar;
