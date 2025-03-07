import React, { useState, useEffect } from "react";
import "./facultyLeave.css";
import Navbarfaculty from "../../navbar/navbarfaculty";
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
  const [leaveHistory, setLeaveHistory] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (userData && userData.userID) {
      setFacultyID(userData.userID);
    }
    fetchLeaveHistory();
  }, []);

  const fetchLeaveHistory = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/faculty/leave-history");
      const data = await response.json();
      setLeaveHistory(data);
    } catch (error) {
      console.error("Error fetching leave history:", error);
    }
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();
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
        alert(data.message || "Leave request submitted successfully!");

        // Close the modal after submitting
        setIsModalOpen(false);

        // Update the leave history with the new leave request
        const newLeaveHistory = [...leaveHistory, { ...leaveData, status: "Pending", total_days }];
        setLeaveHistory(newLeaveHistory); // This will refresh the table with the new leave request

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
      <Navbarfaculty />
      <div className="faculty-leave-form-container">
        <button className="faculty-leave-request-btn" onClick={() => setIsModalOpen(true)}>Request Leave</button>
        {isModalOpen && (
          <div className="modal-overlay">
            <div className="modal-container">
              <h2>Request Leave</h2>
              <form onSubmit={handleSubmit}>
                <label>Leave Type:</label>
                <select value={leaveType} onChange={(e) => setLeaveType(e.target.value)}>
                  <option value="">Select Type</option>
                  <option value="Sick Leave">Sick Leave</option>
                  <option value="Casual Leave">Casual Leave</option>
                  <option value="Annual Leave">Annual Leave</option>
                  <option value="Maternity Leave">Maternity Leave</option>
                  <option value="Other">Other</option>
                </select>

                <div className="faculty-leave-date-picker">
                  <div>
                    <label>Start Date:</label>
                    <input type="date" value={startDate} onChange={handleStartDateChange} />
                  </div>
                  <div>
                    <label>End Date:</label>
                    <input type="date" value={endDate} onChange={handleEndDateChange} />
                  </div>
                </div>

                <div className="faculty-leave-total-days">Total Number of Days: {totalDays}</div>

                <label>Remarks:</label>
                <textarea value={remarks} onChange={(e) => setRemarks(e.target.value)}></textarea>

                <div className="faculty-leave-buttons">
                  <button type="submit" className="faculty-leave-request-btn">Save</button>
                  <button type="button" className="faculty-leave-cancel-btn" onClick={() => setIsModalOpen(false)}>Cancel</button>
                </div>
              </form>
            </div>
          </div>
        )}
        {leaveHistory.length > 0 && (
          <table className="leave-history-table">
            <thead>
              <tr>
                <th>Serial No</th>
                <th>Leave Type</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Total Days</th>
                <th>Remarks</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {leaveHistory.map((leave, index) => (
                <tr key={leave.id}>
                  <td>{index + 1}</td>
                  <td>{leave.leave_type}</td>
                  <td>{leave.start_date}</td>
                  <td>{leave.end_date}</td>
                  <td>{leave.total_days}</td>
                  <td>{leave.remarks}</td>
                  <td>{leave.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <Footer />
    </>
  );
};

export default FacultyLeave;
