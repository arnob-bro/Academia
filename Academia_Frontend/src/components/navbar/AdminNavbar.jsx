import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
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
      // navigate("/login");
      // window.location.reload();
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
              <button className="dropdown-item logout" onClick={handleLogout}>
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
          { name: "Faculty Recruitment", path: "/faculty-recruitment" },
          { name: "Fee Management", path: " " },
          { name: "Material Overview", path: " " },
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
