import React, { useState } from 'react';
import { 
  Image, 
  Video, 
  FileText, 
  Clock, 
  CheckCircle, 
  XCircle,
  Eye,
  Download,
  Edit,
  Trash2,
  Search,
  Filter,
  AlertTriangle
} from 'lucide-react';

const MyUploads = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  // Mock data for uploads
  const uploads = [
    {
      id: 1,
      title: 'Product Photography Set 1',
      type: 'image',
      uploadedAt: '2024-01-15 10:30 AM',
      status: 'pending',
      fileCount: 3,
      category: 'product',
      priority: 'high',
      description: 'High-quality product images for winter collection',
      files: ['product1.jpg', 'product2.jpg', 'product3.jpg'],
      rejectionReason: null
    },
    {
      id: 2,
      title: 'Brand Introduction Video',
      type: 'video',
      uploadedAt: '2024-01-14 09:15 AM',
      status: 'approved',
      fileCount: 1,
      category: 'marketing',
      priority: 'medium',
      description: 'Company introduction video for homepage',
      files: ['intro_video.mp4'],
      approvedAt: '2024-01-15 02:30 PM',
      rejectionReason: null
    },
    {
      id: 3,
      title: 'Team Photos',
      type: 'image',
      uploadedAt: '2024-01-13 04:20 PM',
      status: 'rejected',
      fileCount: 5,
      category: 'team',
      priority: 'low',
      description: 'Professional headshots of team members',
      files: ['team1.jpg', 'team2.jpg', 'team3.jpg', 'team4.jpg', 'team5.jpg'],
      rejectionReason: 'Images quality needs improvement. Please ensure proper lighting and higher resolution.',
      rejectedAt: '2024-01-14 11:45 AM'
    },
    {
      id: 4,
      title: 'Tutorial Series',
      type: 'video',
      uploadedAt: '2024-01-12 02:45 PM',
      status: 'approved',
      fileCount: 2,
      category: 'tutorials',
      priority: 'high',
      description: 'How-to videos for product usage',
      files: ['tutorial1.mp4', 'tutorial2.mp4'],
      approvedAt: '2024-01-13 10:15 AM',
      rejectionReason: null
    },
    {
      id: 5,
      title: 'Event Coverage',
      type: 'image',
      uploadedAt: '2024-01-11 03:00 PM',
      status: 'under_review',
      fileCount: 12,
      category: 'events',
      priority: 'medium',
      description: 'Photos from company annual event',
      files: Array.from({ length: 12 }, (_, i) => `event_${i + 1}.jpg`),
      rejectionReason: null
    }
  ];

  const filteredUploads = uploads.filter(upload => {
    const matchesSearch = upload.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         upload.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || upload.status === statusFilter;
    const matchesType = typeFilter === 'all' || upload.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'approved': return 'text-green-600 bg-green-100';
      case 'rejected': return 'text-red-600 bg-red-100';
      case 'under_review': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'approved': return <CheckCircle className="h-4 w-4" />;
      case 'rejected': return <XCircle className="h-4 w-4" />;
      case 'under_review': return <Eye className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'urgent': return 'text-red-600 bg-red-100';
      case 'high': return 'text-orange-600 bg-orange-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const handlePreview = (id) => {
    console.log('Previewing upload:', id);
  };

  const handleDownload = (id) => {
    console.log('Downloading upload:', id);
  };

  const handleEdit = (id) => {
    console.log('Editing upload:', id);
  };

  const handleDelete = (id) => {
    console.log('Deleting upload:', id);
  };

  const handleResubmit = (id) => {
    console.log('Resubmitting upload:', id);
  };

  // Calculate stats
  const totalUploads = uploads.length;
  const pendingCount = uploads.filter(u => u.status === 'pending').length;
  const approvedCount = uploads.filter(u => u.status === 'approved').length;
  const rejectedCount = uploads.filter(u => u.status === 'rejected').length;

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">My Uploads</h2>
        <p className="text-gray-600">Track and manage all your uploaded content</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Uploads</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{totalUploads}</p>
            </div>
            <div className="p-3 rounded-full bg-blue-100">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{pendingCount}</p>
            </div>
            <div className="p-3 rounded-full bg-yellow-100">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Approved</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{approvedCount}</p>
            </div>
            <div className="p-3 rounded-full bg-green-100">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Rejected</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{rejectedCount}</p>
            </div>
            <div className="p-3 rounded-full bg-red-100">
              <XCircle className="h-6 w-6 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search uploads..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="flex items-center space-x-4">
              {/* Filters */}
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">Filter:</span>
              </div>
              
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="under_review">Under Review</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>

              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
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

      {/* Uploads List */}
      <div className="space-y-4">
        {filteredUploads.map((upload) => (
          <div key={upload.id} className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className={`p-2 rounded-lg ${upload.type === 'image' ? 'bg-purple-100' : upload.type === 'video' ? 'bg-indigo-100' : 'bg-gray-100'}`}>
                      {upload.type === 'image' ? (
                        <Image className={`h-5 w-5 text-purple-600`} />
                      ) : upload.type === 'video' ? (
                        <Video className="h-5 w-5 text-indigo-600" />
                      ) : (
                        <FileText className="h-5 w-5 text-gray-600" />
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="text-lg font-semibold text-gray-900">{upload.title}</h3>
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(upload.priority)}`}>
                          {upload.priority}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{upload.description}</p>
                      <div className="flex items-center space-x-4 text-xs text-gray-500">
                        <span>Uploaded: {upload.uploadedAt}</span>
                        <span>•</span>
                        <span>{upload.fileCount} file{upload.fileCount !== 1 ? 's' : ''}</span>
                        <span>•</span>
                        <span className="capitalize">{upload.category}</span>
                      </div>
                    </div>
                  </div>

                  {/* Status with additional info */}
                  <div className="flex items-center space-x-4 mt-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(upload.status)}`}>
                      {getStatusIcon(upload.status)}
                      <span className="ml-1 capitalize">{upload.status.replace('_', ' ')}</span>
                    </span>
                    
                    {upload.approvedAt && (
                      <span className="text-xs text-green-600">
                        Approved: {upload.approvedAt}
                      </span>
                    )}
                    
                    {upload.rejectedAt && (
                      <span className="text-xs text-red-600">
                        Rejected: {upload.rejectedAt}
                      </span>
                    )}
                  </div>

                  {/* Rejection reason */}
                  {upload.status === 'rejected' && upload.rejectionReason && (
                    <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                      <div className="flex items-start space-x-2">
                        <AlertTriangle className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-medium text-red-800">Rejection Reason:</p>
                          <p className="text-sm text-red-700 mt-1">{upload.rejectionReason}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-2 ml-6">
                  <button
                    onClick={() => handlePreview(upload.id)}
                    className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    Preview
                  </button>

                  {upload.status === 'approved' && (
                    <button
                      onClick={() => handleDownload(upload.id)}
                      className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </button>
                  )}

                  {(upload.status === 'pending' || upload.status === 'under_review') && (
                    <button
                      onClick={() => handleEdit(upload.id)}
                      className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </button>
                  )}

                  {upload.status === 'rejected' && (
                    <button
                      onClick={() => handleResubmit(upload.id)}
                      className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Resubmit
                    </button>
                  )}

                  <button
                    onClick={() => handleDelete(upload.id)}
                    className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Delete
                  </button>
                </div>
              </div>

              {/* File list */}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex flex-wrap gap-2">
                  {upload.files.slice(0, 5).map((file, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                    >
                      {file}
                    </span>
                  ))}
                  {upload.files.length > 5 && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      +{upload.files.length - 5} more
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredUploads.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No uploads found</h3>
          <p className="text-gray-600">
            {searchTerm || statusFilter !== 'all' || typeFilter !== 'all'
              ? 'No uploads match your current filters.'
              : 'You haven\'t uploaded any content yet.'
            }
          </p>
        </div>
      )}
    </div>
  );
};

export default MyUploads;
