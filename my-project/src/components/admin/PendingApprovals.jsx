import React, { useState } from 'react';
import { 
  Clock, 
  CheckCircle, 
  XCircle, 
  Image, 
  Video, 
  Eye, 
  Download,
  Filter,
  Search
} from 'lucide-react';

const PendingApprovals = () => {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data for pending approvals
  const pendingItems = [
    {
      id: 1,
      type: 'image',
      title: 'Product Photography Set 1',
      subAdmin: 'John Smith',
      submittedAt: '2024-01-15 10:30 AM',
      description: 'High-quality product images for winter collection',
      files: ['product1.jpg', 'product2.jpg', 'product3.jpg'],
      fileCount: 3,
      status: 'pending',
      priority: 'high'
    },
    {
      id: 2,
      type: 'video',
      title: 'Brand Introduction Video',
      subAdmin: 'Sarah Johnson',
      submittedAt: '2024-01-15 09:15 AM',
      description: 'Company introduction video for homepage',
      files: ['intro_video.mp4'],
      fileCount: 1,
      status: 'pending',
      priority: 'medium'
    },
    {
      id: 3,
      type: 'image',
      title: 'Team Photos',
      subAdmin: 'Mike Wilson',
      submittedAt: '2024-01-14 04:20 PM',
      description: 'Professional headshots of team members',
      files: ['team1.jpg', 'team2.jpg', 'team3.jpg', 'team4.jpg', 'team5.jpg'],
      fileCount: 5,
      status: 'pending',
      priority: 'low'
    },
    {
      id: 4,
      type: 'video',
      title: 'Tutorial Series',
      subAdmin: 'Emily Davis',
      submittedAt: '2024-01-14 02:45 PM',
      description: 'How-to videos for product usage',
      files: ['tutorial1.mp4', 'tutorial2.mp4'],
      fileCount: 2,
      status: 'pending',
      priority: 'high'
    }
  ];

  const handleApprove = (id) => {
    console.log('Approving item:', id);
    // Handle approval logic
  };

  const handleReject = (id) => {
    console.log('Rejecting item:', id);
    // Handle rejection logic
  };

  const handlePreview = (id) => {
    console.log('Previewing item:', id);
    // Handle preview logic
  };

  const filteredItems = pendingItems.filter(item => {
    const matchesFilter = filter === 'all' || item.type === filter;
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.subAdmin.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Pending Approvals</h2>
        <p className="text-gray-600">Review and approve images and videos submitted by sub-admins</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Pending</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{pendingItems.length}</p>
            </div>
            <div className="p-3 rounded-full bg-yellow-100">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">High Priority</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {pendingItems.filter(item => item.priority === 'high').length}
              </p>
            </div>
            <div className="p-3 rounded-full bg-red-100">
              <XCircle className="h-6 w-6 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Images</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {pendingItems.filter(item => item.type === 'image').length}
              </p>
            </div>
            <div className="p-3 rounded-full bg-purple-100">
              <Image className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Videos</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {pendingItems.filter(item => item.type === 'video').length}
              </p>
            </div>
            <div className="p-3 rounded-full bg-indigo-100">
              <Video className="h-6 w-6 text-indigo-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search approvals..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Filters */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">Filter by:</span>
              </div>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Types</option>
                <option value="image">Images</option>
                <option value="video">Videos</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Approval Items */}
      <div className="space-y-4">
        {filteredItems.map((item) => (
          <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className={`p-2 rounded-lg ${item.type === 'image' ? 'bg-purple-100' : 'bg-indigo-100'}`}>
                      {item.type === 'image' ? (
                        <Image className={`h-5 w-5 ${item.type === 'image' ? 'text-purple-600' : 'text-indigo-600'}`} />
                      ) : (
                        <Video className="h-5 w-5 text-indigo-600" />
                      )}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                      <p className="text-sm text-gray-600">
                        Submitted by <span className="font-medium">{item.subAdmin}</span> on {item.submittedAt}
                      </p>
                    </div>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(item.priority)}`}>
                      {item.priority} priority
                    </span>
                  </div>

                  <p className="text-gray-700 mb-4">{item.description}</p>

                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span>{item.fileCount} file{item.fileCount !== 1 ? 's' : ''}</span>
                    <span>•</span>
                    <span className="capitalize">{item.type} content</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2 ml-6">
                  <button
                    onClick={() => handlePreview(item.id)}
                    className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    Preview
                  </button>
                  
                  <button
                    onClick={() => handleReject(item.id)}
                    className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    <XCircle className="h-4 w-4 mr-1" />
                    Reject
                  </button>

                  <button
                    onClick={() => handleApprove(item.id)}
                    className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Approve
                  </button>
                </div>
              </div>

              {/* File list */}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Files:</h4>
                <div className="flex flex-wrap gap-2">
                  {item.files.map((file, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                    >
                      {file}
                      <button className="ml-1 hover:text-blue-600">
                        <Download className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No pending approvals</h3>
          <p className="text-gray-600">
            {searchTerm || filter !== 'all' 
              ? 'No items match your current filters.'
              : 'All submissions have been reviewed.'
            }
          </p>
        </div>
      )}
    </div>
  );
};

export default PendingApprovals;
