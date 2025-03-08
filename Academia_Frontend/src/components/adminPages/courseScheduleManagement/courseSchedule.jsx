import React, { useState, useEffect } from "react";
import axios from "axios";

const CourseSchedule = () => {
  const [courses, setCourses] = useState([]);

  const fetchCourses = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/admin/courses");
      console.log(response.data);  // Check what you get here
      if (Array.isArray(response.data)) {
        setCourses(response.data);
      } else {
        console.error("Response is not an array:", response.data);
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };
  
  useEffect(() => {
    fetchCourses(); 
  }, []);

  return (
    <div>
      <h2>Course Schedule Management</h2>
      <table>
        <thead>
          <tr>
            <th>Course Number</th>
            <th>Faculty ID</th>
            <th>Day</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Room No</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course, index) => (
            <tr key={index}>
              <td>{course.courseNumber}</td>
              <td>{course.facultyID}</td>
              <td>{course.day}</td>
              <td>{course.startTime}</td>
              <td>{course.endTime}</td>
              <td>{course.roomNumber}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CourseSchedule;
