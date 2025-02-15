import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import "./AdminNavbar.css";

const AdminNavbar = () => {
  const location = useLocation(); // Get the current path
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const profileDropdownRef = useRef(null);

  // Toggle Profile Dropdown
  const toggleProfileDropdown = () => {
    setProfileDropdownOpen(!profileDropdownOpen);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(event.target)
      ) {
        setProfileDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="admin-navbar">
      <div className="admin-nav-top">
        <img src="/assets/logo.png" className="admin-logo" alt="Logo" />
        <h1>Academia</h1>

        {/* Profile Section */}
        <div className="admin-profile" ref={profileDropdownRef}>
          <span className="profile-icon" onClick={toggleProfileDropdown}>
            👤
          </span>

          {/* Dropdown Menu */}
          {profileDropdownOpen && (
            <div className="dropdown-menu">
              <Link to="/admin-profile" className="dropdown-item">
                Admin Profile
              </Link>
              <hr className="dropdown-divider" />
              <button className="dropdown-item logout">Logout</button>
            </div>
          )}
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
