import React, { useState, useCallback } from 'react';
import { 
  Upload, 
  Image, 
  Video, 
  FileText, 
  X, 
  Plus,
  AlertCircle,
  CheckCircle,
  Loader
} from 'lucide-react';

const ContentUpload = () => {
  const [files, setFiles] = useState([]);
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    priority: 'medium'
  });

  const acceptedFileTypes = {
    image: '.jpg,.jpeg,.png,.gif,.webp',
    video: '.mp4,.mov,.avi,.mkv,.webm'
  };

  const maxFileSize = 100 * 1024 * 1024; // 100MB

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  }, []);

  const handleFiles = (fileList) => {
    const validFiles = [];
    const errors = [];

    Array.from(fileList).forEach((file) => {
      if (file.size > maxFileSize) {
        errors.push(`${file.name} is too large (max 100MB)`);
        return;
      }

      const fileType = getFileType(file);
      if (!fileType) {
        errors.push(`${file.name} is not a supported file type`);
        return;
      }

      validFiles.push({
        id: Date.now() + Math.random(),
        file: file,
        name: file.name,
        size: file.size,
        type: fileType,
        preview: fileType === 'image' ? URL.createObjectURL(file) : null,
        status: 'ready'
      });
    });

    if (errors.length > 0) {
      alert(errors.join('\n'));
    }

    setFiles(prev => [...prev, ...validFiles]);
  };

  const getFileType = (file) => {
    if (file.type.startsWith('image/')) return 'image';
    if (file.type.startsWith('video/')) return 'video';
    return null;
  };

  const removeFile = (id) => {
    setFiles(prev => {
      const updated = prev.filter(f => f.id !== id);
      // Cleanup object URLs
      const removedFile = prev.find(f => f.id === id);
      if (removedFile?.preview) {
        URL.revokeObjectURL(removedFile.preview);
      }
      return updated;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (files.length === 0) {
      alert('Please select at least one file to upload');
      return;
    }

    if (!formData.title.trim()) {
      alert('Please enter a title for your upload');
      return;
    }

    setUploading(true);

    try {
      // Simulate file upload process
      for (let i = 0; i < files.length; i++) {
        setFiles(prev => prev.map(f => 
          f.id === files[i].id ? { ...f, status: 'uploading' } : f
        ));
        
        // Simulate upload delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setFiles(prev => prev.map(f => 
          f.id === files[i].id ? { ...f, status: 'completed' } : f
        ));
      }

      // Reset form after successful upload
      setTimeout(() => {
        setFiles([]);
        setFormData({
          title: '',
          description: '',
          category: '',
          priority: 'medium'
        });
        alert('Content uploaded successfully and submitted for approval!');
      }, 500);

    } catch (error) {
      console.error('Upload error:', error);
      alert('Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const getFileIcon = (type) => {
    switch (type) {
      case 'image': return <Image className="h-5 w-5" />;
      case 'video': return <Video className="h-5 w-5" />;
      default: return <FileText className="h-5 w-5" />;
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Upload Content</h2>
        <p className="text-gray-600">Upload images and videos for approval</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Upload Details */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Upload Details</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter a descriptive title"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select a category</option>
                <option value="product">Product Images</option>
                <option value="marketing">Marketing Materials</option>
                <option value="team">Team Photos</option>
                <option value="events">Events</option>
                <option value="tutorials">Tutorials</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Provide additional details about your upload"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Priority Level
              </label>
              <select
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="low">Low Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="high">High Priority</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>
          </div>
        </div>

        {/* File Upload Area */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Files</h3>
          
          {/* Drop Zone */}
          <div
            className={`relative border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
              dragActive
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-300 hover:border-gray-400'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <div className="space-y-4">
              <div className="flex justify-center">
                <Upload className="h-12 w-12 text-gray-400" />
              </div>
              <div>
                <p className="text-lg font-medium text-gray-900">
                  Drop your files here, or{' '}
                  <label className="text-blue-600 hover:text-blue-700 cursor-pointer">
                    browse
                    <input
                      type="file"
                      multiple
                      accept={Object.values(acceptedFileTypes).join(',')}
                      onChange={(e) => handleFiles(e.target.files)}
                      className="hidden"
                    />
                  </label>
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  Supported formats: Images (JPG, PNG, GIF), Videos (MP4, MOV, AVI)
                </p>
                <p className="text-xs text-gray-400">Maximum file size: 100MB</p>
              </div>
            </div>
          </div>

          {/* File List */}
          {files.length > 0 && (
            <div className="mt-6">
              <h4 className="text-sm font-medium text-gray-700 mb-3">
                Selected Files ({files.length})
              </h4>
              <div className="space-y-2">
                {files.map((fileItem) => (
                  <div
                    key={fileItem.id}
                    className="flex items-center justify-between p-3 border border-gray-200 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      {fileItem.preview ? (
                        <img
                          src={fileItem.preview}
                          alt="Preview"
                          className="w-10 h-10 object-cover rounded"
                        />
                      ) : (
                        <div className={`p-2 rounded ${
                          fileItem.type === 'video' ? 'bg-indigo-100 text-indigo-600' :
                          fileItem.type === 'image' ? 'bg-purple-100 text-purple-600' :
                          'bg-gray-100 text-gray-600'
                        }`}>
                          {getFileIcon(fileItem.type)}
                        </div>
                      )}
                      
                      <div>
                        <p className="text-sm font-medium text-gray-900">{fileItem.name}</p>
                        <p className="text-xs text-gray-500">{formatFileSize(fileItem.size)}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      {fileItem.status === 'uploading' && (
                        <Loader className="h-4 w-4 text-blue-600 animate-spin" />
                      )}
                      {fileItem.status === 'completed' && (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      )}
                      {fileItem.status === 'ready' && (
                        <button
                          type="button"
                          onClick={() => removeFile(fileItem.id)}
                          className="p-1 text-gray-400 hover:text-red-600"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Guidelines */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
          <div className="flex items-start space-x-3">
            <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <h4 className="text-sm font-semibold text-blue-900">Upload Guidelines</h4>
              <ul className="mt-2 text-sm text-blue-800 space-y-1">
                <li>• Ensure all content follows brand guidelines</li>
                <li>• Images should be high-resolution and properly formatted</li>
                <li>• Videos should be under 100MB and in supported formats</li>
                <li>• All content will be reviewed before going live</li>
                <li>• You'll receive notifications about approval status</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex items-center justify-end space-x-4">
          <button
            type="button"
            onClick={() => {
              setFiles([]);
              setFormData({
                title: '',
                description: '',
                category: '',
                priority: 'medium'
              });
            }}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            disabled={uploading}
          >
            Clear All
          </button>
          
          <button
            type="submit"
            disabled={uploading || files.length === 0}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            {uploading ? (
              <>
                <Loader className="h-4 w-4 animate-spin" />
                <span>Uploading...</span>
              </>
            ) : (
              <>
                <Upload className="h-4 w-4" />
                <span>Submit for Approval</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContentUpload;
