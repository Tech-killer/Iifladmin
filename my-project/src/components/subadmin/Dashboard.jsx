import React from 'react';
import { 
  Upload, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Image,
  Video,
  TrendingUp,
  AlertCircle,
  Calendar
} from 'lucide-react';

const Dashboard = () => {
  // Mock data for demonstration
  const stats = [
    {
      title: 'Total Uploads',
      value: '24',
      change: '+3 this week',
      changeType: 'positive',
      icon: Upload,
      color: 'blue'
    },
    {
      title: 'Pending Approval',
      value: '3',
      change: '2 high priority',
      changeType: 'warning',
      icon: Clock,
      color: 'yellow'
    },
    {
      title: 'Approved',
      value: '18',
      change: '+2 today',
      changeType: 'positive',
      icon: CheckCircle,
      color: 'green'
    },
    {
      title: 'Rejected',
      value: '3',
      change: 'Needs revision',
      changeType: 'negative',
      icon: XCircle,
      color: 'red'
    }
  ];

  const recentActivity = [
    {
      id: 1,
      action: 'Uploaded 5 product images',
      time: '2 hours ago',
      status: 'pending',
      type: 'upload'
    },
    {
      id: 2,
      action: 'Brand video approved',
      time: '1 day ago',
      status: 'approved',
      type: 'approval'
    },
    {
      id: 3,
      action: 'Team photos rejected',
      time: '2 days ago',
      status: 'rejected',
      type: 'approval',
      note: 'Quality needs improvement'
    },
    {
      id: 4,
      action: 'Tutorial video uploaded',
      time: '3 days ago',
      status: 'approved',
      type: 'upload'
    }
  ];

  const quickStats = [
    { type: 'Images', count: 18, icon: Image, color: 'purple' },
    { type: 'Videos', count: 6, icon: Video, color: 'indigo' },
    { type: 'This Month', count: 24, icon: Calendar, color: 'green' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'approved': return 'text-green-600 bg-green-100';
      case 'rejected': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
        <p className="text-gray-600">Overview of your image and video uploads and approvals</p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.title} className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                  <p className={`text-sm mt-2 ${
                    stat.changeType === 'positive' ? 'text-green-600' :
                    stat.changeType === 'negative' ? 'text-red-600' :
                    'text-yellow-600'
                  }`}>
                    {stat.change}
                  </p>
                </div>
                <div className={`p-3 rounded-full bg-${stat.color}-100`}>
                  <Icon className={`h-6 w-6 text-${stat.color}-600`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-4">
                  <div className={`p-2 rounded-full ${
                    activity.type === 'upload' ? 'bg-blue-100' : 
                    activity.status === 'approved' ? 'bg-green-100' : 
                    activity.status === 'rejected' ? 'bg-red-100' : 'bg-yellow-100'
                  }`}>
                    {activity.type === 'upload' ? (
                      <Upload className={`h-4 w-4 ${
                        activity.type === 'upload' ? 'text-blue-600' : 'text-gray-600'
                      }`} />
                    ) : activity.status === 'approved' ? (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    ) : activity.status === 'rejected' ? (
                      <XCircle className="h-4 w-4 text-red-600" />
                    ) : (
                      <Clock className="h-4 w-4 text-yellow-600" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900">{activity.action}</p>
                    <p className="text-sm text-gray-500">{activity.time}</p>
                    {activity.note && (
                      <p className="text-xs text-red-600 mt-1 flex items-center">
                        <AlertCircle className="h-3 w-3 mr-1" />
                        {activity.note}
                      </p>
                    )}
                  </div>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(activity.status)}`}>
                    {activity.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Upload Statistics</h3>
          </div>
          <div className="p-6">
            <div className="space-y-6">
              {quickStats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div key={stat.type} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg bg-${stat.color}-100`}>
                        <Icon className={`h-5 w-5 text-${stat.color}-600`} />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{stat.type}</p>
                        <p className="text-xs text-gray-500">Total uploaded</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-gray-900">{stat.count}</p>
                      <div className="flex items-center text-xs text-green-600">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        8%
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="flex items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors">
              <div className="text-center">
                <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <span className="text-gray-600 font-medium">Upload New Content</span>
                <p className="text-xs text-gray-500 mt-1">Images and videos</p>
              </div>
            </button>
            <button className="flex items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors">
              <div className="text-center">
                <CheckCircle className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <span className="text-gray-600 font-medium">View My Uploads</span>
                <p className="text-xs text-gray-500 mt-1">Check status and manage content</p>
              </div>
            </button>
            <button className="flex items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-colors">
              <div className="text-center">
                <Clock className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <span className="text-gray-600 font-medium">Pending Reviews</span>
                <p className="text-xs text-gray-500 mt-1">Track approval status</p>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Tips Section */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
        <div className="p-6">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <AlertCircle className="h-4 w-4 text-blue-600" />
              </div>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-blue-900">Pro Tips for Better Approvals</h4>
              <ul className="mt-2 text-sm text-blue-800 space-y-1">
                <li>• Upload high-quality images (minimum 1080p resolution)</li>
                <li>• Add descriptive titles and descriptions to your content</li>
                <li>• Follow brand guidelines for consistency</li>
                <li>• Submit content for approval during business hours for faster processing</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
