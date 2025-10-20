import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  FaHome,
  FaUserGraduate,
  FaChartBar,
  FaCog,
  FaBars,
  FaTimes,
  FaUser
} from 'react-icons/fa';

const Sidebar = () => {
  const { user, isAdmin } = useAuth();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { path: '/dashboard', icon: FaHome, label: 'Dashboard' },
    { path: '/students', icon: FaUserGraduate, label: 'Students' },
    { path: '/reports', icon: FaChartBar, label: 'Reports', adminOnly: true },
    { path: '/settings', icon: FaCog, label: 'Settings' },
  ];

  const isActive = (path) => location.pathname === path;

  const filteredMenuItems = menuItems.filter(
    (item) => !item.adminOnly || isAdmin()
  );

  return (
    <>
      {/* Mobile Menu Toggle */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-primary-600 text-white rounded-lg shadow-lg"
      >
        {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-gradient-to-b from-primary-700 to-primary-900 text-white transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo/Brand */}
          <div className="p-6 border-b border-primary-600">
            <h1 className="text-2xl font-bold text-center">
              🎓 Student MS
            </h1>
            <p className="text-xs text-center text-primary-200 mt-1">
              Management System
            </p>
          </div>

          {/* User Info */}
          <div className="p-4 bg-primary-800 bg-opacity-50">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center">
                <FaUser className="text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold truncate">
                  {user?.fullName || user?.username}
                </p>
                <p className="text-xs text-primary-300 truncate">
                  {user?.email}
                </p>
                <span className="inline-block px-2 py-0.5 text-xs bg-primary-600 rounded-full mt-1">
                  {user?.role}
                </span>
              </div>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {filteredMenuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive(item.path)
                    ? 'bg-white text-primary-700 shadow-lg'
                    : 'text-primary-100 hover:bg-primary-600 hover:text-white'
                }`}
              >
                <item.icon className="text-xl" />
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-primary-600">
            <p className="text-xs text-center text-primary-300">
              © 2025 Kishan Raghav
            </p>
          </div>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          onClick={() => setIsMobileMenuOpen(false)}
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
        />
      )}
    </>
  );
};

export default Sidebar;
