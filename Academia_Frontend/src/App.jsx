import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/student pages/studentDashboard/home";
import StudentAdvisingPage from "./components/student pages/studentAdvisingPage/studentAdvisingPage";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/course-advising" element={<StudentAdvisingPage />} />
      </Routes>
    </Router>
  );
}

export default App;
