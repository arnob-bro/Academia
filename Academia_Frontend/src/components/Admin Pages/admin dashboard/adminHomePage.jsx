import React from "react";
import "./adminHomePage.css";
import AdminNavbar from "../../navbar/AdminNavbar";
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
  return (
    <div>
      <AdminNavbar />
      <div className="dashboard-container">
        <main className="dashboard-content">
          <h2>Welcome, Admin</h2>
          <div className="dashboard-cards">
            <div className="card">
              <strong>Total Students:</strong> 1200
            </div>
            <div className="card">
              <strong>Total Faculty:</strong> 80
            </div>
            <div className="card">
              <strong>Active Courses:</strong> 35
            </div>
          </div>

          {/* Bar Chart */}
          <div className="chart-container">
            <h3>Department-wise Student & Faculty Count</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={data}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
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
      </div>
    </div>
  );
};

export default AdminHomePage;
