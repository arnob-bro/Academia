import React, { useState, useEffect } from "react";
import Navbar from "../../navbar/navbar";
import Footer from "../../footer/footer";
import "./studentAdvisingPage.css";
import {
  fetchEnrolledCoursesOfAStudentOfASemester,
  enrollInCourseApi,
  getAllCoursesApi,
  getAllSelectedCoursesApi,
} from "../../../Api/student";
// const courses = [
//   {
//     course_code: "CSE101",
//     name: "Introduction to Programming",
//     credit: 3,
//     time: ["Mon 10:00-11:00", "Wed 10:00-11:00"],
//     prerequisite: null,
//     section: "A",
//   },
//   {
//     course_code: "CSE101",
//     name: "Introduction to Programming",
//     credit: 3,
//     time: ["Mon 11:00-12:00", "Wed 11:00-12:00"],
//     prerequisite: null,
//     section: "B",
//   },
//   {
//     course_code: "CSE101",
//     name: "Introduction to Programming",
//     credit: 3,
//     time: ["Sun 10:00-11:00", "Tues 10:00-11:00"],
//     prerequisite: null,
//     section: "C",
//   },
//   {
//     course_code: "CSE102",
//     name: "Data Structures",
//     credit: 3,
//     time: ["Tue 10:00-12:00", "Thu 12:00-1:00"],
//     prerequisite: "CSE101",
//     section: "A",
//   },
//   {
//     course_code: "CSE102",
//     name: "Data Structures",
//     credit: 3,
//     time: ["Tue 10:00-11:00", "Wed 11:00-12:00"],
//     prerequisite: "CSE101",
//     section: "B",
//   },
//   {
//     course_code: "CSE201",
//     name: "Algorithms",
//     credit: 3,
//     time: ["Sun 1:00-2:00", " Mon 11:00-12:00"],
//     prerequisite: "CSE102",
//     section: "A",
//   },
//   {
//     course_code: "CSE201",
//     name: "Algorithms",
//     credit: 3,
//     time: ["Wed 10:00-11:00", "Fri 10-12"],
//     prerequisite: "CSE102",
//     section: "B",
//   },
//   {
//     course_code: "CSE201",
//     name: "Algorithms",
//     credit: 3,
//     time: ["Wed 11:00-12:00", "Mon 9:00-10:00"],
//     prerequisite: "CSE102",
//     section: "C",
//   },
//   {
//     course_code: "CSE202",
//     name: "Database Systems",
//     credit: 3,
//     time: ["Thu 9:00-10:00", "Wed 12:00-1:00"],
//     prerequisite: null,
//     section: "A",
//   },
// ];

const MAX_CREDITS = 18;

const StudentAdvisingPage = () => {
  const [availableCourses, setAvailableCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCourses, setSelectedCourses] = useState([]);

  const toggleCourseSelection = (course) => {
    const isAlreadySelected = selectedCourses.some(
      (c) =>
        c.course_code === course.course_code && c.section === course.section
    );

    // let newSelection = [...selectedCourses];

    if (isAlreadySelected) {
      // newSelection = newSelection.filter(
      //   (c) => !(c.code === course.code && c.section === course.section)
      // );
    } else {
      if (getTotalCredits() + course.credits <= MAX_CREDITS) {
        // newSelection.push(course);
        enrollInCourse(course);
      } else {
        alert(`Cannot exceed max credit limit of ${MAX_CREDITS}!`);
      }
    }
    // setSelectedCourses(newSelection);
  };

  const getTotalCredits = () =>
    selectedCourses.reduce((total, course) => total + course.credits, 0);

  // const submitAdvising = () => {
  //   if (selectedCourses.length === 0) {
  //     alert("Please select at least one course!");
  //     return;
  //   }
  //   alert("Advising submitted successfully!");
  // };

  const getAllCourses = async () => {
    setLoading(true);
    try {
      const data = await getAllCoursesApi();
      console.log(data);
      setAvailableCourses(data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getAllCourses();
  }, []);

  const getAllSelectedCourses = async () => {
    setLoading(true);
    try {
      const user = JSON.parse(localStorage.getItem("userData"));
      const data = await getAllSelectedCoursesApi(user.userID);
      console.log(data);
      setSelectedCourses(data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllSelectedCourses();
  }, []);

  const enrollInCourse = async (course) => {
    setLoading(true);
    try {
      console.log(course);
      const user = JSON.parse(localStorage.getItem("userData"));
      const data = await enrollInCourseApi(user.userID, course.courseID);
      console.log(data);
      if (data.success === true) {
        getAllCourses();
        getAllSelectedCourses();
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
    } finally {
      setLoading(false);
    }
  };

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
                <th>Vacant Seats</th>
                <th>prerequisite course code</th>
                <th>Day 1</th>
                <th>Starting Time</th>
                <th>Ending Time</th>
                <th>Day 2</th>
                <th>Starting Time</th>
                <th>Ending Time</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {availableCourses.map((course) => (
                <tr key={course.courseID}>
                  <td>{course.course_code}</td>
                  <td>{course.course_name}</td>
                  <td>{course.section}</td>
                  <td>{course.credits}</td>
                  <td>{course.number_of_vacant_seats}</td>
                  <td>{course.prerequisite_course_code}</td>
                  <td>{course.schedule_day_1}</td>
                  <td>{course.start_time_day_1}</td>
                  <td>{course.end_time_day_1}</td>
                  <td>{course.schedule_day_2}</td>
                  <td>{course.start_time_day_2}</td>
                  <td>{course.end_time_day_2}</td>
                  <td>
                    <button
                      onClick={() => toggleCourseSelection(course)}
                      className={
                        selectedCourses.some(
                          (c) =>
                            c.course_code === course.course_code &&
                            c.section === course.section
                        )
                          ? "selected"
                          : ""
                      }
                    >
                      {selectedCourses.some(
                        (c) =>
                          c.course_code === course.course_code &&
                          c.section === course.section
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
        Selected Courses Table
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
                  <tr key={course.course_code + course.section}>
                    <td>{course.course_code}</td>
                    <td>{course.course_name}</td>
                    <td>{course.credits}</td>
                    <td>
                      <button
                        onClick={() => toggleCourseSelection(course)}
                        className="delete-btn"
                      >
                        Remove
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
          {/* <button onClick={submitAdvising} className="submit-btn">
            Submit Advising
          </button> */}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default StudentAdvisingPage;
