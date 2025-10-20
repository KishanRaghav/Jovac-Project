import React, { useEffect, useState } from "react";
import { studentAPI } from "../services/api";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";

function StudentList({ onAdd, onEdit }) {
  const { user } = useAuth(); // Get current user
  const isAdmin = user?.role === "ADMIN";
  const isViewer = user?.role === "VIEWER";
  const [students, setStudents] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState(0);
  const [size] = useState(5);
  const [totalPages, setTotalPages] = useState(0);
  const [sortBy, setSortBy] = useState("id");
  const [sortDir, setSortDir] = useState("asc");
  const [loading, setLoading] = useState(false);

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const res = await studentAPI.getAll({
        page, 
        size, 
        keyword, 
        sortBy, 
        direction: sortDir
      });
      setStudents(res.data.content || []);
      setTotalPages(res.data.totalPages || 0);
    } catch (err) {
      console.error("Error fetching students:", err);
      toast.error("Failed to fetch students");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, [page, sortBy, sortDir, keyword]);

  const handleDelete = async (id) => {
    if (!isAdmin) {
      toast.error("Only administrators can delete student records");
      return;
    }
    
    if (window.confirm("Are you sure you want to delete this student?")) {
      try {
        await studentAPI.delete(id);
        toast.success("Student deleted successfully!");
        fetchStudents();
      } catch (err) {
        console.error("Error deleting student:", err);
        const errorMsg = err.response?.data || "Failed to delete student";
        toast.error(errorMsg);
      }
    }
  };

  const handleSearch = () => {
    setPage(0);
    fetchStudents();
  };

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortDir("asc");
    }
  };

  return (
    <div className="container">
      <div className="list-header">
        {/* Hide Add button for viewers */}
        {!isViewer && (
          <button className="add" onClick={onAdd}>
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '18px', height: '18px' }}>
              <path d="M12 5V19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Add Student
          </button>
        )}
        <div className="search-box">
          <input
            type="text"
            placeholder="🔍 Search by name..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="search-input"
          />
          <button onClick={handleSearch} className="search-btn">Search</button>
        </div>
      </div>

      {loading ? (
        <div className="loading-container">
          <div className="loading-spinner">
            <svg className="spinner" viewBox="0 0 50 50" style={{ width: '50px', height: '50px' }}>
              <circle className="path" cx="25" cy="25" r="20" fill="none" stroke="#667eea" strokeWidth="5"></circle>
            </svg>
          </div>
          <p>Loading students...</p>
        </div>
      ) : (
        <>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th onClick={() => handleSort("id")} className="sortable">
                    ID {sortBy === "id" ? (sortDir === "asc" ? "▲" : "▼") : ""}
                  </th>
                  <th onClick={() => handleSort("name")} className="sortable">
                    Name {sortBy === "name" ? (sortDir === "asc" ? "▲" : "▼") : ""}
                  </th>
                  <th onClick={() => handleSort("email")} className="sortable">
                    Email {sortBy === "email" ? (sortDir === "asc" ? "▲" : "▼") : ""}
                  </th>
                  <th onClick={() => handleSort("course")} className="sortable">
                    Course {sortBy === "course" ? (sortDir === "asc" ? "▲" : "▼") : ""}
                  </th>
                  <th onClick={() => handleSort("marks")} className="sortable">
                    Marks {sortBy === "marks" ? (sortDir === "asc" ? "▲" : "▼") : ""}
                  </th>
                  <th onClick={() => handleSort("city")} className="sortable">
                    City {sortBy === "city" ? (sortDir === "asc" ? "▲" : "▼") : ""}
                  </th>
                  <th>Phone</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {students.length > 0 ? (
                  students.map((s) => (
                    <tr key={s.id}>
                      <td>{s.id}</td>
                      <td>{s.name}</td>
                      <td>{s.email}</td>
                      <td>{s.course}</td>
                      <td>{s.marks}%</td>
                      <td>{s.city}</td>
                      <td>{s.phoneNumber || 'N/A'}</td>
                      <td>
                        {/* Viewers cannot edit or delete - show read-only */}
                        {isViewer ? (
                          <span style={{ color: '#999', fontSize: '0.85em' }}>👁️ View Only (Read-Only Access)</span>
                        ) : (
                          <>
                            {/* Users can edit their own records, Admin can edit all */}
                            {(isAdmin || s.createdBy === user?.username) && (
                              <button className="edit" onClick={() => onEdit(s)}>
                                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '16px', height: '16px' }}>
                                  <path d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                  <path d="M18.5 2.50023C18.8978 2.1024 19.4374 1.87891 20 1.87891C20.5626 1.87891 21.1022 2.1024 21.5 2.50023C21.8978 2.89805 22.1213 3.43762 22.1213 4.00023C22.1213 4.56284 21.8978 5.1024 21.5 5.50023L12 15.0002L8 16.0002L9 12.0002L18.5 2.50023Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                                Edit
                              </button>
                            )}
                            {/* Only Admin can delete */}
                            {isAdmin && (
                              <button className="delete" onClick={() => handleDelete(s.id)}>
                                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '16px', height: '16px' }}>
                                  <path d="M3 6H5H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                  <path d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                                Delete
                              </button>
                            )}
                            {/* Show read-only message for non-admin, non-owner */}
                            {!isAdmin && s.createdBy !== user?.username && (
                              <span style={{ color: '#999', fontSize: '0.85em' }}>View Only</span>
                            )}
                          </>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" style={{ textAlign: "center", padding: "40px" }}>
                      <div className="no-data">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '60px', height: '60px', margin: '0 auto 15px', color: '#ccc' }}>
                          <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <h3>No students found</h3>
                        <p>Start by adding a new student</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="pagination">
            <button 
              disabled={page === 0} 
              onClick={() => setPage(p => p - 1)} 
              className="pagination-btn"
            >
              ← Previous
            </button>
            <span className="pagination-info">
              Page <strong>{page + 1}</strong> of <strong>{totalPages || 1}</strong>
            </span>
            <button 
              disabled={page >= totalPages - 1} 
              onClick={() => setPage(p => p + 1)} 
              className="pagination-btn"
            >
              Next →
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default StudentList;
