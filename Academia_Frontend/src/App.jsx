import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import LoginPage from "./components/Login/LoginPage";
import Home from "./components/studentPages/studentDashboard/home.jsx";
import StudentAdvisingPage from "./components/studentPages/studentAdvisingPage/studentAdvisingPage.jsx";
import StudentCourseEnrollment from "./components/studentPages/studentCourseEnrollment/studentCourseEnrollment.jsx";
import StudentAdmission from "./components/adminPages/studentAdmissionPage/StudentAdmission.jsx";
import FacultyAdvisingPage from "./components/facultyPages/facultyAdvisingPage/facultyAdvisingPage.jsx";
import FacultyManagement from "./components/adminPages/facultyManagement/FacultyManagement.jsx";
import FacultyRecruitment from "./components/adminPages/facultyRecruitment/FacultyRecruitment.jsx";
import StudentResultPage from "./components/studentPages/studentResultPage/studentResultPage.jsx";
import FacultyHomePage from "./components/facultyPages/facultyDashboard/facultyHomePage.jsx";
import AdminHomePage from "./components/adminPages/adminDashboard/adminHomePage.jsx";
import ResetPassword from "./components/Login/ResetPassword.jsx";

function App() {
  const userData = JSON.parse(localStorage.getItem("userData"));

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {!userData ? (
          <Route path="*" element={<Navigate to="/login" replace />} />
        ) : (
          <>
            {userData.role === "student" && (
              <>
                <Route path="/" element={<Home />} />
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

            {userData.role === "faculty" && (
              <>
                <Route
                  path="/faculty-advising-page"
                  element={<FacultyAdvisingPage />}
                />
                <Route path="/" element={<FacultyHomePage />} />
              </>
            )}

            {userData.role === "admin" && (
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
                <Route path="/" element={<AdminHomePage />} />
              </>
            )}
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;
