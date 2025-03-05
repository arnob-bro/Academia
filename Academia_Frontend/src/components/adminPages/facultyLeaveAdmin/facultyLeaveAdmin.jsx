import { useState, useEffect } from "react";
import Navbar from "../../navbar/AdminNavbar";
import Footer from "../../footer/footer";
import "./FacultyLeaveAdmin.css";

const FacultyLeaveAdmin = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaveRequests = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/admin/leave-application-request");
        const data = await response.json();
        setLeaveRequests(data);
      } catch (err) {
        setError("Failed to fetch leave requests");
      } finally {
        setLoading(false);
      }
    };
    fetchLeaveRequests();
  }, []);

  const handleStatusChange = async (leaveId, newStatus) => {
    try {
      const response = await fetch("http://localhost:8000/api/admin/leave-application-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ leave_id: leaveId, leave_status: newStatus })
      });
      const result = await response.json();
      if (result.message) {
        setLeaveRequests(prev => prev.map(request =>
          request.leave_id === leaveId ? { ...request, leave_status: newStatus } : request
        ));
      }
    } catch (err) {
      setError("Error updating leave status");
    }
  };

  const handleSubmitLeaveApplication = async (leaveData) => {
    try {
      const response = await fetch("http://localhost:8000/api/admin/postLeaveApplication", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(leaveData)
      });
      const result = await response.json();
      if (result.message) {
        alert("Leave application submitted successfully");
      }
    } catch (err) {
      setError("Error submitting leave application");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <>
      <Navbar />
      <div className="table-container">
        <h2 className="text-2xl font-bold text-purple-700 mt-6">Faculty Leave Requests</h2>
        <table>
          <thead>
            <tr>
              <th>Serial No.</th>
              <th>Faculty Id</th>
              <th>Name</th>
              <th>Department</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Leave Type</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {leaveRequests.map((request, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{request.facultyID}</td>
                <td>{request.name || "N/A"}</td>
                <td>{request.department || "N/A"}</td>
                <td>{request.start_date}</td>
                <td>{request.end_date}</td>
                <td>{request.leave_type}</td>
                <td>
                  <select
                    value={request.leave_status}
                    onChange={(e) => handleStatusChange(request.leave_id, e.target.value)}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Footer />
    </>
  );
};

export default FacultyLeaveAdmin;
