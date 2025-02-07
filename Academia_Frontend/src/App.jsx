import React from "react"; 
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; 
import LoginPage from "./components/Login/LoginPage";
import Home from "./components/student pages/studentDashboard/home";
import StudentAdvisingPage from "./components/student pages/studentAdvisingPage/studentAdvisingPage";
import StudentCourseEnrollment from "./components/student pages/studentCourseEnrollment/studentCourseEnrollment.jsx";
import StudentAdmission from "./components/Admin Pages/Student Admission Page/StudentAdmission.jsx"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/course-advising" element={<StudentAdvisingPage />} /> 
        <Route path="/Login" element={<LoginPage />} />

        <Route path="/course-enrollment" element={<StudentCourseEnrollment />} />
        <Route path="/Student-Admission" element={<StudentAdmission/>}/>
 
      </Routes>
    </Router>
  );
}

export default App;
