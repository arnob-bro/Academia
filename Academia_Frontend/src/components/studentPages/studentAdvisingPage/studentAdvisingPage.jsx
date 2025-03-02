import React, { useState,useEffect } from "react";
import Navbar from "../../navbar/navbar";
import Footer from "../../footer/footer";
import "./studentAdvisingPage.css";
import { fetchEnrolledCoursesOfAStudentOfASemester } from "../../../Api/student";
import { getAllCoursesApi } from "../../../Api/student";
const courses = [
  {
    code: "CSE101",
    name: "Introduction to Programming",
    credit: 3,
    time: ["Mon 10:00-11:00", "Wed 10:00-11:00"],
    prerequisite: null,
    section: "A",
  },
  {
    code: "CSE101",
    name: "Introduction to Programming",
    credit: 3,
    time: ["Mon 11:00-12:00", "Wed 11:00-12:00"],
    prerequisite: null,
    section: "B",
  },
  {
    code: "CSE101",
    name: "Introduction to Programming",
    credit: 3,
    time: ["Sun 10:00-11:00", "Tues 10:00-11:00"],
    prerequisite: null,
    section: "C",
  },
  {
    code: "CSE102",
    name: "Data Structures",
    credit: 3,
    time: ["Tue 10:00-12:00", "Thu 12:00-1:00"],
    prerequisite: "CSE101",
    section: "A",
  },
  {
    code: "CSE102",
    name: "Data Structures",
    credit: 3,
    time: ["Tue 10:00-11:00", "Wed 11:00-12:00"],
    prerequisite: "CSE101",
    section: "B",
  },
  {
    code: "CSE201",
    name: "Algorithms",
    credit: 3,
    time: ["Sun 1:00-2:00", " Mon 11:00-12:00"],
    prerequisite: "CSE102",
    section: "A",
  },
  {
    code: "CSE201",
    name: "Algorithms",
    credit: 3,
    time: ["Wed 10:00-11:00", "Fri 10-12"],
    prerequisite: "CSE102",
    section: "B",
  },
  {
    code: "CSE201",
    name: "Algorithms",
    credit: 3,
    time: ["Wed 11:00-12:00", "Mon 9:00-10:00"],
    prerequisite: "CSE102",
    section: "C",
  },
  {
    code: "CSE202",
    name: "Database Systems",
    credit: 3,
    time: ["Thu 9:00-10:00", "Wed 12:00-1:00"],
    prerequisite: null,
    section: "A",
  },
];

const MAX_CREDITS = 18;

const StudentAdvisingPage = () => {
  const [selectedCourses, setSelectedCourses] = useState([]);

  const toggleCourseSelection = (course) => {
    const isAlreadySelected = selectedCourses.some(
      (c) => c.code === course.code && c.section === course.section
    );

    let newSelection = [...selectedCourses];

    if (isAlreadySelected) {
      newSelection = newSelection.filter(
        (c) => !(c.code === course.code && c.section === course.section)
      );
    } else {
      if (getTotalCredits() + course.credit <= MAX_CREDITS) {
        newSelection.push(course);
      } else {
        alert(`Cannot exceed max credit limit of ${MAX_CREDITS}!`);
      }
    }
    setSelectedCourses(newSelection);
  };

  const getTotalCredits = () =>
    selectedCourses.reduce((total, course) => total + course.credit, 0);

  const submitAdvising = () => {
    if (selectedCourses.length === 0) {
      alert("Please select at least one course!");
      return;
    }
    alert("Advising submitted successfully!");
  };

  const [data, setData] = useState({
    studentID: "",
    enrollment_semester: ""
  });
 
  const fetchEnrolledCourses = async () => {
    try {
      const enrollCourses = await fetchEnrolledCoursesOfAStudentOfASemester(data);
      setEnrolledCourses(enrollCourses);  
    } catch (error) {
      console.error("Failed to fetch enrolled courses:", error);
      alert("Failed to load enrolled courses!");
    }
  };
  useEffect(() => {
    fetchEnrolledCourses();
  }, []);  
  const [availableCourses, setAvailableCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getAllCourses = async () => {
      setLoading(true);
      try {
        const data = await getAllCoursesApi();  
        setAvailableCourses(data);  
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };

    getAllCourses();
  }, []); 
  return (
    <>
      <Navbar />
      <div className="student-advising-page-container">
        {/* Available Courses */}
        <div className="course-selection">
          <h2>Available Courses</h2>
          <table>
            <thead>
              <tr>
                <th>Course Code</th>
                <th>Course Name</th>
                <th>Section</th>
                <th>Credit</th>
                <th>Day 1</th>
                <th>Day 2</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course) => (
                <tr key={course.code + course.section}>
                  <td>{course.code}</td>
                  <td>{course.name}</td>
                  <td>{course.section}</td>
                  <td>{course.credit}</td>
                  <td>{course.time[0]}</td>
                  <td>{course.time[1]}</td>
                  <td>
                    <button
                      onClick={() => toggleCourseSelection(course)}
                      className={
                        selectedCourses.some(
                          (c) => c.code === course.code && c.section === course.section
                        )
                          ? "selected"
                          : ""
                      }
                    >
                      {selectedCourses.some(
                        (c) => c.code === course.code && c.section === course.section
                      )
                        ? "Remove"
                        : "Select"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Selected Courses Table */}
        <div className="selected-courses">
          <h3>Selected Courses</h3>
          {selectedCourses.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>Course Code</th>
                  <th>Course Name</th>
                  <th>Credit</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {selectedCourses.map((course) => (
                  <tr key={course.code + course.section}>
                    <td>{course.code}</td>
                    <td>{course.name}</td>
                    <td>{course.credit}</td>
                    <td>
                      <button
                        onClick={() => toggleCourseSelection(course)}
                        className="delete-btn"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No courses selected.</p>
          )}
          <p>
            <strong>Total Credits:</strong> {getTotalCredits()} / {MAX_CREDITS}
          </p>
          <button onClick={submitAdvising} className="submit-btn">
            Submit Advising
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default StudentAdvisingPage;
