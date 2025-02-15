import React, { useState } from "react";
import "./FacultyManagement.css";
import AdminNavbar from "../AdminNavbar/AdminNavbar.jsx";
import Footer from "../../footer/footer.jsx";

export const FacultyManagement = () => {
  const [filterType, setFilterType] = useState("name");
  const [searchQuery, setSearchQuery] = useState("");
  const [facultyData, setFacultyData] = useState([
    {
      id: "F001",
      name: "John Doe",
      department: "Computer Science",
      courses: ["CS101", "CS102"],
      role: "admin",
    },
    {
      id: "F002",
      name: "Jane Smith",
      department: "Mathematics",
      courses: ["MATH101"],
      role: "N/A",
    },
    {
      id: "F003",
      name: "Jack Doe",
      department: "Computer Science",
      courses: ["CS101", "CS102"],
      role: "admin",
    },
    {
      id: "F004",
      name: "Meow Meow",
      department: "Computer Science",
      courses: ["CS101", "CS102"],
      role: "admin",
    },
  ]);

  const [selectedFaculty, setSelectedFaculty] = useState(null);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleFilterChange = (e) => setFilterType(e.target.value);
  const handleSearchChange = (e) => setSearchQuery(e.target.value);

  // Filtered faculty list based on search query
  const filteredFaculty = facultyData.filter((faculty) => {
    return faculty[filterType]
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
  });

  const openModal = (faculty) => {
    setSelectedFaculty(faculty);
    setSelectedCourses(faculty.courses);
    setIsModalOpen(true);
  };

  const handleCourseChange = (course) => {
    setSelectedCourses((prevCourses) =>
      prevCourses.includes(course)
        ? prevCourses.filter((c) => c !== course)
        : [...prevCourses, course]
    );
  };

  const saveSelectedCourses = () => {
    setFacultyData((prevData) =>
      prevData.map((faculty) =>
        faculty.id === selectedFaculty.id
          ? { ...faculty, courses: selectedCourses }
          : faculty
      )
    );
    setIsModalOpen(false);
  };

  return (
    <>
      <AdminNavbar />
      <div className="faculty-management-container">
        {/* Search Box */}
        <div className="faculty-management-search-box">
          <input
            type="text"
            placeholder="Search Faculty..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <select onChange={handleFilterChange}>
            <option value="name">Search by Name</option>
            <option value="id">Search by ID</option>
            <option value="department">Search by Department</option>
          </select>
        </div>

        {/* Faculty Table */}
        <table className="faculty-management-faculty-table">
          <thead>
            <tr>
              <th>Faculty ID</th>
              <th>Name</th>
              <th>Department</th>
              <th>Assigned Courses</th>
              <th>Administration Role</th>
            </tr>
          </thead>
          <tbody>
            {filteredFaculty.map((faculty) => (
              <tr key={faculty.id}>
                <td>{faculty.id}</td>
                <td>{faculty.name}</td>
                <td>{faculty.department}</td>
                <td>
                  <div className="faculty-management-selected-courses">
                    {faculty.courses.join(", ") || "No courses selected"}
                  </div>
                  <button
                    className="faculty-management-select-course-button"
                    onClick={() => openModal(faculty)}
                  >
                    Select Courses
                  </button>
                </td>
                <td>
                  <select
                    onChange={(e) =>
                      setFacultyData((prevData) =>
                        prevData.map((fac) =>
                          fac.id === faculty.id
                            ? { ...fac, role: e.target.value }
                            : fac
                        )
                      )
                    }
                    value={faculty.role}
                  >
                    <option value="admin">Admin</option>
                    <option value="N/A">N/A</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Course Selection Modal */}
      {isModalOpen && (
        <div className="faculty-management-modal">
          <div className="faculty-management-modal-content">
            <h3>Select Courses for {selectedFaculty.name}</h3>
            {["CS101", "CS102", "MATH101", "BIO101"].map((course) => (
              <label key={course}>
                <input
                  type="checkbox"
                  value={course}
                  checked={selectedCourses.includes(course)}
                  onChange={() => handleCourseChange(course)}
                />
                {course}
              </label>
            ))}
            <button onClick={saveSelectedCourses}>Save</button>
            <button onClick={() => setIsModalOpen(false)}>Cancel</button>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default FacultyManagement;
