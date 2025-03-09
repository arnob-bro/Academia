import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminNavbar from "../../navbar/AdminNavbar";
import Footer from "../../footer/footer";
import "./CourseSchedule.css";

const CourseSchedule = () => {
  const [courses, setCourses] = useState([]);
  const [editingCell, setEditingCell] = useState(null); // Track which cell is being edited
  const [editedValue, setEditedValue] = useState(""); // Track the edited value

  const fetchCourses = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/admin/all-courses-schedule"
      );
      console.log(response.data); // Check what you get here
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
            <th>Course Code</th>
            <th>Section</th>
            <th>Day-1</th>
            <th>Start Time</th>
            <th>End Time</th>

            <th>Day-2</th>
            <th>Start Time</th>
            <th>End Time</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course, index) => (
            <tr key={index}>
              <td
                onDoubleClick={() =>
                  handleEdit(course.course_code, index, "course_code")
                }
                onBlur={handleSave}
                onKeyDown={handleKeyDown}
                contentEditable={
                  editingCell?.index === index &&
                  editingCell?.column === "course_code"
                }
              >
                {editingCell?.index === index &&
                editingCell?.column === "course_code"
                  ? editedValue
                  : course.course_code}
              </td>
              <td
                onDoubleClick={() =>
                  handleEdit(course.section, index, "section")
                }
                onBlur={handleSave}
                onKeyDown={handleKeyDown}
                contentEditable={
                  editingCell?.index === index &&
                  editingCell?.column === "section"
                }
              >
                {editingCell?.index === index &&
                editingCell?.column === "section"
                  ? editedValue
                  : course.section}
              </td>
              <td
                onDoubleClick={() =>
                  handleEdit(course.schedule_day_1, index, "schedule_day_1")
                }
                onBlur={handleSave}
                onKeyDown={handleKeyDown}
                contentEditable={
                  editingCell?.index === index &&
                  editingCell?.column === "schedule_day_1"
                }
              >
                {editingCell?.index === index &&
                editingCell?.column === "schedule_day_1"
                  ? editedValue
                  : course.schedule_day_1}
              </td>
              <td
                onDoubleClick={() =>
                  handleEdit(course.start_time_day_1, index, "start_time_day_1")
                }
                onBlur={handleSave}
                onKeyDown={handleKeyDown}
                contentEditable={
                  editingCell?.index === index &&
                  editingCell?.column === "start_time_day_1"
                }
              >
                {editingCell?.index === index &&
                editingCell?.column === "start_time_day_1"
                  ? editedValue
                  : course.start_time_day_1}
              </td>
              <td
                onDoubleClick={() =>
                  handleEdit(course.end_time_day_1, index, "end_time_day_1")
                }
                onBlur={handleSave}
                onKeyDown={handleKeyDown}
                contentEditable={
                  editingCell?.index === index &&
                  editingCell?.column === "end_time_day_1"
                }
              >
                {editingCell?.index === index &&
                editingCell?.column === "end_time_day_1"
                  ? editedValue
                  : course.end_time_day_1}
              </td>
              <td
                onDoubleClick={() =>
                  handleEdit(course.schedule_day_2, index, "schedule_day_2")
                }
                onBlur={handleSave}
                onKeyDown={handleKeyDown}
                contentEditable={
                  editingCell?.index === index &&
                  editingCell?.column === "schedule_day_2"
                }
              >
                {editingCell?.index === index &&
                editingCell?.column === "schedule_day_2"
                  ? editedValue
                  : course.schedule_day_2}
              </td>
              <td
                onDoubleClick={() =>
                  handleEdit(course.start_time_day_2, index, "start_time_day_2")
                }
                onBlur={handleSave}
                onKeyDown={handleKeyDown}
                contentEditable={
                  editingCell?.index === index &&
                  editingCell?.column === "start_time_day_2"
                }
              >
                {editingCell?.index === index &&
                editingCell?.column === "start_time_day_2"
                  ? editedValue
                  : course.start_time_day_2}
              </td>
              <td
                onDoubleClick={() =>
                  handleEdit(course.end_time_day_2, index, "end_time_day_2")
                }
                onBlur={handleSave}
                onKeyDown={handleKeyDown}
                contentEditable={
                  editingCell?.index === index &&
                  editingCell?.column === "end_time_day_2"
                }
              >
                {editingCell?.index === index &&
                editingCell?.column === "end_time_day_2"
                  ? editedValue
                  : course.end_time_day_2}
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
