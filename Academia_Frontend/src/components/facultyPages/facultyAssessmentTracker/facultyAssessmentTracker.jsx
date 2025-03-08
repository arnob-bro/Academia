import React, { useState, useEffect } from "react";
import Navbarfaculty from "../../navbar/navbarfaculty";
import Footer from "../../footer/footer";
import "./facultyAssessmentTracker.css";
import { handleFetchCoursesOfAFacultyApi } from "../../../Api/faculty";
import axios from "axios";

const FacultyAssessmentTracker = () => {
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedCourseCode, setSelectedCourseCode] = useState("");
  const [courses, setCourses] = useState([]);
  const [assessments, setAssessments] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [weight, setWeight] = useState("");
  const [date, setDate] = useState("");
  const [type, setType] = useState("");
  const [semester, setSemester] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [facultyID, setFacultyID] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState([]);
  const [isFetching, setIsFetching] = useState(false); // Track fetching status

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (userData && userData.userID) {
      setFacultyID(userData.userID);
    }
  }, []);

  useEffect(() => {
    const fetchCourses = async () => {
      if (!facultyID) return;
      setIsFetching(true);
      try {
        const allCourses = await handleFetchCoursesOfAFacultyApi(facultyID);
        setCourses(allCourses || []);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
      setIsFetching(false);
    };
    fetchCourses();
  }, [facultyID]);

  const fetchAssessments = async () => {
    if (!selectedCourse) {
      alert("Please select a course first!");
      return;
    }
    setIsFetching(true);
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/faculty/courses/${selectedCourse}/assessments`,
        `http://127.0.0.1:8000/api/faculty/courses/${selectedCourse}/assessments`,
        {
          // params: { courseID: selectedCourse }, // Add courseID parameter
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log(response);
      const data = Array.isArray(response?.data) ? response.data : [];
      setAssessments(data);
      setIsLoaded(true);
    } catch (error) {
      console.error("Error fetching assessments:", error);
      setAssessments([]);
      alert("Failed to fetch assessments.");
    }
    setIsFetching(false);
  };

  // Toggle assessments: if already loaded, hide them; otherwise, fetch them.
  const toggleAssessments = async () => {
    if (isLoaded) {
      setAssessments([]);
      setIsLoaded(false);
    } else {
      await fetchAssessments();
    }
  };

  const createAssessment = async (assessmentData) => {
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/faculty/assessment/assessment-creation",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(assessmentData),
        }
      );
      const data = await response.json();
      if (response.ok) {
        setMessage(data.message);
        setError("");
      } else {
        setError(data.error || "Error creating assessment");
        setMessage("");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Failed to create assessment");
      setMessage("");
    }
  };

  const handleCreateAssessment = (e) => {
    e.preventDefault();
    const assessmentData = {
      assessment_weight: weight,
      assessment_date: date,
      assessment_type: type,
      semester: semester,
      courseID: selectedCourse,
    };
    createAssessment(assessmentData);
  };

  // Fetch and display student marks for a given assessment- modal table
  const handleGetData = async (assessment) => {
    try {
      // Adjust the endpoint below based on your API.
      const assessmentId = assessment.assessment_id || assessment.id;
      const response = await axios.get(
        `http://127.0.0.1:8000/api/faculty/assessment/${assessmentId}/student-marks`,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = Array.isArray(response?.data) ? response.data : [];
      setModalData(data);
      setShowModal(true);
    } catch (error) {
      console.error("Error fetching student marks:", error);
      alert("Failed to fetch student marks.");
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };
  const [editIndex, setEditIndex] = useState(null); // Track which row is being edited
  const [studentData, setStudentData] = useState([
    { id: 1, name: "John Doe", marks: 85 },
    { id: 2, name: "Jane Smith", marks: 90 },
    { id: 3, name: "Bob Johnson", marks: 78 },
  ]);

  const handleEdit = (index) => {
    setEditIndex(index);
  };

  const handleSave = (index) => {
    setEditIndex(null);
  };

  const handleMarksChange = (index, newMarks) => {
    const updatedData = [...studentData];
    updatedData[index].marks = newMarks;
    setStudentData(updatedData);
  };

  return (
    <>
      <Navbarfaculty />
      <div className="faculty-assessment-tracker-container">
        <div className="faculty-assessment-tracker-course-selection">
          <label>Select Course: </label>
          <select
            // Store both courseID and course_code separated by "|"
            value={
              selectedCourse ? `${selectedCourse}|${selectedCourseCode}` : ""
            }
            onChange={(e) => {
              const value = e.target.value;
              if (value === "") {
                setSelectedCourse("");
                setSelectedCourseCode("");
              } else {
                const [courseID, courseCode] = value.split("|");
                setSelectedCourse(courseID);
                setSelectedCourseCode(courseCode);
              }
            }}
          >
            <option value="">-- Select Course --</option>
            {courses.map((course, index) => (
              <option
                key={index}
                value={`${course.courseID}|${course.course_code}`}
              >
                {course.course_code} {course.section}
              </option>
            ))}
          </select>
          <button
            className="get-assessment-btn"
            onClick={toggleAssessments}
            disabled={!selectedCourse || isFetching || showCreateForm}
          >
            {isLoaded ? "Hide Get Assessment" : "Get Assessment"}
          </button>
          <button
            className="create-assessment-btn"
            onClick={() => setShowCreateForm(!showCreateForm)}
            disabled={!selectedCourse || isFetching || isLoaded}
          >
            {showCreateForm ? "Hide Create Assessment" : "Create Assessment"}
          </button>
        </div>

        {isLoaded && selectedCourse && (
          <div className="faculty-assessment-tracker-table-container">
            <h3>Assessments for Course: {selectedCourseCode}</h3>
            <table className="faculty-assessment-tracker-table">
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Weight</th>
                  <th>Date</th>
                  <th>Semester</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {assessments?.map((assessment, index) => (
                  <tr key={index}>
                    <td>{assessment.assessment_type}</td>
                    <td>{assessment.assessment_weight}</td>
                    <td>{assessment.assessment_date}</td>
                    <td>{assessment.semester}</td>
                    <td>
                      <button onClick={() => handleGetData(assessment)}>
                        Get Data
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {showModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <button className="modal-close-btn" onClick={closeModal}>
                X
              </button>
              <h3>Student Marks</h3>
              <table className="modal-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Marks</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {studentData.map((student, index) => (
                    <tr key={student.id}>
                      <td>{student.id}</td>
                      <td>{student.name}</td>
                      <td>
                        {editIndex === index ? (
                          <input
                            type="number"
                            value={student.marks}
                            onChange={(e) =>
                              handleMarksChange(index, e.target.value)
                            }
                          />
                        ) : (
                          student.marks
                        )}
                      </td>
                      <td>
                        {editIndex === index ? (
                          <button onClick={() => handleSave(index)}>
                            Save
                          </button>
                        ) : (
                          <button onClick={() => handleEdit(index)}>
                            Edit
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {showCreateForm && (
          <div className="create-assessment-form">
            <h2>Create Assessment</h2>
            <form onSubmit={handleCreateAssessment}>
              <div>
                <label>Assessment Type: </label>
                <input
                  type="text"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  required
                />
              </div>
              <div>
                <label>Weight: </label>
                <input
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  required
                />
              </div>
              <div>
                <label>Assessment Date: </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </div>
              <div>
                <label>Semester: </label>
                <input
                  type="text"
                  value={semester}
                  onChange={(e) => setSemester(e.target.value)}
                  required
                />
              </div>
              <button type="submit">Create Assessment</button>
            </form>
            {message && <p className="success-message">{message}</p>}
            {error && <p className="error-message">{error}</p>}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default FacultyAssessmentTracker;
