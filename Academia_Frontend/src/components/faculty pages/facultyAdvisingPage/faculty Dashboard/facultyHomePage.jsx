import React from "react";
import Navbarfaculty from "../../../navbar/navbarfaculty";
import "./facultyHomePage.css";

const FacultyHomePage = () => {
    return (
      <div>
        <Navbarfaculty/> 
        <div className="faculty-container">
          {/* Faculty Profile */}
          <div className="faculty-profile">
            <h2>Faculty Profile</h2>
            <div className="profile-content">
              <div className="profile-image"></div>
              <div className="profile-info">
                <p><strong>Name:</strong> Mickey Mouse</p>
                <p><strong>Id:</strong> 20220104000</p>
                <p><strong>Phone:</strong> 01711111111</p>
                <p><strong>Department:</strong> CSE</p>
              </div>
            </div>
          </div>
          
          {/* Schedule and Leave Tracker */}
          <div className="faculty-info-section">
            <div className="schedule">
              <h3>Today's Schedule</h3>
              <p><strong>Day:</strong> Tuesday | <strong>Date:</strong> 14.01.2025</p>
              <table>
                <thead>
                  <tr>
                    <th>Subject</th>
                    <th>Time</th>
                    <th>Room Number</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>CSE3100</td>
                    <td>10:00 AM - 11:00 AM</td>
                    <td>7A07</td>
                  </tr>
                  <tr>
                    <td>CSE3101</td>
                    <td>11:00 AM - 12:00 PM</td>
                    <td>7A07</td>
                  </tr>
                  <tr>
                    <td>CSE3102</td>
                    <td>12:00 PM - 01:00 PM</td>
                    <td>7A07</td>
                  </tr>
                </tbody>
              </table>
            </div>
  
            <div className="leave-tracker">
              <h3>Leave Tracker</h3>
              <p><strong>Total Number of Leaves (per year):</strong> 14</p>
              <p><strong>Leaves Taken (till date):</strong> 5</p>
              <p><strong>Remaining Leaves:</strong> 9</p>
              <button className="request-leave">Request Leave</button>
            </div>
          </div>
          
          {/* Notice Board */}
          <div className="notice-board">
            <h3>Notice</h3>
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Details</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>01.01.2025</td>
                  <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit... <a href="#">Read More</a></td>
                </tr>
                <tr>
                  <td>01.01.2025</td>
                  <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit... <a href="#">Read More</a></td>
                </tr>
                <tr>
                  <td>01.01.2025</td>
                  <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit... <a href="#">Read More</a></td>
                </tr>
              </tbody>
            </table>
          </div>
  
          {/* Footer */}
          <footer>
            <p>Powered By ABCDEFGHIJK</p>
            <p>Copyright © 2025 Academia. All rights reserved.</p>
          </footer>
        </div>
      </div>
    );
  };
  
  export default FacultyHomePage;
  