import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./AdminNavbar.css";

const AdminNavbar = () => {
  const location = useLocation(); // Get the current path

  return (
    <nav className="admin-navbar">
      <div className="admin-nav-top">
        <img src="/assets/logo.png" className="admin-logo" alt="Logo" />
        <h1>Academia</h1>
        <div className="admin-session-info">
          <p>Session: Spring 2024</p>
          <p>Id: XXXXXXXXXX</p>
          <button className="admin-logout">Logout</button>
        </div>
      </div>

      <div className="admin-nav-bottom">
        {[
          { name: "Home", path: "/home-admin" },
          { name: "Student Management", path: "/student-management" },
          { name: "Faculty Management", path: "/faculty-management" },
          { name: "Assessment Overview", path: "/assessment-overview" },
          { name: "Fee Management", path: "/fee-management" },
          { name: "Material Overview", path: "/material-overview" },
        ].map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={location.pathname === item.path ? "active" : ""}
          >
            {item.name}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default AdminNavbar;
