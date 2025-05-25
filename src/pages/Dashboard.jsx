import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TaskDashboard from '../components/TaskDashboard';
import { toast } from 'react-toastify';

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  const currentDate = new Date().toLocaleDateString('en-IN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  useEffect(() => {
    console.log('User in Dashboard:', user); // Debug log
    if (!user || !user._id) {
      toast.error('Invalid user session! Redirecting to login...');
      setTimeout(() => navigate('/login'), 2000);
    }
  }, [user, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  if (!user || !user._id) {
    return null; // Prevent rendering until redirect
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <header className="bg-white shadow-lg p-4 sm:p-6 rounded-lg mb-6 flex flex-col sm:flex-row justify-between items-center">
        <div className="mb-4 sm:mb-0">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 flex items-center">
            <span className="mr-2">👋</span> Welcome, {user?.name}
          </h1>
          <p className="text-gray-600">Age: {user?.age}</p>
        </div>
        <div className="text-center sm:text-right">
          <p className="text-gray-700 mb-2">{currentDate}</p>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition flex items-center justify-center"
          >
            <span className="mr-2">🚪</span> Logout
          </button>
        </div>
      </header>

      <TaskDashboard />
    </div>
  );
};

export default Dashboard;