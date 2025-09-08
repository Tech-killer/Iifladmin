import React, { useState } from 'react';
import { 
  Image, 
  Video, 
  FileText, 
  Search, 
  Filter, 
  Download, 
  Eye, 
  Trash2,
  Grid,
  List
} from 'lucide-react';

const ContentManagement = () => {
  const [viewMode, setViewMode] = useState('grid'); // grid or list
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  // Mock data for approved content
  const content = [
    {
      id: 1,
      title: 'Product Photography Set 1',
      type: 'image',
      subAdmin: 'John Smith',
      approvedAt: '2024-01-15',
      uploadedAt: '2024-01-14',
      fileCount: 3,
      status: 'published',
      thumbnail: '/api/placeholder/200/150',
      files: ['product1.jpg', 'product2.jpg', 'product3.jpg']
    },
    {
      id: 2,
      title: 'Brand Introduction Video',
      type: 'video',
      subAdmin: 'Sarah Johnson',
      approvedAt: '2024-01-14',
      uploadedAt: '2024-01-13',
      fileCount: 1,
      status: 'published',
      thumbnail: '/api/placeholder/200/150',
      files: ['intro_video.mp4']
    },
    {
      id: 3,
      title: 'Team Photos',
      type: 'image',
      subAdmin: 'Mike Wilson',
      approvedAt: '2024-01-13',
      uploadedAt: '2024-01-12',
      fileCount: 5,
      status: 'published',
      thumbnail: '/api/placeholder/200/150',
      files: ['team1.jpg', 'team2.jpg', 'team3.jpg', 'team4.jpg', 'team5.jpg']
    },
    {
      id: 4,
      title: 'Tutorial Series',
      type: 'video',
      subAdmin: 'Emily Davis',
      approvedAt: '2024-01-12',
      uploadedAt: '2024-01-11',
      fileCount: 2,
      status: 'archived',
      thumbnail: '/api/placeholder/200/150',
      files: ['tutorial1.mp4', 'tutorial2.mp4']
    }
  ];

  const filteredContent = content.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.subAdmin.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || item.type === typeFilter;
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    return matchesSearch && matchesType && matchesStatus;
  });

  const handleDelete = (id) => {
    console.log('Deleting content:', id);
  };

  const handlePreview = (id) => {
    console.log('Previewing content:', id);
  };

  const handleDownload = (id) => {
    console.log('Downloading content:', id);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'published': return 'text-green-600 bg-green-100';
      case 'archived': return 'text-gray-600 bg-gray-100';
      case 'draft': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const totalImages = content.filter(item => item.type === 'image').length;
  const totalVideos = content.filter(item => item.type === 'video').length;
  const totalPublished = content.filter(item => item.status === 'published').length;

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Content Management</h2>
        <p className="text-gray-600">Manage all approved images and videos from sub-admins</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Content</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{content.length}</p>
            </div>
            <div className="p-3 rounded-full bg-blue-100">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Images</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{totalImages}</p>
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
              <p className="text-3xl font-bold text-gray-900 mt-2">{totalVideos}</p>
            </div>
            <div className="p-3 rounded-full bg-indigo-100">
              <Video className="h-6 w-6 text-indigo-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Published</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{totalPublished}</p>
            </div>
            <div className="p-3 rounded-full bg-green-100">
              <Eye className="h-6 w-6 text-green-600" />
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
                placeholder="Search content..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="flex items-center space-x-4">
              {/* Filters */}
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">Type:</span>
              </div>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Types</option>
                <option value="image">Images</option>
                <option value="video">Videos</option>
              </select>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="published">Published</option>
                <option value="archived">Archived</option>
              </select>

              {/* View Mode Toggle */}
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  <Grid className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredContent.map((item) => (
            <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              {/* Thumbnail */}
              <div className="relative h-48 bg-gray-200">
                <div className="absolute inset-0 flex items-center justify-center">
                  {item.type === 'image' ? (
                    <Image className="h-16 w-16 text-gray-400" />
                  ) : (
                    <Video className="h-16 w-16 text-gray-400" />
                  )}
                </div>
                <div className="absolute top-2 right-2">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                    {item.status}
                  </span>
                </div>
              </div>

              {/* Content Info */}
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 truncate">{item.title}</h3>
                <p className="text-sm text-gray-600 mb-2">By {item.subAdmin}</p>
                <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                  <span>{item.fileCount} file{item.fileCount !== 1 ? 's' : ''}</span>
                  <span>Approved {new Date(item.approvedAt).toLocaleDateString()}</span>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => handlePreview(item.id)}
                    className="flex items-center text-blue-600 hover:text-blue-800 text-sm"
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    Preview
                  </button>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleDownload(item.id)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <Download className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* List View */
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Content
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Sub-Admin
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Files
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Approved
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredContent.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className={`p-2 rounded-lg ${item.type === 'image' ? 'bg-purple-100' : 'bg-indigo-100'}`}>
                          {item.type === 'image' ? (
                            <Image className="h-5 w-5 text-purple-600" />
                          ) : (
                            <Video className="h-5 w-5 text-indigo-600" />
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{item.title}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="capitalize text-sm text-gray-900">{item.type}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {item.subAdmin}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {item.fileCount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(item.approvedAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => handlePreview(item.id)}
                          className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDownload(item.id)}
                          className="text-gray-600 hover:text-gray-900 p-1 rounded hover:bg-gray-50"
                        >
                          <Download className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {filteredContent.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No content found</h3>
          <p className="text-gray-600">
            {searchTerm || typeFilter !== 'all' || statusFilter !== 'all'
              ? 'No content matches your current filters.'
              : 'No content has been approved yet.'
            }
          </p>
        </div>
      )}
    </div>
  );
};

export default ContentManagement;
