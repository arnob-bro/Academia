import React from 'react';
import './studentResultPage.css';
import Navbar from '../../navbar/navbar';
import Footer from '../../footer/footer';

export const StudentResultPage = () => {
  return (
    <>
      <Navbar />
      <div className="student-result-page-container">
        <h2 className="student-result-page-result-title">Result</h2>
        
        {/* Student Information Table */}
        <table className="student-result-page-student-info-table">
          <tbody>
            <tr>
              <td><strong>Student Name</strong></td>
              <td>Mickey Mouse</td>
            </tr>
            <tr>
              <td><strong>Registration Number</strong></td>
              <td>20220104008</td>
            </tr>
            <tr>
              <td><strong>Program</strong></td>
              <td>Bachelor of Science in Computer Science and Engineering</td>
            </tr>
            <tr>
              <td><strong>Department/School</strong></td>
              <td>Department of Computer Science and Engineering</td>
            </tr>
          </tbody>
        </table>

        {/* Semester Details Table */}
        <table className="student-result-page-semester-info-table">
          <tbody>
            <tr>
              <td><strong>Semester</strong></td>
              <td>2</td>
              <td><strong>Semester Credit Completed</strong></td>
              <td>19.5</td>
            </tr>
            <tr>
              <td><strong>Enrollment Semester</strong></td>
              <td>Spring 2022</td>
              <td><strong>Grade Point Average (GPA)</strong></td>
              <td>3.5</td>
            </tr>
            <tr>
              <td><strong>Current Semester</strong></td>
              <td>Spring 2024</td>
              <td><strong>Cumulative Credit Completed</strong></td>
              <td>60</td>
            </tr>
            <tr>
              <td><strong>Medium of Instruction</strong></td>
              <td>English</td>
              <td><strong>Cumulative Grade Point Average (CGPA)</strong></td>
              <td>3.47</td>
            </tr>
          </tbody>
        </table>

        {/* Result Table */}
        <table className="student-result-page-result-table">
          <thead>
            <tr>
              <th>Course Number</th>
              <th>Course Title</th>
              <th>Course Credit</th>
              <th colSpan="2">Final</th>
              <th colSpan="2">Improvement/Clearance</th>
            </tr>
            <tr>
              <th></th>
              <th></th>
              <th></th>
              <th>Letter Grade</th>
              <th>Grade Point</th>
              <th>Letter Grade</th>
              <th>Grade Point</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>CSE 3100</td>
              <td>Software Development</td>
              <td>3</td>
              <td>A-</td>
              <td>3.5</td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>CSE 3101</td>
              <td>Software Development</td>
              <td>3</td>
              <td>A-</td>
              <td>3.5</td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>CSE 3700</td>
              <td>Software Development</td>
              <td>3</td>
              <td>A-</td>
              <td>3.5</td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
      <Footer />
    </>
  );
};

export default StudentResultPage;