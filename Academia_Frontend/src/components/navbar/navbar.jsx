import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./navbar.css";
import { logout } from "../../Api/auth";

const Navbar = () => {
  const [activeLink, setActiveLink] = useState("Home");
  const handleLogout = (e) => {
    e.preventDefault();
    logout();
  };

  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [enrollmentDropdownOpen, setEnrollmentDropdownOpen] = useState(false);

  const profileDropdownRef = useRef(null);
  const enrollmentDropdownRef = useRef(null);

  // Toggle Profile Dropdown
  const toggleProfileDropdown = () => {
    setProfileDropdownOpen(!profileDropdownOpen);
  };

  // Toggle Enrollment Dropdown
  const toggleEnrollmentDropdown = () => {
    setEnrollmentDropdownOpen(!enrollmentDropdownOpen);
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
      if (
        enrollmentDropdownRef.current &&
        !enrollmentDropdownRef.current.contains(event.target)
      ) {
        setEnrollmentDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="navbar">
      <div className="nav-top">
        <img src="/assets/logo.png" className="logo" alt="Logo" />
        <h1>Academia</h1>

        <div className="profile-info" ref={profileDropdownRef}>
          {/* Profile Icon (Click to open dropdown) */}
          <span className="profile-icon" onClick={toggleProfileDropdown}>
            👤
          </span>

          {/* Profile Dropdown Menu */}
          {profileDropdownOpen && (
            <div className="dropdown-menu">
              <Link to="/student-profile" className="dropdown-item">
                Student Profile
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

        {/* Enrollment Dropdown */}
        <div className="dropdown" ref={enrollmentDropdownRef}>
          <button className="dropbtn" onClick={toggleEnrollmentDropdown}>
            Enrollment ▼
          </button>
          {enrollmentDropdownOpen && (
            <div className="dropdown-content">
              <Link to="/course-advising">Course Advising</Link>
              <hr className="dropdown-divider" />
              <Link to="/course-enrollment">Enrollment Details</Link>
            </div>
          )}
        </div>

        <Link to=" ">Class Routine</Link>
        <Link to="/student-result-page">Result</Link>
        <Link to=" ">Notice</Link>
        <Link to=" ">Payment</Link>
        <Link to=" ">Certificate</Link>
      </div>
    </nav>
  );
};

export default Navbar;
