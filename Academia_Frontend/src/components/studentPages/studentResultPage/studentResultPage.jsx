import React, { useState } from 'react';
import './studentResultPage.css';
import Navbar from '../../navbar/navbar';
import Footer from '../../footer/footer';

export const StudentResultPage = () => {
  const [selectedSemester, setSelectedSemester] = useState('');

  // Sample result data for different semesters
  const resultData = {
    "Spring 2024": [
      { courseNumber: "CSE 3100", title: "Software Development", credit: 3, finalGrade: "A-", finalPoint: 3.5 },
      { courseNumber: "CSE 3101", title: "Database Systems", credit: 3, finalGrade: "A", finalPoint: 4.0 },
      { courseNumber: "CSE 3700", title: "Artificial Intelligence", credit: 3, finalGrade: "B+", finalPoint: 3.3 },
    ],
    "Fall 2023": [
      { courseNumber: "CSE 2200", title: "Computer Networks", credit: 3, finalGrade: "B+", finalPoint: 3.3 },
      { courseNumber: "CSE 2201", title: "Operating Systems", credit: 3, finalGrade: "A-", finalPoint: 3.5 },
    ],
  };

  return (
    <>
      <Navbar />
      <div className="student-result-page-container">
        <h2 className="student-result-page-result-title">Student Result</h2>
        
        {/* Semester Selection Dropdown */}
        <div className="student-result-page-dropdown">
          <label htmlFor="semester" >Select Semester: </label>
          <select
            id="semester"
            value={selectedSemester}
            onChange={(e) => setSelectedSemester(e.target.value)}
          >
            <option value="">-- Select Semester --</option>
            {Object.keys(resultData).map((semester) => (
              <option key={semester} value={semester}>{semester}</option>
            ))}
          </select>
        </div>

        {/* Show Results only if a semester is selected */}
        {selectedSemester && (
          <>
            <table className="student-result-page-student-info-table">
              <tbody>
                <tr><td><strong>Student Name</strong></td><td>Mickey Mouse</td></tr>
                <tr><td><strong>Registration Number</strong></td><td>20220104008</td></tr>
                <tr><td><strong>Program</strong></td><td>Bachelor of Science in Computer Science and Engineering</td></tr>
                <tr><td><strong>Department/School</strong></td><td>Department of Computer Science and Engineering</td></tr>
              </tbody>
            </table>

            <table className="student-result-page-result-table">
              <thead>
                <tr>
                  <th>Course Number</th>
                  <th>Course Title</th>
                  <th>Course Credit</th>
                  <th>Final Grade</th>
                  <th>Grade Point</th>
                </tr>
              </thead>
              <tbody>
                {resultData[selectedSemester].map((course, index) => (
                  <tr key={index}>
                    <td>{course.courseNumber}</td>
                    <td>{course.title}</td>
                    <td>{course.credit}</td>
                    <td>{course.finalGrade}</td>
                    <td>{course.finalPoint}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
        <Footer />
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default StudentResultPage;
