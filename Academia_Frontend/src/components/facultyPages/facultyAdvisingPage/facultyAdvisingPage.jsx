import React, { useState } from "react";
import Navbarfaculty from "../../navbar/navbarfaculty";
import Footer from "../../footer/footer";
import "./facultyAdvisingPage.css";

const students = [
  {
    id: "2022010401",
    name: "Safina",
    cgpa: 3.5,
    completedCredits: 60,
    semester: "3rd",
    phone: "01711111111",
    fatherName: "Howlader",
    motherName: "Sabrina",
    completedCourses: [
      { code: "CSE101", name: "Intro to Programming", grade: "A" },
      { code: "CSE102", name: "Data Structures", grade: "A-" },
      { code: "CSE201", name: "Algorithms", grade: "B+" },
    ],
    performance: {
      "1st Semester": { GPA: 3.4 },
      "2nd Semester": { GPA: 3.6 },
    },
    selectedCourses: ["CSE202", "CSE203"],
    status: "Pending",
  },
  {
    id: "20220104014",
    name: "Morjina",
    cgpa: 3.6,
    completedCredits: 66,
    semester: "3rd",
    phone: "01711111111",
    fatherName: "Howlader",
    motherName: "Sabrina",
    completedCourses: [
      { code: "CSE101", name: "Intro to Programming", grade: "A" },
      { code: "CSE102", name: "Data Structures", grade: "A-" },
      { code: "CSE201", name: "Algorithms", grade: "B+" },
    ],
    performance: {
      "1st Semester": { GPA: 3.4 },
      "2nd Semester": { GPA: 3.6 },
    },
    selectedCourses: ["CSE202", "CSE203"],
    status: "Pending",
  },
];

const availableCourses = [
  { code: "CSE202", name: "Database Systems", credit: 3 },
  { code: "CSE203", name: "Operating Systems", credit: 3 },
  { code: "CSE204", name: "Computer Networks", credit: 3 },
];

const FacultyAdvisingPage = () => {
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [studentsData, setStudentsData] = useState(students);
  const [maxCredits, setMaxCredits] = useState(15);

  const handleStudentSelection = (studentId) => {
    const student = studentsData.find((s) => s.id === studentId);
    setSelectedStudent(student);
  };

  const approveAdvising = () => {
    if (selectedStudent) {
      const updatedStudents = studentsData.map((s) =>
        s.id === selectedStudent.id ? { ...s, status: "Approved" } : s
      );
      setStudentsData(updatedStudents);
      setSelectedStudent({ ...selectedStudent, status: "Approved" });
    }
  };

  const rejectAdvising = () => {
    if (selectedStudent) {
      const updatedStudents = studentsData.map((s) =>
        s.id === selectedStudent.id ? { ...s, status: "Rejected" } : s
      );
      setStudentsData(updatedStudents);
      setSelectedStudent({ ...selectedStudent, status: "Rejected" });
    }
  };

  const suggestCourse = (courseCode) => {
    if (selectedStudent) {
      const updatedCourses = [...selectedStudent.selectedCourses, courseCode];
      setSelectedStudent({
        ...selectedStudent,
        selectedCourses: updatedCourses,
      });
    }
  };

  return (
    <>
      <Navbarfaculty/>
      <div className="faculty-advising-container">
        <h1>Faculty Advising Panel</h1>

        {/* Student List */}
        <div className="student-list">
          <h2>Students</h2>
          <ul>
            {studentsData.map((student) => (
              <li
                key={student.id}
                className={selectedStudent?.id === student.id ? "selected" : ""}
                onClick={() => handleStudentSelection(student.id)}
              >
                {student.name} ({student.id}) - {student.status}
              </li>
            ))}
          </ul>
        </div>

        {/* Student Details */}
        {selectedStudent && (
          <div className="student-details">
            <h2>Student Details</h2>
            <p>
              <strong>Name:</strong> {selectedStudent.name}
            </p>
            <p>
              <strong>ID:</strong> {selectedStudent.id}
            </p>
            <p>
              <strong>Phone:</strong> {selectedStudent.phone}
            </p>
            <p>
              <strong>CGPA:</strong> {selectedStudent.cgpa}
            </p>
            <p>
              <strong>Completed Credits:</strong>{" "}
              {selectedStudent.completedCredits}
            </p>
            <p>
              <strong>Current Semester:</strong> {selectedStudent.semester}
            </p>
            <p>
              <strong>Father's Name:</strong> {selectedStudent.fatherName}
            </p>
            <p>
              <strong>Mother's Name:</strong> {selectedStudent.motherName}
            </p>

            {/* Student Performance */}
            <h3>Student Performance</h3>
            <ul>
              {Object.entries(selectedStudent.performance).map(
                ([sem, data]) => (
                  <li key={sem}>
                    <strong>{sem}:</strong> GPA {data.GPA}
                  </li>
                )
              )}
            </ul>

            {/* Completed Courses */}
            <h3>Completed Courses</h3>
            <ul>
              {selectedStudent.completedCourses.map((course) => (
                <li key={course.code}>
                  {course.code} - {course.name} (Grade: {course.grade})
                </li>
              ))}
            </ul>

            {/* Selected Courses */}
            <h3>Selected Courses</h3>
            <ul>
              {selectedStudent.selectedCourses.map((courseCode) => {
                const course = availableCourses.find(
                  (c) => c.code === courseCode
                );
                return (
                  <li key={courseCode}>
                    {course?.code} - {course?.name}
                  </li>
                );
              })}
            </ul>

            {/* Approve / Reject Actions */}
            <div className="action-buttons">
              <button className="approve-btn" onClick={approveAdvising}>
                Approve
              </button>
              <button className="reject-btn" onClick={rejectAdvising}>
                Reject
              </button>
            </div>

            {/* Suggest Courses */}
            <h3>Suggest Courses</h3>
            <ul>
              {availableCourses.map((course) => (
                <li key={course.code}>
                  {course.code} - {course.name}
                  <button onClick={() => suggestCourse(course.code)}>
                    Suggest
                  </button>
                </li>
              ))}
            </ul>

            {/* Set Max Credit Limit */}
            <h3>Set Max Credit Limit</h3>
            <input
              type="number"
              value={maxCredits}
              onChange={(e) => setMaxCredits(e.target.value)}
            />
            <p>Current Max Credits: {maxCredits}</p>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default FacultyAdvisingPage;
