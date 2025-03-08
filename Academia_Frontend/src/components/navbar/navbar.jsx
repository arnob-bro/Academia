import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./navbar.css";
import { logout } from "../../Api/auth";

const Navbar = () => {
  const navigate = useNavigate();
  const [activeLink, setActiveLink] = useState("Home");
  const handleLogout = (e) => {
    e.preventDefault();
    try {
      logout();
      navigate("/login");
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
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
    <nav className="student-navbar">
            <div className="admin-nav-top">
              <img src="/assets/logo.png" className="admin-logo" alt="Logo" />
              <h1>Academia</h1>
      
              {/* Profile Section */}
              <div className="admin-navbar-admin-profile" ref={profileDropdownRef}>
                <div className="adminSession">
                  <p>Session: Spring 2024</p>
                </div>
                
                <button
                  className="admin-navbar-profile-btn"
                  onClick={toggleProfileDropdown}
                >
                  Id: 20220xx ▼
                </button>
      
                {/* Dropdown Menu */}
                {profileDropdownOpen && (
                  <div className="admin-navbar-dropdown-menu">
                    <Link to="/admin-profile" className="admin-navbar-dropdown-item">
                      Admin Profile 
                    </Link>
                    <hr className="admin-navbar-dropdown-divider" />
                    <button
                      className="admin-navbar-dropdown-item logout"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>

      <div className="student-navbar-nav-bottom">
        <Link to="/">Home</Link>

        {/* Enrollment Dropdown */}
        <div className="Student-navbar-dropdown" ref={enrollmentDropdownRef}>
          <button
            className="Student-navbar-dropbtn"
            onClick={toggleEnrollmentDropdown}
          >
            Enrollment ▼
          </button>
          {enrollmentDropdownOpen && (
            <div className="Student-navbar-dropdown-content">
              <Link to="/course-advising">Course Advising</Link>
              <hr className="Student-navbar-dropdown-divider" />
              <Link to="/course-enrollment">Enrollment Details</Link>
            </div>
          )}
        </div>

        <Link to="/student-class-routine">Class Routine</Link>
        <Link to="/student-performance-tracker">Performance Tracker</Link>
        <Link to="/student-result-page">Result</Link>
        <Link to=" ">Notice</Link>
        <Link to=" ">Payment</Link>
        <Link to=" ">Certificate</Link>
      </div>
    </nav>
  );
};

export default Navbar;