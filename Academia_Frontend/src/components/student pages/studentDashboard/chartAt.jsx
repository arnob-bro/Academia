import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const ChartAt = ({ data }) => {
  return (
    <div style={{ width: "100%", height: "300px" }}>
      {" "}
      {/* Add this wrapper */}
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

export default ChartAt;
