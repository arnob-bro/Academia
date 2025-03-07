import React, { useState, useEffect } from "react";
import Navbarfaculty from "../../navbar/navbarfaculty";
import Footer from "../../footer/footer";
import "./facultyAssessmentTracker.css";
import { handleFetchCoursesOfAFacultyApi } from "../../../Api/faculty";
import axios from "axios";

const FacultyAssessmentTracker = () => {
  const [selectedCourse, setSelectedCourse] = useState("");
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
  const [isFetching, setIsFetching] = useState(false); // State to track if fetching is in progress

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (userData && userData.userID) {
      setFacultyID(userData.userID);
    }
  }, []);

  useEffect(() => {
    const fetchCourses = async () => {
      if (!facultyID) return;
      setIsFetching(true); // Set fetching to true while fetching data
      try {
        const allCourses = await handleFetchCoursesOfAFacultyApi(facultyID);
        setCourses(allCourses || []);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
      setIsFetching(false); // Set fetching to false when done
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
        `http://127.0.0.1:8000/api/faculty/courses/assessments`,
        {
          params: { courseID: selectedCourse }, // Add courseID parameter
          headers: { "Content-Type": "application/json" },
        }
      );

      // Ensure we're getting array data
      const data = Array.isArray(response?.data) ? response.data : [];
      setAssessments(data);
      setIsLoaded(true);
    } catch (error) {
      console.error("Error fetching assessments:", error);
      setAssessments([]); // Reset to empty array on error
      alert("Failed to fetch assessments.");
    }
    setIsFetching(false);
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

  const handleViewDetails = () => {
    setModalData(fetchModalData());
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <Navbarfaculty />
      <div className="faculty-assessment-tracker-container">
        <div className="faculty-assessment-tracker-course-selection">
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
          <button
            className="get-assessment-btn"
            onClick={fetchAssessments}
            disabled={!selectedCourse || isFetching || showCreateForm} // Disable if no course selected, fetching in progress, or create form is visible
          >
            Get Assessment
          </button>
          <button
            className="create-assessment-btn"
            onClick={() => setShowCreateForm(!showCreateForm)}
            disabled={!selectedCourse || isFetching || assessments.length > 0} // Disable if no course selected, fetching in progress, or assessments already exist
          >
            {showCreateForm ? "Hide Create Assessment" : "Create Assessment"}
          </button>
        </div>

        {isLoaded && selectedCourse && (
          <div className="faculty-assessment-tracker-table-container">
            <h3>Assessments for Course ID: {selectedCourse}</h3>
            <table className="faculty-assessment-tracker-table">
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Weight</th>
                  <th>Date</th>
                  <th>Semester</th>
                </tr>
              </thead>
              <tbody>
                {assessments?.map((assessment, index) => (
                  <tr key={index}>
                    <td>{assessment.assessment_type}</td>
                    <td>{assessment.assessment_weight}</td>
                    <td>{assessment.assessment_date}</td>
                    <td>{assessment.semester}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Modal */}
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
                  </tr>
                </thead>
                <tbody>
                  {modalData.map((item) => (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.name}</td>
                      <td>{item.marks}</td>
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
