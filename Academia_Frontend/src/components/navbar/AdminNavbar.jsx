import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./AdminNavbar.css";
import { logout } from "../../Api/auth";

const AdminNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [managementDropdownOpen, setManagementDropdownOpen] = useState(false);

  const profileDropdownRef = useRef(null);
  const managementDropdownRef = useRef(null);

  // Toggle Profile Dropdown
  const toggleProfileDropdown = () => {
    setProfileDropdownOpen(!profileDropdownOpen);
  };

  // Toggle Management Dropdown
  const toggleManagementDropdown = () => {
    setManagementDropdownOpen(!managementDropdownOpen);
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
      if (
        managementDropdownRef.current &&
        !managementDropdownRef.current.contains(event.target)
      ) {
        setManagementDropdownOpen(false);
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
    <nav className="admin-navbar">
      <div className="admin-nav-top">
        <img src="/assets/logo.png" className="admin-logo" alt="Logo" />
        <div className="academia">
          <h1>Academia</h1>
        </div>

        {/* Profile Section */}
        <div className="admin-navbar-admin-profile" ref={profileDropdownRef}>
          <div className="adminSession">
            <p>Session: Spring 2024</p>
          </div>

          <button className="admin-navbar-profile-btn" onClick={toggleProfileDropdown}>
            Id: 20220xx ▼
          </button>

          {/* Dropdown Menu */}
          {profileDropdownOpen && (
            <div className="admin-navbar-dropdown-menu">
              <Link to="/admin-profile" className="admin-navbar-dropdown-item">
                Admin Profile
              </Link>
              <hr className="admin-navbar-dropdown-divider" />
              <button className="admin-navbar-dropdown-item logout" onClick={handleLogout}>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Links */}
      <div className="admin-nav-bottom">
        <Link to="/" className={location.pathname === "/" ? "active" : ""}>
          Home
        </Link>
        <Link to="/student-admission" className={location.pathname === "/student-admission" ? "active" : ""}>
          Student Admission
        </Link>
        <Link to="/faculty-recruitment" className={location.pathname === "/faculty-recruitment" ? "active" : ""}>
          Faculty Recruitment
        </Link>
        <Link to="/faculty-leave-admin" className={location.pathname === "/faculty-leave-admin" ? "active" : ""}>
          Faculty Leave Request
        </Link>

        {/* Management Dropdown */}
        <div className="admin-navbar-dropdown" ref={managementDropdownRef}>
          <button className="admin-navbar-dropbtn" onClick={toggleManagementDropdown}>
            Management ▼
          </button>
          {managementDropdownOpen && (
            <div className="admin-navbar-dropdown-content">
              <Link to="/faculty-management">Faculty Management</Link>
              <hr className="admin-navbar-dropdown-divider" />
              <Link to="/course-management-admin">Course Management</Link>
              <hr className="admin-navbar-dropdown-divider" />
              <Link to="/course-schedule">Schedule Management</Link>
            </div>
          )}
        </div>

        <Link to="#" className={location.pathname === " " ? "active" : ""}>
          Fee Management
        </Link>
      </div>
    </nav>
  );
};

export default AdminNavbar;
