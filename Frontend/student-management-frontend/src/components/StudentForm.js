import React, { useEffect, useState } from "react";
import { studentAPI } from "../services/api";
import { toast } from "react-toastify";

function StudentForm({ student, onBack }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    course: "",
    marks: "",
    city: "",
    phoneNumber: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (student) setForm(student);
  }, [student]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Convert marks to integer for proper backend handling
    const processedValue = name === 'marks' ? (value === '' ? '' : parseInt(value, 10)) : value;
    setForm({ ...form, [name]: processedValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Ensure marks is sent as integer
      const submitData = {
        ...form,
        marks: parseInt(form.marks, 10)
      };
      
      if (student) {
        await studentAPI.update(student.id, submitData);
        toast.success("✅ Student updated successfully!");
      } else {
        await studentAPI.create(submitData);
        toast.success("✅ Student added successfully!");
      }
      onBack();
    } catch (err) {
      console.error("Error saving student:", err);
      const errorMsg = err.response?.data?.message || "Error saving student. Please try again.";
      toast.error(`❌ ${errorMsg}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="form-header">
        <h2 className="form-title">{student ? "✏️ Edit Student" : "➕ Add New Student"}</h2>
        <p className="form-subtitle">{student ? "Update student information" : "Fill in the details to add a new student"}</p>
      </div>
      <form onSubmit={handleSubmit} className="student-form">
        <div className="form-field">
          <label htmlFor="name">Name *</label>
          <input 
            type="text" 
            id="name"
            name="name" 
            placeholder="Enter student name" 
            value={form.name} 
            onChange={handleChange} 
            required 
            minLength="2"
          />
        </div>
        
        <div className="form-field">
          <label htmlFor="email">Email Address *</label>
          <input 
            type="email" 
            id="email"
            name="email" 
            placeholder="example@email.com" 
            value={form.email} 
            onChange={handleChange} 
            required 
          />
        </div>
        
        <div className="form-field">
          <label htmlFor="course">Course *</label>
          <select
            id="course"
            name="course"
            value={form.course}
            onChange={handleChange}
            required
          >
            <option value="">Select a course</option>
            <option value="Computer Science">Computer Science</option>
            <option value="Information Technology">Information Technology</option>
            <option value="Electronics">Electronics</option>
            <option value="Mechanical">Mechanical</option>
            <option value="Civil">Civil</option>
            <option value="Electrical">Electrical</option>
            <option value="Business Administration">Business Administration</option>
          </select>
        </div>
        
        <div className="form-field">
          <label htmlFor="marks">Marks (0-100) *</label>
          <input 
            type="number" 
            id="marks"
            name="marks" 
            placeholder="Enter marks" 
            value={form.marks} 
            onChange={handleChange} 
            required 
            min="0"
            max="100"
          />
        </div>
        
        <div className="form-field">
          <label htmlFor="city">City *</label>
          <input 
            type="text" 
            id="city"
            name="city" 
            placeholder="Enter city" 
            value={form.city} 
            onChange={handleChange} 
            required 
          />
        </div>
        
        <div className="form-field">
          <label htmlFor="phoneNumber">Phone Number</label>
          <input 
            type="text" 
            id="phoneNumber"
            name="phoneNumber" 
            placeholder="Enter phone number (10 digits)" 
            value={form.phoneNumber || ''} 
            onChange={handleChange} 
            pattern="[0-9]{10}"
            maxLength="10"
          />
        </div>
        
        <div className="form-actions">
          <button type="submit" className="add" disabled={loading}>
            {loading ? (
              <span className="loading-spinner">
                <svg className="spinner" viewBox="0 0 50 50" style={{ width: '20px', height: '20px' }}>
                  <circle className="path" cx="25" cy="25" r="20" fill="none" strokeWidth="5"></circle>
                </svg>
                {student ? "Updating..." : "Saving..."}
              </span>
            ) : (
              student ? "💾 Update" : "💾 Save"
            )}
          </button>
          <button type="button" className="back" onClick={onBack}>← Back to List</button>
        </div>
      </form>
    </div>
  );
}

export default StudentForm;
