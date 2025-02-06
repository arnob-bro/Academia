import React, { useState } from "react";
import "./navbar.css";

const Navbar = () => {
  const [activeLink, setActiveLink] = useState("Home");

  return (
    <nav className="navbar">
      <div className="nav-top">
        <img src="Academia_Frontend\src\assets\logo.png" className="logo"/>
        <h1>Academia</h1>
        <div className="session-info">
          <p>Session: Spring 2024</p>
          <p>Id: XXXXXXXXXX</p>
          <button className="logout">Logout</button>
        </div>
      </div>

      <div className="nav-bottom">
        {["Home", "Student Profile", "Class Routine", "Result", "Notice", "Registration", "Payment", "Certificate"].map((item) => (
          <a 
            key={item} 
            href="#" 
            className={activeLink === item ? "active" : ""} 
            onClick={() => setActiveLink(item)}
          >
            {item}
          </a>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;