import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminNavbar from "../../navbar/AdminNavbar";
import Footer from "../../footer/footer";
import "./CourseSchedule.css"
const CourseSchedule = () => {
  const [courses, setCourses] = useState([]);
  const [editingCell, setEditingCell] = useState(null); // Track which cell is being edited
  const [editedValue, setEditedValue] = useState(""); // Track the edited value

  const fetchCourses = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/admin/all-courses");
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

  const handleEdit = (value, index, column) => {
    // Start editing a cell
    setEditingCell({ index, column });
    setEditedValue(value);
  };

  const handleSave = () => {
    // Save the updated value to the course list
    const updatedCourses = [...courses];
    updatedCourses[editingCell.index][editingCell.column] = editedValue;
    setCourses(updatedCourses);
    setEditingCell(null); // Stop editing
    setEditedValue(""); // Clear edited value
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSave(); // Save on Enter key press
    }
  };

  useEffect(() => {
    fetchCourses(); 
  }, []);

  return (
    <div>
      <AdminNavbar />
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
              <td
                onDoubleClick={() => handleEdit(course.courseNumber, index, "course_code")}
                onBlur={handleSave}
                onKeyDown={handleKeyDown}
                contentEditable={editingCell?.index === index && editingCell?.column === "course_code"}
              >
                {editingCell?.index === index && editingCell?.column === "course_code" ? editedValue : course.course_code}
              </td>
              <td
                onDoubleClick={() => handleEdit(course.courseNumber, index, "section")}
                onBlur={handleSave}
                onKeyDown={handleKeyDown}
                contentEditable={editingCell?.index === index && editingCell?.column === "section"}
              >
                {editingCell?.index === index && editingCell?.column === "section" ? editedValue : course.section}
              </td>
              <td
                onDoubleClick={() => handleEdit(course.facultyID, index, "facultyID")}
                onBlur={handleSave}
                onKeyDown={handleKeyDown}
                contentEditable={editingCell?.index === index && editingCell?.column === "facultyID"}
              >
                {editingCell?.index === index && editingCell?.column === "facultyID" ? editedValue : course.facultyID}
              </td>
              <td
                onDoubleClick={() => handleEdit(course.day, index, "day")}
                onBlur={handleSave}
                onKeyDown={handleKeyDown}
                contentEditable={editingCell?.index === index && editingCell?.column === "day"}
              >
                {editingCell?.index === index && editingCell?.column === "day" ? editedValue : course.day}
              </td>
              <td
                onDoubleClick={() => handleEdit(course.startTime, index, "startTime")}
                onBlur={handleSave}
                onKeyDown={handleKeyDown}
                contentEditable={editingCell?.index === index && editingCell?.column === "startTime"}
              >
                {editingCell?.index === index && editingCell?.column === "startTime" ? editedValue : course.startTime}
              </td>
              <td
                onDoubleClick={() => handleEdit(course.endTime, index, "endTime")}
                onBlur={handleSave}
                onKeyDown={handleKeyDown}
                contentEditable={editingCell?.index === index && editingCell?.column === "endTime"}
              >
                {editingCell?.index === index && editingCell?.column === "endTime" ? editedValue : course.endTime}
              </td>
              <td
                onDoubleClick={() => handleEdit(course.roomNumber, index, "roomNumber")}
                onBlur={handleSave}
                onKeyDown={handleKeyDown}
                contentEditable={editingCell?.index === index && editingCell?.column === "roomNumber"}
              >
                {editingCell?.index === index && editingCell?.column === "roomNumber" ? editedValue : course.roomNumber}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Footer />
    </div>
    
  );
};

export default CourseSchedule;
