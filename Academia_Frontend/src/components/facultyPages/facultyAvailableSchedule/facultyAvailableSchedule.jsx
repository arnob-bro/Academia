import React, { useState } from "react";
import Navbarfaculty from "../../navbar/navbarfaculty";
import Footer from "../../footer/footer";
import "./facultyAvailableSchedule.css";

const FacultyAvailableSchedule = () => {
  const [selectedRoom, setSelectedRoom] = useState("7A03");
  const [selectedWeek, setSelectedWeek] = useState("1st");
  const [isPopupOpen, setIsPopupOpen] = useState(false); // State to control popup visibility

  // Schedule data for rooms and weeks
  const scheduleData = {
    "7A03": {
      "1st": {
        "Sunday": { "9:00 - 10:00 am": "CSE 3103", "2:00 - 3:00 pm": "CSE 3117" },
        "Monday": { "10:00 - 11:00 am": "HUM 3115", "3:00 - 4:00 pm": "CSE 3110" },
        "Tuesday": { "9:00 - 10:00 am": "CSE 3117" },
        "Wednesday": { "1:00 - 2:00 pm": "CSE 3103" },
        "Thursday": { "8:00 - 9:00 am": "CSE 3109" },
      },
      "2nd": {
        "Monday": { "10:00 - 11:00 am": "CSE 3101" },
        "Wednesday": { "12:00 - 1:00 pm": "CSE 3103" },
      },
      "3rd": {
        "Tuesday": { "10:00 - 11:00 am": "CSE 3105" },
      },
      "4th": {
        "Thursday": { "9:00 - 10:00 am": "CSE 3110" },
      },
    },
    "7A04": {
      "1st": {
        "Sunday": { "10:00 - 11:00 am": "CSE 3101" },
        "Monday": { "2:00 - 3:00 pm": "CSE 3117" },
      },
      "2nd": {
        "Wednesday": { "12:00 - 1:00 pm": "CSE 3103" },
      },
    },
    "7A05": {
      "1st": {
        "Tuesday": { "10:00 - 11:00 am": "CSE 3117" },
      },
      "3rd": {
        "Thursday": { "1:00 - 2:00 pm": "CSE 3101" },
      },
    },
  };

  const timeSlots = [
    "8:00 - 9:00 am",
    "9:00 - 10:00 am",
    "10:00 - 11:00 am",
    "12:00 - 1:00 pm",
    "1:00 - 2:00 pm",
    "2:00 - 3:00 pm",
    "3:00 - 4:00 pm",
    "5:00 - 6:00 pm",
  ];

  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"];

  const scheduleForWeek = scheduleData[selectedRoom][selectedWeek];

  const handleReschedulePopup = () => {
    setIsPopupOpen(!isPopupOpen); // Toggle popup visibility
  };

  return (
    <>
      <Navbarfaculty />
      <div className="schedule-container">
        <h2 className="schedule-title">Available Schedule</h2>
        <p className="current-week">
          Current Week: <strong>{selectedWeek}</strong>
        </p>

        <label htmlFor="room-select">Select Room:</label>
        <select
          id="room-select"
          className="room-dropdown"
          value={selectedRoom}
          onChange={(e) => setSelectedRoom(e.target.value)}
        >
          <option value="7A03">7A03</option>
          <option value="7A04">7A04</option>
          <option value="7A05">7A05</option>
        </select>

        <label htmlFor="week-select">Select Week:</label>
        <select
          id="week-select"
          className="week-dropdown"
          value={selectedWeek}
          onChange={(e) => setSelectedWeek(e.target.value)}
        >
          <option value="1st">1st</option>
          <option value="2nd">2nd</option>
          <option value="3rd">3rd</option>
          <option value="4th">4th</option>
        </select>

        <div className="schedule-table">
          <table>
            <thead>
              <tr>
                <th>Time/Day</th>
                {timeSlots.map((slot, index) => (
                  <th key={index}>{slot}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {days.map((day, rowIndex) => (
                <tr key={rowIndex}>
                  <td>{day}</td>
                  {timeSlots.map((time, colIndex) => {
                    const course = scheduleForWeek[day]?.[time];
                    return (
                      <td
                        key={colIndex}
                        className={course ? "occupied" : "available"}
                      >
                        {course || "Available"}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <button className="reschedule-btn" onClick={handleReschedulePopup}>
          Reschedule
        </button>

        {/* Pop-up form for rescheduling */}
        {isPopupOpen && (
          <div className="reschedule-popup">
            <div className="reschedule-card">
              <span className="close-btn" onClick={handleReschedulePopup}>
                X
              </span>
              <h3>Reschedule Class</h3>
              <form>
                <label htmlFor="week-select-popup">Select Week:</label>
                <select id="week-select-popup" className="week-dropdown">
                  <option value="1st">1st</option>
                  <option value="2nd">2nd</option>
                  <option value="3rd">3rd</option>
                  <option value="4th">4th</option>
                </select>

                <label htmlFor="course-select">Select Course:</label>
                <select id="course-select" className="course-dropdown">
                  <option value="CSE 3103">CSE 3103</option>
                  <option value="CSE 3117">CSE 3117</option>
                  <option value="CSE 3101">CSE 3101</option>
                </select>

                <label htmlFor="room-select-popup">Select Room:</label>
                <select id="room-select-popup" className="room-dropdown">
                  <option value="7A03">7A03</option>
                  <option value="7A04">7A04</option>
                  <option value="7A05">7A05</option>
                </select>

                <label htmlFor="time-select">Select Time Slot:</label>
                <select id="time-select" className="time-slot-dropdown">
                  <option value="8:00 - 9:00 am">Sunday - 8:00 - 9:00 am</option>
                  <option value="9:00 - 10:00 am">Monday - 9:00 - 10:00 am</option>
                  {/* Add more dynamically based on available times */}
                </select>

                <button type="submit" className="submit-btn">Submit</button>
              </form>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default FacultyAvailableSchedule;
