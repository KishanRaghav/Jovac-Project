import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { studentAPI } from "../services/api";
import { toast } from "react-toastify";

const EditStudent = () => {
  const [student, setStudent] = useState({ 
    name: "", 
    email: "", 
    course: "", 
    marks: "", 
    city: "",
    phoneNumber: "" 
  });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const res = await studentAPI.getById(id);
        setStudent(res.data);
      } catch (error) {
        toast.error("Failed to load student data");
        navigate("/dashboard");
      }
    };
    fetchStudent();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Convert marks to integer for proper backend handling
    const processedValue = name === 'marks' ? (value === '' ? '' : parseInt(value, 10)) : value;
    setStudent({ ...student, [name]: processedValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Ensure marks is sent as integer
      const submitData = {
        ...student,
        marks: parseInt(student.marks, 10)
      };
      
      await studentAPI.update(id, submitData);
      toast.success("Student updated successfully");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update student");
    }
  };

  return (
    <div className="container">
      <h2>Edit Student</h2>
      <form onSubmit={handleSubmit} className="student-form">
        <input 
          name="name" 
          value={student.name} 
          placeholder="Name" 
          onChange={handleChange} 
          required 
          className="student-form-input" 
        />
        <input 
          name="email" 
          type="email"
          value={student.email} 
          placeholder="Email" 
          onChange={handleChange} 
          required 
          className="student-form-input"
        />
        <select
          name="course"
          value={student.course}
          onChange={handleChange}
          required
          className="student-form-input"
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
          name="marks" 
          type="number"
          min="0"
          max="100"
          value={student.marks} 
          placeholder="Marks (0-100)" 
          onChange={handleChange} 
          required 
          className="student-form-input"
        />
        <input 
          name="city" 
          value={student.city} 
          placeholder="City" 
          onChange={handleChange} 
          required 
          className="student-form-input"
        />
        <input 
          name="phoneNumber" 
          value={student.phoneNumber || ''} 
          placeholder="Phone Number (10 digits)" 
          onChange={handleChange} 
          pattern="[0-9]{10}"
          maxLength="10"
          className="student-form-input"
        />
        <button type="submit" className="edit">Update</button>
      </form>
    </div>
  );
};

export default EditStudent;
