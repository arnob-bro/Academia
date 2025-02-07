import React, { useState } from 'react';
import Navbar from "../../navbar/navbar";
import Footer from "../../footer/footer";
import './studentCourseEnrollment.css';
import { FaTrash } from "react-icons/fa"; 

const initialEnrolledCourses = [
  { id: "CSE101", name: "Introduction to Programming", semester: "Spring 2025", credit: 3, faculty: "Dr. Smith" },
  { id: "CSE102", name: "Data Structures", semester: "Spring 2025", credit: 3, faculty: "Prof. Johnson" },
  { id: "CSE201", name: "Algorithms", semester: "Spring 2025", credit: 3, faculty: "Dr. Brown" },
  { id: "CSE202", name: "Database Systems", semester: "Spring 2025", credit: 3, faculty: "Prof. White" }
];

const StudentCourseEnrollment = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [enrolledCourses, setEnrolledCourses] = useState(initialEnrolledCourses);

  // Function to handle search input change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Function to remove a course from enrollment
  const handleDelete = (courseId) => {
    setEnrolledCourses(enrolledCourses.filter(course => course.id !== courseId));
  };

  // Filtered courses based on search input
  const filteredCourses = enrolledCourses.filter(course =>
    course.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Navbar />
      <div className='student-course-enrollment-container'>
        <h2>Course Enrollment</h2>
        
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search by Course ID or Name..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-bar"
        />

        {/* Enrolled Courses Table */}
        <table className="enrollment-table">
          <thead>
            <tr>
              <th>Course ID</th>
              <th>Course Name</th>
              <th>Semester</th>
              <th>Credit</th>
              <th>Faculty</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredCourses.length > 0 ? (
              filteredCourses.map(course => (
                <tr key={course.id}>
                  <td>{course.id}</td>
                  <td>{course.name}</td>
                  <td>{course.semester}</td>
                  <td>{course.credit}</td>
                  <td>{course.faculty}</td>
                  <td>
                    <button className="delete-btn" onClick={() => handleDelete(course.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="no-results">No enrolled courses found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <Footer />
    </>
  );
};

export default StudentCourseEnrollment;
