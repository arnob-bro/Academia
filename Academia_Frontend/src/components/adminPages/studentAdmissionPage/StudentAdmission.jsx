import { useState } from "react";
import React from "react";
import Footer from "../../footer/footer";
import "./StudentAdmission.css";
import AdminNavbar from "../../navbar/AdminNavbar";
import { registerStudentApi } from "../../../Api/admin";

const StudentAdmission = () => {
  const [data, setData] = useState({
    name: "",
    department: "",
    institutional_email: "",
    studentID: "",
    current_semester: "",
    enrollment_semester: "",
  });
  const changeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const registerStudent = async (e) => {
    e.preventDefault();
    try {
      const response = await registerStudentApi(data);
    } catch (error) {
      alert("Some error has occurred. Please try again later");
      console.log(error);
    }
  };

  return (
    <>
      <AdminNavbar />
      <div className="student-admission-container">
        <div className="student-admission-form-wrapper">
          <h2 className="student-admission-form-title">
            Student Registration Form
          </h2>
          <form
            className="student-admission-form-grid"
            onSubmit={registerStudent}
          >
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="student-admission-input-style"
              onChange={changeHandler}
              value={data.name || ""}
            />
           

            <select 
            name="department"
            className="student-admission-input-style"
            onChange={changeHandler}
            value={data.department || ""}
            >
              <option>Select Department</option>
              <option value="CSE">CSE</option>
                <option value="EEE">EEE</option>
                <option value="ME">ME</option>
                <option value="TE">TE</option>
            </select>

            <input
              type="text"
              name="studentID"
              placeholder="Student ID"
              className="student-admission-input-style"
              onChange={changeHandler}
              value={data.studentID || ""}
            />
            <input
              type="text"
              name="current_semester"
              placeholder="Current Semester"
              className="student-admission-input-style"
              onChange={changeHandler}
              value={data.current_semester || ""}
            />
               <input
              type="text"
              name="enrollment_semester"
              placeholder="Enrollment Semester"
              className="student-admission-input-style"
              onChange={changeHandler}
              value={data.enrollment_semester || ""}
            />
                 <input
              type="email"
              name="institutional_email"
              placeholder="Email"
              className="student-admission-input-style"
              onChange={changeHandler}
              value={data.institutional_email || ""}
            />
            <div className="student-admission-button-group">
              <button  type="submit" className="student-admission-register-button">
                Register Student
              </button>
              <button type="reset" className="student-admission-clear-button">
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
