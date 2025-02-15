import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./components/Login/LoginPage";
import Home from "./components/student pages/studentDashboard/home";
import StudentAdvisingPage from "./components/student pages/studentAdvisingPage/studentAdvisingPage";
import StudentCourseEnrollment from "./components/student pages/studentCourseEnrollment/studentCourseEnrollment.jsx";
import StudentAdmission from "./components/admin Pages/Student Admission Page/StudentAdmission.jsx";
import FacultyAdvisingPage from "./components/faculty pages/facultyAdvisingPage/facultyAdvisingPage";
import FacultyManagement from "./components/admin pages/Faculty Management/FacultyManagement.jsx"; 
import FacultyRecruitment from "./components/admin Pages/Faculty Recruitment/FacultyRecruitment.jsx";
import StudentResultPage from "./components/student pages/studentResultPage/studentResultPage.jsx";
import FacultyHomePage from "./components/faculty pages/facultyAdvisingPage/facultyDashboard/facultyHomePage.jsx";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/course-advising" element={<StudentAdvisingPage />} />
        <Route path="/Login" element={<LoginPage />} />

        <Route
          path="/course-enrollment"
          element={<StudentCourseEnrollment />}
        />
        <Route path="/Student-Admission" element={<StudentAdmission />} />

        <Route
          path="/course-enrollment"
          element={<StudentCourseEnrollment />}
        />

        <Route
          path="/student-result-page"
          element={<StudentResultPage />}
        />
        <Route
          path="/faculty-advising-page"
          element={<FacultyAdvisingPage />}
        />
        <Route
          path="/faculty-management"
          element={<FacultyManagement />}
        /> 
        <Route path="/faculty-recruitment" 
          element={<FacultyRecruitment/>} 
          />
           <Route
          path="/faculty-homepage"
          element={<FacultyHomePage />}
        /> 
      </Routes>
      
    </Router>
  );
}

export default App;
