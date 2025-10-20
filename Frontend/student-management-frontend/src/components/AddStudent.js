import React, { useState } from "react";
import { studentAPI } from "../services/api";
import { toast } from "react-toastify";

const AddStudent = ({ refresh }) => {
  const [show, setShow] = useState(false);
  const [student, setStudent] = useState({
    name: "", 
    email: "", 
    course: "", 
    marks: "", 
    city: "",
    phoneNumber: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Ensure marks is sent as integer
      const submitData = {
        ...student,
        marks: parseInt(student.marks, 10)
      };
      
      await studentAPI.create(submitData);
      setShow(false);
      setStudent({ name: "", email: "", course: "", marks: "", city: "", phoneNumber: "" });
      toast.success("Student added successfully");
      refresh();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add student");
    }
  };

  return (
    <>
      <button onClick={() => setShow(true)} className="add">Add Student</button>
      {show && (
        <div className="modal-backdrop">
          <form onSubmit={handleSubmit} className="student-form modal">
            <h2 className="header-title">Add Student</h2>
            
            <input 
              type="text" 
              placeholder="Name" 
              className="student-form-input"
              value={student.name}
              onChange={e => setStudent({...student, name: e.target.value})}
              required
            />
            
            <input 
              type="email" 
              placeholder="Email" 
              className="student-form-input"
              value={student.email}
              onChange={e => setStudent({...student, email: e.target.value})}
              required
            />
            
            <select
              className="student-form-input"
              value={student.course}
              onChange={e => setStudent({...student, course: e.target.value})}
              required
            >
              <option value="">Select Course</option>
              <option value="Computer Science">Computer Science</option>
              <option value="Information Technology">Information Technology</option>
              <option value="Electronics">Electronics</option>
              <option value="Mechanical">Mechanical</option>
              <option value="Civil">Civil</option>
              <option value="Electrical">Electrical</option>
              <option value="Business Administration">Business Administration</option>
            </select>
            
            <input 
              type="number" 
              placeholder="Marks (0-100)" 
              className="student-form-input"
              value={student.marks}
              onChange={e => setStudent({...student, marks: e.target.value === '' ? '' : parseInt(e.target.value, 10)})}
              min="0"
              max="100"
              required
            />
            
            <input 
              type="text" 
              placeholder="City" 
              className="student-form-input"
              value={student.city}
              onChange={e => setStudent({...student, city: e.target.value})}
              required
            />
            
            <input 
              type="text" 
              placeholder="Phone Number (10 digits)" 
              className="student-form-input"
              value={student.phoneNumber}
              onChange={e => setStudent({...student, phoneNumber: e.target.value})}
              pattern="[0-9]{10}"
              maxLength="10"
            />
            
            <div className="form-button-row">
              <button type="submit" className="add">Save</button>
              <button type="button" onClick={() => setShow(false)} className="back">Cancel</button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default AddStudent;
