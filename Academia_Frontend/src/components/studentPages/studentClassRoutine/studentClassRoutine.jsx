import React, { useState } from "react";
import Navbar from "../../navbar/navbar";
import Footer from "../../footer/footer";
import "./studentClassRoutine.css";

const StudentClassRoutine = () => {
  const [semester, setSemester] = useState("");
  const [section, setSection] = useState("");
  const [department, setDepartment] = useState("");
  const [showRoutine, setShowRoutine] = useState(false);

  const handleShowRoutine = () => {
    if (semester === "6" && section === "B" && department === "CSE") {
      setShowRoutine(true);
    } else {
      setShowRoutine(false);
    }
  };

  return (
    <div className="routine-page">
      <Navbar />

      <div className="routine-container">
        <h2 className="routine-title">Class Routine</h2>

        <div className="filter-section">
          <select value={semester} onChange={(e) => setSemester(e.target.value)}>
            <option value="">-- Select Semester --</option>
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i + 1} value={i + 1}>{i + 1}</option>
            ))}
          </select>

          <select value={section} onChange={(e) => setSection(e.target.value)}>
            <option value="">-- Select Section --</option>
            <option>A</option>
            <option>B</option>
            <option>C</option>
          </select>

          <select value={department} onChange={(e) => setDepartment(e.target.value)}>
            <option value="">-- Select Department --</option>
            <option>CSE</option>
            <option>EEE</option>
            <option>BBA</option>
            <option>ME</option>
          </select>

          <button className="show-routine-btn" onClick={handleShowRoutine}>
            Show Routine
          </button>
        </div>

        {showRoutine && (
          <>
            <h3 className="semester-title">Spring 2023</h3>

            <div className="routine-table">
              <table>
                <thead>
                  <tr>
                    <th>Time/Day</th>
                    <th>8:00 - 9:00 am</th>
                    <th>9:00 - 10:00 am</th>
                    <th>10:00 - 11:00 am</th>
                    <th>12:00 - 1:00 pm</th>
                    <th>1:00 - 2:00 pm</th>
                    <th>2:00 - 3:00 pm</th>
                    <th>3:00 - 4:00 pm</th>
                    <th>5:00 - 6:00 pm</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Sunday</td>
                    <td></td>
                    <td></td>
                    <td>CSE 3100 (Chowdhury) 7B07</td>
                    <td></td>
                    <td>CSE 3117 (Akhter) 7A03</td>
                    <td>CSE 3101 (Ansary) 7A03</td>
                    <td>HUM 3115 (Keya) 7A03</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>Monday</td>
                    <td></td>
                    <td>CSE 3103 (Tanny) 7C03</td>
                    <td>HUM 3115 (Keya) 7C03</td>
                    <td></td>
                    <td></td>
                    <td>CSE 3110 (Broti, Sohidul) 9A05</td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>Tuesday</td>
                    <td></td>
                    <td></td>
                    <td>CSE 3117 (Akhter) 7A05</td>
                    <td></td>
                    <td>CSE 3103 (Tanny) 7A05</td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>Wednesday</td>
                    <td></td>
                    <td>CSE 3104 (Tanny, Ansary) 7B05</td>
                    <td></td>
                    <td></td>
                    <td>CSE 3103 (Tanny) 7A06</td>
                    <td>CSE 3109 (Broti) 7A06</td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>Thursday</td>
                    <td>CSE 3109 (Broti) 7A06</td>
                    <td>CSE 3101 (Ansary) 7A06</td>
                    <td>CSE 3117 (Hossain) 7A06</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </div>

            <button className="download-btn">Download PDF</button>
          </>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default StudentClassRoutine;
