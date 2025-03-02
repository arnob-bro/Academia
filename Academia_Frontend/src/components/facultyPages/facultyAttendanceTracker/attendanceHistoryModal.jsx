import React, { useState, useEffect } from 'react';
import './attendanceHistoryModal.css';

const AttendanceHistoryModal = ({ closeModal, selectedCourse }) => {
  const [attendanceData, setAttendanceData] = useState({});
  const [weeks, setWeeks] = useState([]);
  const [selectedWeek, setSelectedWeek] = useState(1);
  const [editingRow, setEditingRow] = useState(null); // State to track the row being edited

  useEffect(() => {
    // Generate week-based attendance structure (Week 1 - 14)
    const generatedWeeks = Array.from({ length: 14 }, (_, i) => i + 1);
    setWeeks(generatedWeeks);
  }, []);

  useEffect(() => {
    // Sample data initialization
    const newAttendanceData = {
      S001: { name: 'John Doe', attendance: {} },
      S002: { name: 'Jane Smith', attendance: {} },
      S003: { name: 'Alice Brown', attendance: {} },
      S004: { name: 'Ali Brown', attendance: {} },
      S005: { name: 'Alice Red', attendance: {} },
      S006: { name: 'Alice Green', attendance: {} },
    };

    // Generate column headers for Sunday-Thursday
    const currentYear = new Date().getFullYear();
    const startDate = new Date(currentYear, 0, 1 + (selectedWeek - 1) * 7); // Start of the selected week

    for (let i = 0; i < 5; i++) { // Sunday to Thursday
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      const formattedDate = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;  // Updated date format

      Object.keys(newAttendanceData).forEach((studentId) => {
        newAttendanceData[studentId].attendance[formattedDate] = 'Absent';
      });
    }

    setAttendanceData(newAttendanceData);
  }, [selectedWeek]);

  const handleStatusChange = (studentId, date, status) => {
    setAttendanceData((prev) => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        attendance: { ...prev[studentId].attendance, [date]: status },
      },
    }));
  };

  const handleEditClick = (studentId) => {
    setEditingRow(studentId);
  };

  const handleSaveClick = (studentId) => {
    // Save logic can go here if needed
    setEditingRow(null); // Exit edit mode
  };

  return (
    <div className="attendance-history-modal">
      <div className="attendance-history-modal-content">
        <span className="attendance-history-modal-close-modal" onClick={closeModal}>
          &times;
        </span>
        <h3>Attendance History for {selectedCourse}</h3>

        {/* Week Selector */}
        <div className="attendance-history-modal-filter-container">
          <label>Select Week:</label>
          <select value={selectedWeek} onChange={(e) => setSelectedWeek(Number(e.target.value))}>
            {weeks.map((week) => (
              <option key={week} value={week}>
                Week {week}
              </option>
            ))}
          </select>
        </div>

        {/* Attendance Table */}
        <table className="attendance-history-modal-attendance-history-table">
          <thead>
            <tr>
              <th>Student ID</th>
              <th>Name</th>
              {Object.keys(attendanceData.S001?.attendance || {}).map((date) => (
                <th key={date}>{date}</th>
              ))}
              <th>Total Present</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(attendanceData).map((studentId) => (
              <tr key={studentId}>
                <td>{studentId}</td>
                <td>{attendanceData[studentId].name}</td>
                {Object.keys(attendanceData[studentId].attendance).map((date) => (
                  <td key={date}>
                    {editingRow === studentId ? (
                      <select
                        value={attendanceData[studentId].attendance[date]}
                        onChange={(e) => handleStatusChange(studentId, date, e.target.value)}
                      >
                        <option value="Present">Present</option>
                        <option value="Absent">Absent</option>
                        <option value="Late">Late</option>
                        <option value="Excused">Excused</option>
                      </select>
                    ) : (
                      attendanceData[studentId].attendance[date]
                    )}
                  </td>
                ))}
                <td>
                  {Object.values(attendanceData[studentId].attendance).filter(
                    (status) => status === 'Present'
                  ).length}
                </td>
                <td>
                  {editingRow === studentId ? (
                    <button onClick={() => handleSaveClick(studentId)}>Save</button>
                  ) : (
                    <button onClick={() => handleEditClick(studentId)}>Edit</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Close Modal Button */}
        <button className="attendance-history-modal-close-btn" onClick={closeModal}>
          Close
        </button>
      </div>
    </div>
  );
};

export default AttendanceHistoryModal;
