import React from "react";
import "./FacultyRecruitment.css";
import AdminNavbar from "../../navbar/AdminNavbar";
import Footer from "../../footer/footer";

const FacultyRecruitment = () => {
  return (
    <>
      <AdminNavbar />
      <div className="form-container">
        <h2 className="form-title">Faculty Recruitment Form</h2>
        <form className="form">
          <div className="form-group">
            <label>Full Name:</label>
            <input type="text" placeholder="Enter full name" required />
          </div>

          <div className="form-group">
            <label>Department:</label>
            <select required>
              <option value="">Select Department</option>
              <option>EEE</option>
              <option>CSE</option>
              <option>CE</option>
              <option>ME</option>
              <option>IPE</option>
              <option>TE</option>
              <option>BBA</option>
              <option>ARCH</option>
            </select>
          </div>

          <div className="form-group">
            <label>Designation:</label>
            <select required>
              <option value="">Enter Designation</option>
              <option>Professor</option>
              <option>Associate Professor</option>
              <option>Assistant Professor</option>
              <option>Lecturer (Grade-I)</option>
              <option>Lecturer (Grade-II)</option>
            </select>
          </div>

          <div className="form-group">
            <label>Date of Birth:</label>
            <input type="date" required />
          </div>

          <div className="form-group">
            <label>Email:</label>
            <input type="email" placeholder="Enter email" required />
          </div>

          <div className="form-group">
            <label>Phone Number:</label>
            <input type="text" placeholder="Enter phone number" required />
          </div>

          <div className="form-group">
            <label>Nationality:</label>
            <input type="text" placeholder="Enter nationality" required />
          </div>

          <div className="form-group">
            <label>Experience (Years):</label>
            <input
              type="number"
              placeholder="Enter experience"
              min="0"
              required
            />
          </div>

          <div className="form-group">
            <label>Present Address:</label>
            <textarea placeholder="Enter present address" required></textarea>
          </div>

          <div className="form-group">
            <label>Upload Resume:</label>
            <input type="file" required />
          </div>

          <div className="form-buttons">
            <button type="submit" className="register-btn">
              Submit Application
            </button>
            <button type="reset" className="clear-btn">
              Clear Form
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default FacultyRecruitment;
