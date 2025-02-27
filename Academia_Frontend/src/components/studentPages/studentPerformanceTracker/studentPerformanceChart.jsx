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

export const StudentPerformanceChart = ({ data }) => {
  return (
    <div style={{ width: "100%", height: "300px" }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis domain={[0, 100]} />
          <Tooltip />
          <Legend />
          <Bar dataKey="Highest" fill="#E74C3C" name="Highest Mark" />
          <Bar dataKey="MyScore" fill="#92D050" name="My Score" />
          <Bar dataKey="Average" fill="#5B9BD5" name="Average Score" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
