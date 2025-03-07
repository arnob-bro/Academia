import React, { useState, useEffect } from "react";
import "./adminHomePage.css";
import AdminNavbar from "../../navbar/AdminNavbar";
import Footer from "../../footer/footer";
import { updateVariablesApi } from "../../../Api/admin"; 
import { getVariablesApi } from "../../../Api/admin";
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
  const [currentWeek, setCurrentWeek] = useState("");
  const [dayOfWeek, setDayOfWeek] = useState("");

useEffect(() => {
    const getVariables = async () => {
      try {
        const allVariables = await getVariablesApi();
        setSemester(allVariables.current_semester || "");
        setStartDate(allVariables.semester_starting_date || "");
        setCurrentWeek(allVariables.current_week_no || "");
        setDayOfWeek(allVariables.current_day_of_week || "");
      } catch (error) {
        console.error("Error fetching Variables:", error);
      }
    };
    getVariables();
  }, []);

  const handleUpdateVariables = async () => {
    try {
      const formattedDate = new Date(startDate).toISOString().split("T")[0];

      const data = {
        current_semester: semester,
        semester_starting_date: formattedDate,
        current_week_no: Number(currentWeek),
        current_day_of_week: dayOfWeek,
      };

      console.log("Sending data:", data); // Debugging output

      const response = await updateVariablesApi(data);
      console.log("API Response:", response); // Debugging output

      alert(response.message || "Variables updated successfully!");
    } catch (error) {
      console.error("Update failed:", error.response?.data || error.message);
      alert(`Update failed: ${error.response?.data?.message || error.message}`);
    }
  };



const handleGetVariables = async () => {
  try {
    const response = await getVariablesApi(); // No need to pass data
    console.log("API Response:", response);
    setSemester(response.current_semester || "");
    setStartDate(response.semester_starting_date || "");
    setCurrentWeek(response.current_week_no || "");
    setDayOfWeek(response.current_day_of_week || "");
  } catch (error) {
    console.error("Fetch failed:", error.response?.data || error.message);
    alert(`Fetch failed: ${error.response?.data?.message || error.message}`);
  }
};


  return (
    <div>
      <AdminNavbar />
      <div className="admin-home-dashboard-container">
        <main className="admin-home-dashboard-content">
          <h2 className="welcomeadmin">Welcome, Admin</h2>
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
            <input
              type="text"
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
            />

            <label>Semester Start Date:</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />

            <label>Current Week:</label>
            <select
              value={currentWeek}
              onChange={(e) => setCurrentWeek(e.target.value)}
            >
              {Array.from({ length: 14 }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>

            <label>Current Day of Week:</label>
            <select
              value={dayOfWeek}
              onChange={(e) => setDayOfWeek(e.target.value)}
            >
              <option value="Sunday">Sunday</option>
              <option value="Monday">Monday</option>
              <option value="Tuesday">Tuesday</option>
              <option value="Wednesday">Wednesday</option>
              <option value="Thursday">Thursday</option>
            </select>

            <button onClick={handleUpdateVariables}>Update Variables</button>
          </div>

          {/* Bar Chart */}
          <div className="admin-home-chart-container">
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
        <Footer />
      </div>
    </div>
  );
};

export default AdminHomePage;
