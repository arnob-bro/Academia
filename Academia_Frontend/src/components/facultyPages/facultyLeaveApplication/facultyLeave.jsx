import React, { useState } from "react";
import "./facultyLeave.css"; 
import Navbar from "../../navbar/navbarfaculty"; 
import Footer from "../../footer/footer";
const FacultyLeave = () => {
  const [leaveType, setLeaveType] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [remarks, setRemarks] = useState("");
  const [totalDays, setTotalDays] = useState(0);
  const [leaveStatus, setLeaveStatus] = useState("Pending");

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
    calculateDays(e.target.value, endDate);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
    calculateDays(startDate, e.target.value);
  };

  const calculateDays = (start, end) => {
    if (start && end) {
      const startD = new Date(start);
      const endD = new Date(end);
      const diffTime = Math.abs(endD - startD);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
      setTotalDays(diffDays);
    }
  };

  const handleSubmit = () => {
    alert("Leave Request Submitted!");
    setLeaveStatus("Submitted");
  };

  const handleCancel = () => {
    setLeaveType("");
    setStartDate("");
    setEndDate("");
    setRemarks("");
    setTotalDays(0);
    setLeaveStatus("Pending");
  };

  return (
    <>  
        
      

        <Navbar />

      <div className="form-container">
        <h2>Leave Application Form</h2>

        <label>Leave Type:</label>
        <select value={leaveType} onChange={(e) => setLeaveType(e.target.value)}>
          <option value="">Select Type</option>
          <option value="Sick Leave">Sick Leave</option>
          <option value="Casual Leave">Casual Leave</option>
          <option value="Annual Leave">Annual Leave</option>
        </select>

        <div className="date-picker">
          <div>
            <label>Start Date:</label>
            <input type="date" value={startDate} onChange={handleStartDateChange} />
          </div>
          <div>
            <label>End Date:</label>
            <input type="date" value={endDate} onChange={handleEndDateChange} />
          </div>
        </div>

        <div className="total-days">Total Number of Days: {totalDays}</div>

        <label>Remarks:</label>
        <textarea value={remarks} onChange={(e) => setRemarks(e.target.value)}></textarea>

        <div className="leave-status">Leave Status: {leaveStatus}</div>

        <div className="buttons">
          <button className="request-btn" onClick={handleSubmit}>Request Leave</button>
          <button className="cancel-btn" onClick={handleCancel}>Cancel</button>
        </div>
      </div> 
      <Footer />

      
    
    </>
  );
};

export default FacultyLeave;
