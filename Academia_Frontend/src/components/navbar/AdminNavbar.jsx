import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./AdminNavbar.css";
import { logout } from "../../Api/auth";

const AdminNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
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

      <div className="admin-nav-bottom">
        {[
          { name: "Home", path: "/" },
          { name: "Student Admission", path: "/student-admission" },
          { name: "Faculty Management", path: "/faculty-management" },
          { name: "Faculty Leave Request", path: "/faculty-leave-admin" },
          { name: "Faculty Recruitment", path: "/faculty-recruitment" },
          { name: "Fee Management", path: " " },
          { name: "Schedule Management ", path: " " },
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
