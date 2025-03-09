import React, { useState, useEffect } from "react";
import Navbarfaculty from "../../navbar/navbarfaculty";
import Footer from "../../footer/footer";
import "./facultyHomePage.css";
import { useNavigate } from "react-router-dom";
import {
  getFacultyInfoApi,
  getDailyScheduleOfAFacultyApi,
} from "../../../Api/faculty";

const FacultyHomePage = () => {
  const navigate = useNavigate();

  const [facultyInfo, setFacultyInfo] = useState({});
  const [dailySchedule, setDailySchedule] = useState([]);

  useEffect(() => {
    const faculty = JSON.parse(localStorage.getItem("userData"));

    if (!faculty) return;
    const getFacultyInfo = async () => {
      try {
        const data = await getFacultyInfoApi(faculty.userID);
        console.log(data);
        setFacultyInfo(data);
      } catch (error) {
        console.error("Error fetching leave history:", error);
      }
    };

    getFacultyInfo();
  }, []);

  useEffect(() => {
    const faculty = JSON.parse(localStorage.getItem("userData"));

    if (!faculty) return;
    const getDailyScheduleOfAFaculty = async () => {
      try {
        const data = await getDailyScheduleOfAFacultyApi(faculty.userID);
        console.log(data);
        setDailySchedule(data);
      } catch (error) {
        console.error("Error fetching daily routine:", error);
      }
    };

    getDailyScheduleOfAFaculty();
  }, []);

  const handleRequestLeave = () => {
    navigate("/faculty-leave-application");
  };

  return (
    <>
      <Navbarfaculty />
      <div>
        <div className="faculty-container">
          {/* Faculty Profile */}
          <div className="faculty-profile">
            <h2>Faculty Profile</h2>
            <div className="profile-content">
              <div className="profile-image"></div>
              <div className="profile-info">
                <p>
                  <strong>Name:</strong> {facultyInfo.name}
                </p>
                <p>
                  <strong>Id:</strong> {facultyInfo.facultyID}
                </p>
                <p>
                  <strong>Email:</strong> {facultyInfo.institutional_email}
                </p>
                <p>
                  <strong>Department:</strong> {facultyInfo.department}
                </p>
              </div>
            </div>
          </div>

          {/* Schedule and Leave Tracker */}
          <div className="faculty-info-section">
            <div className="schedule">
              <h3>Today's Schedule</h3>
              <p>
                <strong>Day:</strong> Tuesday | <strong>Date:</strong>{" "}
                14.01.2025
              </p>
              <table>
                <thead>
                  <tr>
                    <th>Subject</th>
                    <th>Time</th>
                    <th>Room Number</th>
                  </tr>
                </thead>
                <tbody>
                  {dailySchedule.map((schedule, index) => (
                    <tr key={schedule.scheduleID}>
                      <td>{schedule.scheduleID}</td>
                      <td>{schedule.start_time + " - " + schedule.end_time}</td>
                      <td>{schedule.room_no}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="leave-tracker">
              <h3>Leave Tracker</h3>
              <p>
                <strong>Total Number of Leaves (per year):</strong> 14
              </p>
              <p>
                <strong>Leaves Taken (till date):</strong> 5
              </p>
              <p>
                <strong>Remaining Leaves:</strong> 9
              </p>
              <button className="request-leave" onClick={handleRequestLeave}>
                Request Leave
              </button>
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
                  <td>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit...{" "}
                    <a href="#">Read More</a>
                  </td>
                </tr>
                <tr>
                  <td>01.01.2025</td>
                  <td>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit...{" "}
                    <a href="#">Read More</a>
                  </td>
                </tr>
                <tr>
                  <td>01.01.2025</td>
                  <td>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit...{" "}
                    <a href="#">Read More</a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Footer */}
          
        </div>
        <Footer />
      </div>
    </>
  );
};

export default FacultyHomePage;
