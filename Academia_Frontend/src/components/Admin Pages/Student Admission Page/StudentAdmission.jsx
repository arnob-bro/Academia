
import React from "react";
import "./StudentAdmission.css";

const StudentAdmission = () => {
  return (
    <div className="container">
      <div className="form-wrapper">
        <h2 className="form-title">Student Registration Form</h2>
        <form className="form-grid">
          <input type="text" placeholder="First Name" className="input-style" />
          <input type="text" placeholder="Middle Name" className="input-style" />
          <input type="text" placeholder="Last Name" className="input-style" />

          <select className="input-style">
            <option>Select Department</option>
          </select>
          
          <input type="text" placeholder="Student ID" className="input-style" />

          <div className="date-selector">
            <select className="input-style">
              <option>Select Year</option>
            </select>
            <select className="input-style">
              <option>Select Month</option>
            </select>
            <select className="input-style">
              <option>Select Date</option>
            </select>
          </div>

          <input type="email" placeholder="Email" className="input-style" />
          <input type="tel" placeholder="Phone Number" className="input-style" />
          

          <div className="button-group">
            <button className="register-button">Register Student</button>
            <button className="clear-button">Clear Form</button>
          </div>
        </form> 
        <p className="footer-text">Powered By ABCDEFGHIJK</p>
        <p className="footer-text">Copyright &copy; 2025 Academia. All rights reserved.</p>
      </div>
    </div>
  );
};

export default StudentAdmission;
