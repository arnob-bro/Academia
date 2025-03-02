import React, { useState } from "react";
import Navbar from "../../navbar/AdminNavbar";
import Footer from "../../footer/footer";
import "./courseSchedule.css"; 
const CourseSchedule = () => {
  const departments = {
    "Computer Science Engineering": [
      { code: "CSE 1101", section: "B", day1: { weekday: "Monday", start: "08:00", end: "08:50" }, day2: { weekday: "Monday", start: "09:00", end: "09:40" } },
      { code: "CSE 2203", section: "A", day1: { weekday: "Tuesday", start: "10:40", end: "11:30" }, day2: { weekday: "Thursday", start: "13:00", end: "13:50" } }, 
      { code: "CSE 3304", section: "C", day1: { weekday: "Sunday", start: "10:40", end: "11:30" }, day2: { weekday: "Thursday", start: "13:00", end: "13:50" } }, 
      { code: "CSE 1102", section: "C", day1: { weekday: "Sunday", start: "10:40", end: "11:30" }, day2: { weekday: "Thursday", start: "13:00", end: "13:50" } }
    ],
    "Electrical Engineering": [
      { code: "EEE 2202", section: "C", day1: { weekday: "Tuesday", start: "10:00", end: "10:50" }, day2: { weekday: "Wednesday", start: "11:00", end: "11:50" } },
      { code: "EEE 3304", section: "B", day1: { weekday: "Wednesday", start: "14:00", end: "14:50" }, day2: { weekday: "Friday", start: "15:40", end: "16:30" } }, 
      { code: "EEE 1104", section: "A", day1: { weekday: "Wednesday", start: "14:00", end: "14:50" }, day2: { weekday: "Friday", start: "15:40", end: "16:30" } }, 
      { code: "EEE 3104", section: "A", day1: { weekday: "Wednesday", start: "14:00", end: "14:50" }, day2: { weekday: "Friday", start: "15:40", end: "16:30" } }
    ]
  };

  const [selectedDept, setSelectedDept] = useState("Computer Science Engineering");
  const [schedule, setSchedule] = useState(departments[selectedDept]);

  const handleDeptChange = (e) => {
    setSelectedDept(e.target.value);
    setSchedule(departments[e.target.value]);
  };

  return ( 
    <>
      <Navbar />
    <div className="container">
      <h2>Course Schedule Management</h2>
      
      <label>Select Department:</label>
      <select value={selectedDept} onChange={handleDeptChange}>
        {Object.keys(departments).map((dept) => (
          <option key={dept} value={dept}>{dept}</option>
        ))}
      </select>
      
      <table>
        <thead>
          <tr>
            <th>Course Code</th>
            <th>Section</th>
            <th>Day 1 (Weekday, Start, End)</th>
            <th>Day 2 (Weekday, Start, End)</th>
          </tr>
        </thead>
        <tbody>
          {schedule.map((course, index) => (
            <tr key={index}>
              <td>{course.code}</td>
              <td>{course.section}</td>
              <td>
                <select defaultValue={course.day1.weekday}>
                  {["Sunday","Monday", "Tuesday", "Wednesday", "Thursday"].map((day) => (
                    <option key={day} value={day}>{day}</option>
                  ))}
                </select>
                <input type="time" className="time-input small" defaultValue={course.day1.start} /> -
                <input type="time" className="time-input small" defaultValue={course.day1.end} />
              </td>
              <td>
                <select defaultValue={course.day2.weekday}>
                  {["Sunday","Monday", "Tuesday", "Wednesday", "Thursday"].map((day) => (
                    <option key={day} value={day}>{day}</option>
                  ))}
                </select>
                <input type="time" className="time-input small" defaultValue={course.day2.start} /> -
                <input type="time" className="time-input small" defaultValue={course.day2.end} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div> 
    <Footer />
    </>
  );
};

export default CourseSchedule;
