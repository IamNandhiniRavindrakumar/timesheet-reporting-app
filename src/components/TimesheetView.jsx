import { useEffect, useState } from "react";
import "../App.css";

function TimeSheetView() {
  const [UserEmail, setUserEmail] = useState("");
  const [entries, setEntries] = useState([]);
  const [role, setRole] = useState("Employee"); // can toggle between Employee & Manager
  const [filter, setFilter] = useState("all"); // all | weekly | monthly
  const [editIndex, setEditIndex] = useState(null);
  const [form, setForm] = useState({
    date: "",
    project: "",
    task: "",
    hours: "",
  });

  // Handle Add Entry (Employee only)
function handleAdd() {
  if (!form.date || !form.project || !form.task || !form.hours) {
    alert("Please fill all fields");
    return;
  }

  const newEntry = { ...form, status: "Pending" };
  setEntries([...entries, newEntry]); // updates state and triggers localStorage save
  setForm({ date: "", project: "", task: "", hours: "" }); // reset form
  alert("Entry logged!");
}


  //  Load data on mount
  useEffect(() => {
    let email = localStorage.getItem("currentUser") || "guest";
    setUserEmail(email);

    let data = JSON.parse(localStorage.getItem("timeSheetEntries")) || {};
    setEntries(data[email] || []);
  }, []);

  //  Save data whenever entries change
  useEffect(() => {
    let email = localStorage.getItem("currentUser") || "guest";
    let data = JSON.parse(localStorage.getItem("timeSheetEntries") || "{}");
    data[email] = entries;
    localStorage.setItem("timeSheetEntries", JSON.stringify(data));
  }, [entries]);

  //  Handle Edit (Employee only)
  function handleEdit(index) {
    setForm(entries[index]);
    setEditIndex(index);
  }

  //  Handle Save after Edit
  function handleSave() {
    const updated = [...entries];
    updated[editIndex] = { ...form, status: "Pending" };
    setEntries(updated);
    setEditIndex(null);
    setForm({ date: "", project: "", task: "", hours: "" });
  }

  //  Handle Delete (Employee only)
  function handleDelete(index) {
    const updated = entries.filter((_, i) => i !== index);
    setEntries(updated);
  }

  //  Approve / Reject (Manager only)
  function handleApprove(index) {
    const updated = [...entries];
    updated[index].status = "Approved";
    setEntries(updated);
  }

  function handleReject(index) {
    const updated = [...entries];
    updated[index].status = "Rejected";
    setEntries(updated);
  }

  // Handle Add Entry (Employee only)
function handleAdd() {
  if (!form.date || !form.project || !form.task || !form.hours) {
    alert("Please fill all fields");
    return;
  }

  const newEntry = { ...form, status: "Pending" };
  setEntries([...entries, newEntry]); // updates state and triggers localStorage save
  setForm({ date: "", project: "", task: "", hours: "" }); // reset form
  alert("Entry logged!");
}


  //  Filter Entries (weekly / monthly / all)
  function getFilteredEntries() {
    if (filter === "all") return entries;

    const now = new Date();
    return entries.filter((entry) => {
      const entryDate = new Date(entry.date);
      if (filter === "weekly") {
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(now.getDate() - 7);
        return entryDate >= oneWeekAgo;
      }
      if (filter === "monthly") {
        return (
          entryDate.getMonth() === now.getMonth() &&
          entryDate.getFullYear() === now.getFullYear()
        );
      }
      return true;
    });
  }

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-primary p-0">
      <div className="card shadow-lg p-4 w-100" style={{ maxWidth: "1000px" }}>
        <h3 className="mb-4 text-center">My TimeSheet</h3>

        {/* Role Switch */}
        <div className="mb-3 text-center">
          <label>Role: </label>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="Employee">Employee</option>
            <option value="Manager">Manager</option>
          </select>
        </div>

        {/* Filter Switch */}
        <div className="mb-3 text-center">
          <button onClick={() => setFilter("all")}>All</button>
          <button onClick={() => setFilter("weekly")}>Weekly</button>
          <button onClick={() => setFilter("monthly")}>Monthly</button>
        </div>

        {entries.length === 0 ? (
          <p className="mb-4 text-center">
            No Entries Found! Please Add your Work Log
          </p>
        ) : (
          <div className="mb-4 text-center">
            <table className="mb-4 text-center" border="1">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Project</th>
                  <th>Task</th>
                  <th>Hours</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {getFilteredEntries().map((entry, index) => (
                  <tr key={index}>
                    <td>{entry.date}</td>
                    <td>{entry.project}</td>
                    <td>{entry.task}</td>
                    <td>{entry.hours}</td>
                    <td>{entry.status}</td>
                    <td>
                      {role === "Employee" ? (
                        <>
                          <button onClick={() => handleEdit(index)}>Edit</button>
                          <button onClick={() => handleDelete(index)}>Delete</button>
                        </>
                      ) : (
                        <>
                          <button onClick={() => handleApprove(index)}>
                            Approve
                          </button>
                          <button onClick={() => handleReject(index)}>Reject</button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Edit Form (only when editing) */}
        {editIndex !== null && role === "Employee" && (
          <div className="mt-4">
            <h4>Edit Entry</h4>
            <input
              type="date"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
            />
            <input
              type="text"
              placeholder="Project"
              value={form.project}
              onChange={(e) => setForm({ ...form, project: e.target.value })}
            />
            <input
              type="text"
              placeholder="Task"
              value={form.task}
              onChange={(e) => setForm({ ...form, task: e.target.value })}
            />
            <input
              type="number"
              placeholder="Hours"
              value={form.hours}
              onChange={(e) => setForm({ ...form, hours: e.target.value })}
            />
            <button onClick={handleSave}>Save</button>
          </div>
        )}
        
      </div>
    </div>
  );
}

export default TimeSheetView;
