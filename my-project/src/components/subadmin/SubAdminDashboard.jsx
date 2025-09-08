import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import SubAdminSidebar from './SubAdminSidebar';
import SubAdminHeader from './SubAdminHeader';
import Dashboard from './Dashboard';
import ContentUpload from './ContentUpload';
import MyUploads from './MyUploads';

const SubAdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <SubAdminSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      
      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <SubAdminHeader setSidebarOpen={setSidebarOpen} />
        
        {/* Page content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="container mx-auto px-6 py-8">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/upload" element={<ContentUpload />} />
              <Route path="/my-uploads" element={<MyUploads />} />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SubAdminDashboard;
