import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import PrivateRoute from './components/PrivateRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Router>
      {/* Toast messages */}
      <ToastContainer position="top-right" autoClose={3000} />

      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/login"
          element={
            localStorage.getItem('user') ? <Navigate to="/dashboard" /> : <Login />
          }
        />
        <Route
          path="/register"
          element={
            localStorage.getItem('user') ? <Navigate to="/dashboard" /> : <Register />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
