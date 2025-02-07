import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./components/Login/LoginPage";
import Home from "./components/student pages/studentDashboard/home";
import StudentAdvisingPage from "./components/student pages/studentAdvisingPage/studentAdvisingPage";
import FacultyAdvisingPage from "./components/faculty pages/facultyAdvisingPage/facultyAdvisingPage";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/course-advising" element={<StudentAdvisingPage />} />
        <Route path="/Login" element={<LoginPage />} />
        <Route
          path="/faculty-advising-page"
          element={<FacultyAdvisingPage />}
        />
      </Routes>
    </Router>
  );
}

export default App;
