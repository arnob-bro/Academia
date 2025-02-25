import React, { useState } from "react";
import Navbar from "../../navbar/navbar";
import Footer from "../../footer/footer";
import "./studentAdvisingPage.css";

const courses = [
  {
    code: "CSE101",
    name: "Introduction to Programming",
    credit: 3,
    time: "Mon 10-12",
    prerequisite: null,
  },
  {
    code: "CSE102",
    name: "Data Structures",
    credit: 3,
    time: "Tue 12-2",
    prerequisite: "CSE101",
  },
  {
    code: "CSE201",
    name: "Algorithms",
    credit: 3,
    time: "Wed 10-12",
    prerequisite: "CSE102",
  },
  {
    code: "CSE202",
    name: "Database Systems",
    credit: 3,
    time: "Thu 2-4",
    prerequisite: null,
  },
  {
    code: "CSE203",
    name: "Operating Systems",
    credit: 3,
    time: "Fri 10-12",
    prerequisite: "CSE102",
  },
];

const MAX_CREDITS = 18; // Maximum allowable credits per semester

const StudentAdvisingPage = () => {
  const [selectedCourses, setSelectedCourses] = useState([]);

  const toggleCourseSelection = (course) => {
    const isAlreadySelected = selectedCourses.find(
      (c) => c.code === course.code
    );
    let newSelection = [...selectedCourses];

    if (isAlreadySelected) {
      newSelection = newSelection.filter((c) => c.code !== course.code);
    } else {
      if (getTotalCredits() + course.credit <= MAX_CREDITS) {
        newSelection.push(course);
      } else {
        alert(`Cannot exceed max credit limit of ${MAX_CREDITS}!`);
      }
    }

    setSelectedCourses(newSelection);
  };

  const getTotalCredits = () =>
    selectedCourses.reduce((total, course) => total + course.credit, 0);

  const checkPrerequisites = (course) => {
    if (
      course.prerequisite &&
      !selectedCourses.find((c) => c.code === course.prerequisite)
    ) {
      return `Requires ${course.prerequisite}`;
    }
    return null;
  };

  const checkTimeConflicts = (course) => {
    return selectedCourses.some((c) => c.time === course.time)
      ? "Time Conflict!"
      : null;
  };

  const submitAdvising = () => {
    if (selectedCourses.length === 0) {
      alert("Please select at least one course!");
      return;
    }
    alert("Advising submitted successfully!");
  };

  return (
    <>
      <Navbar />
      <div className="student-advising-page-container">
        <div className="student-info-section">
          <div className="info-box">
            <p>
              <strong>CGPA:</strong> 3.5
            </p>
          </div>
          <div className="info-box">
            <p>
              <strong>Completed Credit:</strong> 60
            </p>
          </div>
          <div className="info-box">
            <p>
              <strong>Current Semester:</strong> 2nd
            </p>
          </div>
          <div className="info-box">
            <p>
              <strong>For Online Payment:</strong>{" "}
              <a href="#" className="payment-link">
                Click here!
              </a>
            </p>
          </div>
        </div>

        {/* Course Selection Table */}
        <div className="course-selection">
          <h2>Available Courses</h2>
          <table>
            <thead>
              <tr>
                <th>Course Code</th>
                <th>Course Name</th>
                <th>Credit</th>
                <th>Time</th>
                <th>Prerequisite</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course) => (
                <tr key={course.code}>
                  <td>{course.code}</td>
                  <td>{course.name}</td>
                  <td>{course.credit}</td>
                  <td>{course.time}</td>
                  <td>{course.prerequisite || "None"}</td>
                  <td>
                    {checkPrerequisites(course) ? (
                      <span className="warning">
                        {checkPrerequisites(course)}
                      </span>
                    ) : checkTimeConflicts(course) ? (
                      <span className="warning">
                        {checkTimeConflicts(course)}
                      </span>
                    ) : (
                      <button
                        onClick={() => toggleCourseSelection(course)}
                        className={
                          selectedCourses.includes(course) ? "selected" : ""
                        }
                      >
                        {selectedCourses.includes(course) ? "Remove" : "Select"}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Selected Courses Summary */}
        <div className="selected-courses">
          <h3>Selected Courses</h3>
          <ul>
            {selectedCourses.length > 0 ? (
              selectedCourses.map((course) => (
                <li key={course.code}>
                  {course.code} - {course.name} ({course.credit} credits)
                </li>
              ))
            ) : (
              <p>No courses selected.</p>
            )}
          </ul>
          <p>
            <strong>Total Credits:</strong> {getTotalCredits()} / {MAX_CREDITS}
          </p>
          <button onClick={submitAdvising} className="submit-btn">
            Submit Advising
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default StudentAdvisingPage;
