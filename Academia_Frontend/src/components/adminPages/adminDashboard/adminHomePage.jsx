import React, { useState, useEffect } from "react";
import "./adminHomePage.css";
import AdminNavbar from "../../navbar/AdminNavbar";
import Footer from "../../footer/footer";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { department: "CSE", students: 300, faculty: 20 },
  { department: "EEE", students: 250, faculty: 18 },
  { department: "ME", students: 200, faculty: 15 },
  { department: "Civil", students: 180, faculty: 12 },
  { department: "BBA", students: 270, faculty: 22 },
];

const AdminHomePage = () => {
  const [semester, setSemester] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [dayOfWeek, setDayOfWeek] = useState("");

  useEffect(() => {
    // Fetch semester details from backend
    fetch("/api/semester-details")
      .then((res) => res.json())
      .then((data) => {
        setSemester(data.currentSemester);
        setStartDate(data.startDate);
        setEndDate(data.endDate);
        setDayOfWeek(data.currentDay);
      });
  }, []);

  return (
    <div>
      <AdminNavbar />
      <div className="admin-home-dashboard-container">
        <main className="admin-home-dashboard-content">
          <h2>Welcome, Admin</h2>
          <div className="admin-home-dashboard-cards">
            <div className="admin-home-card">
              <strong>Total Students:</strong> 1200
            </div>
            <div className="admin-home-card">
              <strong>Total Faculty:</strong> 80
            </div>
            <div className="admin-home-card">
              <strong>Active Courses:</strong> 35
            </div>
          </div>

          {/* Variable Control Box */}
          <div className="admin-home-variable-control">
            <h3>Variable Control</h3>
            <label>Current Semester:</label>
            <input type="text" value={semester} onChange={(e) => setSemester(e.target.value)} />

            <label>Semester Start Date:</label>
            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />

            <label>Semester End Date:</label>
            <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />

            <label>Current Day of Week:</label>
            <select value={dayOfWeek} onChange={(e) => setDayOfWeek(e.target.value)}>
              <option value="Sunday">Sunday</option>
              <option value="Monday">Monday</option>
              <option value="Tuesday">Tuesday</option>
              <option value="Wednesday">Wednesday</option>
              <option value="Thursday">Thursday</option>
            </select>
          </div>

          {/* Bar Chart */}
          <div className="admin-home-chart-container">
            <h3>Department-wise Student & Faculty Count</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <XAxis dataKey="department" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="students" fill="#3498db" name="Students" />
                <Bar dataKey="faculty" fill="#2ecc71" name="Faculty" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default AdminHomePage;