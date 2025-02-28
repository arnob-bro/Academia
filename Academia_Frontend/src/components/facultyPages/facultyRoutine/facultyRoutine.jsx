import React from "react";
import Navbarfaculty from "../../navbar/navbarfaculty";
import Footer from "../../footer/footer";
import "./facultyRoutine.css";

const FacultyRoutine = () => {
  return (
    <>
    <Navbarfaculty/>
     <div className="routine-page">
      <div className="routine-container">
        <h2 className="routine-title">Faculty Class Routine</h2>

        {/* Faculty Info */}
        <div className="routine-info">
          <p><strong>Faculty Name:</strong> Dr. Mira Uddin</p>
          <p><strong>Department:</strong> Computer Science</p>
          <p><strong>Semester:</strong> Spring 2023</p>
        </div>

        {/* Routine Table */}
        <h3 className="semester-title">Class Schedule</h3>
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
                <td>CSE 3101 (Section B) 7A03</td>
                <td></td>
                <td></td>
                <td>CSE 3115 (Section A) 7B05</td>
                <td></td>
                <td>CSE 3203 (Lab) 7A06</td>
                <td></td>
              </tr>
              <tr>
                <td>Monday</td>
                <td>CSE 3101 (Section C) 7C02</td>
                <td></td>
                <td></td>
                <td></td>
                <td>CSE 3117 (Lecture) 7B04</td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>Tuesday</td>
                <td></td>
                <td></td>
                <td>CSE 3109 (Lab) 9A05</td>
                <td></td>
                <td>CSE 3203 (Lecture) 7A05</td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>

        <button className="download-btn">Download PDF</button>
      </div>  
       <Footer/>
    </div>
    </>
   
  )
}

export default FacultyRoutine
