import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./navbarfaculty.css";
import { logout } from "../../Api/auth";

const Navbarfaculty = () => {
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const profileDropdownRef = useRef(null);

  // Toggle Profile Dropdown
  const toggleProfileDropdown = () => {
    setProfileDropdownOpen(!profileDropdownOpen);
  };

  // Close dropdowns when clicking outside
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

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
  };

  return (
    <nav className="navbar">
      <div className="nav-top">
        <img src="/assets/logo.png" className="logo" alt="Logo" />
        <h1>Academia</h1>

        <div className="profile-info" ref={profileDropdownRef}>
          <span className="profile-icon" onClick={toggleProfileDropdown}>
            👤
          </span>

          {/* Profile Dropdown Menu */}
          {profileDropdownOpen && (
            <div className="dropdown-menu">
              <Link to="/student-profile" className="dropdown-item">
                Faculty Profile
              </Link>
              <hr className="dropdown-divider" /> {/* Divider Line */}
              <button className="dropdown-item logout" onClick={handleLogout}>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="nav-bottom">
        <Link to="/">Home</Link>
        <Link to="/faculty-advising-page">Faculty Advising</Link>
        <Link to=" ">Schedule</Link>
        <Link to=" ">Courses</Link>
        <Link to=" ">Materials</Link>
      </div>
    </nav>
  );
};

export default Navbarfaculty;
