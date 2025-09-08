import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Login from './components/auth/Login';
import AdminDashboard from './components/admin/AdminDashboard';
import SubAdminDashboard from './components/subadmin/SubAdminDashboard';
import ProtectedRoute from './components/common/ProtectedRoute';

function AppRoutes() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
      
      <Route path="/" element={
        <ProtectedRoute>
          {user?.role === 'admin' ? <AdminDashboard /> : <SubAdminDashboard />}
        </ProtectedRoute>
      } />
      
      <Route path="/admin/*" element={
        <ProtectedRoute requireRole="admin">
          <AdminDashboard />
        </ProtectedRoute>
      } />
      
      <Route path="/sub-admin/*" element={
        <ProtectedRoute requireRole="sub-admin">
          <SubAdminDashboard />
        </ProtectedRoute>
      } />
      
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Router>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </Router>
    </div>
  );
}