import React from 'react';
import { 
  Users, 
  Clock, 
  CheckCircle, 
  XCircle, 
  FileText, 
  Image,
  Video,
  TrendingUp
} from 'lucide-react';

const Dashboard = () => {
  // Mock data for demonstration
  const stats = [
    {
      title: 'Total Sub-Admins',
      value: '12',
      change: '+2 this month',
      changeType: 'positive',
      icon: Users,
      color: 'blue'
    },
    {
      title: 'Pending Approvals',
      value: '8',
      change: '3 urgent',
      changeType: 'warning',
      icon: Clock,
      color: 'yellow'
    },
    {
      title: 'Approved Today',
      value: '24',
      change: '+15%',
      changeType: 'positive',
      icon: CheckCircle,
      color: 'green'
    },
    {
      title: 'Rejected Today',
      value: '3',
      change: '-5%',
      changeType: 'negative',
      icon: XCircle,
      color: 'red'
    }
  ];

  const recentActivity = [
    {
      id: 1,
      type: 'approval',
      user: 'John Smith',
      action: 'uploaded 5 images',
      time: '2 hours ago',
      status: 'pending'
    },
    {
      id: 2,
      type: 'approval',
      user: 'Sarah Johnson',
      action: 'uploaded 1 video',
      time: '4 hours ago',
      status: 'approved'
    },
    {
      id: 3,
      type: 'user',
      user: 'Mike Wilson',
      action: 'was created as sub-admin',
      time: '1 day ago',
      status: 'completed'
    },
    {
      id: 4,
      type: 'approval',
      user: 'Emily Davis',
      action: 'uploaded 3 images',
      time: '2 days ago',
      status: 'rejected'
    }
  ];

  const contentStats = [
    { type: 'Images', count: 245, icon: Image, color: 'purple' },
    { type: 'Videos', count: 67, icon: Video, color: 'indigo' }
  ];

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
        <p className="text-gray-600">Overview of your IFL admin portal</p>
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
                    activity.type === 'approval' ? 'bg-blue-100' : 'bg-green-100'
                  }`}>
                    {activity.type === 'approval' ? (
                      <Clock className={`h-4 w-4 ${
                        activity.type === 'approval' ? 'text-blue-600' : 'text-green-600'
                      }`} />
                    ) : (
                      <Users className="h-4 w-4 text-green-600" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900">
                      <span className="font-medium">{activity.user}</span> {activity.action}
                    </p>
                    <p className="text-sm text-gray-500">{activity.time}</p>
                  </div>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    activity.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    activity.status === 'approved' ? 'bg-green-100 text-green-800' :
                    activity.status === 'rejected' ? 'bg-red-100 text-red-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {activity.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Content Overview */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Content Overview</h3>
          </div>
          <div className="p-6">
            <div className="space-y-6">
              {contentStats.map((content) => {
                const Icon = content.icon;
                return (
                  <div key={content.type} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg bg-${content.color}-100`}>
                        <Icon className={`h-5 w-5 text-${content.color}-600`} />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{content.type}</p>
                        <p className="text-xs text-gray-500">Total uploaded</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-gray-900">{content.count}</p>
                      <div className="flex items-center text-xs text-green-600">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        12%
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
            <button className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors">
              <Users className="h-6 w-6 text-gray-400 mr-2" />
              <span className="text-gray-600">Create Sub-Admin</span>
            </button>
            <button className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors">
              <CheckCircle className="h-6 w-6 text-gray-400 mr-2" />
              <span className="text-gray-600">Review Approvals</span>
            </button>
            <button className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-colors">
              <FileText className="h-6 w-6 text-gray-400 mr-2" />
              <span className="text-gray-600">View Reports</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
