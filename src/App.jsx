
import { useState, useEffect } from 'react';
import TimeEntryForm from "./components/TimeEntryForm";
import TimesheetView from "./components/TimesheetView";
import ReportDashboard from "./components/ReportDashboard";
import './App.css'

function App() {
const [page, setPage] = useState("entry");
const [userEmail, setUserEmail] = useState("");
const [entries, setEntries] = useState([]);


//to get data if there is no data in initial
useEffect(() => {
  if (!localStorage.getItem("currentUser")) {
    localStorage.setItem("currentUser", "guest");
  }
  const email = localStorage.getItem("currentUser");
  setUserEmail(email);

  let data = JSON.parse(localStorage.getItem("timeSheetEntries") || {
  "guest": [
    { "date": "2025-08-01", "project": "Website", "task": "Fix bug", "hours": 5, },
    { "date": "2025-08-02", "project": "UI Design", "task": "Write docs", "hours": 6, }
  ]
}
);

  // If no entries exist, create 50 fake entries
  if (!Array.isArray(data[email]) || data[email].length === 0) {
    data[email] = [];
    const projects = ["Website", "Mobile App", "Backend API", "UI Design", "Testing"];
    const tasks = ["Fix bug", "Add feature", "Write docs", "Code review", "Deploy"];

    for (let i = 1; i <= 50; i++) {
      let start = Math.floor(Math.random() * 8) + 8;
      let end = start + Math.floor(Math.random() * 5) + 1;
      let breaktime = Math.floor(Math.random() * 2);
      let overtime = Math.random() > 0.7 ? 1 : 0;
      let hours = (end - start) - breaktime + overtime;

      data[email].push({
        date: `2025-08-${String((i % 30) + 1).padStart(2, "0")}`,
        project: projects[Math.floor(Math.random() * projects.length)],
        task: tasks[Math.floor(Math.random() * tasks.length)],
        start,
        end,
        breaktime,
        overtime,
        notes: `Auto-generated entry ${i}`,
        hours,
        status: ["Pending", "Approved", "Rejected"][Math.floor(Math.random() * 3)]
      });
    }
    localStorage.setItem("timeSheetEntries", JSON.stringify(data));
  }

  setEntries(data[email]);
}, []);


  // Save entries whenever they change
  useEffect(() => {
    const email = localStorage.getItem("currentUser") || "guest";
    let data = JSON.parse(localStorage.getItem("timeSheetEntries") || "{}");
    data[email] = entries;
    localStorage.setItem("timeSheetEntries", JSON.stringify(data));
  }, [entries]);


  return (
    <>
      <div className='container-fluid p-0' >
        <nav className='navbar navbar-expand-lg navbar-dark bg-dark px-3'>
            <a className='navbar-brand' href='#'>Timesheet app</a>
            <div>
              <button className='btn btn-outline-light me-2' onClick={()=> setPage("entry")}>Time Entry</button>
              <button className='btn btn-outline-light me-2' onClick={()=> setPage("timesheet")}>Time Sheets</button>
              <button className='btn btn-outline-light me-2' onClick={()=> setPage("reports")}>Reports</button>
            </div>
        </nav>
      </div>
      
        {/* page content */}
        <div className='container-fluid p-0'>
            {page==="entry"&&<TimeEntryForm/>}
            {page==="timesheet"&&<TimesheetView/>}
            {page==="reports"&&<ReportDashboard/>}
        </div>  
    </>
  )
}

export default App
