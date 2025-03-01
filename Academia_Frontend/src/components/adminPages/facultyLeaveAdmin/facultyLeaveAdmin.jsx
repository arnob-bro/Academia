import { useState } from "react";
import { ChevronDown } from "lucide-react";
import "./facultyLeaveAdmin.css"; 
import Navbar from "../../navbar/AdminNavbar"; 
import Footer from "../../footer/footer";

const FacultyLeaveAdmin = () => {
  const [leaveRequests, setLeaveRequests] = useState([
    {
      id: 1,
      facultyId: "1456731",
      name: "Mr.Meow",
      department: "CSE",
      designation: "Lecturer II",
      startDate: "26.02.2024",
      endDate: "28.02.2024",
      totalDays: 3,
      totalLeavesTaken: 6,
      leaveType: "Sick Leave",
      remarks: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi...",
      status: "Pending",
    },
    {
      id: 2,
      facultyId: "1456731",
      name: "Mr.Meow",
      department: "CSE",
      designation: "Lecturer II",
      startDate: "26.02.2024",
      endDate: "28.02.2024",
      totalDays: 3,
      totalLeavesTaken: 6,
      leaveType: "Casual Leave",
      remarks: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi...",
      status: "Approved",
    },
    {
      id: 3,
      facultyId: "1456731",
      name: "Mr.Meow",
      department: "CSE",
      designation: "Lecturer II",
      startDate: "26.02.2024",
      endDate: "28.02.2024",
      totalDays: 3,
      totalLeavesTaken: 6,
      leaveType: "Annual Leave",
      remarks: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi...",
      status: "Rejected",
    },
    {
      id: 4,
      facultyId: "1456731",
      name: "Mr.Meow",
      department: "CSE",
      designation: "Lecturer II",
      startDate: "26.02.2024",
      endDate: "28.02.2024",
      totalDays: 3,
      totalLeavesTaken: 6,
      leaveType: "Sick Leave",
      remarks: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi...",
      status: "Approved",
    },
  ]);

  const handleStatusChange = (id, newStatus) => {
    setLeaveRequests((prevRequests) =>
      prevRequests.map((request) =>
        request.id === id ? { ...request, status: newStatus } : request
      )
    );
  };

  return (  
    <>
    <Navbar />
    <div className="min-h-screen bg-gradient-to-r from-yellow-200 via-pink-300 to-purple-300 p-8">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold text-purple-700 mt-6">
          Faculty Leave Request
        </h2>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full border-collapse bg-white shadow-lg rounded-lg">
            <thead>
              <tr className="bg-purple-600 text-white">
                <th className="p-2">Serial No.</th>
                <th className="p-2">Faculty Id</th>
                <th className="p-2">Faculty Name</th>
                <th className="p-2">Department</th>
                <th className="p-2">Designation</th>
                <th className="p-2">Start Date</th>
                <th className="p-2">End Date</th>
                <th className="p-2">Total Days</th>
                <th className="p-2">Total Leaves Taken</th>
                <th className="p-2">Leave Type</th>
                <th className="p-2">Remarks</th>
                <th className="p-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {leaveRequests.map((request, index) => (
                <tr key={request.id} className="border-b hover:bg-gray-100 transition duration-200">
                  <td className="p-2 text-center">{index + 1}</td>
                  <td className="p-2 text-center">{request.facultyId}</td>
                  <td className="p-2">{request.name}</td>
                  <td className="p-2">{request.department}</td>
                  <td className="p-2">{request.designation}</td>
                  <td className="p-2">{request.startDate}</td>
                  <td className="p-2">{request.endDate}</td>
                  <td className="p-2 text-center">{request.totalDays}</td>
                  <td className="p-2 text-center">{request.totalLeavesTaken}</td>
                  <td className="p-2 text-center">{request.leaveType}</td>
                  <td className="p-2">{request.remarks}</td>
                  <td className="p-2 flex items-center">
                    <select
                      className="border rounded p-1"
                      value={request.status}
                      onChange={(e) => handleStatusChange(request.id, e.target.value)}
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
      </div>
    </div>  
    <Footer />
    </>
  );
};

export default FacultyLeaveAdmin;
