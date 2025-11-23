import React, { useState, useEffect } from 'react'; 
import { Button, Card, Modal } from 'flowbite-react';
import { FiUpload, FiFileText, FiImage, FiDownload, FiTrash2, FiMoreVertical, FiX } from 'react-icons/fi';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { useSelector } from 'react-redux';
import ResourcePopover from './ResourcePopover';
import { toast } from 'react-hot-toast';

export default function DashResource() {
  const { currentUser } = useSelector((state) => state.user);
  const [isPopoverVisible, setPopoverVisible] = useState(false);
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [resourceToDelete, setResourceToDelete] = useState(null);
  const [showMore, setShowMore] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedResource, setSelectedResource] = useState(null);
  const [showResourceModal, setShowResourceModal] = useState(false);
  const pageSize = 9;

  const handleButtonClick = () => {
    setPopoverVisible((prev) => !prev);
  };

  const handleClose = () => setPopoverVisible(false);

  // Fetch resources from the API
  const fetchResources = async (page = 0) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/resource/get?page=${page}&size=${pageSize}`);
      if (!response.ok) {
        throw new Error('Failed to fetch resources');
      }
      const data = await response.json();

      if (page === 0) {
        setResources(data.resources);
      } else {
        setResources((prevResources) => [...prevResources, ...data.resources]);
      }

      setShowMore(data.resources.length === pageSize);
    } catch (error) {
      console.error('Error fetching resources:', error);
      toast.error('Failed to fetch resources');
      window.location.href = '/re-authenticate';
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResources();
  }, []);

  // Determine the file type icon and color
  const getFileIcon = (url) => {
    if (url.endsWith('.pdf')) return { icon: FiFileText, color: 'text-red-600 bg-red-100 dark:bg-red-900' };
    if (url.endsWith('.jpg') || url.endsWith('.jpeg') || url.endsWith('.png') || url.endsWith('.gif')) 
      return { icon: FiImage, color: 'text-green-600 bg-green-100 dark:bg-green-900' };
    return { icon: FiFileText, color: 'text-blue-600 bg-blue-100 dark:bg-blue-900' };
  };

  // Get file type label
  const getFileType = (url) => {
    if (url.endsWith('.pdf')) return 'PDF';
    if (url.endsWith('.jpg') || url.endsWith('.jpeg')) return 'JPEG';
    if (url.endsWith('.png')) return 'PNG';
    if (url.endsWith('.gif')) return 'GIF';
    if (url.endsWith('.doc') || url.endsWith('.docx')) return 'DOC';
    return 'FILE';
  };

  // Format file size
  const formatFileSize = (bytes) => {
    if (!bytes) return 'Unknown size';
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / 1048576).toFixed(1) + ' MB';
  };

  // Open modal for delete confirmation
  const handleDeleteModal = (resource, e) => {
    e?.stopPropagation();
    setResourceToDelete(resource);
    setShowModal(true);
  };

  // Delete a resource
  const handleDelete = async () => {
    if (!resourceToDelete) return;
    
    try {
      const response = await fetch(`/api/resource/delete/${resourceToDelete._id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete resource');
      }
      setResources((prevResources) => prevResources.filter((resource) => resource._id !== resourceToDelete._id));
      toast.success('Resource deleted successfully');
      setShowModal(false);
      setResourceToDelete(null);
    } catch (error) {
      console.error('Error deleting resource:', error);
      toast.error('Failed to delete resource');
    }
  };

  const handleShowMore = () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    fetchResources(nextPage);
  };

  const openResourceDetails = (resource) => {
    setSelectedResource(resource);
    setShowResourceModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 w-full">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                <FiFileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800 dark:text-white">
                  Resources
                </h1>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {resources.length} file{resources.length !== 1 ? 's' : ''} available
                </p>
              </div>
            </div>
            
            {currentUser.isAdmin && (
              <Button
                gradientDuoTone="purpleToBlue"
                onClick={handleButtonClick}
                className="flex items-center space-x-2"
              >
                <FiUpload className="w-4 h-4" />
                <span className="hidden sm:inline">Add File</span>
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        {isPopoverVisible && <ResourcePopover onClose={handleClose} onSuccess={fetchResources} />}

        {/* Resources Grid */}
        {loading && resources.length === 0 ? (
          <div className="space-y-4">
            {[1, 2, 3].map((n) => (
              <div key={n} className="animate-pulse bg-white dark:bg-gray-800 rounded-2xl p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : resources.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-8 text-center">
            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiFileText className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-gray-500 dark:text-gray-400 font-medium mb-1">
              No resources available
            </h3>
            <p className="text-gray-400 dark:text-gray-500 text-sm mb-4">
              {currentUser.isAdmin ? 'Upload your first resource to get started' : 'Check back later for resources'}
            </p>
            {currentUser.isAdmin && (
              <Button
                gradientDuoTone="purpleToBlue"
                onClick={handleButtonClick}
                className="flex items-center space-x-2 mx-auto"
              >
                <FiUpload className="w-4 h-4" />
                <span>Upload File</span>
              </Button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {resources.map((resource) => {
              const { icon: FileIcon, color } = getFileIcon(resource.fileUrl);
              const fileType = getFileType(resource.fileUrl);

              return (
                <Card 
                  key={resource._id} 
                  className="hover:shadow-lg transition-all duration-200 cursor-pointer"
                  onClick={() => openResourceDetails(resource)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center`}>
                      <FileIcon className="w-6 h-6" />
                    </div>
                    {currentUser.isAdmin && (
                      <button
                        onClick={(e) => handleDeleteModal(resource, e)}
                        className="p-2 text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"
                      >
                        <FiTrash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-semibold text-gray-800 dark:text-white line-clamp-2">
                      {resource.title || 'Untitled Resource'}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">
                      {resource.description || 'No description available'}
                    </p>
                    
                    <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 pt-2">
                      <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full">
                        {fileType}
                      </span>
                      {resource.fileSize && (
                        <span>{formatFileSize(resource.fileSize)}</span>
                      )}
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <a
                      href={resource.fileUrl}
                      download
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center justify-center space-x-2 text-sm"
                    >
                      <FiDownload className="w-4 h-4" />
                      <span>Download</span>
                    </a>
                  </div>
                </Card>
              );
            })}
          </div>
        )}

        {/* Show More Button */}
        {showMore && (
          <div className="flex justify-center mt-8">
            <button
              className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex items-center space-x-2"
              onClick={handleShowMore}
            >
              <span>Load More</span>
              <FiMoreVertical className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Resource Details Modal */}
      {showResourceModal && selectedResource && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-md w-full max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                Resource Details
              </h2>
              <button
                onClick={() => setShowResourceModal(false)}
                className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 rounded-lg"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>

            <div className="overflow-y-auto p-6 space-y-6">
              <div className="flex justify-center">
                <div className={`w-20 h-20 ${getFileIcon(selectedResource.fileUrl).color} rounded-2xl flex items-center justify-center`}>
                  {(() => {
                    const { icon: FileIcon } = getFileIcon(selectedResource.fileUrl);
                    return <FileIcon className="w-10 h-10" />;
                  })()}
                </div>
              </div>

              <div className="text-center">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                  {selectedResource.title || 'Untitled Resource'}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {selectedResource.description || 'No description available'}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                  <div className="text-gray-500 dark:text-gray-400 mb-1">File Type</div>
                  <div className="font-medium text-gray-800 dark:text-white">{getFileType(selectedResource.fileUrl)}</div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                  <div className="text-gray-500 dark:text-gray-400 mb-1">File Size</div>
                  <div className="font-medium text-gray-800 dark:text-white">
                    {formatFileSize(selectedResource.fileSize)}
                  </div>
                </div>
              </div>

              {selectedResource.createdAt && (
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 text-sm">
                  <div className="text-gray-500 dark:text-gray-400 mb-1">Uploaded</div>
                  <div className="font-medium text-gray-800 dark:text-white">
                    {new Date(selectedResource.createdAt).toLocaleDateString()}
                  </div>
                </div>
              )}
            </div>

            <div className="p-6 border-t border-gray-200 dark:border-gray-700 space-y-3">
              <a
                href={selectedResource.fileUrl}
                download
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors flex items-center justify-center space-x-2"
              >
                <FiDownload className="w-4 h-4" />
                <span>Download File</span>
              </a>
              {currentUser.isAdmin && (
                <button
                  onClick={() => {
                    setShowResourceModal(false);
                    handleDeleteModal(selectedResource);
                  }}
                  className="w-full py-3 px-4 bg-red-600 hover:bg-red-700 text-white rounded-xl transition-colors flex items-center justify-center space-x-2"
                >
                  <FiTrash2 className="w-4 h-4" />
                  <span>Delete Resource</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <Modal show={showModal} onClose={() => setShowModal(false)} popup size="md">
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
            <h3 className="mb-2 text-lg font-semibold text-gray-800 dark:text-white">
              Delete Resource?
            </h3>
            <p className="mb-4 text-gray-500 dark:text-gray-400">
              Are you sure you want to delete "{resourceToDelete?.title}"? This action cannot be undone.
            </p>
            <div className="flex justify-center gap-3">
              <Button color="gray" onClick={() => setShowModal(false)}>
                Cancel
              </Button>
              <Button color="failure" onClick={handleDelete}>
                Delete
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}