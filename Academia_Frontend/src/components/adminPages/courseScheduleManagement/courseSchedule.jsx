import React, { useState } from "react";
import Navbar from "../../navbar/AdminNavbar";
import Footer from "../../footer/footer";
import "./courseSchedule.css"; 

const CourseSchedule = () => {
  const departments = {
    "Computer Science Engineering": [
      { course: "Programming Fundamentals", faculty: "Dr. Alice", section: "B", room: "101", day1: { weekday: "Monday", start: "08:00", end: "08:50" }, day2: { weekday: "Wednesday", start: "09:00", end: "09:50" } },
      { course: "Database Systems", faculty: "Dr. Bob", section: "A", room: "202", day1: { weekday: "Tuesday", start: "10:40", end: "11:30" }, day2: { weekday: "Thursday", start: "13:00", end: "13:50" } }
    ],
    "Electrical Engineering": [
      { course: "Circuit Analysis", faculty: "Dr. David", section: "C", room: "303", day1: { weekday: "Tuesday", start: "10:00", end: "10:50" }, day2: { weekday: "Thursday", start: "11:00", end: "11:50" } },
      { course: "Electromagnetics", faculty: "Dr. Eve", section: "B", room: "404", day1: { weekday: "Wednesday", start: "14:00", end: "14:50" }, day2: { weekday: "Friday", start: "15:40", end: "16:30" } }
    ]
  };

  const [selectedDept, setSelectedDept] = useState("Computer Science Engineering");
  const [courses, setCourses] = useState(departments[selectedDept]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedFaculty, setSelectedFaculty] = useState("");

  const handleDeptChange = (e) => {
    const dept = e.target.value;
    setSelectedDept(dept);
    setCourses(departments[dept]);
    setSelectedCourse("");
    setSelectedFaculty("");
  };

  const handleSave = () => {
    console.log("Updated Schedule:", courses);
    alert("Schedule saved successfully!");
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

        <label>Select Course:</label>
        <select value={selectedCourse} onChange={(e) => setSelectedCourse(e.target.value)}>
          <option value="">-- Select Course --</option>
          {courses.map((course, index) => (
            <option key={index} value={course.course}>{course.course}</option>
          ))}
        </select>

        <label>Select Faculty:</label>
        <select value={selectedFaculty} onChange={(e) => setSelectedFaculty(e.target.value)}>
          <option value="">-- Select Faculty --</option>
          {courses.map((course, index) => (
            <option key={index} value={course.faculty}>{course.faculty}</option>
          ))}
        </select>

        <table>
          <thead>
            <tr>
              <th>Day</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Room No</th>
            </tr>
          </thead>
          <tbody>
            {courses
              .filter((course) => 
                (selectedCourse === "" || course.course === selectedCourse) &&
                (selectedFaculty === "" || course.faculty === selectedFaculty)
              )
              .map((course, index) => (
                <React.Fragment key={index}>
                  <tr>
                    <td>
                      <select defaultValue={course.day1.weekday}>
                        {["Sunday","Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map((day) => (
                          <option key={day} value={day}>{day}</option>
                        ))}
                      </select>
                    </td>
                    <td><input type="time" className="time-input" defaultValue={course.day1.start} /></td>
                    <td><input type="time" className="time-input" defaultValue={course.day1.end} /></td>
                    <td>{course.room}</td>
                  </tr>
                  <tr>
                    <td>
                      <select defaultValue={course.day2.weekday}>
                        {["Sunday","Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map((day) => (
                          <option key={day} value={day}>{day}</option>
                        ))}
                      </select>
                    </td>
                    <td><input type="time" className="time-input" defaultValue={course.day2.start} /></td>
                    <td><input type="time" className="time-input" defaultValue={course.day2.end} /></td>
                    <td>{course.room}</td>
                  </tr>
                </React.Fragment>
              ))}
          </tbody>
        </table>

        {/* Save Button */}
        <button className="save-btn" onClick={handleSave}>Save</button>
      </div> 
      <Footer />
    </>
  );
};

export default CourseSchedule;
