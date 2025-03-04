import React, { useState, useEffect } from "react";
import Navbarfaculty from "../../navbar/navbarfaculty";
import Footer from "../../footer/footer";
import AttendanceHistoryModal from "./attendanceHistoryModal";
import "./facultyAttendanceTracker.css";
import {
  handleFetchCoursesOfAFacultyApi,
  fetchStudentsOfSelectedCourseApi,
} from "../../../Api/faculty.js";

const FacultyAttendanceTracker = () => {
  const [selectedCourse, setSelectedCourse] = useState({});
  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);
  const [attendanceData, setAttendanceData] = useState({});
  const [isSaved, setIsSaved] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [showWarningModal, setShowWarningModal] = useState(false);
  const [facultyID, setFacultyID] = useState("");

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (userData && userData.userID) {
      setFacultyID(userData.userID);
    }
  }, []);

  useEffect(() => {
    const fetchCourses = async () => {
      if (!facultyID) return;
      try {
        const allCourses = await handleFetchCoursesOfAFacultyApi(facultyID);
        setCourses(allCourses || []);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };
    fetchCourses();
  }, [facultyID]);

  const fetchStudentsOfSelectedCourse = async () => {
    try {
      const allStudents = await fetchStudentsOfSelectedCourseApi(
        selectedCourse
      );
      if (Array.isArray(allStudents) === true) {
        setStudents(allStudents);
      } else {
        const alert = allStudents["error"];
        setStudents([]);
        alert(alert);
      }
      // setStudents(Array.isArray(allStudents) ? allStudents : []);
    } catch (error) {
      console.error("Error fetching students:", error);
      alert("Error fetching students. Please try again later.");
    }
  };

  useEffect(() => {
    if (selectedCourse) {
      setAttendanceData({});
      setIsSaved(false);
    }
  }, [selectedCourse]);

  useEffect(() => {
    setAttendanceData({});
    setIsSaved(false);
  }, [selectedDate]);

  const handleAttendanceChange = (studentID, status) => {
    if (!isSaved) {
      setAttendanceData((prevData) => ({
        ...prevData,
        [studentID]: status,
      }));
    }
  };

  const handleSave = () => {
    students.forEach((student) => {
      if (!attendanceData[student.studentID]) {
        attendanceData[student.studentID] = "Absent";
      }
    });
    setIsSaved(true);
    alert("Attendance saved successfully!");
  };

  return (
    <>
      <Navbarfaculty />
      <div className="faculty-attendance-tracker-container">
        <div className="faculty-attendance-tracker-course-selection">
          <label>Select Course: </label>
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
          >
            <option value="">-- Select Course --</option>
            {courses.map((course, index) => (
              <option key={index} value={course.courseID}>
                {course.course_code} {course.section}
              </option>
            ))}
          </select>
          <button onClick={fetchStudentsOfSelectedCourse}>Get Students</button>
        </div>

        {/* {selectedCourse && (
          <button
            className="faculty-attendance-tracker-attendance-history-btn"
            onClick={() => setShowModal(true)}
          >
            Attendance History
          </button>
        )} */}

        {selectedCourse && (
          <div className="faculty-attendance-tracker-attendance-table-container">
            <h3>Attendance for {selectedDate}</h3>
            <table className="faculty-attendance-tracker-attendance-table">
              <thead>
                <tr>
                  <th>Student ID</th>
                  <th>Student Name</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student.studentID}>
                    <td>{student.studentID}</td>
                    <td>{student.name}</td>
                    <td>
                      {["Present", "Absent", "Late", "Excused"].map(
                        (status) => (
                          <button
                            key={status}
                            className={`status-btn ${
                              attendanceData[student.studentID] === status
                                ? "selected"
                                : ""
                            }`}
                            onClick={() =>
                              handleAttendanceChange(student.studentID, status)
                            }
                            disabled={isSaved}
                          >
                            {status}
                          </button>
                        )
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="faculty-attendance-tracker-attendance-actions">
              {!isSaved ? (
                <button
                  className="faculty-attendance-tracker-save-btn"
                  onClick={handleSave}
                >
                  Save
                </button>
              ) : (
                <button
                  className="faculty-attendance-tracker-edit-btn"
                  onClick={() => setIsSaved(false)}
                >
                  Edit
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* {showModal && (
        <AttendanceHistoryModal
          closeModal={() => setShowModal(false)}
          selectedCourse={selectedCourse}
        />
      )} */}

      <Footer />
    </>
  );
};

export default FacultyAttendanceTracker;
