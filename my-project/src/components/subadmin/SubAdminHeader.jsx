import React from 'react';
import { Menu, Bell, Clock } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const SubAdminHeader = ({ setSidebarOpen }) => {
  const { user } = useAuth();

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="flex items-center justify-between h-16 px-6">
        {/* Left side */}
        <div className="flex items-center">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden text-gray-500 hover:text-gray-700 mr-4"
          >
            <Menu className="h-6 w-6" />
          </button>
          
          <div className="hidden md:block">
            <h1 className="text-xl font-semibold text-gray-900">
              Welcome, {user?.name}
            </h1>
            <p className="text-sm text-gray-500">
              Upload and manage your content
            </p>
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-4">
          {/* Pending approvals indicator */}
          <div className="hidden md:flex items-center space-x-2 px-3 py-2 bg-yellow-50 rounded-lg">
            <Clock className="h-4 w-4 text-yellow-600" />
            <span className="text-sm text-yellow-700">3 pending approvals</span>
          </div>

          {/* Notifications */}
          <button className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
              2
            </span>
          </button>

          {/* Profile */}
          <div className="flex items-center">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-green-600">
                {user?.name?.charAt(0)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default SubAdminHeader;
