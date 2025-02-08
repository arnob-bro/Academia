import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./navbar.css";

const Navbar = () => {
  const [activeLink, setActiveLink] = useState("Home");

  return (
    <nav className="navbar">
      <div className="nav-top">
        <img src="/assets/logo.png" className="logo" alt="Logo" />
        <h1>Academia</h1>
        <div className="session-info">
          <p>Session: Spring 2024</p>
          <p>Id: XXXXXXXXXX</p>
          <button className="logout">Logout</button>
        </div>
      </div>

      <div className="nav-bottom">
        {[
          { name: "Home", path: "/" },
          { name: "Student Profile", path: "/student-profile" },
          { name: "Course Advising", path: "/course-advising" },
          { name: "Class Routine", path: "/class-routine" },
          { name: "Result", path: "/student-result-page" },
          { name: "Notice", path: "/notice" },
          { name: "Registration", path: "/registration" },
          { name: "Enrollment Details", path: "/course-enrollment" },
          { name: "Payment", path: "/payment" },
          { name: "Certificate", path: "/certificate" },
        ].map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={activeLink === item.name ? "active" : ""}
            onClick={() => setActiveLink(item.name)}
          >
            {item.name}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
