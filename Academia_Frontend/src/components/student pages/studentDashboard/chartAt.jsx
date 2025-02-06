
import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

const data = [
  { name: "CSE3100", Present: 60, Absent: 10, Remaining: 30 },
  { name: "CSE3101", Present: 65, Absent: 15, Remaining: 20 },
  { name: "CSE3102", Present: 70, Absent: 10, Remaining: 20 },
  { name: "CSE3103", Present: 75, Absent: 5, Remaining: 20 },
  { name: "CSE3104", Present: 80, Absent: 10, Remaining: 10 },
  { name: "CSE3105", Present: 85, Absent: 5, Remaining: 10 }
];

const chartAt = () => {
  return (
    <div style={{ width: "100%", height: "300px" }}>  {/* Add this wrapper */}
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Present" stackId="a" fill="#92D050" />
          <Bar dataKey="Absent" stackId="a" fill="#E74C3C" />
          <Bar dataKey="Remaining" stackId="a" fill="#5B9BD5" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default chartAt;
