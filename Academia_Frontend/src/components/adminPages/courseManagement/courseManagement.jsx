import { useState, useEffect } from "react";
import { Search, Edit, Trash2, X, ChevronUp, ChevronDown } from "lucide-react";
import Navbar from "../../navbar/AdminNavbar";
import Footer from "../../footer/footer";
import "./courseManagement.css";
import {
  getAllCoursesApi,
  getAllFacultyApi,
  createNewCourseApi,
  editACourseApi,
} from "../../../Api/admin";

// const majors = Object.keys(coursesData);
const departments = ["CSE", "BBA", "ME", "EEE"];

const CourseManagement = () => {
  const [selectedMajor, setSelectedMajor] = useState("Computer Science");
  const [courses, setCourses] = useState([]);
  const [faculties, setFaculties] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [newCourse, setNewCourse] = useState({
    course_code: "",
    course_name: "",
    department: "",
    description: "",
    credits: "",
    section: "",
    facultyID: "",
    number_of_vacant_seats: 0,
    prerequisite_course_code: "",
  });

  const createNewCourse = async (newCourse) => {
    // setLoading(true);
    try {
      const data = await createNewCourseApi(newCourse);
      console.log(data);
    } catch (error) {
      console.error("Error creating course", error);
    } finally {
      // setLoading(false);
    }
  };

  const editACourse = async (course) => {
    // setLoading(true);
    try {
      const data = await editACourseApi(course);
      console.log(data);
    } catch (error) {
      console.error("Error editing course", error);
      alert("Error editing course", error);
    } finally {
      // setLoading(false);
    }
  };

  const getAllCourses = async () => {
    // setLoading(true);
    try {
      const data = await getAllCoursesApi();
      console.log(data);
      setCourses(data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    } finally {
      // setLoading(false);
    }
  };
  useEffect(() => {
    getAllCourses();
  }, []);

  const getAllFaculty = async () => {
    // setLoading(true);
    try {
      const data = await getAllFacultyApi();
      console.log(data);
      setFaculties(data);
    } catch (error) {
      console.error("Error fetching faculties:", error);
    } finally {
      // setLoading(false);
    }
  };
  useEffect(() => {
    getAllFaculty();
  }, []);

  // const handleMajorChange = (e) => {
  //   const major = e.target.value;
  //   setSelectedMajor(major);
  //   setCourses(coursesData[major]);
  // };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const filteredCourses = courses.filter(
    (course) =>
      course.course_name?.toLowerCase().includes(searchTerm) ||
      course.course_code?.toLowerCase().includes(searchTerm)
  );

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }

    const sortedCourses = [...filteredCourses].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setCourses(sortedCourses);
    setSortConfig({ key, direction });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCourse({ ...newCourse, [name]: value });
  };

  const handleAddOrEditCourse = async () => {
    if (
      !newCourse.course_code ||
      !newCourse.course_name ||
      !newCourse.department ||
      !newCourse.credits ||
      !newCourse.facultyID ||
      !newCourse.section
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    let updatedCourses = [...courses];

    if (isEditing) {
      await editACourse(newCourse);
      updatedCourses[editIndex] = newCourse;
    } else {
      await createNewCourse(newCourse);
      updatedCourses.push(newCourse);
    }

    setCourses(updatedCourses);
    // coursesData[selectedMajor] = updatedCourses;
    setShowModal(false);
    setNewCourse({
      course_code: "",
      course_name: "",
      department: "",
      description: "",
      credits: "",
      section: "",
      facultyID: "",
      number_of_vacant_seats: "",
      prerequisite_course_code: "",
    });
    setIsEditing(false);
  };

  const handleEditCourse = (index) => {
    setNewCourse(courses[index]);
    setEditIndex(index);
    setIsEditing(true);
    setShowModal(true);
  };

  const handleDeleteCourse = (index) => {
    const updatedCourses = courses.filter((_, i) => i !== index);
    setCourses(updatedCourses);
    coursesData[selectedMajor] = updatedCourses;
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="course-management">
          <h2 className="title">Course Management</h2>

          <div className="top-controls">
            {/* <div className="dropdown-container">
              <label>Select Major: </label>
              <select
                className="major-dropdown"
                onChange={handleMajorChange}
                value={selectedMajor}
              >
                {majors.map((major) => (
                  <option key={major} value={major}>
                    {major}
                  </option>
                ))}
              </select>
            </div> */}

            <div className="search-box">
              <Search className="search-icon" aria-label="Search" />
              <input
                type="text"
                placeholder="Search Course"
                className="search-input"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>

            <button className="add-btn" onClick={() => setShowModal(true)}>
              Add Course
            </button>
          </div>

          <div className="table-container">
            <table className="course-table">
              <thead>
                <tr>
                  {[
                    "course_code",
                    "course_name",
                    "department",
                    "credits",
                    "section",
                    "facultyID",
                    "number_of_vacant_seats",
                    "prerequisite_course_code",
                  ].map((key) => (
                    <th
                      key={key}
                      onClick={() => handleSort(key)}
                      style={{ cursor: "pointer" }}
                    >
                      {key.charAt(0).toUpperCase() +
                        key.slice(1).replace(/_/g, " ")}{" "}
                      {sortConfig.key === key ? (
                        sortConfig.direction === "asc" ? (
                          <ChevronUp />
                        ) : (
                          <ChevronDown />
                        )
                      ) : null}
                    </th>
                  ))}
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCourses.map((course, index) => (
                  <tr key={index}>
                    <td>{course.course_code}</td>
                    <td>{course.course_name}</td>
                    <td>{course.department}</td>
                    <td>{course.credits}</td>
                    <td>{course.section}</td>
                    <td>{course.facultyID}</td>
                    <td>{course.number_of_vacant_seats}</td>
                    <td>{course.prerequisite_course_code}</td>
                    <td className="action-icons">
                      <Edit
                        className="edit-icon"
                        aria-label="Edit"
                        onClick={() => handleEditCourse(index)}
                      />
                      {/* <Trash2
                        className="delete-icon"
                        aria-label="Delete"
                        onClick={() => handleDeleteCourse(index)}
                      /> */}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>{isEditing ? "Edit Course" : "Add Course"}</h2>
              <X
                className="close-icon"
                aria-label="Close"
                onClick={() => setShowModal(false)}
              />
            </div>
            <div className="modal-body">
              <div className="input-group">
                <label>Course Code</label>
                <input
                  type="text"
                  name="course_code"
                  value={newCourse.course_code}
                  onChange={handleInputChange}
                  className="input-field"
                />
              </div>
              <div className="input-group">
                <label>Course Name</label>
                <input
                  type="text"
                  name="course_name"
                  value={newCourse.course_name}
                  onChange={handleInputChange}
                  className="input-field"
                />
              </div>
              <div className="input-group">
                <label>Department</label>
                <select
                  name="department"
                  value={newCourse.department}
                  onChange={handleInputChange}
                  className="input-field"
                >
                  <option value="">Select Department</option>
                  {departments.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
              </div>
              <div className="input-group">
                <label>Description</label>
                <input
                  type="text"
                  name="description"
                  value={newCourse.description}
                  onChange={handleInputChange}
                  className="input-field"
                />
              </div>
              <div className="input-group">
                <label>Credit</label>
                <input
                  type="number"
                  step="0.1"
                  name="credits"
                  value={newCourse.credits}
                  onChange={handleInputChange}
                  className="input-field"
                />
              </div>
              <div className="input-group">
                <label>Section</label>
                <input
                  type="text"
                  name="section"
                  value={newCourse.section}
                  onChange={handleInputChange}
                  className="input-field"
                />
              </div>
              <div className="input-group">
                <label>Faculty ID</label>
                <select
                  name="facultyID"
                  value={newCourse.facultyID}
                  onChange={handleInputChange}
                  className="input-field"
                >
                  <option value="">Select Faculty</option>
                  {faculties.map((faculty) => (
                    <option key={faculty.facultyID} value={faculty.facultyID}>
                      {faculty.facultyID}
                    </option>
                  ))}
                </select>
              </div>
              <div className="input-group">
                <label>Number of Vacant Seats</label>
                <input
                  type="number"
                  name="number_of_vacant_seats"
                  value={newCourse.number_of_vacant_seats}
                  onChange={handleInputChange}
                  className="input-field"
                />
              </div>
              <div className="input-group">
                <select
                  name="prerequisite_course_code"
                  value={newCourse.prerequisite_course_code || ""}
                  onChange={handleInputChange}
                  className="input-field"
                >
                  <option value="">Select Prerequisite Course</option>
                  {courses.map((course) => (
                    <option key={course.courseID} value={course.course_code}>
                      {course.course_code}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="modal-footer">
              <button
                className="cancel-btn"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button className="save-btn" onClick={handleAddOrEditCourse}>
                {isEditing ? "Save" : "Add"}
              </button>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default CourseManagement;
