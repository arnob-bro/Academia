import React, { useState, useEffect } from "react";
import Navbarfaculty from "../../navbar/navbarfaculty";
import Footer from "../../footer/footer";
import AttendanceHistoryModal from "./attendanceHistoryModal"; // Import the modal
import "./facultyAttendanceTracker.css";

const FacultyAttendanceTracker = () => {
  const [selectedCourse, setSelectedCourse] = useState("");
  const [attendanceData, setAttendanceData] = useState({});
  const [isSaved, setIsSaved] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [showWarningModal, setShowWarningModal] = useState(false);
  const [previousData, setPreviousData] = useState({});

  const courses = ["Course 1", "Course 2", "Course 3"];
  const students = [
    { id: "S001", name: "John Doe" },
    { id: "S002", name: "Jane Smith" },
    { id: "S003", name: "Alice Brown" },
  ];

  // Reset attendance data when selectedCourse changes
  useEffect(() => {
    if (selectedCourse) {
      setAttendanceData({});
      setIsSaved(false);
    }
  }, [selectedCourse]);

  const handleAttendanceChange = (studentId, status) => {
    if (!isSaved) {
      setAttendanceData((prevData) => ({
        ...prevData,
        [studentId]: status,
      }));
    }
  };

  const handleSave = () => {
    setIsSaved(true);
    setPreviousData(attendanceData); // Save current state before saving
    alert("Attendance saved successfully!");
  };

  const handleEdit = () => {
    setIsSaved(false);
  };

  const handleCancel = () => {
    setShowWarningModal(true);
  };

  const confirmCancel = () => {
    setAttendanceData({});
    setIsSaved(false);
    setShowWarningModal(false);
  };

  const closeWarningModal = () => {
    setShowWarningModal(false);
  };

  return (
    <>
      <Navbarfaculty />
      <div className="faculty-attendance-tracker-container">
        {/* Course Selection Dropdown */}
        <div className="faculty-attendance-tracker-course-selection">
          <label>Select Course: </label>
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
          >
            <option value="">-- Select Course --</option>
            {courses.map((course, index) => (
              <option key={index} value={course}>
                {course}
              </option>
            ))}
          </select>
        </div>

        {/* Attendance History Button */}
        {selectedCourse && (
          <button
            className="faculty-attendance-tracker-attendance-history-btn"
            onClick={() => setShowModal(true)}
          >
            Attendance History
          </button>
        )}

        {/* Attendance Table */}
        {selectedCourse && (
          <div className="faculty-attendance-tracker-attendance-table-container">
            <h3>Attendance for {selectedDate}</h3>
            <table className="faculty-attendance-tracker-attendance-table">
              <thead>
                <tr>
                  <th>Student ID</th>
                  <th>Student Name</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student.id}>
                    <td>{student.id}</td>
                    <td>{student.name}</td>
                    <td>
                      {["Present", "Absent", "Late", "Excused"].map((status) => (
                        <button
                          key={status}
                          className={`status-btn ${
                            attendanceData[student.id] === status ? "selected" : ""
                          }`}
                          onClick={() => handleAttendanceChange(student.id, status)}
                          disabled={isSaved} // Disable if attendance is saved
                        >
                          {status}
                        </button>
                      ))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Save / Cancel Buttons */}
            <div className="faculty-attendance-tracker-attendance-actions">
              {!isSaved ? (
                <>
                  <button
                    className="faculty-attendance-tracker-save-btn"
                    onClick={handleSave}
                  >
                    Save
                  </button>
                  <button
                    className="faculty-attendance-tracker-cancel-btn"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  className="faculty-attendance-tracker-edit-btn"
                  onClick={handleEdit}
                >
                  Edit
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Attendance History Modal */}
      {showModal && (
        <AttendanceHistoryModal
          closeModal={() => setShowModal(false)}
          selectedCourse={selectedCourse}
        />
      )}

      {/* Warning Modal for Cancel */}
      {showWarningModal && (
        <div className="warning-modal">
          <div className="warning-modal-content">
            <h3>Do you want to delete this attendance record?</h3>
            <div className="warning-modal-actions">
              <button className="yes-btn" onClick={confirmCancel}>
                Yes
              </button>
              <button className="no-btn" onClick={closeWarningModal}>
                No
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default FacultyAttendanceTracker;
