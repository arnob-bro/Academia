import React from "react";
import Navbar from "../../navbar/navbar";
import ChartAt from "./chartAt";
import "./home.css";


const data = [
  { name: "CSE3100", Present: 60, Absent: 10, Remaining: 30 },
  { name: "CSE3101", Present: 65, Absent: 15, Remaining: 20 },
  { name: "CSE3102", Present: 70, Absent: 10, Remaining: 20 },
  { name: "CSE3103", Present: 75, Absent: 5, Remaining: 20 },
  { name: "CSE3104", Present: 80, Absent: 10, Remaining: 10 },
  { name: "CSE3105", Present: 85, Absent: 5, Remaining: 10 },
];

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="home-container">
        <div className="content">
          <div className="info-box">
            <p><strong>Cgpa:</strong> 3.5</p>
          </div>
          <div className="info-box">
            <p><strong>Completed Credit:</strong> 60</p>
          </div>
          <div className="info-box">
            <p><strong>Current Semester:</strong> 1st</p>
          </div>
          <div className="info-box">
            <p><strong>For Online Payment: </strong>
              <a href="#">Click me!</a>
            </p>
          </div>
        </div>

        <div className="notice-board">
          <h2>Notice</h2>
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
                <td>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </p>
                  <p>
                    Sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                  </p>
                  <p>
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco
                    laboris nisi ...
                    <a href="#"> Read More</a>
                  </p>
                </td>
              </tr>
              <tr>
                <td>01.01.2025</td>
                <td>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </p>
                  <p>
                    Sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                  </p>
                  <p>
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco
                    laboris nisi ...
                    <a href="#"> Read More</a>
                  </p>
                </td>
              </tr>
              <tr>
                <td>01.01.2025</td>
                <td>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </p>
                  <p>
                    Sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                  </p>
                  <p>
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco
                    laboris nisi ...
                    <a href="#"> Read More</a>
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="profile-container">
          <div className="profile-box">
            <h3>Student Profile</h3>
            <p>Name: Safina</p>
            <p>Id: 2022010401</p>
            <p>Phone: 01711111111</p>
            <p>Father's Name: Howlader</p>
            <p>Mother's Name: Sabrina</p>
          </div>

          <div className="profile-box">
            <h3>Advisor Information</h3>
            <p>Name: Donald</p>
            <p>Room No: 7A01</p>
            <p>Email: donaldk@gmail.com</p>
            <p>Contact: 01722222222</p>
          </div>
        </div>

        <div className="routine-container">
          <div className="routine-box">
            <h3>Today's Class Routine</h3>
            <p>Day: Tuesday</p>
            <p>Date: 14.01.2025</p>
            <table>
              <thead>
                <tr>
                  <th>Subject</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>CSE3100</td>
                  <td>10:00 AM - 11:00 AM</td>
                </tr>
                <tr>
                  <td>CSE3101</td>
                  <td>11:00 AM - 12:00 PM</td>
                </tr>
                <tr>
                  <td>CSE3102</td>
                  <td>12:00 PM - 1:00 PM</td>
                </tr>
              </tbody>
            </table>
            <div className="see-more">More →</div>
          </div>

          <div className="graph-box">
            <h3>Attendance Tracker</h3>
            <ChartAt data={data} />
          </div>
        </div>

        <footer className="footer">
          <p>Powered By ABCDEF</p>
          <p>Copyright © 2025 Academia. All rights reserved.</p>
        </footer>
      </div>
    </>
  );
};

export default Home;
