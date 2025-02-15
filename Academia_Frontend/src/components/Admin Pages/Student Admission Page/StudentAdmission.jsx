import React from "react";
import Footer from "../../footer/footer";
import "./StudentAdmission.css";
import AdminNavbar from "../../navbar/AdminNavbar";

const StudentAdmission = () => {
  return (
    <>
      <AdminNavbar />
      <div className="student-admission-container">
        <div className="student-admission-form-wrapper">
          <h2 className="student-admission-form-title">
            Student Registration Form
          </h2>
          <form className="student-admission-form-grid">
            <input
              type="text"
              placeholder="First Name"
              className="student-admission-input-style"
            />
            <input
              type="text"
              placeholder="Middle Name"
              className="student-admission-input-style"
            />
            <input
              type="text"
              placeholder="Last Name"
              className="student-admission-input-style"
            />

            <select className="student-admission-input-style">
              <option>Select Department</option>
            </select>

            <input
              type="text"
              placeholder="Student ID"
              className="student-admission-input-style"
            />

            <div className="date-selector">
              <select className="student-admission-input-style">
                <option>Select Year</option>
              </select>
              <select className="student-admission-input-style">
                <option>Select Month</option>
              </select>
              <select className="student-admission-input-style">
                <option>Select Date</option>
              </select>
            </div>

            <input
              type="email"
              placeholder="Email"
              className="student-admission-input-style"
            />
            <input
              type="tel"
              placeholder="Phone Number"
              className="student-admission-input-style"
            />

            <div className="student-admission-button-group">
              <button className="student-admission-register-button">
                Register Student
              </button>
              <button className="student-admission-clear-button">
                Clear Form
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default StudentAdmission;
