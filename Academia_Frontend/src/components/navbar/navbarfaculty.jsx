import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./navbarfaculty.css";
import { logout } from "../../Api/auth";
import { FaGraduationCap } from 'react-icons/fa';




const Navbarfaculty = () => {
  const navigate = useNavigate();
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [trackerDropdownOpen, setTrackerDropdownOpen] = useState(false);

  const profileDropdownRef = useRef(null);
  const trackerDropdownRef = useRef(null);

  // Toggle Profile Dropdown
  const toggleProfileDropdown = () => {
    setProfileDropdownOpen((prev) => !prev);
  };

  // Toggle Tracker Dropdown
  const toggleTrackerDropdown = () => {
    setTrackerDropdownOpen((prev) => !prev);
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
        trackerDropdownRef.current &&
        !trackerDropdownRef.current.contains(event.target)
      ) {
        setTrackerDropdownOpen(false);
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
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className="faculty-navbar">
      {/* Top Navbar */}
      <div className="faculty-navbar-nav-top">
        {/* <img src="/assets/logo.png" className="faculty-navbar-logo" alt="Logo" /> */}

        <FaGraduationCap className="faculty-navbar-logo" />

        <div className="academia"> <h1>Academia</h1></div>
       

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
                    <Link to="/faculty-profile" className="admin-navbar-dropdown-item">
                      Faculty Profile 
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

      {/* Bottom Navbar */}
      <div className="faculty-navbar-nav-bottom">
        <Link to="/">Home</Link>
        <Link to="/faculty-advising-page">Faculty Advising</Link>
        <Link to="/faculty-routine">Class Routine</Link>
        
        <Link to="/faculty-available-schedule">Available Schedule</Link>
        <Link to="/faculty-courses">Courses</Link>

     
        {/* Tracker Dropdown */}
<div className="faculty-navbar-dropdown" ref={trackerDropdownRef}>
  <span className="tracker-dropdown-title" onClick={toggleTrackerDropdown}>
    Tracker ▼
  </span>
  {trackerDropdownOpen && (
    <div className="faculty-navbar-dropdown-menu">
      <Link to="/faculty-performance-tracker" className="faculty-navbar-dropdown-item">
        Student Performance Tracker
      </Link>
      <hr className="faculty-navbar-dropdown-divider" />
      <Link to="/faculty-attendance-tracker" className="faculty-navbar-dropdown-item">
        Attendance Tracker
      </Link>
      <hr className="faculty-navbar-dropdown-divider" />
      <Link to="/faculty-assessment-tracker" className="faculty-navbar-dropdown-item">
        Assessment Tracker
      </Link>
    </div>
  )}
</div>


        <Link to="/faculty-materials">Materials</Link>
      </div>
    </nav>
  );
};

export default Navbarfaculty;
