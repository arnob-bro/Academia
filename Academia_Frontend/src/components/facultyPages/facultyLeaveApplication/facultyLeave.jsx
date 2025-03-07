import React, { useState, useEffect } from "react";
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
  const [errorMessage, setErrorMessage] = useState("");
  const [facultyID, setFacultyID] = useState("");

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (userData && userData.userID) {
      setFacultyID(userData.userID);
    }
  }, []);

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

  const handleSubmit = async () => {
    if (!leaveType || !startDate || !endDate || !remarks) {
      setErrorMessage("Please fill out all fields.");
      return;
    }

    const leaveData = {
      facultyID: facultyID,
      leave_type: leaveType,
      start_date: startDate,
      end_date: endDate,
      remarks: remarks,
    };

    try {
      const response = await fetch("http://127.0.0.1:8000/api/faculty/leave-application-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(leaveData),
      });

      const data = await response.json();

      if (response.ok) {
        setLeaveStatus("Submitted");
        setErrorMessage("");
        alert(data.message || "Leave request submitted successfully!");
      } else {
        setLeaveStatus("Pending");
        setErrorMessage(data.message || "Leave request submission failed!");
      }
    } catch (error) {
      setLeaveStatus("Pending");
      setErrorMessage("An error occurred while submitting the request.");
    }
  };

  const handleCancel = () => {
    setLeaveType("");
    setStartDate("");
    setEndDate("");
    setRemarks("");
    setTotalDays(0);
    setLeaveStatus("Pending");
    setErrorMessage("");
  };

  return (
    <>
      <Navbar />

      <div className="form-container">
        <h2>Leave Application Form</h2>

        {errorMessage && <div className="error-message">{errorMessage}</div>}

        <label>Leave Type:</label>
        <select value={leaveType} onChange={(e) => setLeaveType(e.target.value)}>
          <option value="">Select Type</option>
          <option value="Sick Leave">Sick Leave</option>
          <option value="Casual Leave">Casual Leave</option>
          <option value="Annual Leave">Annual Leave</option>
          <option value="Maternity Leave">Maternity Leave</option>
          <option value="Other">Other</option>
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
