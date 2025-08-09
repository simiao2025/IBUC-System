import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { useApp } from './context/AppContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import StudentRegistration from './pages/StudentRegistration';
import Enrollment from './pages/Enrollment';
import StudentAccess from './pages/StudentAccess';
import AdminAccess from './pages/AdminAccess';
import AdminDashboard from './pages/admin/AdminDashboard';
import PoloManagement from './pages/admin/PoloManagement';
import UserManagement from './pages/admin/UserManagement';
import StaffManagement from './pages/admin/StaffManagement';
import DirectorateManagement from './pages/admin/DirectorateManagement';
import EnhancedPoloManagement from './pages/admin/EnhancedPoloManagement';
import SystemSettings from './pages/admin/SystemSettings';
import EducationalReports from './pages/admin/EducationalReports';

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode; adminOnly?: boolean }> = ({ 
  children, 
  adminOnly = false 
}) => {
  const { currentUser } = useApp();
  
  if (!currentUser) {
    return <Navigate to={adminOnly ? "/admin" : "/acesso-aluno"} replace />;
  }
  
  if (adminOnly && currentUser.role !== 'admin') {
    return <Navigate to="/admin" replace />;
  }
  
  return <>{children}</>;
};

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout><Home /></Layout>,
  },
  {
    path: '/cadastro-aluno',
    element: <Layout><StudentRegistration /></Layout>,
  },
  {
    path: '/matricula',
    element: <Layout><Enrollment /></Layout>,
  },
  {
    path: '/acesso-aluno',
    element: <Layout><StudentAccess /></Layout>,
  },
  {
    path: '/painel-aluno',
    element: (
      <Layout>
        <ProtectedRoute>
          <StudentAccess />
        </ProtectedRoute>
      </Layout>
    ),
  },
  {
    path: '/admin',
    element: <Layout><AdminAccess /></Layout>,
  },
  {
    path: '/admin/dashboard',
    element: (
      <Layout>
        <ProtectedRoute adminOnly>
          <AdminDashboard />
        </ProtectedRoute>
      </Layout>
    ),
  },
  {
    path: '/admin/polos',
    element: (
      <Layout>
        <ProtectedRoute adminOnly>
          <PoloManagement />
        </ProtectedRoute>
      </Layout>
    ),
  },
  {
    path: '/admin/users',
    element: (
      <Layout>
        <ProtectedRoute adminOnly>
          <UserManagement />
        </ProtectedRoute>
      </Layout>
    ),
  },
  {
    path: '/admin/staff',
    element: (
      <Layout>
        <ProtectedRoute adminOnly>
          <StaffManagement />
        </ProtectedRoute>
      </Layout>
    ),
  },
  {
    path: '/admin/directorate',
    element: (
      <Layout>
        <ProtectedRoute adminOnly>
          <DirectorateManagement />
        </ProtectedRoute>
      </Layout>
    ),
  },
  {
    path: '/admin/enhanced-polos',
    element: (
      <Layout>
        <ProtectedRoute adminOnly>
          <EnhancedPoloManagement />
        </ProtectedRoute>
      </Layout>
    ),
  },
  {
    path: '/admin/settings',
    element: (
      <Layout>
        <ProtectedRoute adminOnly>
          <SystemSettings />
        </ProtectedRoute>
      </Layout>
    ),
  },
  {
    path: '/admin/students',
    element: (
      <Layout>
        <ProtectedRoute adminOnly>
          <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">Gerenciamento de Alunos</h1>
              <p className="text-gray-600">Em desenvolvimento...</p>
            </div>
          </div>
        </ProtectedRoute>
      </Layout>
    ),
  },
  {
    path: '/admin/enrollments',
    element: (
      <Layout>
        <ProtectedRoute adminOnly>
          <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">Gerenciamento de Matrículas</h1>
              <p className="text-gray-600">Em desenvolvimento...</p>
            </div>
          </div>
        </ProtectedRoute>
      </Layout>
    ),
  },
  {
    path: '/admin/reports',
    element: (
      <Layout>
        <ProtectedRoute adminOnly>
          <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">Relatórios</h1>
              <p className="text-gray-600">Em desenvolvimento...</p>
            </div>
          </div>
        </ProtectedRoute>
      </Layout>
    ),
  },
]);
