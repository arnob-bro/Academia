import React, { useState } from "react";
import Navbarfaculty from "../../navbar/navbarfaculty";
import Footer from "../../footer/footer.jsx";
import FacultyPerformanceTrackerChart from "./facultyPerformanceTrackerChart";
import "./facultyPerformanceTracker.css";

// Mock data for demonstration (Replace with real API data)
const coursesData = {
  Mathematics: {
    students: {
      "S101": [{ name: "Exam 1", Highest: 95, Average: 80, Obtained: 85 }, { name: "Exam 2", Highest: 90, Average: 75, Obtained: 88 }],
      "S102": [{ name: "Exam 1", Highest: 95, Average: 80, Obtained: 75 }, { name: "Exam 2", Highest: 90, Average: 75, Obtained: 70 }]
    }
  },
  Physics: {
    students: {
      "20220104058": [{ name: "Exam 1", Highest: 92, Average: 78, Obtained: 82 }, { name: "Exam 2", Highest: 89, Average: 74, Obtained: 79 }],
      "20220104064": [{ name: "Exam 1", Highest: 92, Average: 78, Obtained: 85 }, { name: "Exam 2", Highest: 89, Average: 74, Obtained: 77 }]
    }
  }
};

export const FacultyPerformanceTracker = () => {
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedStudent, setSelectedStudent] = useState("all");

  const handleCourseChange = (e) => {
    setSelectedCourse(e.target.value);
    setSelectedStudent("all"); // Reset student dropdown on course change
  };

  const handleStudentChange = (e) => {
    setSelectedStudent(e.target.value);
  };

  const getChartData = () => {
    if (!selectedCourse || !coursesData[selectedCourse]) return [];
    
    const students = coursesData[selectedCourse].students;
    if (selectedStudent === "all") {
      // Show only highest & average marks for all students
      return Object.values(students)[0].map(({ name, Highest, Average }) => ({ name, Highest, Average }));
    } else {
      // Show highest, average & obtained marks for a specific student
      return students[selectedStudent] || [];
    }
  };

  return (
    <>
      <Navbarfaculty />
      <div className="faculty-performance-tracker-container">
        <h2>Faculty Performance Tracker</h2>

        {/* Course Selection Dropdown */}
        <div className="faculty-performance-tracker-dropdown-container">
          <label htmlFor="courseSelect">Select Course:</label>
          <select id="courseSelect" value={selectedCourse} onChange={handleCourseChange}>
            <option value="">-- Select a Course --</option>
            {Object.keys(coursesData).map((course) => (
              <option key={course} value={course}>{course}</option>
            ))}
          </select>
        </div>

        {/* Student Selection Dropdown */}
        {selectedCourse && (
          <div className="faculty-performance-tracker-dropdown-container">
            <label htmlFor="studentSelect">Select Student:</label>
            <select id="studentSelect" value={selectedStudent} onChange={handleStudentChange}>
              <option value="all">All Students</option>
              {Object.keys(coursesData[selectedCourse].students).map((studentId) => (
                <option key={studentId} value={studentId}>{studentId}</option>
              ))}
            </select>
          </div>
        )}

        {/* Performance Chart */}
        {selectedCourse && (
          <div className="faculty-performance-tracker-graph-box">
            <h3>
              {selectedCourse} Performance {selectedStudent !== "all" ? `- ID ${selectedStudent}` : ""}
            </h3>
            <FacultyPerformanceTrackerChart data={getChartData()} showObtained={selectedStudent !== "all"} />
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default FacultyPerformanceTracker;
