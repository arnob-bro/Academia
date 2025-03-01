import { useState } from "react";
import { Search, Edit, Trash2, X, ChevronUp, ChevronDown } from "lucide-react";
import Navbar from "../../navbar/AdminNavbar";
import Footer from "../../footer/footer";
import "./courseManagement.css"; 

const coursesData = {
  "Computer Science": [
    { code: "CSE1111", name: "DBMS", faculty: "Mr. Momo", enrollments: 60, credits: 3, details: "See Details..." },
    { code: "CSE1112", name: "CSE Math", faculty: "Mr. Momo", enrollments: 60, credits: 3, details: "See Details..." },
    { code: "CSE1113", name: "MNM", faculty: "Mr. Momo", enrollments: 60, credits: 3, details: "See Details..." },
    { code: "CSE1114", name: "SD", faculty: "Mr. Momo", enrollments: 60, credits: 3, details: "See Details..." },
  ],
  "Civil Engineering": [
    { code: "CIV2001", name: "Structural Analysis", faculty: "Dr. John", enrollments: 45, credits: 3, details: "See Details..." },
    { code: "CIV2002", name: "Fluid Mechanics", faculty: "Dr. Smith", enrollments: 50, credits: 3, details: "See Details..." },
  ],
  "Mechanical Engineering": [
    { code: "MECH3001", name: "Thermodynamics", faculty: "Dr. Alex", enrollments: 40, credits: 3, details: "See Details..." },
  ],
};

const majors = Object.keys(coursesData);

const CourseManagement = () => {
  const [selectedMajor, setSelectedMajor] = useState("Computer Science");
  const [courses, setCourses] = useState(coursesData[selectedMajor]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [newCourse, setNewCourse] = useState({
    code: "",
    name: "",
    faculty: "",
    enrollments: "",
    credits: "",
    details: "",
  });

  const handleMajorChange = (e) => {
    const major = e.target.value;
    setSelectedMajor(major);
    setCourses(coursesData[major]);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const filteredCourses = courses.filter(
    (course) =>
      course.name.toLowerCase().includes(searchTerm) || course.code.toLowerCase().includes(searchTerm)
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

  const handleAddOrEditCourse = () => {
    let updatedCourses = [...courses];

    if (isEditing) {
      updatedCourses[editIndex] = newCourse;
    } else {
      updatedCourses.push(newCourse);
    }

    setCourses(updatedCourses);
    coursesData[selectedMajor] = updatedCourses;
    setShowModal(false);
    setNewCourse({ code: "", name: "", faculty: "", enrollments: "", credits: "", details: "" });
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
            <div className="dropdown-container">
              <label>Select Major: </label>
              <select className="major-dropdown" onChange={handleMajorChange} value={selectedMajor}>
                {majors.map((major) => (
                  <option key={major} value={major}>
                    {major}
                  </option>
                ))}
              </select>
            </div>

            <div className="search-box">
              <Search className="search-icon" />
              <input type="text" placeholder="Search Course" className="search-input" value={searchTerm} onChange={handleSearchChange} />
            </div>

            <button className="add-btn" onClick={() => setShowModal(true)}>Add Course</button>
          </div>

          <div className="table-container">
            <table className="course-table">
              <thead>
                <tr>
                  {["code", "name", "faculty", "enrollments", "credits"].map((key) => (
                    <th key={key} onClick={() => handleSort(key)} style={{ cursor: "pointer" }}>
                      {key.charAt(0).toUpperCase() + key.slice(1)}{" "}
                      {sortConfig.key === key ? (sortConfig.direction === "asc" ? <ChevronUp /> : <ChevronDown />) : null}
                    </th>
                  ))}
                  <th>Course Details</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCourses.map((course, index) => (
                  <tr key={index}>
                    <td>{course.code}</td>
                    <td>{course.name}</td>
                    <td>{course.faculty}</td>
                    <td>{course.enrollments}</td>
                    <td>{course.credits}</td>
                    <td className="details-link">{course.details}</td>
                    <td className="action-icons">
                      <Edit className="edit-icon" onClick={() => handleEditCourse(index)} />
                      <Trash2 className="delete-icon" onClick={() => handleDeleteCourse(index)} />
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
              <X className="close-icon" onClick={() => setShowModal(false)} />
            </div>
            <div className="modal-body">
              {Object.keys(newCourse).map((key) => (
                <div key={key} className="input-group">
                  <label>{key.charAt(0).toUpperCase() + key.slice(1)}</label>
                  <input type={key === "enrollments" || key === "credits" ? "number" : "text"} name={key} value={newCourse[key]} onChange={handleInputChange} className="input-field" />
                </div>
              ))}
            </div>
            <div className="modal-footer">
              <button className="cancel-btn" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="save-btn" onClick={handleAddOrEditCourse}>{isEditing ? "Save" : "Add"}</button>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default CourseManagement;
