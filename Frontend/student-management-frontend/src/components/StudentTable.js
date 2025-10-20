import React from 'react';
import { FaEdit, FaTrash, FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

const StudentTable = ({
  students,
  pagination,
  filters,
  onEdit,
  onDelete,
  onSort,
  onPageChange,
  loading
}) => {
  const { isAdmin, isViewer } = useAuth();

  const getSortIcon = (column) => {
    if (filters.sortBy !== column) return <FaSort className="inline ml-1 text-gray-400" />;
    return filters.direction === 'asc' ? (
      <FaSortUp className="inline ml-1 text-primary-600" />
    ) : (
      <FaSortDown className="inline ml-1 text-primary-600" />
    );
  };

  const handleSort = (column) => {
    const newDirection =
      filters.sortBy === column && filters.direction === 'asc' ? 'desc' : 'asc';
    onSort(column, newDirection);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="spinner"></div>
      </div>
    );
  }

  if (students.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No students found</p>
        <p className="text-gray-400 text-sm mt-2">
          {filters.keyword ? 'Try adjusting your search' : 'Add your first student to get started'}
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th
                onClick={() => handleSort('name')}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
              >
                Name {getSortIcon('name')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th
                onClick={() => handleSort('course')}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
              >
                Course {getSortIcon('course')}
              </th>
              <th
                onClick={() => handleSort('marks')}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
              >
                Marks {getSortIcon('marks')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                City
              </th>
              {!isViewer() && (
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {students.map((student) => (
              <tr key={student.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  #{student.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{student.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{student.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                    {student.course}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      student.marks >= 75
                        ? 'bg-green-100 text-green-800'
                        : student.marks >= 50
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {student.marks}%
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {student.city}
                </td>
                {!isViewer() && (
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button
                      onClick={() => onEdit(student)}
                      className="text-blue-600 hover:text-blue-900 transition-colors"
                      title="Edit"
                    >
                      <FaEdit className="inline text-lg" />
                    </button>
                    {isAdmin() && (
                      <button
                        onClick={() => onDelete(student.id)}
                        className="text-red-600 hover:text-red-900 transition-colors ml-3"
                        title="Delete"
                      >
                        <FaTrash className="inline text-lg" />
                      </button>
                    )}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-6 flex items-center justify-between bg-white px-6 py-4 rounded-lg shadow">
        <div className="text-sm text-gray-700">
          Showing{' '}
          <span className="font-medium">
            {pagination.page * pagination.size + 1}
          </span>{' '}
          to{' '}
          <span className="font-medium">
            {Math.min(
              (pagination.page + 1) * pagination.size,
              pagination.totalElements
            )}
          </span>{' '}
          of <span className="font-medium">{pagination.totalElements}</span> students
        </div>

        <div className="flex space-x-2">
          <button
            onClick={() => onPageChange(pagination.page - 1)}
            disabled={pagination.page === 0}
            className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Previous
          </button>

          {/* Page Numbers */}
          {[...Array(pagination.totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => onPageChange(index)}
              className={`px-4 py-2 border rounded-lg text-sm font-medium transition-colors ${
                pagination.page === index
                  ? 'bg-primary-600 text-white border-primary-600'
                  : 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50'
              }`}
            >
              {index + 1}
            </button>
          ))}

          <button
            onClick={() => onPageChange(pagination.page + 1)}
            disabled={pagination.page >= pagination.totalPages - 1}
            className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentTable;
