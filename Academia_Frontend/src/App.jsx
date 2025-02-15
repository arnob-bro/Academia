import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import LoginPage from "./components/Login/LoginPage";
import Home from "./components/student pages/studentDashboard/home";
import StudentAdvisingPage from "./components/student pages/studentAdvisingPage/studentAdvisingPage";
import StudentCourseEnrollment from "./components/student pages/studentCourseEnrollment/studentCourseEnrollment.jsx";
import StudentAdmission from "./components/admin Pages/Student Admission Page/StudentAdmission.jsx";
import FacultyAdvisingPage from "./components/faculty pages/facultyAdvisingPage/facultyAdvisingPage";
import FacultyManagement from "./components/admin pages/Faculty Management/FacultyManagement.jsx";
import FacultyRecruitment from "./components/admin Pages/Faculty Recruitment/FacultyRecruitment.jsx";
import StudentResultPage from "./components/student pages/studentResultPage/studentResultPage.jsx";

function App() {
  const userData = JSON.parse(localStorage.getItem("userData"));

  return (
    <Router>
      <Routes>
        <Route path="/Login" element={<LoginPage />} />

        {!userData ? (
          <Route path="*" element={<Navigate to="/Login" replace />} />
        ) : (
          <>
            <Route path="/" element={<Home />} />

            {userData.Role === "student" && (
              <>
                <Route
                  path="/course-advising"
                  element={<StudentAdvisingPage />}
                />
                <Route
                  path="/course-enrollment"
                  element={<StudentCourseEnrollment />}
                />
                <Route
                  path="/student-result-page"
                  element={<StudentResultPage />}
                />
              </>
            )}

            {userData.Role === "faculty" && (
              <>
                <Route
                  path="/faculty-advising-page"
                  element={<FacultyAdvisingPage />}
                />
                <Route
                  path="/faculty-management"
                  element={<FacultyManagement />}
                />
                <Route
                  path="/faculty-recruitment"
                  element={<FacultyRecruitment />}
                />
              </>
            )}

            {userData.Role === "admin" && (
              <>
                <Route
                  path="/Student-Admission"
                  element={<StudentAdmission />}
                />
                <Route
                  path="/faculty-management"
                  element={<FacultyManagement />}
                />
                <Route
                  path="/faculty-recruitment"
                  element={<FacultyRecruitment />}
                />
              </>
            )}
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;
