import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./navbarfaculty.css";
import { logout } from "../../Api/auth";

const Navbarfaculty = () => {
  const navigate = useNavigate();
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
    try {
      logout();
      navigate("/login");
      // window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className="faculty-navbar">
      <div className="faculty-navbar-nav-top">
        <img src="/assets/logo.png" className="logo" alt="Logo" />
        <h1>Academia</h1>

        <div className="faculty-navbar-profile-info" ref={profileDropdownRef}>
          <span className="faculty-navbar-profile-icon" onClick={toggleProfileDropdown}>
            👤
          </span>

          {/* Profile Dropdown Menu */}
          {profileDropdownOpen && (
            <div className="faculty-navbar-dropdown-menu">
              <Link to="/student-profile" className="faculty-navbar-dropdown-item">
                Faculty Profile
              </Link>
              <hr className="faculty-navbar-dropdown-divider" /> {/* Divider Line */}
              <button className="faculty-navbar-dropdown-item logout" onClick={handleLogout}>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="faculty-navbar-nav-bottom">
        <Link to="/">Home</Link>
        <Link to="/faculty-advising-page">Faculty Advising</Link>
        <Link to="/faculty-routine">Class Routine</Link>
        <Link to="/faculty-available-schedule">Available Schedule</Link>
        <Link to=" ">Courses</Link>
        <Link to="/faculty-performance-tracker">Student Performance Tracker</Link>
        <Link to="/faculty-attendance-tracker">Attendance Tracker</Link>
        <Link to=" ">Materials</Link>
      </div>
    </nav>
  );
};

export default Navbarfaculty;
