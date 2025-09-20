import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from './components/DashboardLayout';
import Login from './pages/Login';
import LawyerManagement from './pages/LawyerManagement';
import ClientManagement from './pages/ClientManagement';
import AppointmentMonitor from './pages/AppointmentMonitor';
import ContentManagement from './pages/ContentManagement';
import Reports from './pages/Reports';
import LawyerDashboard from './pages/LawyerDashboard'; 
import LawyerAppointments from './pages/LawyerAppointments'; 
import LawyerProfile from './pages/LawyerProfile'; 
import { isAdmin, isLawyer } from './utils/auth';
import 'antd/dist/reset.css';

const PrivateRoute = ({ children }) => {
  if (isAdmin() || isLawyer()) {
    return children;
  }
  return <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <DashboardLayout />
            </PrivateRoute>
          }
        >
          
          <Route path="/lawyers" element={<LawyerManagement />} />
          <Route path="/clients" element={<ClientManagement />} />
          <Route path="/appointments" element={<AppointmentMonitor />} />
          <Route path="/content" element={<ContentManagement />} />
          <Route path="/reports" element={<Reports />} />
          
          
          <Route path="/lawyer-dashboard" element={<LawyerDashboard />} />
          <Route path="/lawyer-appointments" element={<LawyerAppointments />} />
          <Route path="/lawyer-profile" element={<LawyerProfile />} />
          
          
          <Route index element={<Navigate to={isAdmin() ? '/lawyers' : (isLawyer() ? '/lawyer-dashboard' : '/login')} />} />
          
        </Route>
      </Routes>
    </Router>
  );
}

export default App;