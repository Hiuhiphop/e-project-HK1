import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardLayout from './components/DashboardLayout';
import ProtectedRoute from './components/ProtectedRoute';
import LawyerManagementPage from './pages/LawyerManagementPage';
import CustomerManagementPage from './pages/CustomerManagementPage';
import AppointmentMonitoringPage from './pages/AppointmentMonitoringPage';
import ContentManagementPage from './pages/ContentManagementPage';
import ReportPage from './pages/ReportPage';


function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<Navigate to="/login" replace />} />

      <Route path="/dashboard" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
        {/* Các route con sẽ được hiển thị trong DashboardLayout */}
        <Route path="lawyers" element={<LawyerManagementPage />} />
        {/* Thêm các route khác cho customer, appointments, announcements, v.v. */}
        <Route path="customers" element={<CustomerManagementPage />} />
       <Route path="appointments" element={<AppointmentMonitoringPage />} />
       <Route path="announcements" element={<ContentManagementPage />} />
       <Route path="reports" element={<ReportPage />} />
      </Route>
    </Routes>
  );
}

export default App;