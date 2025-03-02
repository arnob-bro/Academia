import { useState} from "react";
import React from "react";
import "./FacultyRecruitment.css";
import AdminNavbar from "../../navbar/AdminNavbar";
import Footer from "../../footer/footer";
import { registerFacultyApi } from "../../../Api/admin";
const FacultyRecruitment = () => {
  const [data, setData] = useState({
      name: "",
      department: "",
      institutional_email: "",
      facultyID: "",
      rank: "",
      administrative_role: "",
    });
    const changeHandler = (e) => {
      setData({ ...data, [e.target.name]: e.target.value });
    };
     const registerFaculty = async (e) => {
        e.preventDefault();
        try {
          const response = await registerFacultyApi(data);
        } catch (error) {
          alert("Some error has occurred. Please try again later");
          console.log(error);
        }
      };
  return (
    <>
      <AdminNavbar />
       <div className="form-container">
        <h2 className="form-title">Faculty Recruitment Form</h2>
        <form className="form" onSubmit={registerFaculty}>
          <div className="form-group">
            <label>Full Name:</label>
            <input 
            type="text" 
            name="name"
            placeholder="Enter full name"
            onChange={changeHandler}
            value={data.name || ""}
             required />
          </div>
          <div className="form-group">
            <label>Faculty ID:</label>
            <input 
            type="text" 
            name="facultyID"
            placeholder="Enter faculty ID"
            onChange={changeHandler}
            value={data.facultyID || ""}
             required />
          </div>
          <div className="form-group">
            <label>Department:</label>
            <select  name="department"
            onChange={changeHandler}
            value={data.department || ""}
            required>
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
            <select 
            name="rank"
            onChange={changeHandler}
            value={data.rank || ""}
            required>
              <option value="">Enter Designation</option>
              <option>Professor</option>
              <option>Associate Professor</option>
              <option>Assistant Professor</option>
              <option>Lecturer (Grade-I)</option>
              <option>Lecturer (Grade-II)</option>
            </select>
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input  
             type="email"
            name="institutional_email"
            placeholder="Enter email"
            onChange={changeHandler}
            value={data.institutional_email || ""}
             required />
          </div>
          <div className="form-group">
            <label>Administrative role:</label>
            <select 
            name="administrative_role"
            onChange={changeHandler}
            value={data.administrative_role || ""}
            required>
              <option value="">Enter administrative role</option>
              <option>Department Head</option>
              <option>Proctor</option>
            </select>
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
