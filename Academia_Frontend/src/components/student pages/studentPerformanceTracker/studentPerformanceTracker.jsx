import React, { useState } from "react";
import Navbar from "../../navbar/navbar";
import Footer from "../../footer/footer";
import "./studentPerformanceTracker.css";
import { StudentPerformanceChart } from "./StudentPerformanceChart";

const coursesData = {
  "Mathematics": [
    { name: "Quiz 1", Highest: 95, MyScore: 85, Average: 80 },
    { name: "Quiz 2", Highest: 90, MyScore: 80, Average: 75 },
    { name: "Final Exam", Highest: 100, MyScore: 88, Average: 85 },
  ],
  "Physics": [
    { name: "Quiz 1", Highest: 92, MyScore: 78, Average: 76 },
    { name: "Quiz 2", Highest: 88, MyScore: 82, Average: 79 },
    { name: "Final Exam", Highest: 96, MyScore: 89, Average: 84 },
  ],
  "Computer Science": [
    { name: "Quiz 1", Highest: 97, MyScore: 92, Average: 88 },
    { name: "Quiz 2", Highest: 94, MyScore: 90, Average: 85 },
    { name: "Final Exam", Highest: 99, MyScore: 95, Average: 91 },
  ],
};

export const StudentPerformanceTracker = () => {
  const [selectedCourse, setSelectedCourse] = useState("");

  return (
    <>
      <Navbar />
      <div className="student-performance-tracker-container">
        <h2>Performance Tracker</h2>
        <div className="student-performance-tracker-dropdown-container">
          <label htmlFor="student-performance-tracker-courseSelect">Select Course:</label>
          <select
            id="student-performance-tracker-courseSelect"
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
          >
            <option value="">-- Select a Course --</option>
            {Object.keys(coursesData).map((course) => (
              <option key={course} value={course}>
                {course}
              </option>
            ))}
          </select>
        </div>

        {selectedCourse && (
          <div className="student-performance-tracker-graph-box">
            <h3>{selectedCourse} Performance</h3>
            <StudentPerformanceChart data={coursesData[selectedCourse]} />
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default StudentPerformanceTracker;
