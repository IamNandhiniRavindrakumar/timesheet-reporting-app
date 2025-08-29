import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

function ReportDashboard() {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const email = localStorage.getItem("currentUser") || "guest";
    const data = JSON.parse(localStorage.getItem("timeSheetEntries") || "{}");
    setEntries(data[email] || []);
  }, []);

  // Prepare data: total hours per project
  const reportData = entries.reduce((acc, entry) => {
    const found = acc.find((a) => a.project === entry.project);
    if (found) found.hours += Number(entry.hours);
    else acc.push({ project: entry.project, hours: Number(entry.hours) });
    return acc;
  }, []);

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-primary p-0">
      <div className="card shadow-lg p-4 w-100" style={{ maxWidth: "1000px" }}>
        <h3 className="mb-4 text-center">Reports</h3>
        {entries.length === 0 ? (
          <p className="text-center">No data available for reports</p>
        ) : (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={reportData}>
              <XAxis dataKey="project" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="hours" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}

export default ReportDashboard;
