import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../navbar/navbar";
import Footer from "../../footer/footer";
import ChartAt from "./chartAt";
import "./home.css";
import { getStudentInfoApi, fetchDailyScheduleApi } from "../../../Api/student";

const data = [
  { name: "CSE3100", Present: 60, Absent: 10, Remaining: 30 },
  { name: "CSE3101", Present: 65, Absent: 15, Remaining: 20 },
  { name: "CSE3102", Present: 70, Absent: 10, Remaining: 20 },
  { name: "CSE3103", Present: 75, Absent: 5, Remaining: 20 },
  { name: "CSE3104", Present: 80, Absent: 10, Remaining: 10 },
  { name: "CSE3105", Present: 85, Absent: 5, Remaining: 10 },
];

const Home = () => {
  const navigate = useNavigate();
  const [studentInfo, setStudentInfo] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state
  const [dailySchedule, setDailySchedule] = useState([]);

  useEffect(() => {
    const fetchStudentInfo = async () => {
      const user = JSON.parse(localStorage.getItem("userData"));
      if (user) {
        try {
          const studentData = await getStudentInfoApi(user.userID);
          setStudentInfo(studentData[0]);
        } catch (error) {
          console.error("Error fetching student info:", error);
        }
      }
      setLoading(false); // Mark loading as complete
    };

    fetchStudentInfo();
  }, []);

  useEffect(() => {
    const fetchDailySchedule = async () => {
      const user = JSON.parse(localStorage.getItem("userData"));
      if (user) {
        try {
          const dailyScheduleData = await fetchDailyScheduleApi(user.userID);
          setDailySchedule(dailyScheduleData);
        } catch (error) {
          console.error("Error fetching daily schedule:", error);
        }
      }
      setLoading(false); // Mark loading as complete
    };

    fetchDailySchedule();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="home-container">
        <div className="content">
          <div className="info-box">
            <p>
              <strong>Cgpa:</strong> {studentInfo?.cgpa || "N/A"}
            </p>
          </div>
          <div className="info-box">
            <p>
              <strong>Completed Credit:</strong>{" "}
              {studentInfo?.completedCredit || "N/A"}
            </p>
          </div>
          <div className="info-box">
            <p>
              <strong>Current Semester:</strong>{" "}
              {studentInfo?.currentSemester || "N/A"}
            </p>
          </div>
          <div className="info-box">
            <p>
              <strong>For Online Payment: </strong>
              <a href="#">Click me!</a>
            </p>
          </div>
        </div>

        <div className="profile-container">
          <div className="profile-box">
            <h3>Student Profile</h3>
            <p>
              <strong>Name:</strong> {studentInfo?.name || "N/A"}
            </p>
            <p>
              <strong>Student ID:</strong> {studentInfo?.studentID || "N/A"}
            </p>
            <p>
              <strong>Phone:</strong> {studentInfo?.phone_number || "N/A"}
            </p>
            <p>
              <strong>Father's Name:</strong>{" "}
              {studentInfo?.father_name || "N/A"}
            </p>
            <p>
              <strong>Mother's Name:</strong>{" "}
              {studentInfo?.mother_name || "N/A"}
            </p>
          </div>

          <div className="profile-box">
            <h3>Advisor Information</h3>
            <p>Name: {studentInfo?.advisor?.name || "N/A"}</p>
            <p>Room No: {studentInfo?.advisor?.room || "N/A"}</p>
            <p>Email: {studentInfo?.advisor?.email || "N/A"}</p>
            <p>Contact: {studentInfo?.advisor?.contact || "N/A"}</p>
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
                {dailySchedule?.map((schedule) => (
                  <tr key={schedule.scheduleID}>
                    <td>{schedule.course_code}</td>
                    <td>
                      {schedule.start_time} - {schedule.end_time}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div
              className="see-more"
              onClick={() => navigate("/student-class-routine")}
            >
              More →
            </div>
          </div>

          <div className="graph-box">
            <h3>Attendance Tracker</h3>
            <ChartAt data={data} />
          </div>
             
        </div>
    
      </div>
       <Footer />
    </>
  );
};

export default Home;
