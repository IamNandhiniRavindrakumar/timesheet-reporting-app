import { useState } from "react";
import '../App.css'

function TimeEntryForm() {
const [date, setDate] = useState("");
const [project,setProject] = useState("");
const [task, setTask] = useState("")
const [start, setStart] = useState("");
const [end, setEnd] = useState("");
const [breaktime, setBreaktime] = useState("");
const [overtime, setOvertime] = useState("")
const [notes, setNotes] = useState("");

const handleSubmit = (e) => {
    e.preventDefault();

    //get the current user name
    let userEmail = localStorage.getItem("currentUser") || "guest"

   
   // calculate hours - since hours aren't saved directly
let hours = (Number(end) - Number(start)) - Number(breaktime) + Number(overtime || 0);

   //store the data in object
  let newEntry = { date, project, task, start, end, breaktime, overtime, notes, hours };

    //get all the entries
    let data = JSON.parse(localStorage.getItem("timeSheetEntries")) || {}
    
    //creating an array incase if the person logs in first
    if(!data[userEmail]){
        data[userEmail] = []
    }

    //pushing the data 
    data[userEmail].push(newEntry)

    //save the data in the local storage
    localStorage.setItem("timeSheetEntries", JSON.stringify(data))

alert(`entry added : ${date} - ${project} - ${task} - ${hours}hrs`)

 setDate("");
 setStart("");
 setEnd("");
 setBreaktime("");
 setOvertime("")
 setProject("");
 setTask("");
 setNotes("");

}

    return(
        <div className="d-flex align-items-center justify-content-center min-vh-100 bg-primary" id="myBgClr">
        <div className="card shadow-lg p-4 w-100 text-justify" style={{ maxWidth: "700px" }}>
           <h3 className="mb-3 text-center">Log Work Hours</h3>

           <form onSubmit={handleSubmit}>

            <div className="mb-2">
                <label className="form-label me-5  ">Date</label>
                <input 
                className="ms-4" 
                placeholder="Date"
                type="date" 
                value={date} 
                onChange={(e)=>setDate(e.target.value)} required/>
            </div>

            <div className="mb-2">
                <label className="form-label me-4 ">Projects</label>
                <input 
                className="ms-4" 
                placeholder="Project"
                type="text" 
                value={project} 
                onChange={(e)=>setProject(e.target.value)} required/>
            </div>

            <div className="mb-2">
                <label className="form-label me-5 ">Tasks</label>
                <input 
                className="ms-4" 
                placeholder="Tasks"
                type="text" 
                value={task} 
                onChange={(e)=>{setTask(e.target.value)}} required/>
            </div>

            <div className="mb-2">
                <label className="form-label me-5 ">start : </label>
                <input 
                type="number" 
                className="ms-4" 
                placeholder="Start time"
                value={start} 
                onChange={(e)=>setStart(e.target.value)} required/>
            </div>

             <div className="mb-2">
                <label className="form-label me-5 ">end : </label>
                <input 
                type="number" 
                className="ms-4" 
                placeholder="End time"
                value={end} 
                onChange={(e)=>setEnd(e.target.value)} required/>
            </div>

            <div className="mb-2">
                <label className="form-label me-3 ">Breaktime </label>
                <input 
                type="number" 
                className="ms-4" 
                placeholder="Breaktime"
                value={breaktime} 
                onChange={(e)=>setBreaktime(e.target.value)} 
                min="0" required/>
            </div>

            <div className="mb-2">
                <label className="form-label me-4 ">overtime </label>
                <input 
                type="number"
                className="ms-4"  
                placeholder="overtime"
                value={overtime} 
                onChange={(e)=>setOvertime(e.target.value)} min="0"/>
            </div>

            <div className="mb-2">
                <label className="form-label me-5 ">Notes</label>
                <textarea 
                className="ms-4 w-50" 
                placeholder="write your notes here..."
                value={notes} 
                onChange={(e)=>setNotes(e.target.value)}/>
            </div>

            <button type="Submit" className="btn btn-primary w-100">Submit</button>
           </form>
        </div>
        </div>
    )
}

export default TimeEntryForm;