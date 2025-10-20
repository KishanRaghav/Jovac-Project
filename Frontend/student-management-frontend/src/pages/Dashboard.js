import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

const Dashboard = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    course: '',
    marks: '',
    city: '',
    phoneNumber: ''
  });
  const [sortBy, setSortBy] = useState('id');
  const [sortDirection, setSortDirection] = useState('asc');

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const token = localStorage.getItem('token');
  const isAdmin = user.role === 'ROLE_ADMIN';
  const canCreate = user.role === 'ROLE_ADMIN' || user.role === 'ROLE_USER'; // Both ADMIN and USER can add

  // Configure axios with token
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }
    fetchStudents();
  }, [currentPage, searchTerm, sortBy, sortDirection]);

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/students`, {
        params: {
          page: currentPage,
          size: 10,
          sortBy: sortBy,
          direction: sortDirection,
          keyword: searchTerm || undefined
        }
      });
      setStudents(response.data.content || []);
      setTotalPages(response.data.totalPages || 0);
      setTotalElements(response.data.totalElements || 0);
    } catch (error) {
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
      } else {
        toast.error('Failed to load students');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    toast.success('Logged out successfully');
    navigate('/login');
  };

  const openAddModal = () => {
    setEditingStudent(null);
    setFormData({ name: '', email: '', course: '', marks: '', city: '', phoneNumber: '' });
    setShowModal(true);
  };

  const openEditModal = (student) => {
    setEditingStudent(student);
    setFormData({
      name: student.name,
      email: student.email,
      course: student.course,
      marks: student.marks,
      city: student.city,
      phoneNumber: student.phoneNumber || ''
    });
    setShowModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Convert marks to integer for proper backend handling
    const processedValue = name === 'marks' ? (value === '' ? '' : parseInt(value, 10)) : value;
    
    setFormData({
      ...formData,
      [name]: processedValue
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Ensure marks is sent as integer and phoneNumber is properly formatted
      const submitData = {
        ...formData,
        marks: parseInt(formData.marks, 10),
        phoneNumber: formData.phoneNumber && formData.phoneNumber.trim() !== '' 
          ? formData.phoneNumber 
          : null // Send null if empty
      };
      
      console.log('Submitting data:', submitData); // Debug log
      console.log('Editing student:', editingStudent); // Debug log
      
      if (editingStudent) {
        const response = await axios.put(`${API_URL}/students/${editingStudent.id}`, submitData);
        console.log('Update response:', response.data); // Debug log
        toast.success('Student updated successfully');
      } else {
        const response = await axios.post(`${API_URL}/students`, submitData);
        console.log('Create response:', response.data); // Debug log
        toast.success('Student added successfully');
      }
      setShowModal(false);
      fetchStudents();
    } catch (error) {
      console.error('Submit error:', error); // Debug log
      console.error('Error response:', error.response); // Debug log
      console.error('Error data:', error.response?.data); // Debug log - ADDED THIS
      
      // Show detailed error message
      let errorMessage = 'Operation failed';
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.response?.data) {
        // If it's a validation error object
        errorMessage = JSON.stringify(error.response.data);
      }
      
      toast.error(errorMessage);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this student?')) return;

    try {
      await axios.delete(`${API_URL}/students/${id}`);
      toast.success('Student deleted successfully');
      fetchStudents();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Delete failed');
    }
  };

  const handleSort = (column) => {
    if (sortBy === column) {
      // Toggle direction if same column
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // New column, default to ascending
      setSortBy(column);
      setSortDirection('asc');
    }
    setCurrentPage(0); // Reset to first page when sorting
  };

  const getSortIcon = (column) => {
    if (sortBy !== column) return '↕️';
    return sortDirection === 'asc' ? '↑' : '↓';
  };

  return (
    <div className="dashboard-container">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-brand">🎓 Student Management System</div>
        <div className="navbar-user">
          <div className="user-info">
            <div className="user-avatar">{user.username?.[0]?.toUpperCase()}</div>
            <div className="user-details">
              <div className="user-name">{user.fullName || user.username}</div>
              <span className="user-role">{user.role?.replace('ROLE_', '')}</span>
            </div>
          </div>
          <button className="btn-logout" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="dashboard-content">
        <div className="page-header">
          <h1>Student Management</h1>
          <p>View and manage all students in the system</p>
        </div>

        {/* Controls */}
        <div className="controls-section">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search by name, course, or city..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(0);
              }}
            />
            <span className="search-icon">🔍</span>
          </div>

          {canCreate && (
            <button className="btn-add" onClick={openAddModal}>
              <span>➕</span>
              Add Student
            </button>
          )}
        </div>

        {/* Table */}
        {loading ? (
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Loading students...</p>
          </div>
        ) : students.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">📚</div>
            <h3>No Students Found</h3>
            <p>
              {searchTerm 
                ? 'Try adjusting your search' 
                : 'Add your first student to get started'}
            </p>
          </div>
        ) : (
          <>
            <div className="table-container">
              <table className="student-table">
                <thead>
                  <tr>
                    <th onClick={() => handleSort('id')} style={{cursor: 'pointer'}}>
                      ID {getSortIcon('id')}
                    </th>
                    <th onClick={() => handleSort('name')} style={{cursor: 'pointer'}}>
                      Name {getSortIcon('name')}
                    </th>
                    <th onClick={() => handleSort('email')} style={{cursor: 'pointer'}}>
                      Email {getSortIcon('email')}
                    </th>
                    <th onClick={() => handleSort('course')} style={{cursor: 'pointer'}}>
                      Course {getSortIcon('course')}
                    </th>
                    <th onClick={() => handleSort('marks')} style={{cursor: 'pointer'}}>
                      Marks {getSortIcon('marks')}
                    </th>
                    <th onClick={() => handleSort('city')} style={{cursor: 'pointer'}}>
                      City {getSortIcon('city')}
                    </th>
                    <th>Phone</th>
                    {isAdmin && <th>Actions</th>}
                  </tr>
                </thead>
                <tbody>
                  {students.map((student) => (
                    <tr key={student.id}>
                      <td>#{student.id}</td>
                      <td>{student.name}</td>
                      <td>{student.email}</td>
                      <td>{student.course}</td>
                      <td><span className="marks-badge">{student.marks}%</span></td>
                      <td>{student.city}</td>
                      <td>{student.phoneNumber || 'N/A'}</td>
                      {isAdmin && (
                        <td>
                          <div className="action-buttons">
                            <button
                              className="btn-edit"
                              onClick={() => openEditModal(student)}
                            >
                              ✏️ Edit
                            </button>
                            <button
                              className="btn-delete"
                              onClick={() => handleDelete(student.id)}
                            >
                              🗑️ Delete
                            </button>
                          </div>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="pagination-container">
              <div className="pagination-info">
                Showing {currentPage * 10 + 1} to {Math.min((currentPage + 1) * 10, totalElements)} of {totalElements} students
              </div>
              <div className="pagination-controls">
                <button
                  className="page-btn"
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 0}
                >
                  ← Previous
                </button>

                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index}
                    className={`page-btn ${currentPage === index ? 'active' : ''}`}
                    onClick={() => setCurrentPage(index)}
                  >
                    {index + 1}
                  </button>
                ))}

                <button
                  className="page-btn"
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage >= totalPages - 1}
                >
                  Next →
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Modal for Add/Edit */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editingStudent ? 'Edit Student' : 'Add New Student'}</h2>
              <button className="btn-close" onClick={() => setShowModal(false)}>
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  minLength="2"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="course">Course *</label>
                <select
                  id="course"
                  name="course"
                  value={formData.course}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select a course</option>
                  <option value="Computer Science">Computer Science</option>
                  <option value="Information Technology">Information Technology</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Mechanical">Mechanical</option>
                  <option value="Civil">Civil</option>
                  <option value="Business Administration">Business Administration</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="marks">Marks (0-100) *</label>
                <input
                  type="number"
                  id="marks"
                  name="marks"
                  value={formData.marks}
                  onChange={handleInputChange}
                  required
                  min="0"
                  max="100"
                />
              </div>

              <div className="form-group">
                <label htmlFor="city">City *</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="phoneNumber">Phone Number</label>
                <input
                  type="text"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  placeholder="10 digits"
                  pattern="[0-9]{10}"
                  maxLength="10"
                  title="Please enter a 10-digit phone number"
                />
              </div>

              <div className="modal-actions">
                <button type="button" className="btn-cancel" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-submit">
                  {editingStudent ? 'Update Student' : 'Add Student'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
