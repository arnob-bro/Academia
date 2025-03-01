import React, { useState, useEffect } from 'react';
import "./attendanceHistoryModal.css"; // Make sure to create this CSS file for modal styles

const AttendanceHistoryModal = ({ closeModal, selectedCourse }) => {
  const [filterMonth, setFilterMonth] = useState('');
  const [attendanceData, setAttendanceData] = useState({});
  const [daysInMonth, setDaysInMonth] = useState(31); // Default to 31 days

  // Function to calculate the number of days in a selected month
  const getDaysInMonth = (month) => {
    if (!month) return 31; // Default to 31 days if no month is selected

    const [year, monthNumber] = month.split('-'); // month format: YYYY-MM
    const date = new Date(year, monthNumber, 0); // Get the last date of the given month
    return date.getDate();
  };

  // Handle changing the filter month
  useEffect(() => {
    if (filterMonth) {
      const days = getDaysInMonth(filterMonth);
      setDaysInMonth(days);
    }
  }, [filterMonth]);

  // Set initial attendance data based on the selected month
  useEffect(() => {
    // Set default data with all "Absent" values for each student for the selected month
    const newAttendanceData = {
      S001: Array(daysInMonth).fill('Absent'),
      S002: Array(daysInMonth).fill('Absent'),
      S003: Array(daysInMonth).fill('Absent'),
      
    };
    setAttendanceData(newAttendanceData);
  }, [daysInMonth]);

  // Handle the status change for a particular student's attendance on a given day
  const handleStatusChange = (studentId, day, status) => {
    const updatedData = { ...attendanceData };
    updatedData[studentId][day - 1] = status;
    setAttendanceData(updatedData);
  };

  // Get total present days for a student
  const getTotalPresence = (studentId) => {
    return attendanceData[studentId].filter(status => status === 'Present').length;
  };

  // Render the days for each student, showing either a dropdown or the current attendance
  const renderDays = (studentId) => {
    return [...Array(daysInMonth).keys()].map(day => (
      <td key={day}>
        {editingRow === studentId ? (
          <select 
            value={attendanceData[studentId][day]} 
            onChange={(e) => handleStatusChange(studentId, day + 1, e.target.value)}
          >
            <option value="Present">Present</option>
            <option value="Absent">Absent</option>
            <option value="Late">Late</option>
            <option value="Excused">Excused</option>
          </select>
        ) : (
          attendanceData[studentId][day]
        )}
      </td>
    ));
  };

  const [editingRow, setEditingRow] = useState(null); // Track which row is in edit mode

  const handleEdit = (studentId) => {
    setEditingRow(studentId); // Enable editing for this student
  };

  const handleSave = (studentId) => {
    setEditingRow(null); // Save and exit editing mode
  };

  return (
    <div className="attendance-history-modal">
      <div className="attendance-history-modal-content">
        <span className="attendance-history-modal-close-modal" onClick={closeModal}>&times;</span>
        <h3>Attendance History for {selectedCourse}</h3>

        {/* Filter Options */}
        <div className="attendance-history-modal-filter-container">
          <label>Filter by Month:</label>
          <input 
            type="month" 
            value={filterMonth} 
            onChange={(e) => setFilterMonth(e.target.value)} 
          />
        </div>

        {/* Attendance Records Table */}
        <table className="attendance-history-modal-attendance-history-table">
          <thead>
            <tr>
              <th>Student ID</th>
              <th>Name</th>
              {[...Array(daysInMonth).keys()].map(day => (
                <th key={day}>{day + 1}</th>
              ))}
              <th>Total Present</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(attendanceData).map(studentId => (
              <tr key={studentId}>
                <td>{studentId}</td>
                <td>{studentId === "S001" ? "John Doe" : studentId === "S002" ? "Jane Smith" : "Alice Brown"}</td>
                {renderDays(studentId)}
                <td>{getTotalPresence(studentId)}</td>
                <td>
                  {editingRow === studentId ? (
                    <button onClick={() => handleSave(studentId)}>Save</button>
                  ) : (
                    <button onClick={() => handleEdit(studentId)}>Edit</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Close Modal Button */}
        <button className="attendance-history-modal-close-btn" onClick={closeModal}>Close</button>
      </div>
    </div>
  );
};

export default AttendanceHistoryModal;
